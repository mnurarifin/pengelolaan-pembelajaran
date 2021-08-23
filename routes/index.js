/*
* GET home page.
*/

exports.index = function(req, res){
    var message = '';
  res.render('index',{message: message});
};

exports.form_login = function(req, res){
  var message = '';
res.render('form_login',{message: message});
};

exports.login = function(req, res){
  var message = '';
res.render('form_login',{message: message});
};

exports.coba_owl = function(req, res){
  var message = '';
res.render('coba_owl',{message: message});
};

exports.about = function(req, res){
  var message = '';
res.render('aboutus.ejs');
};