const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// all coffee
// localhost:3000/home
router.get('/home', (req, res) => {
    const url = `http://localhost:${PORT}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Home',
                name: 'All coffee',
                data
            })
        })
})

module.exports = router