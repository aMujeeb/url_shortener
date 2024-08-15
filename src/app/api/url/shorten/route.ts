import { generateUUID } from "@/app/utils/stringutils";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
const BASE_URL = "short";

export async function GET() {
  const urls = await prisma.urlDetails.findMany();
  return Response.json({ data: urls })
}

export async function POST(req: NextRequest) {
  const { original, description } = await req.json();

  try {
    const fullShortUrl = await generateNonExistingUrl();

    const urlDetail = await prisma.urlDetails.create({
      data: { original: original, shortened: fullShortUrl, description: description },
    });

    return Response.json({ data: urlDetail, status_code: 201 })
  } catch (err) {
    return Response.json({ data: 'Error. Please Try Again' })
  }
}

async function generateNonExistingUrl(): Promise<string> {
  const shortUrl = BASE_URL + '/' + generateUUID();
  const hasSaved = await prisma.urlDetails.findMany({
    where: {
      shortened: {
        equals: shortUrl
      }
    }
  });
  if (hasSaved.length > 0)
    return await generateNonExistingUrl();
  else
    return shortUrl;
}


export async function DELETE(req: NextRequest) {
  const shortened = req.nextUrl.searchParams.get("shorturl");

  try {
    const containedItem = await prisma.urlDetails.delete({
      where: {
        shortened: shortened?.toString()
      }
    });

    let urlDetail;

    if (!containedItem) {
      urlDetail = 'Not Available or UnkNown error. Please try aagain..';
      return Response.json({ data: urlDetail, status_code: 401 })
    }

    urlDetail = 'Successfully Deleted...';
    return Response.json({ data: urlDetail, status_code: 201 })

  } catch (err) {
    return Response.json({ data: 'Error. Please Try Again' })
  }
}