const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./router/admin');
const shopRoutes = require('./router/shop');

const app = express();

// app.use((req, res, next) => {
//     console.log('In the middleware');
//     next(); // Allows the request to continue to next middleware in line
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
});

app.listen(3000); 