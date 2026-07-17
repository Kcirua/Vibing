const { db, auth } = require("../config/firebase");
const bcrypt = require("bcryptjs");

// REGISTER
exports.register = async (req, res) => {

    try {

        const { name, email, password, phone, role } = req.body;

        // Hash password menggunakan bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in Firebase Authentication
        const userRecord = await auth.createUser({
            email,
            password,
        });

        // Save additional information in Firestore
        await db.collection("users").doc(userRecord.uid).set({
            uid: userRecord.uid,
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            createdAt: new Date()
        });

        res.status(201).json({
            message: "User registered successfully",
            uid: userRecord.uid
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }


};


// GET LOGIN (Mengecek User di Firestore)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user di collection "users" berdasarkan email
        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("email", "==", email).get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "Email atau password salah!" });
        }

        let userData;
        snapshot.forEach(doc => {
            userData = { id: doc.id, ...doc.data() };
        });

        // Validasi password dengan bcrypt
        if (userData.password) {
            const isMatch = await bcrypt.compare(password, userData.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Email atau password salah!" });
            }
        } else {
            // Jika akun lama (sebelum ada bcrypt) dan tidak punya field password
            return res.status(401).json({ message: "Akun versi lama. Silakan daftar ulang atau minta admin reset akun." });
        }

        // Jangan kirim password ke frontend
        delete userData.password;

        res.status(200).json({
            message: "Login berhasil",
            user: userData
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};