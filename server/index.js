import express from 'express';
import cors from 'cors';
const app = express();

import serverConfig from './config/server.js';
import { initApplication } from './config/init.js';
import routes from './routes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World')
})

initApplication()
    .then(() => {
        app.listen(serverConfig.PORT, () => {
            console.log('SERVER CONNECTED ON PORT: ' + serverConfig.PORT);
        })
    })
    .catch((err) => {
        console.error('INIT ERROR: ' + err);
    });