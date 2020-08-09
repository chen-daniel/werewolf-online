import React from 'react';
import styled from 'styled-components'
import Card from './Card'

const UIStyles = styled.div`
  margin-top: 2%;
  margin-right: 20%;
  margin-left: 20%;
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  grid-template-columns: 0.3fr 0.7fr;
  grid-template-rows: 0.7fr 0.3fr;
  grid-template-areas: 
    "leftSide header"
    "leftSide  rightSide";
  div {
    display: flex;
    margin-left: 1rem;
    margin-top: 1rem;
  }
  .deck {
    grid-area: header;
  }
  .me {
    grid-area: leftSide;
  }
  .deck {
    grid-area: header;
  }

  .flx {
    color: gray;
    h4 {
      margin: 0;
      text-align: center;
    }
    display: flex;
    flex-flow: column;
  }
`

const ModelStyles = styled.div`
display: flex;
flex-flow: column;
margin-top: 0;
justify-content: center;
align-items: center;
color: #2b262c;

h4 {
  margin: 0.6rem;
  font-size: 18px;
  font-weight: 400;
  color: #2b262c;
}
h4.turn {
  color: #f31431
}
 button {
    font-size: 1rem;
    background: none;
    border: 4px solid hotpink;
    border-radius: 10px;
    width: 7rem;
    height: 2.3rem;
    margin-top: 1rem;
    font-weight: 600;
    color: hotpink;
    cursor: pointer;
  }

`

export default function GameUI({ state, socketRef, playerName, room }) {
  function submitConfirm() {
    socketRef.current.emit('submit confirm', { room, playerName });
  }

  function resetGame() {
    socketRef.current.emit('reset game', { room })
  }

  function performAction(action) {
    console.log('performing action');
    socketRef.current.emit('perform action', { room, playerName, action})
  }
  const showConfirm = state.game.confirms[playerName] !== undefined && !state.game.confirms[playerName]
  return (
    <React.Fragment>
      <ModelStyles>
        <div>
          <h4>
          <strong>Deck | </strong>
          {JSON.stringify(state.game.deck)}
          </h4>
          <h4 className={`${state.turn ? 'turn' : ''}`}>
          <strong>Narration | </strong>
          {state.narration}
          </h4>
      </div>
        {state.game.state === 10 && (<button onClick={resetGame}>Reset Game</button>)}
        {showConfirm && <button onClick={submitConfirm}>Confirm</button>}
      </ModelStyles>
    <UIStyles>
      <div className="deck">
        {state.game.roles.center.map((_card, i) => (
          <Card 
            deck={true}
            role={state.game.roles.center[i]}
            onClick={() => performAction(['center', i])}
            selected={state.game.actions && state.game.actions.filter(action => action[0] === 'center' && action[1] === i).length > 0}
            key={i}
          />
        ))}
      </div>
        <div className="me"> 
          <Card me={true} role={state.game.roles.playerRoles[playerName]} />
        </div>
      <div className="otherPlayers">
        {state.players.filter(player => player !== playerName).map((player, i) => (
         <div className="flx" key={i}>
          <h4>{player}</h4>
            <Card 
              player={true} 
              role={state.game.roles.playerRoles[player]}
              onClick={() => performAction(['playerRoles', player])}
              selected={state.game.actions && state.game.actions.filter(action => action[0] === 'playerRoles' && action[1] === player).length > 0}
            />
        </div>
      ))}
      </div>
    </UIStyles>
    </React.Fragment>
  )
}

// {
//   "game": {
//     "deck": { },
//     "players": ["sadad", "wwww", "eee", "rrrr"]
//   },
//   "players": ["sadad", "wwww", "eee", "rrrr"],
//   "roomState": "started"
// }
