const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// console.log(__dirname)
// console.log(__filename)

//Define paths for express config
var pathPublicDir = path.join(__dirname, '../public')
var viewsPath = path.join(__dirname, '../templates/views')
var partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static(here public) dir to serve
app.use(express.static(pathPublicDir))

app.get('', (req, res) => {  //root route
  res.render("index",{
    title: "WEATHER",
    name: "SB"
  })
})

app.get('/about', (req, res) => {  //root route
  res.render("about",{
    title: "About Page",
    name: "Swati"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: "Dial below no. for customer services.",
    title: "HELP",
    name: "Swati Bhilma"
  })
})
// app.get('', (req, res) => {  //root route
//   res.send("Hello Express!")
// })

// app.get('/help', (req, res) => {  //help route
//     res.send([{
//         name: 'Swati'
//     },{
//         name: 'Bhilma'
//     }])
//   })

// app.get('/about', (req, res) => {  //about route
//     res.send("<h1>About</h1>")
//   })  

app.get('/weather', (req, res) => {  //weather route
  if(!req.query.address){
    return res.send({
      error: 'address required'
    })
  }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {  

      if (error) {
         return res.send({Error: error})
       }
         forecast(latitude, longitude, (error, forecastData) => {
           if (error) {
             return res.send({Error: error})
           }
           res.send({
            forecast: forecastData,
            location: place,
            address: req.query.address,
         })
     })
  })

})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: "404",
    name: "Swati",
    errorMessage: "Help article not found"
  })
})

app.get('*', (req,res) => {
  res.render('404', {
    title: "404",
    name: "Swati",
    errorMessage: "Page not found"
  })
})

app.listen(3000, () => {
    console.log("server is up at port 3000")
})