const { db } = require("../config/firebase");

// CREATE
exports.createFarmer = async (req, res) => {

    try {

        const farmer = {

            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
            farmName: req.body.farmName,
            createdAt: new Date()

        };

        const doc = await db.collection("farmers").add(farmer);

        res.status(201).json({

            message: "Farmer created!",

            id: doc.id,

            farmer

        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// GET ALL
exports.getFarmers = async (req, res) => {

    try {

        const snapshot = await db.collection("farmers").get();

        const farmers = [];

        snapshot.forEach(doc => {

            farmers.push({

                id: doc.id,

                ...doc.data()

            });

        });

        res.json(farmers);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// GET ONE
exports.getFarmer = async (req, res) => {

    try {

        const doc = await db.collection("farmers").doc(req.params.id).get();

        if (!doc.exists) {

            return res.status(404).json({

                message: "Farmer not found"

            });

        }

        res.json({

            id: doc.id,

            ...doc.data()

        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// UPDATE
exports.updateFarmer = async (req, res) => {

    try {

        await db.collection("farmers").doc(req.params.id).update(req.body);

        res.json({

            message: "Farmer updated"

        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// DELETE
exports.deleteFarmer = async (req, res) => {

    try {

        await db.collection("farmers").doc(req.params.id).delete();

        res.json({

            message: "Farmer deleted"

        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};