/*
  Warnings:

  - Added the required column `garage` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tours` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `garage` BOOLEAN NOT NULL,
    ADD COLUMN `tours` BOOLEAN NOT NULL;
