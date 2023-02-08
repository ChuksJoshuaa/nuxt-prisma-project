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


export const getUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export const getUserById = (id) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    })
}