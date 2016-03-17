/**
 * Created by outstudio on 16/3/17.
 */

module.exports.index=index;
module.exports.login=login;
module.exports.loginProcess=loginProcess;
module.exports.chat=chat;



function index(req,res) {
    res.render("index");
}
function login(req,res) {
    res.send("login");
}
function loginProcess(req,res) {
    res.redirect('/');


}
function chat(req,res) {
    res.send("chat");
}

