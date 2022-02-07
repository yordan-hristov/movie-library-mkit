import User from '../models/User.js';
import * as bcrypt from 'bcrypt';

export const createUser = async ({ email, password }) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword });

    return user;
};

export const getUser = async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (await bcrypt.compare(password, user.password)) {
        return user;
    }else {
        throw new Error();
    }
}