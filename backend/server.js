const express = require('express');
const path = require('path');
const app = express();

// 1. Beritahu Express bahwa kita menggunakan EJS
app.set('view engine', 'ejs');

// 2. KUNCI UTAMA: Arahkan Express untuk mencari file EJS di 'frontend/src/pages'
app.set('views', path.join(__dirname, '../frontend/src/pages'));

// 3. Izinkan Express membaca file statis (CSS/JS Murni/Gambar) di 'frontend/public'
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rute untuk halaman utama
app.get('/', (req, res) => {
  // Panggil 'Index' (sesuaikan dengan huruf kapital di nama filemu)
  res.render('Index', { 
    judul: 'Surplus Market', 
    peserta: 'Tim Hackathon' 
  });
});

app.listen(3000, () => {
  console.log('Server sukses berjalan di http://localhost:3000');
});