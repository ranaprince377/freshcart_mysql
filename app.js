const express = require('express');
const path = require('path');
const { getHomePageData } = require('./controllers/homePageData');
const { getGlobalCategoryList } = require('./middlewares/globalData');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const accountRoutes = require('./routes/account');

const app = new express();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public'))); // To set the public folder
app.set('view engine', 'ejs'); // Set EJS as templating engine 

app.use(getGlobalCategoryList);

// Routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/account', accountRoutes);

app.get("/", (req, res) => {
    res.locals.title = 'Home';
    getHomePageData(req, res).then(function(data) {
        res.render('index', data);
    });
});





app.listen(80, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", 80);
})