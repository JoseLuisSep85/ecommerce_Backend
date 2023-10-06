const express = require('express');
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/views.router')
const app = express();
const PORT = 8080;


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', viewsRouter)


app.listen(PORT, () => {
  console.log(`Servidor conectado al Puerto ${PORT}`)  
})