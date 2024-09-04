/*
  Warnings:

  - You are about to drop the `NoteCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NoteCategory" DROP CONSTRAINT "NoteCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "NoteCategory" DROP CONSTRAINT "NoteCategory_noteId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "coverEmoji" TEXT,
ADD COLUMN     "coverImg" TEXT,
ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "NoteCategory";
