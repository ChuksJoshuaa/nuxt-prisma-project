import bcrypt from "bcryptjs";

export const hashedPassword = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return hashed;
};
