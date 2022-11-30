const express = require('express');
const router = express.Router();
const passport = require('../config/passport_local_strategy');

const commentsController = require('../controllers/comments_controller');

router.post('/add/:id', passport.checkAuthentication, commentsController.addComment);
router.post('/add-reaction/:id', passport.checkAuthentication, commentsController.addReaction);

module.exports = router;