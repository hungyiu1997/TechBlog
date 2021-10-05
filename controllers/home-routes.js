const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  console.log("GET /");
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  console.log("GET /post/:id");
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User],
    }

    );

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('single-post', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log("GET /post/:id", err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  console.log("GET /login");
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  console.log("GET /signup");
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
