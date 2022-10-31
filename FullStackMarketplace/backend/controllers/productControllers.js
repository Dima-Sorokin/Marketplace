
const ProductModel = require(`../models/productModel`);
const mongoose = require(`mongoose`);
const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
    const products = await ProductModel.find({}).sort({ createdAt: -1 })
    //the "{ createdAt:-1 }" sorting the output by creating date, starting from the latest.
    res.status(200).json(products);
}

const getProductsById = async (req, res) => {
    const { id } = req.params;
    //to check if the id (uniqe outo generated id) exist.
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ error: `ID is not found.` })
    // }
    //to find by auto generated uid:
    // const products = await ProductModel.findById(id);
    const products = await ProductModel.find({ id: id });
    if (products.length < 1) {
        //in case that there is no product we send status not found (404).
        return res.status(404).json({ error: `Product not found.` })
    }
    res.status(200).json(products);
}

const createProduct = async (req, res) => {
    const { id, name, description, qty, price } = req.body;
    const existingProduct = await ProductModel.find({ id: id });
    if (existingProduct.length > 0) {
        return res.status(400).json({ error: `Product id already existed.` })
    }
    try {
        const product = await ProductModel.create({ id, name, description, qty, price });
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const productToDelete = await ProductModel.find({ id: id });
    if (productToDelete.length < 1) {
        return res.status(404).json({ error: `Product was NOT found.` })
    }
    const deletedProduct = await productModel.findOneAndDelete({ id:id });
    if (!deletedProduct) {
        return res.status(404).json({ error: `Product was NOT found.` })
    }
    res.status(200).json(deletedProduct,{message:`Item was deleted!`});
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    // if (mongoose.Types.ObjectId.isValid(id)) {
    //     res.json({ mess: `Id was found!!!` });
    // }
    const productToDelete = await ProductModel.find({ id: id });
    if (productToDelete.length < 1) {
        return res.status(404).json({ error: `Product was NOT found.` })
    }
    const productUpdateing = await ProductModel.findOneAndUpdate({ id: id }, {
        ...req.body
    })
    if (!productUpdateing) {
        return res.status(404).json({ error: `Product was NOT found.` })
    }
    res.status(200).json(productUpdateing);
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductsById,
    deleteProduct,
    updateProduct
}