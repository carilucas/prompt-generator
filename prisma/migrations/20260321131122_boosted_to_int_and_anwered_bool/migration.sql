/*
  Warnings:

  - The `boosted` column on the `PromptLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PromptLog" ADD COLUMN     "answered" BOOLEAN DEFAULT false,
DROP COLUMN "boosted",
ADD COLUMN     "boosted" INTEGER;
