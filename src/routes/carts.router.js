const Router = require('express');
const CartManager = require('../controllers/CartManager.js')

const CartRouter = Router();
const carts = new CartManager;



CartRouter.get("/", async (req, res) => {
    res.send( await carts.readCarts())
})

CartRouter.get("/:id", async (req, res) => {
    res.send( await carts.getCartsById(req.params.id))
})

CartRouter.post("/", async (req, res) => {
    res.send( await carts.addCarts())
})

CartRouter.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    res.send(await carts.addProductsInCart(cartId, productId))
})
 

module.exports = CartRouter