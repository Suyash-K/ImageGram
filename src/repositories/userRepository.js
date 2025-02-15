import User from "../schema/user";

export const findUserByEmail = async (email) => {
    try {
        const user= await User.findOne({ email });
        return user;
    } catch (error) {
        console.log(error);
    }
};