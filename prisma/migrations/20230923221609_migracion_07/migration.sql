/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Room` DROP FOREIGN KEY `Room_bookingId_fkey`;

-- AlterTable
ALTER TABLE `Room` DROP COLUMN `bookingId`;

-- DropTable
DROP TABLE `Booking`;

-- CreateTable
CREATE TABLE `ReservedDates` (
    `id` VARCHAR(191) NOT NULL,
    `checkIn` DATETIME(3) NOT NULL,
    `checkOut` DATETIME(3) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservedDates` ADD CONSTRAINT `ReservedDates_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
