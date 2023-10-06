const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const ProductManager = require('./ProductManager.js');

const productAll = new ProductManager


class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
        
    }

    readCarts = async () => {
        const carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }
    
    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    exist = async (id) => {
        const carts = await this.readCarts();
        return carts.find(prod=> prod.id === id)
    }

    addCarts = async () => {
        const cartsOld = await this.readCarts();
        const id = uuidv4();
        const cartsConcat = [{ id: id, products: [] }, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }

    getCartsById = async (id) => {
        const cartById = await this.exist(id)
        if(!cartById) return "Carrito no encontrado"
        return cartById
    }

    addProductsInCart = async (cartId, productId) => {
        const cartById = await this.exist(cartId)
        if (!cartById) return "Carrito no encontrado"
        const productById = await productAll.exist(productId)
        if (!productById) return "Producto no econtrado"
        const cartsAll = await this.readCarts()
        const cartFilter = cartsAll.filter(cart => cart.id != cartId)

        if (cartById.products.some(prod => prod.id === productId)) {
            const moreProductInCart = cartById.products.find(prod => prod.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado al carrito"
        }

        cartById.products.push({ id: productById.id, cantidad: 1 })
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto agregado al carrito"
    }
}

module.exports = CartManager