import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const shortened = req.nextUrl.searchParams.get("shorturl");

  try {
    const containedItem = await prisma.urlDetails.findFirst({
      where: {
        shortened: {
          equals: shortened?.toString()
        }
      }
    });

    let urlDetail;

    if (!containedItem) {
      urlDetail = 'Not Available or UnkNown error. Please try aagain..';
      return Response.json({ data: urlDetail, status_code: 404 })
    }
    urlDetail = containedItem?.original
    return Response.json({ data: urlDetail, status_code: 200 })

  } catch (err) {
    return Response.json({ data: 'Error. Please Try Again' })
  }
}