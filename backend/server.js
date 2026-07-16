const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/src/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', (req, res) => {
  res.render('Index', { 
    judul: 'AgriHub Dashboard', 
    petani: 'Pak Budi' 
  });
});

// Route 2: Halaman Marketplace
app.get('/marketplace', (req, res) => {
  res.render('Marketplace', { 
    judul: 'Marketplace Panen'
  });
});

app.listen(3000, () => {
  console.log('Server sukses berjalan di http://localhost:3000');
});