var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'ふれいま牧場' });
});

router.get('/movie', function(req, res) {
  res.render('movie', { title: 'ふれいま動画' });
});


module.exports = router;
