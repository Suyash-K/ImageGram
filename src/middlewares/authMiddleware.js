import { response } from "express";
import { verifyJWT } from "../utils/jwt.js";
import { checkIfUserExists } from "../services/userService.js";

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers["x-auth-token"];

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }

    try{
        const response = verifyJWT(token);

        const doesUserExists = await checkIfUserExists(response.email);
        if(!doesUserExists) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        
        req.user = response;

        next();
    }catch (error){
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}
