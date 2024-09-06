/*
  Warnings:

  - You are about to drop the column `colorId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `colorId` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_colorId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "colorId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "colorId",
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "priority" "Priority" NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
