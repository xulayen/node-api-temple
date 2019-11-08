const result = require('../../config/index').result;
const codeState = require('../../config/codeState');
const config = require('../../config/index');
const HttpApi = require('../../config/index').HttpApi;
const TokenUserPwd = require('../../config/index').TokenUserPwd;
const request = require('request');
const DEBUGGER = require('../../config/index').DEBUGGER;
const log = require('../log4js/index');
const client = require("../redis");

const rp = require('request-promise');

async function refreshToken(req, res, next) {

    return rp({
        url: HttpApi.ApiAuthorization,
        method: "POST",
        json: true,
        form: TokenUserPwd
    });
}

var ApiAuth = {
    Auth: async function (req, res, next) {


        if (!DEBUGGER(req)) {

            if ((req.path !== '/api/token/rsa' && req.path !== '/api/token/clientrsa' && req.method == 'POST') || req.path.indexOf('/api/forword') > -1) {

                var reply = await client.get(config.ApiTokenKey);

                console.log(`ApiAuth - : ${JSON.stringify(reply)}`);

                if (reply) {
                    console.log('ApiAuth - 缓存获取token');

                    console.log(`ApiAuth - reply：${JSON.stringify(reply)}`);

                    var _history = "Bearer " + reply.Payload.replace(/\"/g, "");

                    if (req.session.Authorization !== _history) {

                        console.log(`ApiAuth - 刷新当前会话 ${req.session.id} token`);

                        req.session.Authorization = _history;

                    }

                } else {

                    try {
                        
                        console.log('ApiAuth - token不存在，重新获取token');
                        var body = await refreshToken(req, res, next);

                        console.log(`ApiAuth - : ${JSON.stringify(body)}`);

                        if (body && body.success) {

                            req.session.Authorization = "Bearer " + body.result;

                        } else {

                            req.session.Authorization = null;

                        }

                        console.log('ApiAuth - 重新获取token 结束');
                    } catch (e) {
                        
                        console.log('+++++++ApiAuth+++++++Error');
                        console.error(e);
                        console.log('+++++++ApiAuth end+++++++Error');

                    }
                    return next();



                }

                return next();


            } else {
                return next();
            }
        } else {

            return next();

        }
    }
};


module.exports = exports = ApiAuth;