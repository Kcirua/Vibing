const db = require("../config/firebase");

exports.getDashboard = async (req, res) => {

    try {

        const products = await db.collection("products").get();

        const farmers = await db.collection("farmers").get();

        const orders = await db.collection("orders").get();

        let lowStock = 0;

        products.forEach(doc => {

            if (doc.data().stock <= 10)
                lowStock++;

        });

        res.json({

            totalProducts: products.size,

            totalFarmers: farmers.size,

            totalOrders: orders.size,

            lowStockProducts: lowStock

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

}