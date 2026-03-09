-- Script SQL untuk membuat tabel-tabel PostgreSQL
-- Buka pgAdmin atau jalankan via psql untuk membuat database

-- Membuat database (jalankan sebagai superuser)
-- CREATE DATABASE tinfc_class;

-- Mengaktifkan ekstensi uuid-ossp untuk generating UUID (opsional)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabel Mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    nim VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Materi
CREATE TABLE IF NOT EXISTS materi (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    file VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Tugas
CREATE TABLE IF NOT EXISTS tugas (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    nim VARCHAR(50) NOT NULL,
    judul VARCHAR(255) NOT NULL,
    file VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Galeri
CREATE TABLE IF NOT EXISTS galeri (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255),
    file_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Kalender
CREATE TABLE IF NOT EXISTS kalender (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    tanggal DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (opsional)
-- INSERT INTO mahasiswa (nama, nim, email) VALUES 
-- ('John Doe', '1234567890', 'john@example.com'),
-- ('Jane Smith', '0987654321', 'jane@example.com');

-- INSERT INTO kalender (judul, deskripsi, tanggal) VALUES 
-- ('Ujian Tengah Semester', 'UTS semester ganjil 2025', '2025-02-15'),
-- ('Ujian Akhir Semester', 'UAS semester ganjil 2025', '2025-06-15');

