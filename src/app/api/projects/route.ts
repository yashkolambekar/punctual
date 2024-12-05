import Project from "@/app/mongoose/models/Project";
import { verifyToken } from "@/app/utils/auth";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { JwtBody } from "njwt";

const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  console.log("Authorization header:", authHeader);

  if (!authHeader) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const tokenVerification = await verifyToken(authHeader);
  console.log("Token verification result:", tokenVerification);

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
    return NextResponse.json(
      { message: "Error connecting to database" },
      { status: 500 }
    );
  }

  const body = await req.json();

  if (!body || !body.name || !body.description || !body.recordType) {
    return NextResponse.json({
      status: 400,
      message: "Please provide all the fields",
    });
  }

  const project = new Project({
    name: body.name,
    description: body.description,
    recordType: body.recordType,
    owner: tokenVerification.body.id,
  });

  console.log(project);

  try {
    await project.save();
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }

  if (!project) {
    return NextResponse.json(
      {
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Project created successfully",
  });
};

const GET = async (req: NextRequest) => {
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
    return NextResponse.json(
      { message: "Error connecting to database" },
      { status: 500 }
    );
  }

  let projects = null;

  try {
    projects = await Project.find({ owner: tokenVerification.body.id });
  } catch (e) {
    console.error(e);
  }

  console.log(projects);

  return NextResponse.json({
    projects,
  });
};

export { POST, GET };
