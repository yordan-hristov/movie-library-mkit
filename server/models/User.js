import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [String],
    ratings: [{
        movieId: { type: String },
        rating: { type: String }
    }],
    notes: [{
        movieId: { type: String },
        note: { type: String }
    }]
});

const User = mongoose.model('User', userSchema);

export default User;