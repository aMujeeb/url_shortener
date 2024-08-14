import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";


const prisma = new PrismaClient();

export async function GET() {
  const urls = await prisma.urlDetails.findMany();
  return Response.json({ data: urls })
}

export async function POST(req: NextRequest) {
  const { original, shortened, description } = await req.json();

  try {
    const hasSaved = await prisma.urlDetails.findMany({
      where: {
        shortened: {
          equals: shortened
        }
      }
    });

    let urlDetail;
    if (hasSaved.length > 0) {
      urlDetail = 'Already Exists';
      return Response.json({ data: urlDetail, status_code: 401 })
    }

    urlDetail = await prisma.urlDetails.create({
      data: { original: original, shortened: shortened, description: description },
    });

    return Response.json({ data: urlDetail, status_code: 201 })
  } catch (err) {
    return Response.json({ data: 'Error. Please Try Again' })
  }
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