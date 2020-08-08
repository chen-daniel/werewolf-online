import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connectSocket } from '../utils/api';

export default function Room({ match, location }) {
    const room = match.params.roomID;
    const playerName = location.state && location.state.name;
    const socketRef = React.useRef();
    const [uiState, setUIState] = React.useState({});
    
    useEffect(() => {
        socketRef.current = connectSocket();
        socketRef.current.emit('join room', { room, playerName });
        socketRef.current.on('update state', state => {
            console.log(state);
            setUIState(state);
        });
    }, []);

    return (
        <div>
            <div>
                {!playerName && <Redirect to={'/'} />}
                This is room {room}.
                <br />
                Your name is {playerName}.
            </div>
            Players in room:
            {JSON.stringify(uiState.players)}
        </div>
    )
}