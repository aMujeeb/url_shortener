import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export async function GET(id: string) {
  const urls = await prisma.urlDetails.findMany();
  console.log("Urls is:", urls)
  //res.status(200).json(urls);

  return Response.json({ data: urls })
}


export async function POST(req : Request, res : Response) {
  const { original, shortened } = await req.json();
  //console.log(req.url);
  const hasSaved = await prisma.urlDetails.findMany({
    where: {
      original: {
        equals: original
      }
    }
  });

  let urlDetail;
  if(hasSaved.length > 0) {
    urlDetail = 'Already Exists';
    Response.json({ data: urlDetail })
  }

    urlDetail = await prisma.urlDetails.create({
      data: { original: original, shortened : shortened },
    });
  

  return Response.json({ data: urlDetail })
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

    /* export async function GET() {
      app.use(bodyParser.json());
      return app.use('/api/shortenurl', urlRoutes); 
    }

    */