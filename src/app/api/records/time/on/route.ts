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

  const startTime = new Date();

  const record = new Record({
    type: "time",
    project: body.project,
    startTime: startTime,
  });

  try {
    await record.save();
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Failed to create record",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Record created",
    record: record,
  });
};

export { POST };
