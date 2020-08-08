import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connectSocket } from '../utils/api';
import GameUI from '../components/GameUI';

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
    }, []);

    function startGame() {
        socketRef.current.emit('start game', { room });
    }

    function handleOptChange(e) {
        console.log('hi')
        console.log(e);
        socketRef.current.emit('toggle deck option', { room, option: e.target.value})
    }

    return (
        <div>
            <div>
                {!playerName && <Redirect to={'/'} />}
                This is room {room}.
                <br />
                Your name is {playerName}.
            </div>
            <div>
                Players in room:
                {JSON.stringify(uiState.players)}
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
            {uiState.roomState === 'started' && <GameUI state={uiState} />}
        </div>
    )
}