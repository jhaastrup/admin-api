import express, { Express, Request, Response } from "express";
import Parent from '../../models/student';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

interface Child {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    dateOfBirth: Date;
    profilePicture?: string;
}


// Controller function to create a new student account
const createAccount = async (req: Request, res:Response) => {
    try {
        // Extract parent and children information from the request body
        const { parent, children } = req.body;

        // Validate the incoming data

        // Hash the password for each child
        const hashedChildren = await Promise.all(children.map(async (child: Child) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(child.password, salt);
            return {
                firstName: child.firstName,
                lastName: child.lastName,
                username: child.username,
                password: hashedPassword,
                email: child.email,
                dateOfBirth: child.dateOfBirth,
                profilePicture: child.profilePicture
            };
        }));

        // Create a new parent record in the database
        const newParent = new Parent({
            firstName: parent.firstName,
            lastName: parent.lastName,
            phoneNumber: parent.phoneNumber,
            email: parent.email,
            children: hashedChildren
        });

        // Save the parent record to the database
        const savedParent = await newParent.save();

        // Generate an authorization token
        const payload = {
            parent: {
                id: savedParent._id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
        console.log({token});

        // Send the authorization token as a response
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



//function to login
const login = async (req:Request, res:Response) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find the parent containing the child with the provided email
        const parent = await Parent.findOne({ 'children.email': email }); 

        // If parent not found, return error
        if (!parent) {
            return res.status(400).json({ message: 'Invalid credentials here' });
        }

        // Find the child with the provided email
        const child = parent.children.find(child => child.email === email);

        // If child not found, return error
        if (!child) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, child.password);

        // If password is not correct, return error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            parent: {
                id: parent._id,
                childId: child._id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

        // Send token in response along with success message
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


export{
    createAccount, 
    login
}


module.exports = {
    createAccount,
    login
};
