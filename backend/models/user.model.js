// const mongoose = require('mongoose');
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: "",
    },
    searchHistory: {
        type: Array,
        default: []
    }
});

export const User = mongoose.model("User", userSchema)

