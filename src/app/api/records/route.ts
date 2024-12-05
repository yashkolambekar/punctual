import { verifyToken } from "@/app/utils/auth";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const tokenVerification = await verifyToken(authHeader);

  if (!tokenVerification) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error connecting to database" },
      { status: 500 }
    );
  }

  const body = await req.json();

    if (!body || !body.type || !body.project ) {
        return NextResponse.json({
        status: 400,
        message: "Please provide all the fields",
        });
    }

    

};

export { POST };
