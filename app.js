const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
var port = process.env.PORT || 3000
console.log(__dirname)

const publicDirectoryPath = path.join(__dirname, '/public')
const partialsPath = path.join(__dirname, '/partials')
const viewspath = path.join(__dirname, '/views')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)
app.set('views', viewspath)
app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Brad'
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Brad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'About',
        name: 'Brad',
        message: 'I hope you are having a great day'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, data) => {
        console.log( 'Error', error)
        if(error){
            return res.send({error})
        }
        forecast(data.latitude, data.longitude, (error, info) => {
            console.log( 'Error', error)
            if(error){
                return res.send({error})
            }
            res.send({
                weather: info,
                address: data.location
            })
        })
    })
})

app.get('/precip', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, data) => {
        console.log( 'Error', error)
        if(error){
            return res.send({error})
        }
        precip(data.latitude, data.longitude, (error, info) => {
            console.log( 'Error', error)
            if(error){
                return res.send({error})
            }
            res.send({
                precipitation: info,
                address: data.location
            })
        })
    })
})

app.get('/help*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brad',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brad',
        message: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})