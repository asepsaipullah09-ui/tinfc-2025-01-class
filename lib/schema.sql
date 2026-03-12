-- MySQL Schema for tinfc_class (XAMPP compatible)
-- Run: mysql -u root -p tinfc_class < lib/schema.sql

CREATE DATABASE IF NOT EXISTS tinfc_class;
USE tinfc_class;

-- Users table (for register/auth)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  nama VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'mahasiswa',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mahasiswa table
CREATE TABLE IF NOT EXISTS mahasiswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  nim VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Materi table
CREATE TABLE IF NOT EXISTS materi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  file VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tugas table
CREATE TABLE IF NOT EXISTS tugas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  nim VARCHAR(50) NOT NULL,
  judul VARCHAR(255) NOT NULL,
  file VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Galeri table
CREATE TABLE IF NOT EXISTS galeri (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255),
  file_path VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kalender table
CREATE TABLE IF NOT EXISTS kalender (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  tanggal DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_mahasiswa_nim ON mahasiswa(nim);
CREATE INDEX idx_tugas_nim ON tugas(nim);
CREATE INDEX idx_kalender_tanggal ON kalender(tanggal);

