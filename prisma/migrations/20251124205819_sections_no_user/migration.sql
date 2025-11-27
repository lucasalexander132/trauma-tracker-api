-- DropForeignKey
ALTER TABLE "public"."Section" DROP CONSTRAINT "Section_userId_fkey";

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
