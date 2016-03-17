/**
 * Created by outstudio on 16/3/17.
 */

module.exports.index=index;
module.exports.login=login;
module.exports.loginProcess=loginProcess;
module.exports.chat=chat;
module.exports.logOut=logOut;

var util = require('../middleware/utilities');

function index(req,res) {
    var cookies=req.cookies;
    res.cookie('indexCookie', 'this was set from index ');

    res.render("index",{layout:'layout',title:'node app',
        cookie:JSON.stringify(cookies),session:JSON.stringify(req.session)});

}
function login(req,res) {
    var csrfToken=req.csrfToken();
    console.log("csrfToken=" + csrfToken);
    res.render("login",{title:'whatever',csrfToken: csrfToken,
        message : req.flash('error')});

}
function loginProcess(req,res) {
    var isAuth = util.auth(req.body.username, req.body.password,
        req.session);
    if(isAuth) {
        res.redirect('/chat');
    }
    else{
        req.flash('error', 'Wrong Username or Password');
        res.redirect('/login');
    }

}

function chat(req, res){
    res.render('chat', {title: 'Chat'});
};

function logOut(req,res) {
    util.logOut(req.session);
    res.redirect('/');
}
