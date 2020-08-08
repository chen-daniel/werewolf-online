import axios from 'axios';
import config from '../config';
import io from 'socket.io-client';

export function createRoom(name) {
    return axios.post(`${config.api}/create-room`, { name })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return {};
        });
}

export function joinRoom(name, room) {
    return axios.post(`${config.api}/join-room`, {
        name, room
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return {};
        })
}

export function connectSocket() {
    return io.connect(config.api);
}