const { db } = require("../config/firebase");

exports.moveToUpcycle = async (req, res) => {
    try {
        const { productId, partnerName } = req.body;
        
        // 1. Dapatkan data produk asli
        const productRef = db.collection("products").doc(productId);
        const productDoc = await productRef.get();

        if (!productDoc.exists) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        const productData = productDoc.data();

        const stock = parseInt(productData.stock) || 0;
        
        // 2. Siapkan data untuk koleksi upcycles
        const upcycleData = {
            originalProductId: productId || "unknown",
            name: productData.name || "Tanpa Nama",
            category: productData.category || "Uncategorized",
            quantityKg: stock,
            partnerName: partnerName || "PT Pupuk Organik Tbk (Dummy)",
            status: "Menunggu Penjemputan", // Status default
            createdAt: new Date(),
            estimatedFertilizerKg: Math.round(stock * 0.4) // Asumsi 1kg limbah = 0.4kg pupuk
        };

        // 3. Tambahkan ke koleksi upcycles
        const upcycleRef = await db.collection("upcycles").add(upcycleData);

        // 4. Hapus dari koleksi products (karena sudah dipindahkan ke upcycle)
        await productRef.delete();

        res.status(201).json({ 
            message: "Berhasil dialokasikan untuk upcycle", 
            id: upcycleRef.id,
            data: upcycleData 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUpcycleHistory = async (req, res) => {
    try {
        const snapshot = await db.collection("upcycles").orderBy('createdAt', 'desc').get();
        const history = [];
        snapshot.forEach(doc => {
            history.push({ id: doc.id, ...doc.data() });
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
