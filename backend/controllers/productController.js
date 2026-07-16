const db = require("../config/firebase");

exports.getProducts = (req,res)=>{

    res.send("GET Products");

}

exports.createProduct = async (req,res)=>{

    try{

        const product = {

            name:req.body.name,

            price:req.body.price,

            stock:req.body.stock,

            category:req.body.category,

            description:req.body.description,

            seller:req.body.seller,

            createdAt:new Date()

        }

        const doc = await db.collection("products").add(product);

        res.status(201).json({

            id:doc.id,

            ...product

        });

    }

    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

}

exports.updateProduct = (req,res)=>{

    res.send("UPDATE Product");

}

exports.deleteProduct = (req,res)=>{

    res.send("DELETE Product");

}