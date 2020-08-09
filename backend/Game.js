const { shuffle } = require('./utils');
const { cloneDeep } = require('lodash');

const narrations = [
  "Game has begun, please confirm your role.",
  // "Doppelganger, wake up and look at another player's card. You are now that role. If your new role has a night application, do it now.",
  "Werecats, look for other werecats. If there is no other werecat, select a card from the center to see.",
  "Minion, look for the werewolves and confirm.",
  "Masons, look for other Masons and confirm.",
  "Seer, You make look at one player's card, or two cards from the center.",
  "Cat Burglar, you may choose another player to exchange cards with and confirm.",
  "Troublemaker, you may choose two players to change cards.",
  "Drunk, pick a card from the center to exchange with.",
  "Insomnicat, you may check your current role.",
  // "Doppelganger, if you are now an Insomniac, you may check your current role.",
  "The day has begun, discuss and vote before the timer ends."
];

const requiredConfirms = [
  'all',
  // 'doppelganger',
  'werecat',
  'minion',
  'mason',
  'seer',
  'cat burglar',
  'troublemaker',
  'drunk',
  'insomnicat',
  // 'doppelganger',
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
  deck.push('werecat');
  deck.push('werecat');
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
  this.startingRoles = cloneDeep(this.roles);
  this.state = 0;
  this.actions = [];
  this.confirms = resetConfirms(players);
}

Game.prototype.narration = function () {
  return narrations[this.state];
}

Game.prototype.submitConfirm = function (name) {
  this.confirms[name] = true;
}

Game.prototype.updateConfirms = async function (sendUpdate, room) {
  let flag = false;
  for (const player in this.confirms) {
    if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
      flag = true;
      this.confirms[player] = false;
    }
  }
  if (!flag && this.state < narrations.length - 1) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * (10000 - 6000) + 6000));
    return this.updateState(sendUpdate, room);
  }
}

Game.prototype.updateState = function (sendUpdate, room) {
  const players = Object.keys(this.confirms);
  for (let i = 0; i < players.length; i++) {
    if (!this.confirms[players[i]]) {
      sendUpdate(room);
      return;
    }
  }
  console.log('incrementing state');
  do {
    this.state++;
    this.actions = [];
  }
  while (this.state < narrations.length - 1 && 
    !this.deck.includes(requiredConfirms[this.state]))
  this.updateConfirms(sendUpdate, room);
  return sendUpdate(room);
}

Game.prototype.performAction = function (player, action) {
  if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
    let flag;
    switch (this.state) {
      case 1:
        // Werecat
        flag = false;
        console.log('performing werecat action');
        for (const otherPlayer in this.startingRoles.playerRoles) {
          if (otherPlayer !== player && this.startingRoles.playerRoles[otherPlayer] === requiredConfirms[this.state]) {
            flag = true;
            break;
          }
        }
        if (!flag && this.actions.length == 0 && action[0] === 'center') {
          this.actions.push(action);
        }
        break;
      case 3:
        // Mason
        flag = false;
        console.log('performing mason action');
        for (const otherPlayer in this.startingRoles.playerRoles) {
          if (otherPlayer !== player && this.startingRoles.playerRoles[otherPlayer] === requiredConfirms[this.state]) {
            flag = true;
            break;
          }
        }
        if (!flag && this.actions.length == 0 && action[0] === 'center') {
          this.actions.push(action);
        }
        break;
      case 4:
        // Seer
        console.log('performing seer action');
        if (this.actions.length === 0) {
          this.actions.push(action);
        } else if (this.actions.length === 1 && this.actions[0][0] === 'center' && action[0] === 'center') {
          this.actions.push(action);
        }
        break;
      case 5:
        // Cat Burglar
        console.log('performing cat burglar action');
        if (this.actions.length === 0 && action[0] === 'playerRoles') {
          this.actions.push(action);
          let swap = this.roles.playerRoles[player]
          this.roles.playerRoles[player] = this.roles.playerRoles[action[1]];
          this.roles.playerRoles[action[1]] = swap;
        }
        break;
      case 6:
        // Troublemaker
        console.log('performing troublemaker action');
        if (action[0] === 'playerRoles') {
          if (this.actions.length === 0) {
            this.actions.push(action);
          } else if (this.actions.length === 1) {
            this.actions.push(action);
            let swap = this.roles.playerRoles[action[1]];
            this.roles.playerRoles[action[1]] = this.roles.playerRoles[this.actions[0][1]];
            this.roles.playerRoles[this.actions[0][1]] = swap;
          }
        }
        break;
      case 7:
        // Drunk
        console.log('performing drunk action');
        if (this.actions.length === 0 && action[0] === 'center') {
          this.actions.push(action);
          let swap = this.roles.playerRoles[player];
          this.roles.playerRoles[player] = this.roles.center[action[1]];
          this.roles.center[action[1]] = swap;
        }
        break;
      default:
        break;
    }
  }
}

Game.prototype.playerUIState = function (player) {
  const state = {};
  state.deck = this.deck;
  state.state = this.state;
  state.confirms = {};
  state.roles = { playerRoles: {}, center: new Array(3) };
  let flag;
  switch (this.state) {
    case 0:
      // Start game
      state.roles.playerRoles[player] = this.startingRoles.playerRoles[player];
      state.confirms[player] = this.confirms[player]
      break;
    case 1:
      // Werecat
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        flag = false;
        for (const otherPlayer in this.startingRoles.playerRoles) {
          if (otherPlayer !== player && this.startingRoles.playerRoles[otherPlayer] === requiredConfirms[this.state]) {
            flag = true;
            state.roles.playerRoles[otherPlayer] = this.startingRoles.playerRoles[otherPlayer];
            state.confirms[player] = this.confirms[player];
          }
        }
        if (!flag) {
          if (this.actions.length == 1) {
            state.roles.center[this.actions[0][1]] = this.roles.center[this.actions[0][1]];
            state.confirms[player] = this.confirms[player];
          } 
        }
      }
      break;
    case 2:
      // Minion
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        for (const otherPlayer in this.roles.playerRoles) {
          if (this.roles.playerRoles[otherPlayer] === 'werecat') {
            state.roles.playerRoles[otherPlayer] = this.roles.playerRoles[otherPlayer];
          }
        }
        state.confirms[player] = this.confirms[player];
      }
      break;
    case 3:
      // Mason
      flag = false;
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        flag = false;
        for (const otherPlayer in this.startingRoles.playerRoles) {
          if (otherPlayer !== player && this.startingRoles.playerRoles[otherPlayer] === requiredConfirms[this.state]) {
            flag = true;
            state.roles.playerRoles[otherPlayer] = this.startingRoles.playerRoles[otherPlayer];
            state.confirms[player] = this.confirms[player];
          }
        }
        if (!flag) {
          if (this.actions.length === 1) {
            state.roles.center[this.actions[0][1]] = this.roles.center[this.actions[0][1]];
            state.confirms[player] = this.confirms[player];
          } 
        }
      }
      break;
    case 4:
      // Seer
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        if (this.actions.length > 0) {
          if (this.actions[0][0] === 'playerRoles') {
            state.roles.playerRoles[this.actions[0][1]] = this.roles.playerRoles[this.actions[0][1]];
            state.confirms[player] = this.confirms[player];
          } else {
            for (let i = 0; i < this.actions.length; i++) {
              state.roles.center[this.actions[i][1]] = this.roles.center[this.actions[i][1]];
            }
            if (this.actions.length === 2) {
              state.confirms[player] = this.confirms[player];
            }
          }
        }
      }
      break;
    case 5:
      // Cat Burglar
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        state.confirms[player] = this.confirms[player];
        if (this.actions[0]) {
          state.roles.playerRoles[player] = this.roles.playerRoles[player];
        }
      }
      break;
    case 6:
      // Troublemaker
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        state.confirms[player] = this.confirms[player];
      }
      break;
    case 7:
      // Drunk
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        if (this.actions.length === 1) {
          state.confirms[player] = this.confirms[player];
        }
      }
      break;
    case 8:
      // Insomnicat
      if (this.startingRoles.playerRoles[player] === requiredConfirms[this.state]) {
        state.roles.playerRoles[player] = this.roles.playerRoles[player];
        state.confirms[player] = this.confirms[player];
      }
      break;
    default:
      // Day
      state.roles.playerRoles[player] = this.roles.playerRoles[player];
      state.confirms[player] = this.confirms[player]
  }

  return state;
}

module.exports = Game;