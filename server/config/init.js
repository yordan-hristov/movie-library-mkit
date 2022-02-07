import { initDatabase } from "./mongoose.js";

export const initApplication = async () => {
    await initDatabase();
};