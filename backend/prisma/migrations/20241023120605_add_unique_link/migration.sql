/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Musica` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Musica_link_key` ON `Musica`(`link`);
