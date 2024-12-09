import { verifyToken } from "@/app/utils/auth";
import Project from "@/mongoose/models/Project";
import Record from "@/mongoose/models/Record";
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

  if (!body || !body.project) {
    return NextResponse.json(
      {
        message: "Please provide all the fields",
      },
      { status: 400 }
    );
  }

  const project = await Project.findById(body.project);

  if (!project) {
    return NextResponse.json(
      {
        message: "Project not found",
      },
      { status: 404 }
    );
  }

  if (project.owner.toString() !== tokenVerification.body.id) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  if (!body.value) {
    return NextResponse.json(
      {
        message: "Please provide all the fields",
      },
      { status: 400 }
    );
  }

  if (typeof body.value !== "number") {
    return NextResponse.json(
      {
        message: "Value must be a number",
      },
      { status: 400 }
    );
  }

  const record = await Record.create({
    project: body.project,
    type: "numeric",
    numericValue: body.value,
    createdAt: new Date(),
  });

  if (!record) {
    return NextResponse.json(
      {
        message: "Error creating record",
      },
      { status: 500 }
    );
  }

  project.numericValue = body.value;
  project.lastUpdate = new Date();

  try{
    await project.save();
  }catch(e){
    console.error(e);
    return NextResponse.json(
      { message: "Error saving project" },
      { status: 200 }
    );
  }
  
  return NextResponse.json({ message: "Suceesfully saved"});
};

export { POST };
