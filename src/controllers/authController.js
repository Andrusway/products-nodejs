import createHttpError from 'http-errors';
import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import {setSessionCookie, createSession} from '../services/auth.js'

export const registerUser = async (req, res) =>{
    const {name, email, password} = req.body;
    const isUserExist = await User.findOne({email});
    if (isUserExist) {
        throw createHttpError(409, 'Email in use')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name, email, password:hashedPassword
    });

    const newSession = await createSession(newUser._id);
    setSessionCookie(res, newSession);

    res.status(201).json(newUser);
}