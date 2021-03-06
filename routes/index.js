var http = require('http');
var url = require('url');
/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('index', { title: '首页' });
};

exports.user = function(req, res) {
};

exports.post = function(req, res) {

};

exports.reg = function(req, res) {
    res.render('reg', {title: '注册页面'});
};

exports.doReg = function(req, res) {

};

exports.login = function(req, res) {

};

exports.doLogin = function(req, res) {

};

exports.logout = function(req, res) {

};

exports.tv = function(req, res){
    res.render('tv/tv', {title: 'TV Page'});
};

exports.demos = function(req, res){
    res.render('tv/demos', {title: 'Demo Page'});
};

exports.testFlash = function(req, res){
    res.render('tv/testFlash', {title: 'flash test page'});
};

exports.movie = function(req, res){
    var query = url.parse(req.url).query;
    var tagId = query.split('=')[1];

    var options = {
        hostname: 'movie.zoneke.com',
        port: 80,
        path: '/tags/' + tagId + '/',
        method: 'GET'
    };

    var req2 = http.request(options, function(res2) {
        res2.pipe(res);
    });

    req.pipe(req2);

};

exports.list = function(req, res){
    res.render('tv/list', {title: '资源列表'})
};

exports.mdata = function(req, res){
    var query = url.parse(req.url).query;
    var id = query.split('=')[1];

    var options = {
        hostname: 'movie.zoneke.com',
        port: 80,
        path: '/api/v0/movies/'+ id,
        method: 'GET'
    };

    var req2 = http.request(options, function(res2) {
        res2.pipe(res);
    });

    req.pipe(req2);
}