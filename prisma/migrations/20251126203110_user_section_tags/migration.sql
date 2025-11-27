-- AlterTable
ALTER TABLE "section_tags" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "section_tags" ADD CONSTRAINT "section_tags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
