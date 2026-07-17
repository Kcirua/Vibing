const { db } = require("../config/firebase");

// CREATE ORDER
exports.createOrder = async (req, res) => {
    try {

        const {
            buyerName,
            buyerPhone,
            items
        } = req.body;

        let totalPrice = 0;

        for (const item of items) {

            const productRef = db.collection("products").doc(item.productId);

            const productDoc = await productRef.get();

            if (!productDoc.exists) {
                return res.status(404).json({
                    message: `Product ${item.productId} not found`
                });
            }

            const product = productDoc.data();

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} stock is insufficient`
                });
            }

            totalPrice += product.price * item.quantity;

            await productRef.update({
                stock: product.stock - item.quantity
            });

            item.productName = product.name;
            item.price = product.price;

        }

        const order = {

            buyerName,
            buyerPhone,
            items,
            totalPrice,
            status: "Pending",
            createdAt: new Date()

        };

        const doc = await db.collection("orders").add(order);

        res.status(201).json({
            message: "Order created!",
            id: doc.id,
            order
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};


// GET ALL
exports.getOrders = async (req, res) => {

    try {

        const snapshot = await db.collection("orders").get();

        const orders = [];

        snapshot.forEach(doc => {

            orders.push({

                id: doc.id,
                ...doc.data()

            });

        });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// GET ONE
exports.getOrder = async (req, res) => {

    try {

        const doc = await db.collection("orders").doc(req.params.id).get();

        if (!doc.exists) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.json({

            id: doc.id,
            ...doc.data()

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// UPDATE STATUS
exports.updateOrder = async (req, res) => {

    try {

        await db.collection("orders").doc(req.params.id).update({
            status: req.body.status
        });

        res.json({
            message: "Order updated"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};