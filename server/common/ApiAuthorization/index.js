const result = require('../../config/index').result;
const codeState = require('../../config/codeState');
const HttpApi = require('../../config/index').HttpApi;
const TokenUserPwd = require('../../config/index').TokenUserPwd;
const request = require('request');
const DEBUGGER = require('../../config/index').DEBUGGER;
const log = require('../log4js/index');

var ApiAuth = {
    Auth: function (req, res, next) {
        
        if (!DEBUGGER(req)) {

            if ((req.path !== '/api/token/rsa' && req.path !== '/api/token/clientrsa' && req.method == 'POST') || req.path.indexOf('/api/forword') > -1) {

                request({
                    url: HttpApi.ApiAuthorization,
                    method: "POST",
                    json: true,
                    form: TokenUserPwd
                }, function (error, response, body) {

                    console.log(`ApiAuth - : ${JSON.stringify(body)}`);

                    if (body && body.success) {

                        req.session.Authorization = "Bearer " + body.result;

                    } else {

                        req.session.Authorization = null;

                    }

                    next();

                });


            } else {
                next();
            }
        } else {

            return next();

        }
    }
};


module.exports = exports = ApiAuth;