const Game = require('./Game');

const defaultDeckOpts = {
  doppelganger: false,
  minion: false,
  masons: false,
  seer: true,
  robber: true,
  troublemaker: true,
  drunk: false,
  insomniac: false
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

module.exports = Room;