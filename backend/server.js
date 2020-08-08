const express = require('express');
const http = require("http");
const socket = require('socket.io');
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

function Room() {
  this.players = {};
  this.gameState = undefined;
}

Room.prototype.addPlayer = function (playerName) {
  if (!this.players[playerName]) {
    this.players[playerName] = null;
  }
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
  socket.on("join room", payload => {
    rooms[payload.room].players[payload.playerName] = socket.id;
    const players = Object.keys(rooms[payload.room].players);
    console.log(players);
    socket.emit("update state", {
      game: rooms[payload.room].gameState,
      players: Object.keys(rooms[payload.room].players)
    });
    for (let i = 0; i < players.length; i++) {
      const otherSocket = rooms[payload.room].players[players[i]];
      socket.to(otherSocket).emit("update state", {
        game: rooms[payload.room].gameState,
        players: Object.keys(rooms[payload.room].players)
      });
    }
  })
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})