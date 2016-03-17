
/**
 * require modules
 * @type {*|exports|module.exports}
 */


var express=require('express');
var app=express();
var partials=require('express-partials');
var routes=require('./routes/');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var session = require('express-session');
var util = require('./middleware/utilities');
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
var flash = require('connect-flash');



/**
 * this doesn't work!!!!
 */
/*
var RedisStore=require('connect-redis')(session);
 */

/**
 * 模快partials引入
 * 1.设置公共页面主体
 *  res.render('iframe')==res.render('iframe',{layout:'layout'});
 * 2.取消主体引入
 *  res.render('iframe',{layout:false});
 * 3.替代默认主题引入
 *  res.render('iframe',{layout:'mobile'});
 */
app.use(partials());

app.use(log.logger);
app.set('view engine', 'ejs');
app.set("view options",{defaultLayout:'layout'});
app.use(express.static(__dirname + '/static'));
/**
 * 模快cookie-parser引入，目的是方便使用cookie?
 * 1.give access to req.cookies
 * 2.cookie:{cookieName:cookieValue}
 * 3.cookie can hold session
 */
app.use(cookieParser());
app.use(bodyParser());

app.use(csrf({ cookie: true }));


/**
 * 模快csrf引入，防止跨域攻击
 */


/**
 * 模快express-session引入
 * 1.cookie is the parent of session
 * 2.此处在session设置了键值对:
 *  secret:'secret',开启secret选项后将会自动生成secret id,以免坏人temper it
 * 3.session可以存储键值对，不过此例中没有实现
 * 4.session引入redis:
 *
 */
app.use(session(
    {
        secret           : 'secret',
        saveUninitialized: true,
        resave           : true
    }
));

app.use(util.authenticated);
app.use(flash());
/**
 * 1.get和use模快印入时，不要在模快名后加()
 * 2.get(),this method only match data transfered by get methods,
 *  u can choose
 */
app.get("/", routes.index);

app.post("/authentic.do",csrfProtection,routes.loginProcess);
app.get("/login", routes.login);
app.get('/chat',[util.requireAuthentication],routes.chat);
app.get('/logout', routes.logOut);
app.use(errorHandlers.notfound);
app.listen(3000);
console.log("app server running on port 3000");