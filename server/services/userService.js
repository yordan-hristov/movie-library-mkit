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

export const getUserFavorites = async (userId) => {
    const user = await User.findById(userId);

    return user.favorites;
}

export const updateUserFavorites = async (userId, movie) => {
    const user = await User.findById(userId);
    const favorites = user.favorites;

    const element = favorites.find(m => m.movieId == movie.id);
    const index = favorites.indexOf(element);

    index == -1 ? 
    favorites.push({movieId: movie.id, imageUrl: movie.imageUrl}) :
    favorites.splice(index, 1);

    await user.save();
}

export const getUserRatings = async (userId) => {
    const user = await User.findById(userId);

    return user.ratings;
}

export const updateUserRatings = async (userId, rating) => {
    const user = await User.findById(userId);
    const ratings = user.ratings;

    const element = ratings.find(r => r.movieId == rating.movieId);
    const index = ratings.indexOf(element);

    index == -1 ? 
    ratings.push({movieId: rating.movieId, rating: rating.rating}) :
    ratings.splice(index, 1);

    await user.save();
}

export const getUserNotes = async (userId) => {
    const user = await User.findById(userId);

    return user.notes;
}

export const createNote = async (userId, movieId, note) => {
    const user = await User.findById(userId);

    user.notes.push({movieId, note});

    await user.save();
}

export const deleteNote = async (userId, noteId) => {
    const user = await User.findById(userId);

    const note = user.notes.find(n => n._id == noteId);
    const index = user.notes.indexOf(note);

    user.notes.splice(index,1);

    await user.save();
}