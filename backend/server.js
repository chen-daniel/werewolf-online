const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.set('port', port);

const roomCodeLength = 4;
const roomCodeChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let rooms = {};

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
  res.json({room: roomCode})
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})