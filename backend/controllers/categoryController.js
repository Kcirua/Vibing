const db = require("../config/firebase");

// CREATE
exports.createCategory = async (req, res) => {

    try {

        const category = {

            name: req.body.name

        };

        const doc = await db.collection("categories").add(category);

        res.status(201).json({

            message: "Category created",

            id: doc.id,

            category

        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// GET ALL
exports.getCategories = async (req, res) => {

    try {

        const snapshot = await db.collection("categories").get();

        const categories = [];

        snapshot.forEach(doc => {

            categories.push({

                id: doc.id,

                ...doc.data()

            });

        });

        res.json(categories);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// DELETE
exports.deleteCategory = async (req, res) => {

    try {

        await db.collection("categories").doc(req.params.id).delete();

        res.json({

            message: "Category deleted"

        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};