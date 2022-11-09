const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Forum = require('../models/Forum')
const User = require('../models/User')

//@dec    Dashboard
// @route GET /dashboard
router.get('/', ensureAuth, async(req, res) =>{
    try {
        const forums = await Forum.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            layout: 'loggedin',
            name: req.user.firstName,
            forums,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})

//@desc   User Forum
//@route  GET /forum/user/:userId
router.get('/', ensureAuth, async (req, res) =>{
    try {
        const posts = await Forum.find({
            user: req.params.userId,
        })
        .populate('user')
        .lean()

        res.render('dashboard'), {
            posts,
            layout: 'loggedin'
        }
    } catch (err) {
        console.errorr(err)
        res.render('error/500')
    }
})

//@desc    Show all forum
//@route  GET /forum
router.get('/', ensureAuth, async (req, res) => {
    try {
        const posts = await Forum.find()
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()
        res.render('dashboard', {
            layout: 'loggedin',
            posts,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

/*router.get('/dashboard', ensureAuth, async(req, res) =>{
    try {
        const previousMenstration = await Cycle.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            previousMenstration,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})

router.get('/dashboard', ensureAuth, async(req, res) =>{
    try {
        const currentMenstration = await Cycle.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            currentMenstration,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})

router.get('/dashboard', ensureAuth, async(req, res) =>{
    try {
        const predictedMenstration = await Cycle.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            predictedMenstration,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})*/



module.exports = router