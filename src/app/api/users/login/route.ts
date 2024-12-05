import User from "@/mongoose/models/User";
import { generateToken, verifyPassword } from "@/app/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const POST = async (req: NextRequest) => {
    const body = await req.json();

    if (!body.email || !body.password) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    try{
        await mongoose.connect(process.env.MONGO_URI as string);
    }catch(e){
        console.error(e);
        return NextResponse.json({ message: "Internal Server Error" }, { status:500 });
    }

    let user = null;

    try{
        user = await User.findOne({email : {$eq: body.email}});
    }catch(e){
        console.error(e);
    }

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if(!(await verifyPassword(body.password, user.password))) {
        return NextResponse.json({ message: "Incorrect Credentials" }, { status: 401 });
    }

    const token: string = await generateToken({id: user._id});

    return NextResponse.json({ message: "Login successful", token: token });

}

export {POST};