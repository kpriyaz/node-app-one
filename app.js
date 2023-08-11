const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./router/admin');
const shopRoutes = require('./router/shop');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

// app.use((req, res, next) => {
//     console.log('In the middleware');
//     next(); // Allows the request to continue to next middleware in line
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminData.router);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('page-not-found', {docTitle: 'Not Found'});
});

app.listen(3000); 