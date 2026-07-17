const express = require("express");
const cors = require("cors");
const path = require("path"); // KUNCI 1: Kita butuh 'path' untuk mencari folder frontend
require("dotenv").config();

// --- 1. IMPORT ROUTE BACKEND (Buatan Temanmu) ---
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const aiRoutes = require("./routes/aiRoutes");
const upcycleRoutes = require("./routes/upcycleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// --- 2. KONFIGURASI FRONTEND EJS (Buatanmu) ---
app.set('view engine', 'ejs');
// Arahkan Express untuk mencari file EJS di 'frontend/src/pages'
app.set('views', path.join(__dirname, '../frontend/src/pages'));
// Izinkan Express membaca file statis (CSS/JS Murni/Gambar) di 'frontend/public'
app.use(express.static(path.join(__dirname, '../frontend/public')));


// --- 3. RUTE API BACKEND (Jangan diubah, ini punya temanmu) ---
app.use("/api/products", productRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/upcycles", upcycleRoutes);


// --- 4. RUTE TAMPILAN FRONTEND (Untuk memunculkan halaman EJS-mu) ---

// Halaman Utama (Index)
app.get("/", (req, res) => {
    // Kita ganti res.send temanmu menjadi res.render milik kita
    res.render("Index", { judul: 'AgriHub - Market & Weather' });
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