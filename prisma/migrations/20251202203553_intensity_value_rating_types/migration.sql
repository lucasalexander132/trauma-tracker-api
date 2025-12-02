/*
  Warnings:

  - Changed the type of `intensityValue` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "intensityValue",
ADD COLUMN     "intensityValue" INTEGER NOT NULL,
ALTER COLUMN "intensityRating" SET DATA TYPE TEXT;
