import bcrypt from "bcryptjs";

export   async function encryptPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  return String(hashedPassword);
}

export const comparePassword = async(password,hashedPassword)=>{
   const isMatch = await bcrypt.compare(password,hashedPassword);
   return isMatch ;
}
