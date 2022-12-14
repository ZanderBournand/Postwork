import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import mongoose from "mongoose";

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

export const signinGoogle = async (req, res) => {

    const { email, given_name, family_name } = req.body

    try {
        
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "10h"})

            res.status(200).json({ result: existingUser, token })

            return

        }

        const numberExistingNames = await User.countDocuments({ $and: [{ firstName: given_name }, { lastName: family_name }] })

        const urlId = (numberExistingNames > 0) ? given_name.toLowerCase() + '-' + family_name.toLowerCase() + '-' + numberExistingNames : given_name.toLowerCase() + '-' + family_name.toLowerCase()
        
        const result = await User.create({ email, firstName: given_name, lastName: family_name, displayName: `${given_name} ${family_name}`,  urlId: urlId, photoUrl: null });

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "10h"})

        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: 'Somthing went wrong.' })
    }

}

export const signup = async (req, res) => {
    
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    
    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists."})

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match."})

        const hashedPassword = await bcrypt.hash(password, 12)

        const numberExistingNames = await User.countDocuments({ $and: [{ firstName }, { lastName }] })

        const urlId = (numberExistingNames > 0) ? firstName.toLowerCase() + '-' + lastName.toLowerCase() + '-' + numberExistingNames : firstName.toLowerCase() + '-' + lastName.toLowerCase()

        const result = await User.create({ email, password: hashedPassword, firstName, lastName, displayName: `${firstName} ${lastName}`,  urlId: urlId, photoUrl: null });

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "10h"})

        res.status(200).json({ result, token })

    } catch (error) {
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

export const getUserProfile = async (req, res) => {
    
    const { id } = req.params;

    try {
        const user = await User.find({ urlId: id})
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const updateUser = async (req, res) => {

    const { id } = req.params;
    const { photoUrl, location, about, recruiter } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    try {
        const user = await User.findById(id)
        user.location = location
        user.photoUrl = photoUrl
        user.about = about
        user.recruiter = recruiter
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const updateUserAbout = async (req, res) => {

    const { id } = req.params;
    const changes = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    try {
        const user = await User.findById(id)
        user.about = changes.about
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}