const { shuffle } = require('./utils');

const narrations = [
  "Game has begun, please confirm your role.",
  "Doppelganger, wake up and look at another player's card. You are now that role. If your new role has a night application, do it now.",
  "Werewolves, look for other werewolves. If there is no other werewolf, select a card from the center to see.",
  "Minion, look for the werewolves and confirm.",
  "Masons, look for other Masons and confirm.",
  "Seer, You make look at one player's card, or two cards from the center.",
  "Robber, you may choose another player to exchange cards with and confirm.",
  "Troublemaker, you may choose two players to change cards.",
  "Drunk, pick a card from the center to exchange with.",
  "Insomniac, you may check your current role.",
  "Doppelganger, if you are now an Insomniac, you may check your current role.",
  "The day has begun, discuss and vote before the timer ends."
];

const requiredConfirms = [
  'all',
  'doppelganger',
  'werewolf',
  'minion',
  'mason',
  'seer',
  'robber',
  'troublemaker',
  'drunk',
  'insomniac',
  'doppelganger',
  'all'
]

function buildDeck(opts, numPlayers) {
  const numCards = numPlayers + 3;
  const deck = Object.keys(opts).filter(opt => opts[opt])
  const masons = deck.includes('masons');
  const numOpts = numCards - (masons ? 4 : 2);
  if (masons) {
    deck.splice(deck.indexOf('masons'), 1);
  }
  shuffle(deck);
  if (deck.length > numOpts) {
    deck.splice(numOpts);
  } else {
    while (deck.length < numOpts) {
      deck.push('villager')
    }
  }
  if (masons) {
    deck.push('mason');
    deck.push('mason');
  }
  deck.push('werewolf');
  deck.push('werewolf');
  return deck;
}

function assignRoles(deck, players) {
  const deckCopy = deck.slice(0, deck.length);
  shuffle(deckCopy);
  const roles = {playerRoles: {}, center: deckCopy.slice(players.length)};
  for (let i = 0; i < players.length; i++) {
    roles.playerRoles[players[i]] = deckCopy[i]
  }
  return roles;
}

function resetConfirms(players) {
  const confirms = {};
  players.forEach((player) => confirms[player] = false);
  return confirms;
}

function Game(deckOpts, players) {
  this.deck = buildDeck(deckOpts, players.length);
  this.roles = assignRoles(this.deck, players);
  this.state = 0;
  this.confirms = resetConfirms(players);
}

Game.prototype.narration = function () {
  return narrations[this.state];
}

Game.prototype.submitConfirm = function (name) {
  this.confirms[name] = true;
}

Game.prototype.updateConfirms = function () {
  for (const player in this.confirms) {
    if (this.roles.playerRoles[player] === requiredConfirms[this.state]) {
      this.confirms[player] = false;
    }
  }
}

Game.prototype.updateState = function () {
  const players = Object.keys(this.confirms);
  for (let i = 0; i < players.length; i++) {
    if (!this.confirms[players[i]]) {
      return;
    }
  }
  console.log('incrementing state');
  do {
    this.state++;
  }
  while (this.state < narrations.length - 1 && 
    !this.deck.includes(requiredConfirms[this.state]))

  this.updateConfirms();
}

module.exports = Game;