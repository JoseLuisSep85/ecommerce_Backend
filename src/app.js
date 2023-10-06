const express = require('express');
const ProductRouter = require('./routes/products.router.js');
const CartRouter = require('./routes/carts.router.js');
const ViewsRouter = require('./routes/views.router.js');
const handlebars = require('express-handlebars');
const Productmanager = require('./dao/ProductManager.js');
const { Server } = require('socket.io');


const product = new Productmanager()
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(PORT))
const socketServer = new Server(httpServer)


//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + '/views')
app.set("view engine", "handlebars");

//static
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//vistas
app.use("/", ViewsRouter)
app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)


//servidor websocket
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")
    
    socket.on('message', data => {
        console.log(data)
    })

    socket.on("newProd", (newProduct) => {
        product.addproduct(newProduct)
        socketServer.emit("Success", "Producto agregado correctamente")
    })
})