import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const ytRegex = new RegExp("https://www.youtube.com/watch?v=[w-]+&t=d+s");

const createStringSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  const result = createStringSchema.safeParse(await req.json());
  if (!result.success) {
    return NextResponse.json(
      {
        msg: "Error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
  const isYT = ytRegex.test(result.data.url);
  if (!isYT) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 411,
      }
    );
  }

  const extractedId = result.data.url.split("?v=")[1];
  await prismaClient.stream.create({
    user: result.data.creatorId,
    url: result.data.url,
    extractedId: extractedId,
    type: "Youtube",
  });
}
