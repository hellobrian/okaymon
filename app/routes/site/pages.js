var express = require('express'),
    pageRouter = express.Router(),
    request = require('request');

pageRouter.route('/').get(function (req, res) {
  res.render('index', {layout: 'main-template'});    
});

module.exports = pageRouter;