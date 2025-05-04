/*
  Warnings:

  - You are about to drop the column `ownerId` on the `clients` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_ownerId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" INTEGER NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
