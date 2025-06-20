SIMOLA 110 - Sistem Informasi Monitoring Layanan 110
Sistem Informasi Monitoring Layanan 110 POLDA Daerah Istimewa Yogyakarta untuk digitalisasi dan visualisasi laporan layanan darurat 110.
📋 Deskripsi
SIMOLA 110 adalah aplikasi web yang dikembangkan sebagai project magang untuk POLDA DIY. Sistem ini berfungsi sebagai platform monitoring dan digitalisasi laporan layanan darurat 110, memberikan visualisasi data yang memudahkan analisis progress dan regress layanan kepolisian.
Aplikasi ini memungkinkan petugas untuk mengelola laporan darurat, memantau tingkat keberhasilan layanan, dan menganalisis tren laporan melalui dashboard yang informatif.
✨ Fitur Utama
🎯 Dashboard Monitoring

Statistik Real-time: Total laporan, success rate, total errors, dan weekly reports
Visualisasi Data: Grafik distribusi kategori dan tren mingguan
Recent Activities: Aktivitas terbaru dari sistem
Progress Indicators: Indikator kemajuan layanan dengan persentase

📊 Manajemen Laporan

Tambah Laporan: Form untuk menambah laporan baru
Filter Laporan: Filter berdasarkan kategori (Semua, Darurat, Kriminal, Informasi)
Status Tracking: Pelacakan status laporan (Diproses, Selesai, Menunggu)
Priority Management: Pengelolaan prioritas laporan (Tinggi, Sedang, Rendah)

📈 Analisis & Reporting

Export Data: Export laporan dalam format Excel/PDF
Kategori Laporan: Emergency, Crime, Information, Accidents
Statistics: Analisis statistik mendalam
Download Reports: Unduh laporan dalam berbagai format

👥 User Management

Multi-user Support: Sistem pengguna dengan role berbeda
Profile Management: Pengelolaan profil pengguna
Settings: Konfigurasi sistem
Feedback: Sistem feedback dan saran

🛠️ Teknologi yang Digunakan

Frontend: HTML5, CSS3, JavaScript (ES6+)
Backend: PHP 7.4+
Database: MySQL 5.7+
UI Framework: Bootstrap 4/5
Charts: Chart.js untuk visualisasi data
Icons: Font Awesome / Feather Icons

📦 Instalasi
Prasyarat

PHP 7.4 atau lebih tinggi
MySQL 5.7 atau lebih tinggi
Web server (Apache/Nginx)
Browser modern (Chrome, Firefox, Safari, Edge)

Langkah Instalasi

Clone repositori
bashgit clone https://github.com/adistaps/Simola110blmfix.git
cd Simola110blmfix

Setup Database
sql-- Buat database baru
CREATE DATABASE simola110;

-- Import struktur database
mysql -u root -p simola110 < database/simola110.sql

Konfigurasi Database
php// config/database.php
<?php
$host = 'localhost';
$dbname = 'simola110';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>

Setup Web Server

Apache: Arahkan DocumentRoot ke folder project
Nginx: Konfigurasi server block
Pastikan mod_rewrite aktif


Permissions
bashchmod -R 755 assets/
chmod -R 777 uploads/ (jika ada folder upload)


🚀 Penggunaan
Akses Aplikasi

Buka browser dan akses: http://localhost/simola110
Halaman login akan muncul dengan form email dan password

Default Login
Email: admin@polda-diy.go.id
Password: admin123

Email: petugas@polda-diy.go.id  
Password: petugas123
Navigasi Sistem

Dashboard: Tampilan utama dengan statistik dan grafik
Reports: Manajemen laporan dengan filter kategori
Users: Pengelolaan pengguna sistem
Statistics: Analisis data mendalam
Download Reports: Export data laporan
Feedback: Input feedback sistem
Profile: Pengaturan profil pengguna
Settings: Konfigurasi sistem

📊 Fitur Dashboard
Metrik Utama

Total Reports: 1,234 laporan (+10% dari periode sebelumnya)
Success Rate: 95% tingkat keberhasilan (-5% dari target)
Total Errors: 50 error (+2% perlu perhatian)
Weekly Reports: 250 laporan mingguan (+15% growth)

Kategori Laporan

Emergency: Laporan darurat prioritas tinggi
Crime: Laporan kriminal dan kejahatan
Information: Laporan informasi umum
Accidents: Laporan kecelakaan

Status Tracking

Diproses: Laporan sedang ditangani (biru)
Selesai: Laporan sudah diselesaikan (hijau)
Menunggu: Laporan menunggu tindak lanjut (kuning)

🔧 Struktur Project
Simola110blmfix/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── config/
│   └── database.php
├── includes/
│   ├── header.php
│   ├── sidebar.php
│   └── footer.php
├── pages/
│   ├── dashboard.php
│   ├── reports.php
│   ├── users.php
│   └── statistics.php
├── database/
│   └── simola110.sql
├── login.php
├── index.php
└── README.md
🎯 Target Penggunaan
Untuk POLDA DIY

Monitoring laporan layanan 110 secara real-time
Analisis performa layanan kepolisian
Digitalisasi proses pelaporan manual
Visualisasi data untuk pengambilan keputusan

Untuk Petugas

Input laporan dengan cepat dan akurat
Tracking status penanganan laporan
Generate laporan berkala
Monitoring workload dan performa tim

🐛 Known Issues & Fixes
Bug Fixes dalam versi ini:

✅ Perbaikan sistem login yang sering timeout
✅ Optimisasi loading dashboard dengan banyak data
✅ Perbaikan export laporan ke Excel
✅ Peningkatan responsive design untuk mobile
✅ Validasi input form yang lebih ketat
✅ Fix timezone untuk timestamp laporan

📄 Lisensi
Project ini dikembangkan untuk POLDA Daerah Istimewa Yogyakarta sebagai bagian dari program digitalisasi layanan kepolisian.
👥 Tim Pengembang

Adista PS - Lead Developer & Intern - @adistaps
POLDA DIY - Project Supervisor

🏛️ Institusi
POLDA Daerah Istimewa Yogyakarta

Website: polda-diy.go.id
Layanan Darurat: 110
Email: info@polda-diy.go.id

📞 Kontak & Support

Project Demo: https://simolla110.netlify.app
Repository: https://github.com/adistaps/Simola110blmfix
Email Support: bondyladista@gmail.com
POLDA DIY: info@polda-diy.go.id

🙏 Acknowledgments

Terima kasih kepada POLDA Daerah Istimewa Yogyakarta atas kesempatan magang
Tim IT POLDA DIY yang memberikan guidance dan support
Seluruh petugas layanan 110 yang memberikan insight untuk development
Open source community untuk tools dan libraries yang digunakan

📞 Layanan Darurat: 110
🚔 POLDA Daerah Istimewa Yogyakarta
⭐ Jangan lupa berikan star jika project ini bermanfaat untuk digitalisasi layanan kepolisian!
