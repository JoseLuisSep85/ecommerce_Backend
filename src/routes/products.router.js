const Router = require('express');
const ProductManager = require ('../controllers/ProductManager.js');

const ProductRouter = Router();
const product = new ProductManager;



ProductRouter.get("/", async (req, res) => {
    res.send(await product.getProduct())
})

ProductRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    res.send(await product.getProductsById(id))
})

ProductRouter.post("/", async (req, res)=> {
    const newProduct = req.body
    res.send(await product.addproduct(newProduct))
})

ProductRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    res.send(await product.deleteProducts(id))
})

ProductRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const updateProduct = req.body;
    res.send(await product.updateProducts(id))
})

module.exports = ProductRouter