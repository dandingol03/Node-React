/**
 * Created by outstudio on 16/3/17.
 */

module.exports.index=index;
module.exports.login=login;
module.exports.loginProcess=loginProcess;
module.exports.chat=chat;



function index(req,res) {
    var cookies=req.cookies;
    res.cookie('indexCookie', 'this was set from index ');

    res.render("index",{layout:'layout',title:'node app',
        cookie:JSON.stringify(cookies),session:JSON.stringify(req.session)});

}
function login(req,res) {
    var csrfToken=req.csrfToken();
    console.log("csrfToken=" + csrfToken);
    res.render("login",{layout:'layout',title:'whatever',csrfToken: csrfToken,req:req});

}
function loginProcess(req,res) {

    console.log("we have pass the csrf authentication");
    console.log("username=" + req.body.username);
    console.log("password=" + req.body.password);
    if(req.body.username=="dandingol03"&&req.body.password=="kobebra03") {
        res.render('authentic',{layout:'layout',title:'whatever'});
    }
    else
        res.send("authentic failed");

}
function chat(req,res) {
    res.send("chat");
}

