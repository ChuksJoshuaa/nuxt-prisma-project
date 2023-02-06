
//we use userTransformer so as not to expose certain stuffs to the user
export const userTransformer = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
    }
}