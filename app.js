// MODULES
const express = require('express')
    , exphbs  = require('express-handlebars')
    , mongoose = require('mongoose');

// 
const app = express();
// PORT
port = 3000

// HANDLEBARS
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// STATIC
app.use(express.static('public'));
// ROUTES
app.get ('/', (req, res) => {
    res.render('index')
})

//CONTACT
app.get ('/contact', (req, res) => {
    res.render('contact')
})
// LECTURE
app.listen(port, () =>{
    console.log("server start port 3000");
    
})