import mongoose from "mongoose";
import { createUser, findUserByEmail } from "../repositories/userRepository.js"
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/jwtUtils.js";

export const signupUserService = async (user) => {
    try {
        const newUser = await createUser(user);

        return newUser;
    } catch (error) {
        if(error.name === "MongoServerError" && error.code === 11000) {
            throw {
                status: 400,
                message: "User with the same email or username already exists"
            }
        }
        throw error;
    }
}

export const signinUserService = async (userDetails) => {
    try {
        const user = await findUserByEmail(userDetails.email);
        if(!user) {
            throw {
                status: 404,
                message: "User not found"
            }
        }

        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);

        if(!isPasswordValid) {
            throw {
                status: 401,
                message: "Invalid password"
            }
        }

        const token = generateJwtToken({ email: user.email, _id: user._id, username: user.username });

        return token;


    } catch (error) {
        throw error;
    }
}