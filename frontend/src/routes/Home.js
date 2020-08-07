import React from 'react';
import { createRoom } from '../utils/api';

export default function Home() {
    return (
      <div className="App">
        <button onClick={async () => alert(JSON.stringify(await createRoom())) }>CREATE ROOM</button>
        <button>JOIN ROOM</button>
      </div>
    )
  }