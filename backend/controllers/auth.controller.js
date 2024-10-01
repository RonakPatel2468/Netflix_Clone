import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie, clearTokenAndLogout } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        console.log(req.body); // Log the request body
        const { username, email, password } = req.body;

        // Validate that all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Email validation logic to ensure it contains '@'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email address" });
        }

        // Check if the user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username or email already exists" });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        // Set a default image if none is provided
        const defaultImage = "/images/default-profile.jpg"; // Static image path

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
            image: defaultImage,    
        });

        // Save the user to the database
        await newUser.save();

        // Generate token and set it as a cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Return a 201 response without the password
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                image: newUser.image,
            }
        });

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function signin(req, res) {
    try {
        const { email, password } = req.body;

        // Validate that both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Compare the password with the hashed password in the database
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Generate a token and set it as a cookie
        generateTokenAndSetCookie(user._id, res);

        // Return 201 response without the password
        return res.status(201).json({
            success: true,
            message: "User signed in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                image: user.image,
            }
        });

    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


export async function logout(req, res) {
    try {
        // Clear the JWT token using the reusable function
        clearTokenAndLogout(res);

        // Send a response indicating the user has been logged out
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
