/*
  Warnings:

  - You are about to drop the column `description` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Room` DROP COLUMN `description`,
    ADD COLUMN `descriptionContent` VARCHAR(191) NULL,
    ADD COLUMN `descriptionTitle` VARCHAR(191) NULL,
    ADD COLUMN `target` VARCHAR(191) NULL;
