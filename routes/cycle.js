const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

const Cycle = require('../models/Cycle')
const User = require('../models/User')

//@desc    Show all period cycles
//@route  GET /cycle

//STILL NEED TO CHANGE ASYNC AWAIT
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public'})
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()
        res.render('forum/index', {
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc    Update period cycle
//@route   PUT /cycle/:id

//STILL NEED TO CHANGE ASYNC AWAIT
router.put('/:id', ensureAuth, async (req, res) =>{
    try {
        let story = await Forum.findById(req.params.id).lean()

        if(!story){
            return res.render('error/404')
        }
        
        if (story.user != req.user.id){
            res.redirect('/forum')
        }else{
           story = await Story.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
           })
    
           res.redirect('/dashboard')
        }
        
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

//@desc   Delete period cyle
//@route  DELETE /cycle/:id

//STILL NEED TO CHANGE ASYNC AWAIT
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
      let story = await Story.findById(req.params.id).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/forum')
      } else {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

module.exports = router