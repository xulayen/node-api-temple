

const path = require('path');
const Express = require('express');
const httpProxy = require('http-proxy');
const compression = require('compression');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const config = require('./config');
const app = new Express();
const port = config.port;
const helmet = require('helmet');

const client = require('./common/ClientIP');

var options = {
    maxAge: 315360000000
};

app.use(compression());

if (config.helmetEable)
    //头部安全策略
    app.use(helmet(config.helmet));

/**
 * 设置代理服务器
 */
app.use(function (req, res, next) {

    console.log('server.js前端服务获取的客户端ip： ' + req.ip);

    if (req.path.indexOf('api') > -1 && req.path.indexOf('js') < 0 && req.path.indexOf('css') < 0) {

        const targetUrl = `http://${config.apiHost}:${config.apiPort}`;

        const proxy = httpProxy.createProxyServer({
            target: targetUrl,
            headers: {
                'x-forwarded-for': req.ip.match(/([\w\.]+)/g)[1]
            }
        });

        proxy.web(req, res);
        return;
    }
    // else{
    //     res.writeHead(404);
    //     res.end(null);
    // }
    next();
});

app.use('/', connectHistoryApiFallback());
app.use('/', Express.static(path.join(__dirname, "..", 'build'), options));
//app.use('/', Express.static(path.join(__dirname, "..", 'DOC'), options));




app.listen(port, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`);
    }
});
