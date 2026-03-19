import User from '../models/User.js';
import userValidationSchema from '../validators/userValidation.js';
import loginSchema from '../validators/loginValidation.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register

export const register = async (req, res) => {
    try {
        const result = userValidationSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.issues
            });
        }

        const data = result.data;

        const existingEmail = await User.findOne({ email: data.email.toLowerCase() });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await User.create({
            name: data.name,
            email: data.email.toLowerCase(),
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User Registered",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        console.error("Register error", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// login

export const login = async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data;

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const user = await User.findOne({ email: data.email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            message: "Login successful",
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }
            }
        });
    } catch (error) {
        console.error("Login error : ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}