// Import necessary modules and schemas
import express, { Request, Response  } from 'express';
import Course from '../../models/courses';
import jwt from 'jsonwebtoken'
import moment from 'moment';

const createCourse = async (req: Request, res: Response) => {
    try {
        // Extract course information from the request body
        const { name, video_url, description, status } = req.body;

        // Get the admin ID and token from the request headers
        const adminId = req.headers['x-admin-id'];
        const token = req.headers.authorization;
        console.log({token})

        // Check if admin ID and token are provided
        if (!adminId || !token) {
            return res.status(400).json({ message: 'Admin ID and token are required' });
        }

        // Verify the token and extract the admin ID from it
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { admin: { id: string } };
        const decodedAdminId = decodedToken.admin.id;

        // Check if the extracted admin ID matches the one from headers
        if (decodedAdminId !== adminId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Create a new course record in the database
        const newCourse = new Course({
            name,
            video_url,
            description,
            admin: adminId,
            status,
            date_created: moment().format()
        });

        // Save the course record to the database
        const savedCourse = await newCourse.save();

        // Send success response
        res.status(201).json(savedCourse);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}; 

const getAllCourses = async (req: Request, res: Response) => {
    try {
        // Fetch all courses from the database
        const courses = await Course.find();
        console.log({courses});

        // Send the courses as a response
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getCourseById = async (req: Request, res: Response) => {
    try {
        // Extract the course ID from the request parameters
        const { id } = req.params;

        // Find the course in the database by its ID
        const course = await Course.findById(id);

        // Check if the course exists
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Send the course as a response
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

export { createCourse, getAllCourses, getCourseById };
