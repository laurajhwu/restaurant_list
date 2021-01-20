//GET MODULES, FILES, AND SET UP SERVER/////////
//get and execute express 
const express = require('express');
const app = express();
const port = 3000;
//set up server to listen
app.listen(port, () => {
    console.log(`Express is listening to localhost:${port}`);
})

//get handlebars
const exphbr = require('express-handlebars');
//set template engine
app.engine('handlebars', exphbr({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//get restaurant.json content
const restaurantList = require('./restaurant.json');

//set up static files to access bootstrap and other designs
app.use(express.static('public'));


//DISPLAY CONTENT AND SET FUNCTIONS///////
//set route for index page (home page)
app.get('/', (req, res) => {
    //upload restaurant data to page using handlebars' {{#each}}
    res.render('index', { restaurants: restaurantList.results });
})

//set route for show page (info page)
app.get('/restaurants/:id', (req, res) => {
    //get the restaurant that matches the restaurant id clicked by the user
    const restaurant = restaurantList.results.find(restaurant => {
        return restaurant.id.toString() === req.params.id;
    })
    res.render('show', { restaurant: restaurant });
})

//set route for search bar
app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase())
            || restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase());
    })
    //create keyword variable to keep users' query
    res.render('index', { restaurants: restaurants, keyword: keyword });
})