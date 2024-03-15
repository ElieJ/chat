const db = require('../models/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        // Check if the name exists
        const userExists = await db.User.findOne({
            where: {name}
        });
        if (userExists != null) {
            return res.status(400).send('Name is already associated with an account');
        }

        console.log(req.body)
        await db.User.create({
            name,
            password: await bcrypt.hash(password, 5),
        });
        return res.status(200).send('Registration successful');
    } catch (err) {
        return res.status(500).send('Error in registering user');
    }
}

const signInUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await db.User.findOne({
            where: {name}
        });
        if (!user) {
            return res.status(404).json('name not found');
        }

        console.log(req.body)
        // Verify password
        
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect name and password combination');
        }

        // Authenticate user with jwt
        const token = jwt.sign({ id: user.id }, "key", {
            expiresIn: "24h"
        });
   
        res.status(200).send({
            id: user.id,
            name: user.name,
            accessToken: token,
            ok: true
        });
    } catch (err) {
        return res.status(500).send('Sign in error ' + req.body[0]);
    }
}

module.exports = {
    registerUser,
    signInUser
}