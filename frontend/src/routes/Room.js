import React from 'react';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';

export default function Room({ match, location }) {
    const playerName = get(location, 'state.name');
    return (
        <div>
            {!playerName && <Redirect to={'/'} />}
            This is room {match.params.roomID}.
            <br />
            Your name is {playerName}.
        </div>
    )
}