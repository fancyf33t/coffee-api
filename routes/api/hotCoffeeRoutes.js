const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// all hot coffee
// localhost:3000/coffee/hot
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/coffee/hot'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/hot-home', {
                title: 'All Hot Coffee',
                name: 'Coffee List',
                data
            })
        })
})

// single-hot-coffee
// localhost:3000/coffee/hot/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/coffee/hot/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/hot-single', {
                    title: `${data.title}`,
                    name: `${data.title}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('Error', error)
        })
})

module.exports = router