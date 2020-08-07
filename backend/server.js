const express = require('express');
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

function Game() {
  this.deck = [];
  this.players = [];
  this.gameState = {};
}

app.get('/create-room', (req, res) => {
  const roomCode = generateRoomCode();
  rooms[roomCode] = new Game();
  console.log(`Created room ${roomCode}`);
  res.json({room: roomCode})
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})