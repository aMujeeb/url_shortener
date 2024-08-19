This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

## Setting up the Database and required infrastructure.

1. Install Docker: Download and install Docker on your system.
2. Pull PostgreSQL Image: Open the terminal. Retrieve the PostgreSQL Docker image from Docker Hub using the command \
   docker pull postgres

3. Run PostgreSQL Container: Create and run a Docker container with PostgreSQL using the following command

  docker run -d \
    --name url-shortener \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=postgrespwd \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v ${PWD}/postgres_data:/var/lib/postgresql/data \
    postgres:16
    
  This command sets up a PostgreSQL container, specifying the username, password, port, and data volume. \
  'url-shortener' will be the data base name. 

4. Run docker PostgreSQL container.

## Install Prisma CLI

1. Install Node.js (If not installed): Ensure you have Node.js installed on your system. You can download it from the official website: Node.js.
2. Create a New Project (if needed): Navigate to your project directory or create a new one. If you’re starting a new project, initialize it with npm:
3. Install Prisma CLI Locally:
   Run the following command to install Prisma CLI as a development dependency in your project:
   
   npm install pg
   npm install prisma --save-dev

4. Initialize Prisma
   If you don't have a prisma directory with your schema, you can initialize it by running:

   npx prisma init

5. Set Up Database Connection:
   Configure your database connection in the datasource block within your schema.prisma file.
   Specify the database provider (e.g., PostgreSQL, MySQL, SQLite) and connection details (host, port, username, password, database name).
  <--
    generator client {
      provider = "prisma-client-js"
    }
    
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

   -->

6. Define Data Models:
   Create data models in your schema.prisma file. Define entities, relationships, and fields

   Example:
     model User {
        id       Int      @id @default(autoincrement())
        username String   @unique
        email    String   @unique
        posts    Post[]
      }

7. Generate Prisma Client:
   Run the following command to generate the Prisma Client based on your data models

   npx prisma generate

8. Schema Migrations(If migrations have to be done during development):
   Update your Prisma schema (usually in the schema.prisma file) to reflect the desired changes. Add or modify models, fields, or relationships as needed.

   npx prisma migrate dev --< name of migration> init
   npx prisma generate
   


 ## Running the Development Server
  
  1. Install Dependencies
     First, install the project dependencies:
  
      npm install
  
  2. Start the development server:
  
      npm run dev
  
  3. Open http://localhost:3000 with your browser to see the result.
  
  You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.
  
  This project uses next/font to automatically optimize and load Inter, a custom Google Font.
  
  Learn More
  To learn more about Next.js, take a look at the following resources:
  
  Next.js Documentation - learn about Next.js features and API.
  Learn Next.js - an interactive Next.js tutorial.
  You can check out the Next.js GitHub repository - your feedback and contributions are welcome!
  
  ## Deploy on Vercel:
    The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

      How to Deploy
    1. Push code into Github
    2. Looking for a managed platform. (Eg: VPS)
    3. Change environmental variables accordingly (Eg : Db file path)
    4. Adding required script attribute changes in package.json to accommodate PRISMA
      	Scripts :{
      		“Build”: “prisma db push && next build”
      	}
    
    Install node at VPS module
    Configure nginx public address to route into localhost:3000

  Check out our Next.js deployment documentation for more details.
  
  This README covers the necessary steps to set up Docker, Prisma, and run the development server for your Next.js project. Adjust any specific instructions based on your project's actual configurations and requirements.
  
  
  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
