import express from 'express';
import cors from 'cors';
const app = express();
import swaggerUi from 'swagger-ui-express';
import serverConfig from './config/server.js';
import { initApplication } from './config/init.js';
import swaggerSpec from './config/swagger.js';
import routes from './routes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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