const Express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = new Express();
var RedisStore = require('connect-redis')(session);
const port = config.apiPort;
import AlipaySdk from 'alipay-sdk';
import fs from 'fs';


const options = {
    host: config.redis.host,
    port: config.redis.port,
    db: config.redis.db
};


console.log('process.env.NODE_ENV:' + process.env.NODE_ENV);

app.use(bodyParser.json({ limit: "500000kb" })); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,//添加这行
    store: new RedisStore(options),
    secret: 'pgyer',
    resave: true,
    proxy: true,
    //name: 'pgyerpo',
    cookie: { maxAge: config.CookieExpire, HttpOnly: true, secure: false }//过期时间。secure: false, HttpOnly: true, signed: true    https下 secure 设置为true 起作用
    //cookie: { maxAge: 60 * 1000 * 60 * 10, HttpOnly: true }//过期时间。secure: false, HttpOnly: true, signed: true    https下 secure 设置为true 起作用
}));




//500异常
app.use(function (err, req, res, next) {
    return res.status(500).send(err);
});



app.listen(port, function (err) {
    if (err) {
        console.error('err:', err);
    } else {
        var _content = `===> api server is running at at http://${config.apiHost}:${config.apiPort}`;
        console.info(_content);
    }
});



const alipaySdk = new AlipaySdk({
    appId: '2019103068796057',
    privateKey: fs.readFileSync('./private-key.pem', 'ascii'),
});
