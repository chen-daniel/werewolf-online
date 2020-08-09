const express = require('express');
const http = require("http");
const socket = require('socket.io');
const { cloneDeep } = require('lodash');
const Room = require('./Room');
const { generateRoomCode } = require('./utils');
const app = express();
const port = process.env.PORT || 8080
app.set('port', port);

let rooms = {};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/create-room', (req, res) => {
  const roomCode = generateRoomCode(rooms);
  rooms[roomCode] = new Room();
  console.log(`Created room ${roomCode}`);
  rooms[roomCode].addPlayer(req.body.name);
  console.log(`Added ${req.body.name} to room ${roomCode}`)
  res.json({ room: roomCode });
});

app.post('/join-room', (req, res) => {
  rooms[req.body.room].addPlayer(req.body.name);
  console.log(`Added ${req.body.name} to room ${req.body.room}`)
  res.json({ room: req.body.room });
});

const server = http.createServer(app);
const io = socket(server);

io.origins('*:*');

io.on("connection", socket => {

  function updateAll(room, uiState) {
    socket.emit("update state", uiState);
    for (const player in room.players) {
      socket.to(room.players[player]).emit("update state", uiState);
    }
  }

  function playerUIState(uiState, player) {
    const stateCopy = cloneDeep(uiState);
    stateCopy.game = uiState.game.playerUIState(player);
    return stateCopy;
  }

  function updateAllGame(room, uiState) {
    for (const player in room.players) {
      if (socket.id === room.players[player]) {
        socket.emit("update state", playerUIState(uiState, player));
      } else {
        socket.to(room.players[player]).emit("update state", playerUIState(uiState, player));
      }
    }
  }

  socket.on("join room", payload => {
    const room = rooms[payload.room];

    room.players[payload.playerName] = socket.id;
    const players = Object.keys(room.players);
    if (players.length > 2) {
      room.roomState = 'ready';
    }
    const uiState = {
      game: room.gameState,
      deckOpts: room.deckOpts,
      players,
      roomState: room.roomState
    }
    updateAll(room, uiState);
  });

  socket.on('toggle deck option', payload => {
    const room = rooms[payload.room];
    room.deckOpts[payload.option] = !room.deckOpts[payload.option];
    console.log(`Toggled deck option ${payload.option} for room ${payload.room}`);
    const uiState = {
      game: room.gameState,
      deckOpts: room.deckOpts,
      players: Object.keys(room.players),
      roomState: room.roomState
    }
    updateAll(room, uiState);
  });
  
  socket.on('start game', payload => {
    const room = rooms[payload.room];

    room.startGame();
    console.log(`Started game for room ${payload.room}`)
    const uiState = {
      game: room.gameState,
      deckOpts: room.deckOpts,
      players: Object.keys(room.players),
      roomState: room.roomState,
      narration: room.gameState.narration()
    }
    updateAllGame(room, uiState);
  });

  socket.on('submit confirm', payload => {
    const room = rooms[payload.room];

    room.gameState.submitConfirm(payload.playerName);

    function sendUpdate(room) {
      const uiState = {
        game: room.gameState,
        deckOpts: room.deckOpts,
        players: Object.keys(room.players),
        roomState: room.roomState,
        narration: room.gameState.narration()
      }
      updateAllGame(room, uiState);
    }
    room.gameState.updateState(sendUpdate, room);
  });
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})