-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "highlights" TEXT[],
    "origin" TEXT,
    "material" TEXT,
    "significance" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
