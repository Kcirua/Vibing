const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.getInsights = async (req, res) => {
    try {
        const { weatherDesc, temperature, month, inventory } = req.body;

        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Prepare the prompt
        let inventoryText = "Tidak ada barang di gudang.";
        if (inventory && inventory.length > 0) {
            inventoryText = inventory.map(item => `- ${item.name}: ${item.stock} Kg (Harga: Rp ${item.price}/Kg)`).join("\n");
        }

        const prompt = `
Kamu adalah AI Assistant cerdas untuk sistem manajemen pertanian dan gudang bernama "AgriHub".
Tugasmu adalah menganalisis data pasar dan memberikan rekomendasi strategis kepada petani (seller).

Data saat ini:
- Cuaca saat ini: ${weatherDesc} (${temperature}°C)
- Bulan saat ini: ${month}
- Stok di Gudang:
${inventoryText}

Berikan analisa singkat (maksimal 3 paragraf pendek) mengenai:
1. Rekomendasi apakah ada komoditas di gudang yang harganya sebaiknya dinaikkan atau diturunkan berdasarkan musim/cuaca bulan ini. (Misal: musim hujan harga sayur naik karena panen susah, atau sedang musim durian jadi stok melimpah harga turun).
2. Saran untuk pengelolaan stok gudang berdasarkan barang yang menumpuk atau habis.
3. Rekomendasi komoditas apa yang paling menguntungkan (worth it) untuk dijual/dipanen dalam cuaca dan bulan seperti ini.

Gunakan format HTML sederhana (gunakan tag <strong>, <br>, <ul>, <li>) agar mudah ditampilkan di web. Jangan gunakan format markdown seperti ** atau *. Bahasa santai tapi profesional.
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            insights: text
        });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ success: false, error: "Gagal mengambil rekomendasi AI. Pastikan GEMINI_API_KEY valid." });
    }
};
