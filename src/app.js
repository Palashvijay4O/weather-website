const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()

// Define paths here
const htmlDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

// Set handle bar engines and views folder
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialDir)

// Setup static directory for use
app.use(express.static(htmlDir))

app.get('', (req, res) => {
    res.render('index', {title : 'Weather App', name: 'Palash Vijay'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Me', name: 'Palash Vijay'})
})

app.get('/help', (req, res) => {
    res.render('help', {title : 'Help', helpmessage: 'Help message from the site owner', name: 'Palash Vijay'})
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Please provide a valid address'})
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return req.send({error})
            }
            res.send({forecast: forecastData.description, location, address: req.query.address})
        }) 
    })
    //res.send({forecast: 'Rainy', location: 'Kota Rajasthan', location: req.query.address})
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({error: 'Please provide a search term'})
    }
    console.log(req.query.search)
    res.send({products : []})
})

app.get('/help/*', (req, res) => {
    res.render('error', {errorMsg: 'Help resource not found.', name: 'Palash Vijay'})
})
// 404 pages
app.get('*', (req, res) => {
    res.render('error', {errorMsg: 'Page not found', name: 'Palash Vijay'})
})

app.listen(port, () => {
    console.log("Server is up and running at port: " + port)
})