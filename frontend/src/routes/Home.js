import React from 'react';
import styled from 'styled-components'
import { createRoom, joinRoom } from '../utils/api';
import { Redirect } from 'react-router-dom';

const HomeStyles = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  color: #feeeda;
  .logo {
    margin: 0 0 1rem 0;
    font-size: 5rem;
  }
  button {
    font-size: 1.3rem;
    background: none;
    border: 4px solid #feeeda;
    border-radius: 10px;
    width: 15rem;
    height: 4rem;
    margin-top: 2rem;
    font-weight: 600;
    color: #feeeda;
    cursor: pointer;
  }

  .flx {
    display: flex;
    flex-flow: column;
    justify-items: center;
    align-items: center;
  }
`;

const InputStyle = styled.input`
  margin-top: 1rem;
  width: 15rem;
  height: 3rem;
  border: 3px solid #feeeda;
  border-radius: 7px;
  color: #feeeda;
  font-size: 1.3rem;
  padding: 0 0.4rem;
  text-align: center;
  background: transparent;
`

export default function Home() {
    const [nameInput, setNameInput] = React.useState('');
    return (
      <HomeStyles className="App">
        <h1 className="logo">Werewolf Online</h1>
        <div>
            <InputStyle type="text" value={nameInput} placeholder="Join as" onChange={(e) => setNameInput(e.target.value)} />
        </div>
        <CreateOrJoinRoom name={nameInput} />
    </HomeStyles>
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
                    setRedirect({ pathname: `room/${data.room}`, state: { name }});
                });
        }
    }
    function handleCreateRoom() {
        if (name.length > 0) {
            createRoom(name)
                .then(data => {
                    setRedirect({ pathname: `room/${data.room}`, state: { name }});
                });
        }
    }
    function showView(state) {
        switch(state) {
            case 0:
                return (
                    <div className="flx">
                    <button onClick={handleCreateRoom}>CREATE ROOM</button>
                        <button onClick={() => setViewState(1)}>JOIN ROOM</button>
                    </div>
                )
            case 1:
                return (
                    <div className="flx">
                        <InputStyle type="text" value={roomCodeInput} placeholder="Room Code" onChange={(e) => setRoomCodeInput(e.target.value)} />
                        <button onClick={handleJoinRoom}>Join Room</button>
                    </div>
                )
            default:
                break;
        }
    }
    return (
    <div>
        {showView(viewState)}
        {redirect && <Redirect to={redirect} />}
    </div>
    );
}