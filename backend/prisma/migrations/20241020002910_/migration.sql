-- AlterTable
ALTER TABLE `Usuario` MODIFY `tipo` ENUM('Administrador', 'Cliente') NOT NULL DEFAULT 'Cliente';
