/*
  Warnings:

  - You are about to drop the column `significance` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "significance",
ADD COLUMN     "history" TEXT;
