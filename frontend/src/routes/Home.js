import React from 'react';
import { createRoom, joinRoom } from '../utils/api';
import { Redirect } from 'react-router-dom';

export default function Home() {
    const [nameInput, setNameInput] = React.useState('');
    return (
    <div className="App">
        <div>
            Join as: 
            <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </div>
        <CreateOrJoinRoom name={nameInput} />
    </div>
    );
}

function CreateOrJoinRoom({ name }) {
    const [viewState, setViewState] = React.useState(0);
    const [roomCodeInput, setRoomCodeInput] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);
    function handleJoinRoom() {
        if (name.length > 0 && roomCodeInput.length === 4) {
            joinRoom(name, roomCodeInput)
                .then(data => {
                    setRedirect(`/room/${data.room}`);
                });
        }
    }
    function handleCreateRoom() {
        if (name.length > 0) {
            createRoom(name)
                .then(data => {
                    setRedirect(`/room/${data.room}`);
                });
        }
    }
    function showView(state) {
        switch(state) {
            case 0:
                return (
                    <React.Fragment>
                        <button onClick={handleCreateRoom}>CREATE ROOM</button>
                        OR 
                        <button onClick={() => setViewState(1)}>JOIN ROOM</button>
                    </React.Fragment>
                )
            case 1:
                return (
                    <React.Fragment>
                        Room code:
                        <input type="text" value={roomCodeInput} onChange={(e) => setRoomCodeInput(e.target.value)} />
                        <button onClick={handleJoinRoom}>Join Room</button>
                    </React.Fragment>
                )
        }
    }
    return (
    <div>
        {showView(viewState)}
        {redirect && <Redirect to={redirect} />}
    </div>
    );
}