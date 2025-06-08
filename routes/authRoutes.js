const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github/failure' }),
  (req, res) => {
    res.redirect('/auth/github/success');
  }
);

router.get('/github/success', (req, res) => {
  res.send(`Login successful. Welcome, ${req.user.username}`);
});

router.get('/github/failure', (req, res) => {
  res.send('Login failed. Please try again.');
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.send('You have been logged out.');
  });
});

module.exports = router;
