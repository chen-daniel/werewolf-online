import React from 'react';
import styled from 'styled-components'
import Card from './Card'
const UIStyles = styled.div`
   margin-top: 5%;
  margin-right: 10%;
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
   grid-template-columns: 0.4fr 0.6fr;
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
margin-top: 1rem;
justify-content: center;
align-items: center;
color: #2b262c;

h4 {
  font-size: 18px;
  font-weight: 400;
  color: #2b262c;
}

`


export default function GameUI({ state, socketRef, playerName, room }) {
  const player = ['P1','P2','P3','P4']
  function submitConfirm() {
    socketRef.current.emit('submit confirm', { room, playerName });
  }
  return (
    <React.Fragment>
      <ModelStyles>
        <h4>
         <strong>Deck | </strong>
        {JSON.stringify(state.game.deck)}
        </h4>
        <h4>
        <strong>Narration | </strong>
        {state.narration}
        </h4>
        {!state.game.confirms[playerName] && <button onClick={submitConfirm}>Confirm</button>}
      </ModelStyles>
    <UIStyles>
      <div className="deck"> 
        <Card deck={true}/>
        <Card deck={true}/>
        <Card deck={true}/>
      </div>
        <div className="me"> 
          <Card me={true} role={state.game.roles.playerRoles[playerName]}/>
        </div>
      <div className="otherPlayers">
        {state.players.filter(player => player !== playerName).map((player) => (
         <div className="flx">
          <h4>{player}</h4>
            <Card player={true} />
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
