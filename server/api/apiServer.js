const Express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = new Express();
var RedisStore = require('connect-redis')(session);
const port = config.apiPort;
import { api, ApiCall } from '../apicall';

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

/**
 * @api {get} /cc 测试✔
 * @apiDescription 前端主入口
 * @apiVersion 1.0.0
 * @apiSuccessExample {json}
 *      Success-Response:
 *      跳转至前端活动页面……
 * 
 * @apiErrorExample {json} 
 *      Error-Response:
 *      跳转至前端Error页面……
 * 
 * @apiGroup FrontEnd
 * @apiParam {string} customerid  客户编号
 * @apiParam {string} accode 数码
 * @apiParam {string} timestamp 时间戳
 * @apiParam {string} sign 签名,加密方式`md5(customerid+accode+token+timestamp)`；token为约定的值
 */
app.get('/api/c', function (req, res, next) {

    return ApiCall(req, res, api.validcode,{ method:'get'});

});
