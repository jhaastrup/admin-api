import Admin from '../../models/admin';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  { Request, Response } from "express";



const registerAdmin = async (req: Request, res: Response) => {
    try {
        // Extract admin details from request body
        const { fullName, email, password, phoneNumber } = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin record in the database
        const newAdmin = new Admin({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber
        });

        // Save the admin record to the database
        const savedAdmin = await newAdmin.save();
        

        // Generate JWT token
        const payload = {
            admin: {
                id: savedAdmin._id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }); 
        console.log({token});

        // Send the token in response
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const login = async (req: Request, res: Response) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check if admin with the provided email exists
        const admin = await Admin.findOne({ email });

        // If admin not found, return error
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, admin.password);

        // If password is not correct, return error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            admin: {
                id: admin._id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

        // Send token in response
        res.json({ token, adminId: admin._id, });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export{
    registerAdmin,
    login
};