const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Forum = require('../models/Forum')
const User = require('../models/User')

//@desc    Show add page
//@route  GET /forum/add
router.get('/add', ensureAuth, (req, res) =>{
    res.render('forum/add', {
        layout: 'loggedin'
    })
})

//@desc    Process add forum
//@route  POST /forum
router.post('/', ensureAuth, async (req, res) =>{
    try {
        req.body.user = req.user.id
        await Forum.create(req.body)
        res.redirect('/forum')
    } catch (error) {
        console.error(err)
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
        res.render('forum/index', {
            layout: 'loggedin',
            posts,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc    Show single forum post
//@route  GET /forum/:id
router.get('/:id', ensureAuth, async (req, res) =>{
    try {
        let post = await Forum.findById(req.params.id)
        .populate('user')
        .lean()
        if(!post){
            return res.render('error/404')
        }
        res.render('forum/show',{
            post,
            layout: 'loggedin'
        })
    } catch (err) {
        console.error(err)
        res.render('error/404')
    }  
})


//@desc    Show edit page
//@route  GET /forum/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) =>{
    try {
        const post = await Forum.findOne({
            _id: req.params.id
        }).lean()
    
        if(!post){
            return res.render('error/404')
        }
        if(post.user != req.user.id){
            res.redirect('/forum')
        }else{
            res.render('forum/edit', {
                post,
                layout: 'loggedin'
            })
        } 
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

//@desc    Update forum post
//@route   PUT /forum/:id
router.put('/:id', ensureAuth, async (req, res) =>{
    try {
        let post = await Forum.findById(req.params.id).lean()

        if(!post){
            return res.render('error/404')
        }
        
        if (post.user != req.user.id){
            res.redirect('/dashboard')
        }else{
           post = await Forum.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
           })
    
           res.redirect('/forum')
        }
        
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})
//@desc   Delete Forum
//@route  DELETE /forum/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
      let post = await Forum.findById(req.params.id).lean()
  
      if (!post) {
        return res.render('error/404')
      }
  
      if (post.user != req.user.id) {
        res.redirect('/dashboard')
      } else {
        await Forum.remove({ _id: req.params.id })
        res.redirect('/forum')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
  
//@desc   User Forum
//@route  GET /forum/user/:userId
/*router.get('/user/:userId', ensureAuth, async (req, res) =>{
    try {
        const post = await Forum.find({
            user: req.params.userId,
        })
        .populate('user')
        .lean()

        res.render('forum/index'), {
            post,
            layout: 'loggedin'
        }
    } catch (err) {
        console.errorr(err)
        res.render('error/500')
    }
})*/

module.exports = router