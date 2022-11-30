const express = require('express');
const router = express.Router();
const passport = require('../config/passport_local_strategy');

const postsController = require('../controllers/posts_controller');

router.get('/', passport.checkAuthentication, postsController.posts);
router.get('/create-post', passport.checkAuthentication, postsController.createPost);
router.post('/add-post', passport.checkAuthentication, postsController.addPost);

module.exports = router;