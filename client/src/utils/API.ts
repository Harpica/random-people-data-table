import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'localhost:5000';

export class Api {
    constructor() {}

    getData(region: string, errNumber: number, seed: string, page: number) {
        return axios.post(`http://${BASE_URL}/data/${region}`, {
            data: {
                errNumber: errNumber,
                seed: seed,
                page: page,
            },
        });
    }
}

export const api = new Api();
