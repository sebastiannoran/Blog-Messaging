const express = require("express");
const app = express();
const port = 4000;
const bcrypt = require('bcryptjs'); // password hashing
const session = require('express-session');
const {Comment, Post, User} = require('./models'); // import models


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Blogging Platform")
});

app.post('/signup', async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(201).json({
            message: 'User created!',
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        if (error === "SequelizeValidationError") {
            return res.status(422).json({errors: error.errors.map((e) => e.message)});
        }
        res.status(500).json ({
            message: "Error occured while created user",
            error: error,
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})