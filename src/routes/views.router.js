const express = require('express');
const router = express.Router()
const ProductManager = require('../dao/ProductManager.js')

const product = new ProductManager()

router.get("/", async (req, res) => {
    const allProducts = await product.getProduct()
    res.render("home", {
        title: "TecnoPlay",
        products: allProducts
    })
})

router.get("/realtimeproducts", async (req, res) => {
    const totalProd = await product.getProduct()
    res.render("realTimeProducts", {
        title: "Productos WebSocket",
        products: totalProd
    })
})

router.get('/')




module.exports = router