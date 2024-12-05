// const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

import { NextRequest, NextResponse } from "next/server";

//     if (!id) {
//         return NextResponse.json(
//         {
//             message: "ID not provided",
//         },
//         { status: 400 }
//         );
//     }

const POST = async (req: NextRequest) => {
    console.log(req);
    return NextResponse.json({ message: "Hello" });
}

export { POST };