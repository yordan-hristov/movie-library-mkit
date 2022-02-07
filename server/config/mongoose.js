import mongoose from 'mongoose';
import serverConfig from './server.js';

export const initDatabase = async () => {
    let result = await mongoose.connect(serverConfig.DB_CONNECTION);

    return result;
};