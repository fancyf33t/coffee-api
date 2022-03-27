// coffee router
const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

// fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
router.use(express.static('public'))

// hot-coffee routes
const hotCoffeeRoutes = require('./api/hotCoffeeRoutes')

// iced-coffee routes
const icedCoffeeRoutes = require('./api/icedCoffeeRoutes')



// hot-coffee home
router.use('/hot', hotCoffeeRoutes)

// iced-coffee home
router.use('/iced', icedCoffeeRoutes)


// home 
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Home',
        name: 'Coffee Selection'
    })
})


// error route
router.get('*', (req, res) => {
    if(req.url == '/favicon.ico') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error - page not found'
        })
    }
})

module.exports = router