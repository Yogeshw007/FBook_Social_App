const express = require('express');
const passport = require('passport');

const router = require('express').Router();

const usersController = require('../controllers/users_controller');

router.get('/signin', usersController.signIn);
router.get('/signup', usersController.signUp);
router.post('/create', usersController.createUser);
router.get('/profile/:id', usersController.profile);
router.get('/signout', usersController.destroySession);

router.post('/add-friend', usersController.addFriendRequest);
router.post('/accept-friend', usersController.acceptFriendRequest);
router.post('/remove-friend', usersController.removeFriend);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/users/sign-in' }), usersController.createSession);

router.post('/create-session', passport.authenticate(
    'local', // passport strategy
    { failureRedirect: '/users/signin' }, // if failes to authenticate then path user needs to land on
), usersController.createSession);

module.exports = router;