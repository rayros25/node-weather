// Uhhhh Vim time I guess?
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// request and response
// Imagine we own the domain app.com, with routes like app.com, app.com/help,
// and app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Report!',
        name: 'Michael Morbius'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Did you know that you have rights?',
        title: 'Help',
        name: 'Michael Morbius'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Michael Morbius'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    //res.send({
        //forecast: 'Overcast',
        //location: 'Westwood',
        //address: req.query.address
    //})
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Michael Morbius',
        message: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Michael Morbius',
        message: 'Page not found',
    })
})

// Challenge time!
// Create and render a 404 page with handlebars

// 1. setup the template to render the header and footer
// 2. setup the template to render an error message in a paragraph
// 3. render the template for both 303 routes
// - page not found
// - Help article not found


// You can only send one response!
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })


// port 3000 is good for local machines when developing
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})