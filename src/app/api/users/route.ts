import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@app/mongoose/models/User"; // Import the existing User model
import { generateToken, hashPassowrd } from "@/app/utils/auth";

const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (e) {
    return NextResponse.json(
      { message: "Error connecting to database" },
      { status: 500 }
    );
  }

  // Remove the redefinition of the User model
  const userItem = new User({
    name: body.name,
    email: body.email,
    password: await hashPassowrd(body.password),
  });

  try {
    await userItem.save();
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error saving user" }, { status: 500 });
  }

  const token: string = await generateToken({id: userItem._id});

  return NextResponse.json({ message: "User created", token: token });
};

export { POST };
