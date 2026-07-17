const { db } = require("../config/firebase");
exports.createProduct = async (req, res) => {

    try {

        const product = {

            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            description: req.body.description,
            seller: req.body.seller,
            createdAt: new Date()

        };

        const doc = await db.collection("products").add(product);

        res.status(201).json({

            message: "Product created!",

            id: doc.id,

            product: product

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

exports.getProducts = async (req, res) => {

    try {

        const snapshot = await db.collection("products").get();

        const products = [];

        snapshot.forEach(doc => {

            products.push({

                id: doc.id,

                ...doc.data()

            });

        });

        res.json(products);

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

exports.getProduct = async (req, res) => {

    try {

        const id = req.params.id;

        const doc = await db.collection("products").doc(id).get();

        if (!doc.exists) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

        res.json({

            id: doc.id,

            ...doc.data()

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

exports.updateProduct = async (req,res)=>{

    try{

        const id=req.params.id;

        await db.collection("products").doc(id).update(req.body);

        res.json({

            message:"Updated"

        });

    }

    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

}

exports.deleteProduct = async (req,res)=>{

    try{

        const id=req.params.id;

        await db.collection("products").doc(id).delete();

        res.json({

            message:"Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

}