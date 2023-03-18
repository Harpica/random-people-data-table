import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getData } from './controllers/data';
import { readDatasetsLinesNumber } from './utils/datasetsLinesRead';

dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 5000;
const DATASETS_PATH = path.join(__dirname, 'datasets');

readDatasetsLinesNumber(DATASETS_PATH).then((linesNumbers) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/data/:region', (req, res, next) =>
        getData(req, res, next, linesNumbers, DATASETS_PATH)
    );

    app.listen(PORT, () => {
        console.log('Listening to', PORT);
    });
});
