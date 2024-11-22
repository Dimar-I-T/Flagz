const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    top_score:{
        type: Number,
        default: 0
    },

    total_flags:{
        type: Number,
        default: 0
    },

    total_plays:{
        type: Number,
        default: 0
    },

    flags:{
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("UserData", UserSchema);