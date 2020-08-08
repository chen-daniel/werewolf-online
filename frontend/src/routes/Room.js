import React from 'react';

export default function Room(props) {
    return (
        <div>
            This is room {props.match.params.roomID}
        </div>
    )
}