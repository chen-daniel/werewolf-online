const express = require('express');
const http = require("http");
const socket = require('socket.io');
const { RSA_PKCS1_PADDING } = require('constants');
const app = express();
const port = process.env.PORT || 8080
app.set('port', port);

const roomCodeLength = 4;
const roomCodeChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

function generateRoomCode() {
  result = '';
  do {
    for (let i = 0; i < roomCodeLength; i++) {
      result += roomCodeChars[Math.floor(Math.random() * roomCodeChars.length)];
    }
  } while (rooms[result])
  return result;
}

const defaultDeckOpts = {
  doppelganger: true,
  minion: true,
  masons: true,
  seer: true,
  robber: true,
  troublemaker: true,
  drunk: true,
  insomniac: true
}

function Room() {
  this.players = {};
  this.gameState = undefined;
  this.deckOpts = Object.assign({}, defaultDeckOpts);
  this.roomState = 'waiting';
}

Room.prototype.addPlayer = function (playerName) {
  if (!this.players[playerName]) {
    this.players[playerName] = null;
  }
}

Room.prototype.startGame = function () {
  this.gameState = new Game(this.deckOpts, Object.keys(this.players));
  this.roomState = 'started';
}

function Game(deckOpts, players) {
  this.deck = {};
  this.players = players;
}

app.post('/create-room', (req, res) => {
  const roomCode = generateRoomCode();
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
      roomState: room.roomState
    }
    updateAll(room, uiState);
  });
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})