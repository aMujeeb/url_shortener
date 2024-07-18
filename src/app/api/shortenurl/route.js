import { PrismaClient } from "@prisma/client";
import { url } from "inspector";

const prisma = new PrismaClient();

export async function GET(res) {
  const urls = await prisma.urlDetails.findMany();
  console.log("Urls is:", urls)
  //res.status(200).json(urls);

  return Response.json({ data: urls })
}

export async function POST(req, res) {
  const { original, shortened } = req.body;

  const urlDetail = await prisma.urlDetails.create({
    data: { original, shortened },
  });

  res.status(201).json(urlDetail);
}

/*export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { original, shortened } = req.body;

      const urlDetail = await prisma.urlDetails.create({
        data: { original, shortened },
      });

      res.status(201).json(urlDetail);

    } else if (req.method === 'GET') {
      const urls = await prisma.urlDetails.findMany();
      res.status(200).json(urls);
      
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } */