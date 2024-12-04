const jwt = require("njwt");
const bcrypt = require("bcryptjs");

const hashPassowrd = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async(plainPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = async (body: any) => {
  const token = jwt.create(body, process.env.JWT_SECRET as string, "HS256");
  token.setExpiration(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  return token.compact();
}

const verifyToken = async (token: string) => {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string, "HS256");
  return verifiedToken.body;
}

export { hashPassowrd, verifyPassword, generateToken, verifyToken };