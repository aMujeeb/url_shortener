-- CreateTable
CREATE TABLE "UrlDetails" (
    "id" SERIAL NOT NULL,
    "original" TEXT NOT NULL,
    "shortened" TEXT NOT NULL,

    CONSTRAINT "UrlDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlDetails_original_key" ON "UrlDetails"("original");

-- CreateIndex
CREATE UNIQUE INDEX "UrlDetails_shortened_key" ON "UrlDetails"("shortened");
