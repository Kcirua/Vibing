const { db, auth } = require("../config/firebase");

// REGISTER
exports.register = async (req, res) => {

    try {

        const { name, email, password, phone, role } = req.body;

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