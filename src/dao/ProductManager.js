const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');


module.exports = class Productmanager {
    constructor() {
        this.path = "./src/dao/models/products.json"; 
    }

    readProducts = async () => {
        const products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
    
    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }
    
    exist = async (id) => {
        const products = await this.readProducts();
        return products.find(prod=> prod.id === id)
    }

    addproduct = async (product) => {
        const productsOld = await this.readProducts();
        product.id = uuidv4()
        const productAll = [...productsOld, product];
        await this.writeProducts(productAll)
        return "Producto agregado"
    }

    getProduct = async () => {
        return await this.readProducts();
    }
    
    getProductsById = async (id) => {
        const productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        return productById
    }

    deleteProducts = async (id) => {
        const products = await this.readProducts();
        const existProducts = products.some(prod => prod.id === id)
        if (existProducts) {
            const filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado"
        }
        return "El producto a eliminar no existe"
    }

    updateProducts = async (id, product) => {
        const productById = await this.exist(id)
        if (!productById) return "Producto no encontrado"
        await this.deleteProducts(id);
        const productsOld = await this.readProducts()
        const products = [{ ...product, id: id, productsOld }]
        await this.writeProducts(products)
        return "Producto actualizado"
    }
}