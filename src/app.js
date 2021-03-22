const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express() 

// Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to service
app.use(express.static(publicDirectoryPath))

 
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Fahim Hasan"
    })
})
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Fahim Hasan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Some Helpful Text",
        title: "Help",
        name: "Fahim Hasan"
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send({
            error: "You must provide a search term!!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            }) 
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send([{
    //     location: "Dhaka",
    //     forecast: "50 degree",
    //     address: req.query.address
    // }])
})

app.get('/products', (req, res)=> {
    res.send([{
        location: "Dhaka",
        forecast: "50 degree"
    }])
})


app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: "Fahim Hasan",
        errorMessage: "Help article not found."
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: "Fahim Hasan",
        errorMessage: "Page not found."
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})