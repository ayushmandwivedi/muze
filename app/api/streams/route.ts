import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createStringSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = createStringSchema.safeParse(await req.json());
    prismaClient.stream.create({
      user,
    });
  } catch (e) {
    return NextResponse.json(
      {
        msg: "Error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}
