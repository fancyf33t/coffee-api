const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// all iced-coffee
// localhost:3000/coffee/iced
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/coffee/iced'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/iced-home', {
                title: 'All Iced Coffee',
                name: 'Coffee List',
                data 
            })
        })
})

// single-iced-coffee
// localhost:3000/coffee/iced/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/coffee/iced/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/iced-single', {
                    title: `${data.title}`,
                    name: `${data.title}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 ERROR'
                })
            }
        })
        .catch(error => {
            console.log('Error', error)
        })
})

module.exports = router