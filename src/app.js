const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

//Setup directory for static files
app.use(express.static(publicDirectory)) /* Static dosyalar için (html, css, js ...) */

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlesbars
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ömer'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ömer'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        parag: "For more info, visit Google",
        name: 'Ömer'
    })
})
 
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You have to provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
           return res.send({ error });
        } else if (data === undefined) {
            return res.send({ error });
        } else {
            forecast(data.latitude, data.longtitude, (error, forecastData) => {
                if (error) {
                    return res.send(error);
                } else {
                    res.send({
                        location: data.location,
                        forecast: `${forecastData.daily.data[0].summary} It is currently ${forecastData.currently.temperature} degree and there is a ${forecastData.currently.precipProbability}% chance of rain.`,
                        address: req.query.address
                    })
                }
            });
        }
    });

});


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You have to provide a asearch term.'
        });
    }

    res.send({
        products : []
    })
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage : 'Help page you are looking for not found...',
        name:'Ömer B.',
        title:'404'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage : 'Page not found...',
        name:'Ömer B.',
        title:'404'
    })
});

app.listen(port, () => {
    console.log(`Server is running on ${port} port.`)
});