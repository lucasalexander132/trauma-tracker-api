-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;
