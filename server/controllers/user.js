import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "10h"})

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: 'Somthing went wrong.' })
    }

}  


export const signup = async (req, res) => {
    
    const { email, password, displayName, photoUrl, recruiter } = req.body;
    
    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists."})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, displayName, recruiter, photoUrl, about: null });

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "10h"})

        res.status(200).json({ result, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Somthing went wrong.' })
    }

}

export const getUser = async (req, res) => {

    const { id } = req.params;

    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}