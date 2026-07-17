const { db, auth } = require("./config/firebase");
const bcrypt = require("bcryptjs");

async function createAdmin() {
    try {
        const email = "admin@agrihub.com";
        const password = "adminpassword123";
        const name = "Super Admin";
        
        console.log("Membuat akun admin...");

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Buat user di Firebase Auth (abaikan error jika sudah ada)
        let userRecord;
        try {
            userRecord = await auth.createUser({
                email,
                password,
            });
            console.log("User dibuat di Firebase Auth.");
        } catch (authError) {
            if (authError.code === "auth/email-already-exists") {
                console.log("Email sudah ada di Firebase Auth. Mengambil data user lama...");
                userRecord = await auth.getUserByEmail(email);
            } else {
                throw authError;
            }
        }

        // Simpan/Update di Firestore
        await db.collection("users").doc(userRecord.uid).set({
            uid: userRecord.uid,
            name,
            email,
            password: hashedPassword,
            phone: "081234567890",
            role: "admin",
            createdAt: new Date()
        });

        console.log("Berhasil! Akun admin berhasil dibuat.");
        console.log("-----------------------");
        console.log("Email: " + email);
        console.log("Password: " + password);
        console.log("-----------------------");
        process.exit(0);

    } catch (error) {
        console.error("Gagal membuat admin:", error);
        process.exit(1);
    }
}

createAdmin();
