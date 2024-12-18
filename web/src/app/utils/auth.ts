import jwt, { JSONMap } from "njwt";
import bcrypt from "bcryptjs";

const hashPassowrd = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async(plainPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = async (body: JSONMap) => {
  const token = jwt.create(body, process.env.JWT_SECRET as string, "HS256");
  token.setExpiration(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  return token.compact();
}

interface ITOkenBody {
  body: {
    id: string;
  }
}

const verifyToken = async (token: string) => {

  if(token.startsWith("Bearer ")){
    token = token.slice(7, token.length);
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string, "HS256") as unknown as ITOkenBody;
    return verifiedToken;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export { hashPassowrd, verifyPassword, generateToken, verifyToken };