const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/github/failure',
  }),
  (req, res) => {
    res.redirect('/auth/github/success');
  }
);

router.get('/github/success', (req, res) => {
  res.send(`Welcome ${req.user.username}!`);
});

router.get('/github/failure', (req, res) => {
  res.send('Failed to authenticate.');
});

module.exports = router;
 
