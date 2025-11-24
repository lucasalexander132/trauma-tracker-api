-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "taggable" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_tags" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "section_tags_sectionId_idx" ON "section_tags"("sectionId");

-- CreateIndex
CREATE INDEX "section_tags_tagId_idx" ON "section_tags"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "section_tags_sectionId_tagId_key" ON "section_tags"("sectionId", "tagId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_tags" ADD CONSTRAINT "section_tags_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_tags" ADD CONSTRAINT "section_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
