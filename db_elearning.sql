-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Jun 2021 pada 06.08
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_elearning`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_admin`
--

CREATE TABLE `m_admin` (
  `username` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(320) NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `m_admin`
--

INSERT INTO `m_admin` (`username`, `password`, `email`, `foto`) VALUES
('admin1', 'admin1', 'admin@gmail.com', 'C:/foto/admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_kelas`
--

CREATE TABLE `m_kelas` (
  `id_kelas` int(11) NOT NULL,
  `nama_kelas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `m_kelas`
--

INSERT INTO `m_kelas` (`id_kelas`, `nama_kelas`) VALUES
(1, 'Akuntansi'),
(2, 'Manajement Informatika'),
(3, 'Pajak'),
(4, 'Manajemen BIsnis'),
(5, 'Manajemen Keuangan'),
(6, 'DKV');

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_mentor`
--

CREATE TABLE `m_mentor` (
  `nama_depan` varchar(100) NOT NULL,
  `nama_belakang` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `email` varchar(320) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(15) NOT NULL,
  `confim_password` varchar(15) NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `m_mentor`
--

INSERT INTO `m_mentor` (`nama_depan`, `nama_belakang`, `alamat`, `telepon`, `email`, `username`, `password`, `confim_password`, `foto`) VALUES
('Dicky', 'Septiana', 'Bandung', '088986123', 'dicky@gmail.com', '0222007', '0222007', '0222007', 'http://localhost/latihan1/routes/upload/bahan2.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_pelajaran`
--

CREATE TABLE `m_pelajaran` (
  `id_pelajaran` int(11) NOT NULL,
  `nama_pelajaran` varchar(50) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `username_mentor` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `m_pelajaran`
--

INSERT INTO `m_pelajaran` (`id_pelajaran`, `nama_pelajaran`, `id_kelas`, `username_mentor`) VALUES
(101, 'Akuntansi', 1, '0222007'),
(102, 'Sistem Informasi Akuntansi', 1, '0222007'),
(201, 'WEB', 2, '0222007');

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_peserta`
--

CREATE TABLE `m_peserta` (
  `nama_depan` varchar(100) NOT NULL,
  `nama_belakang` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `email` varchar(320) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `confim_password` varchar(20) NOT NULL,
  `foto` text NOT NULL,
  `id_kelas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `m_peserta`
--

INSERT INTO `m_peserta` (`nama_depan`, `nama_belakang`, `alamat`, `telepon`, `email`, `username`, `password`, `confim_password`, `foto`, `id_kelas`) VALUES
('Fadel', 'Sidiq', 'Bojong Soang', '08383923427', 'Fadel@gmail.com', '0121001', '0121001', '0121001', 'http://localhost/latihan1/routes/upload/img5.jpg', 1),
('Fauzi', 'Muhammad', 'Bandung', '08912682', 'fauzai@gmail.com', '0121002', '0121002', '0121002', 'C:/a', 1),
('Abid', 'Fauzan', 'Bandung', '08383923428', 'Fadel@gmail.com', '0221001', '0221001', '0221001', 'http://localhost/latihan1/routes/upload/BOTO2255.JPEG', 2),
('Nandha', 'Restu', 'Bandung', '08168161', 'nandha@gmail.com', '0221002', '0221002', '0221002', 'C:\'/ja', 2),
('Adyan', 'Ali Akbar', 'Cimahi', '08383923429', 'Adyan@gmail.com', '0321001', '0321001', '0321001', 'http://localhost/latihan1/routes/upload/img5.jpg', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tr_materi`
--

CREATE TABLE `tr_materi` (
  `id_materi` int(11) NOT NULL,
  `nama_materi` varchar(50) NOT NULL,
  `deskripsi_materi` text NOT NULL,
  `isi_materi` text NOT NULL,
  `quiz` text NOT NULL,
  `id_pelajaran` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tr_materi`
--

INSERT INTO `tr_materi` (`id_materi`, `nama_materi`, `deskripsi_materi`, `isi_materi`, `quiz`, `id_pelajaran`) VALUES
(10102, 'boy', '123', 'http://localhost/latihan1/routes/download/FORMULIR PENDAFTARAN FKMPI.docx', 'http://localhost/latihan1/routes/download/05 - 0221006 - Mokhamad Iqra - Sesi 13.pdf', 101),
(10103, '', '', 'http://localhost/latihan1/routes/download/05 - 0221006 - Mokhamad Iqra - Sesi 13.pptx', 'http://localhost/latihan1/routes/download/ISO 9000_2000-converted.pptx', 101),
(10201, 'Sistem Informasi Akuntansi', 'Myob', 'mempelajari myob', '', 102),
(20101, 'WEB', 'Pengenalan WEB', 'aaa', '', 201);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tr_nilai`
--

CREATE TABLE `tr_nilai` (
  `id_nilai` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_pelajaran` int(11) NOT NULL,
  `id_materi` int(11) NOT NULL,
  `id_tugas` int(11) NOT NULL,
  `nilai` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tr_nilai`
--

INSERT INTO `tr_nilai` (`id_nilai`, `username`, `id_kelas`, `id_pelajaran`, `id_materi`, `id_tugas`, `nilai`) VALUES
(2, '0121001', 1, 101, 10102, 1, 60),
(3, '0121002', 1, 101, 10102, 3, 50),
(4, '0221001', 2, 201, 20101, 2, 50),
(5, '0221002', 2, 201, 20101, 4, 50),
(6, '0121001', 1, 101, 10102, 1, 50),
(7, '0121001', 1, 101, 10102, 1, 40);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tr_tugas`
--

CREATE TABLE `tr_tugas` (
  `id_tugas` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `nama_tugas` varchar(50) NOT NULL,
  `deskripsi_tugas` text NOT NULL,
  `isi_tugas` text NOT NULL,
  `id_materi` int(11) NOT NULL,
  `ketuntasan` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tr_tugas`
--

INSERT INTO `tr_tugas` (`id_tugas`, `username`, `nama_tugas`, `deskripsi_tugas`, `isi_tugas`, `id_materi`, `ketuntasan`) VALUES
(1, '0121001', 'boy', 'boy', 'http://localhost/latihan1/routes/download/latihan sql.txt', 10102, 'tuntas'),
(2, '0221001', 'aa', 'aa', 'http://localhost/latihan1/routes/download/latihan sql.txt', 20101, 'tuntas'),
(3, '0121002', 'boy', 'boy', 'http://localhost/latihan1/routes/download/latihan sql.txt', 10102, 'tuntas'),
(4, '0221002', 'bb', 'aa', 'http://localhost/latihan1/routes/download/latihan sql.txt', 20101, 'tuntas'),
(5, '0221002', 'WEB', 'Pengenalan WEB', 'http://localhost/latihan1/routes/download/latihan sql.txt', 20101, 'tuntas'),
(6, '0121001', 'boy', 'boy', 'http://localhost/latihan1/routes/download/latihan sql.txt', 10102, 'belum tuntas'),
(7, '0221001', 'WEB', 'Pengenalan WEB', 'http://localhost/latihan1/routes/download/latihan sql.txt', 20101, 'tuntas');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `m_admin`
--
ALTER TABLE `m_admin`
  ADD PRIMARY KEY (`username`);

--
-- Indeks untuk tabel `m_kelas`
--
ALTER TABLE `m_kelas`
  ADD PRIMARY KEY (`id_kelas`);

--
-- Indeks untuk tabel `m_mentor`
--
ALTER TABLE `m_mentor`
  ADD PRIMARY KEY (`username`);

--
-- Indeks untuk tabel `m_pelajaran`
--
ALTER TABLE `m_pelajaran`
  ADD PRIMARY KEY (`id_pelajaran`),
  ADD KEY `pk_kelass` (`id_kelas`),
  ADD KEY `pk_mapel_mentor` (`username_mentor`);

--
-- Indeks untuk tabel `m_peserta`
--
ALTER TABLE `m_peserta`
  ADD PRIMARY KEY (`username`),
  ADD KEY `pk_kelas` (`id_kelas`);

--
-- Indeks untuk tabel `tr_materi`
--
ALTER TABLE `tr_materi`
  ADD PRIMARY KEY (`id_materi`),
  ADD KEY `pk_pelajaran` (`id_pelajaran`);

--
-- Indeks untuk tabel `tr_nilai`
--
ALTER TABLE `tr_nilai`
  ADD PRIMARY KEY (`id_nilai`),
  ADD KEY `pk_nilai_username` (`username`),
  ADD KEY `pk_nilai_kelas` (`id_kelas`),
  ADD KEY `pk_nilai_pelajaran` (`id_pelajaran`),
  ADD KEY `pk_nilai_materi` (`id_materi`),
  ADD KEY `pk_nilai_tugas` (`id_tugas`);

--
-- Indeks untuk tabel `tr_tugas`
--
ALTER TABLE `tr_tugas`
  ADD PRIMARY KEY (`id_tugas`),
  ADD KEY `pk_tugas_materi` (`id_materi`),
  ADD KEY `pk_peserta` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tr_nilai`
--
ALTER TABLE `tr_nilai`
  MODIFY `id_nilai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `tr_tugas`
--
ALTER TABLE `tr_tugas`
  MODIFY `id_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `m_pelajaran`
--
ALTER TABLE `m_pelajaran`
  ADD CONSTRAINT `pk_kelass` FOREIGN KEY (`id_kelas`) REFERENCES `m_kelas` (`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_mapel_mentor` FOREIGN KEY (`username_mentor`) REFERENCES `m_mentor` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `m_peserta`
--
ALTER TABLE `m_peserta`
  ADD CONSTRAINT `pk_kelas` FOREIGN KEY (`id_kelas`) REFERENCES `m_kelas` (`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tr_materi`
--
ALTER TABLE `tr_materi`
  ADD CONSTRAINT `pk_pelajaran` FOREIGN KEY (`id_pelajaran`) REFERENCES `m_pelajaran` (`id_pelajaran`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tr_nilai`
--
ALTER TABLE `tr_nilai`
  ADD CONSTRAINT `pk_nilai_kelas` FOREIGN KEY (`id_kelas`) REFERENCES `m_kelas` (`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_nilai_materi` FOREIGN KEY (`id_materi`) REFERENCES `tr_materi` (`id_materi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_nilai_pelajaran` FOREIGN KEY (`id_pelajaran`) REFERENCES `m_pelajaran` (`id_pelajaran`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_nilai_tugas` FOREIGN KEY (`id_tugas`) REFERENCES `tr_tugas` (`id_tugas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_nilai_username` FOREIGN KEY (`username`) REFERENCES `m_peserta` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tr_tugas`
--
ALTER TABLE `tr_tugas`
  ADD CONSTRAINT `pk_peserta` FOREIGN KEY (`username`) REFERENCES `m_peserta` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_tugas_materi` FOREIGN KEY (`id_materi`) REFERENCES `tr_materi` (`id_materi`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
