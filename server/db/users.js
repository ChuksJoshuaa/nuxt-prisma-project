import { prisma } from "./index";
import { hashedPassword } from "./bcrypt"

export const createUser = async (userData) => { 
   
    const finalUserData = {
        ...userData,
        password: await hashedPassword(userData)
    };
    return prisma.user.create({
        data: finalUserData,
    });
};


export const getUserByUsername = async (username) => {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    })
}