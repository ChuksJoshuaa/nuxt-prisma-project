import bcrypt from "bcryptjs";

export const hashedPassword = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return hashed;
};


export const comparePassword = async (password, userPassword) => {
    const doesthePasswordMatch = await bcrypt.compare(password, userPassword)
    return doesthePasswordMatch
}