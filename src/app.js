const path = require('path')
const express = require('express')
const nodemon = require('nodemon') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public') 
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Marat Sergievich'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Marat Sergievich'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'this is some helpful text',
        title: 'Help',
        name: 'Marat Sergievich '
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no address provided.'
        })
    } else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
          if(error){
            return res.send({error})
          }
          forecast(latitude, longitude, (error, forecastData) => {
            if(error){
              return res.send({error})
            } 
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
            })
        })
    }
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Marat Sergievich'
    })
})

 app.get('*', (req, res ) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Marat Sergievich'
    })
 })

 app.listen(port, () => {
     console.log('server is up on port '+port+'. ')
 })

 //weather about