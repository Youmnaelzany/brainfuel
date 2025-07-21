import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import z from "zod";

import { S3 } from "@/lib/S3Client";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "File name is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "File size is required" }),
  isImage: z.boolean(),
});

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const decision = await aj.protect(request, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "man don't do that it's not good" },
        { status: 429 }
      );
    }
    const body = await request.json();
    const validation = fileUploadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const { fileName, contentType, size, isImage } = validation.data;
    const uniqueKey = `${uuidv4()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      ContentType: contentType,
      ContentLength: size,
      Key: uniqueKey,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, //url expires in 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate presigned url" },
      { status: 500 }
    );
  }
}
