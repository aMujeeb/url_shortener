import { PrismaClient } from "@prisma/client";
import { STATUS_CODES } from "http";

const prisma = new PrismaClient();

export async function POST(req : Request, res : Response) {
    const { shortened } = await req.json();
    console.error('ShortURL:', shortened);
    try {
        const containedItem = await prisma.urlDetails.findFirst({
          where: {
            shortened: {
              equals: shortened
            }
          }
        });
    
        let urlDetail;
        console.error('Length:', containedItem?.original);
        if(!containedItem) {
            urlDetail = 'Not Available or UnkNown error. Please try aagain..';
            return Response.json({ data: urlDetail, status_code : 401 })
        }
        console.error('Original Data:', containedItem?.original);
            urlDetail = containedItem?.original
            return Response.json({ data: urlDetail, status_code : 201 })
       
      } catch(err) {
        return Response.json({ data: 'Error. Please Try Again' })
      }
}