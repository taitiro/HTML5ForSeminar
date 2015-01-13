var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/movie', function(req, res) {
  res.render('movie', { title: 'Express' });
});

module.exports = router;
