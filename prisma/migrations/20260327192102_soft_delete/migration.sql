/*
  Warnings:

  - A unique constraint covering the columns `[key,userId,deletedAt]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_key_userId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Category_key_userId_deletedAt_key" ON "Category"("key", "userId", "deletedAt");
