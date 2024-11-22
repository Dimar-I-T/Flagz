const express = require("express");
require("dotenv").config();
const port = process.env.port;
const cors = require('cors');
const bcrypt = require('bcrypt')
const app = express();
const User = require('./src/models/user_data.model');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const f = require('./src/f');

require("./src/config/mongo.config").connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: ["https://flagz-game.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
}));

const verifyUs = (req, res, next) => {
    const token = req.cookies.token;
    if (token){
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }else{
        return res.json("No token");
    }
}

app.get('/api', verifyUs, async (req, res) => {
    return res.json("Success");
})

app.get('/api/f', async (req, res) => {
    let ar = [];
    let hasil = [];
    for (let i = 0; i < f.length; i++){
        ar.push(i);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    while (ar.length > 0){
        let r = getRandomInt(ar.length);
        hasil.push({"country": f[ar[r]].country, "flag": f[ar[r]].flag});
        ar.splice(r, 1);
    }

    return res.json(hasil);
})

app.get('/api/home', verifyUs, async (req, res) => {
    try{
        const u_id = req.user;
        const user = await User.findById(u_id.id);
        
        return res.json(user);
    }catch(err){
        return res.json({success: false, message: err.message});
    }
})

app.post('/api/home', verifyUs, async (req, res) => {
    try{
        const u_id = req.user;
        const user = await User.findById(u_id.id);
        const {score} = req.body
        if (user.top_score < score){
            user.top_score = score;
        }

        user.total_plays += 1;
        await user.save();
        return res.json(user);
    }catch(err){
        return res.json({success: false, message: err.message});
    }
})

app.post('/api/cek', verifyUs, async (req, res) => {
    try{
        const userid = req.user;
        const user = await User.findById(userid.id);
        const {answer, dataF} = req.body;
        let benar = 0;
        let jawaban = "", jawabanAsli;
        if (typeof dataF == "object"){
            jawabanAsli = dataF[0];
            for (let i of dataF){
                if (answer.toLowerCase() === i.toLowerCase()){
                    jawaban = i;
                    benar = 1;
                    break;
                }
            }
        }else{
            jawabanAsli = dataF;
            if (answer.toLowerCase() === dataF.toLowerCase()){
                jawaban = dataF;
                benar = 1;
            }
        }
        
        console.log(answer);
        if (benar == 1){
            if (!user.flags.includes(jawaban)){
                user.flags.push(jawaban);
            }

            user.total_flags = user.flags.length;
            
            console.log(user.flags);
            await user.save();
            return res.json("1");
        }else{
            return res.json(jawabanAsli);
        }
    }catch(err){
        console.log(err.message);
        return res.json(err.message);
    }
})

app.post('/api/login', async (req, res) => {
    try{
        const {valUser, valPass} = req.body;
        const user = await User.findOne({username: valUser});
        if (user){
            const bisa = await bcrypt.compare(valPass, user.password);
            if (bisa){
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true, 
                    sameSite: "lax"
                });

                console.log(token);
                res.status(201).json({success: true, message: "Successfully logged in!"});
            }else{
                res.status(201).json({success: false, message: "Incorrect password!"});
            }
        }else{
            res.status(201).json({success: false, message: "Username doesn't exist!"});
        }
    }catch(err){
        res.status(500).json({success: false, message: err.message});
    }
})

app.post('/api/register', async (req, res) => {
    try{
        const {valUser, valPass} = req.body;
        const hashed = await bcrypt.hash(valPass, 10);
        const user = await User.findOne({username: valUser});
        if (user != null){
            res.status(201).json({success: false, message: "Username is already used"});
        }else{
            const new_user = await new User({username: valUser, password: hashed});
            await new_user.save();

            res.status(201).json({success: true, message: "Successfully created user", username: valUser});
        }
    }catch (error){
        res.status(500).json({success: false, message: error.message});
    }
});

app.listen(5000);