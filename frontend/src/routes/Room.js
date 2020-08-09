import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connectSocket } from '../utils/api';
import GameUI from '../components/GameUI';

const ModelStyles = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
color: #2b262c;
margin-top: 0;

h1 {
    margin: 0 0 0.8rem 0;
    font-size: 2.5rem;
    color: hotpink;
}
h2 {
  text-align: center;
  font-weight: 600;
  color: #2b262c;
  margin: 0.5rem;
}
h4 {
  font-size: 18px;
  font-weight: 400;
  color: #2b262c;
  margin-top: 0;
  margin-bottom: 0;
}
 button {
    font-size: 1.3rem;
    background: none;
    border: 4px solid hotpink;
    border-radius: 10px;
    width: 9rem;
    height: 3rem;
    margin-top: 2rem;
    font-weight: 600;
    color: hotpink;
    cursor: pointer;
  }
`;

export default function Room({ match, location }) {
    const room = match.params.roomID;
    const playerName = location.state && location.state.name;
    const socketRef = React.useRef();
    const [uiState, setUIState] = React.useState({});
    
    useEffect(() => {
        if (playerName) {
            socketRef.current = connectSocket();
            socketRef.current.emit('join room', { room, playerName });
            socketRef.current.on('update state', state => {
                console.log(state);
                setUIState(state);
            });
        }
    }, [room, playerName]);

    function startGame() {
        socketRef.current.emit('start game', { room });
    }

    function handleOptChange(e) {
        socketRef.current.emit('toggle deck option', { room, option: e.target.value})
    }

    return (
      <div>
        <ModelStyles>
            <div>
                {!playerName && <Redirect to={'/'} />}
                 <h1>
                 Room: {room}
                </h1>
                <h2>
                 - {playerName} -
                </h2>
            </div>
            <div>
              <h4>
              <strong>
                Players | 
              </strong>
              {JSON.stringify(uiState.players)}
            </h4>
            </div>
            {uiState.roomState !== 'started' && uiState.deckOpts && (
              <div>
                    <ul>
                        {Object.keys(uiState.deckOpts).map((opt, i) => (
                          <li key={i}>
                            <input 
                                type="radio" 
                                value={opt} 
                                checked={uiState.deckOpts[opt]} 
                                onClick={handleOptChange}
                                onChange={(e) => console.log(e)}
                                /> {opt}
                        </li>))}
                    </ul>
                </div>
            )}
            {uiState.roomState === 'ready' && <button onClick={startGame}>Start Game</button>}
          </ModelStyles>
          {uiState.roomState === 'started' && <GameUI state={uiState} playerName={playerName} room={room} socketRef={socketRef}/>}
        </div>
    )
}