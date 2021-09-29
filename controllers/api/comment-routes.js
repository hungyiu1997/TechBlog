const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// URL: /api/comment
router.post('/', withAuth, async (req, res) => {
  console.log("GET /");
  try {
    const newComment = await Comment.create({
      // TODO: COMMENT BODY IN REQUEST USING SPREAD
      // use it to break an object apart, and arrays
      ...req.body,
      user_id:req.session.user_id,

      // TODO: SET USERID userId TO SESSION LOGGEDIN USERID
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
