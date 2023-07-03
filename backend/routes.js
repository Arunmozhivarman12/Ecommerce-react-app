const Euse = require("./model");
const express = require("express")
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Authmiddle = (req, res, next) => {
    const authtoken = req.headers['authorization'];
    const token = authtoken && authtoken.split(' ')[1]
    if (token !== null) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                res.status(401).send(err);
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send();
    }
}



router.get('/',(req,res) =>{
    res.send('hello world')
})


router.get('/proute', Authmiddle, async (req, res) => {
   
    const user = await Euse.findOne({ _id: req.user.id }).select("-password")
    
    res.json(user);
})


router.post('/signin', async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 10);
        const newuser = await Euse.create({ name: name, password: password,email:email
         })
        await newuser.save();
        res.json(newuser);
    } catch (err) {
        console.log(err);
    }
});



router.post('/login', async (req, res) => {
    const user = await Euse.findOne({ email: req.body.email });

    if (user == null) {
        return res.status(400).send('user not found');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN);
            console.log(user._id)
            res.json({ accessToken: token });
        } else {
            res.status(401).send('wrong password');
        }
    } catch {
        res.status(500).send();
    }
})



module.exports = router