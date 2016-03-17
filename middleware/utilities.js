var config = require('../config');
//the other functions or you could put this at the top
exports.templateRoutes = function templateRoutes(req, res, next){
    res.locals.routes = config.routes;
    next();
};

module.exports.authenticated=function authenticated(req,res,next) {

    if(req.session!==undefined&&req.session!==null) {
        res.locals.isAuthenticated=req.session.isAuthenticated;
        if(req.session.isAuthenticated) {
            var user=req.session.user;
            for(var index in user) {
                console.log(index + "," + user[index]);
            }

            console.log("============store user in res"+","+req.session.user);
            res.locals.user=req.session.user;
        }
    }

    next();
};

module.exports.requireAuthentication=function requireAuthentication(req,res,next) {
    console.log("isAuthenticated=" + req.session.isAuthenticated);
    if(req.session.isAuthenticated) {
        next();
    }else{
        res.redirect('/login');
    }
};

module.exports.auth=function auth(username,password,session) {
    var isAuth=username==='joshua'||username==='brian'||username==='dandingol03';
    console.log("==============auth");
    if(isAuth) {
        console.log("==============auth");
        session.isAuthenticated=isAuth;
        session.user = {username: username};
    }
    return isAuth;
};
