const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')


//@dec    Home page
// @route GET /

router.get('/', (req, res) => {
    res.render('index')
})

//@dec    Login/Landing page
// @route GET /login
router.get('/login', (req, res) =>{
    res.render('login', {
        layout: 'login'
    })
})

//@dec    Period Calender/Tracker Page
// @route GET /periodtrackersample
router.get('/periodtrackersample', (req, res) =>{
    res.render('periodtrackersample')
})

//@dec    About Page
// @route GET /about
router.get('/about', (req, res) =>{
    res.render('about')
})

module.exports = router