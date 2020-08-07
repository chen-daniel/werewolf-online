import axios from 'axios';
import config from '../config';

export function createRoom() {
    return axios.get(`${config.api}/create-room`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return {};
        });
}