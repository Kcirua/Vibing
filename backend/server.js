const express = require('express');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// --- 2. KONFIGURASI FRONTEND EJS (Buatanmu) ---
app.set('view engine', 'ejs');
// Arahkan Express untuk mencari file EJS di 'frontend/src/pages'
app.set('views', path.join(__dirname, '../frontend/src/pages'));
// Izinkan Express membaca file statis (CSS/JS Murni/Gambar) di 'frontend/public'
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', (req, res) => {
  res.render('Index', { 
    judul: 'AgriHub Dashboard', 
    petani: 'Pak Budi' 
  });
});

// Halaman Marketplace
app.get("/marketplace", (req, res) => {
    res.render("Marketplace", { judul: 'AgriHub - B2B Marketplace' });
});

// Halaman Dashboard Petani (Jika kamu sudah menyimpan Dashboard.ejs tadi)
app.get("/dashboard", (req, res) => {
    res.render("Dashboard", { judul: 'AgriHub - Farmer Dashboard' });
});


// --- 5. JALANKAN SERVER ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server API & Frontend sukses berjalan di http://localhost:${PORT}`);
});