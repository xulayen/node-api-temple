const NodeRSA = require('node-rsa');
const result = require('../../config/index').result;
const codeState = require('../../config/codeState');
const DEBUGGER = require('../../config/index').DEBUGGER;

var RSA = {

    paramter: function (req, res, next) {

        if (!DEBUGGER(req)) {

            result.success = false;

            result.code = codeState.AUTHORIZATION.code();

            result.result = codeState.AUTHORIZATION.result();

            result.data = null;

            if (req.path !== '/api/token/rsa.html' && req.path !== '/api/token/clientrsa.html' && req.method == 'POST') {

                if (!req.session.prikey1) {

                    return res.send(result);

                }

                var _ct = {};

                var ed = req.body.encrypted, decrypted;

                if (ed) {



                    var priKey = new NodeRSA(req.session.prikey1, 'pkcs8-private');//导入私钥

                    try {
                        decrypted = priKey.decrypt(ed, 'utf8');
                    } catch (e) {
     
                    }


                } else {

                    decrypted = 'overrite';

                }

                _ct._csrf = req.body._csrf;

                req.body = _ct;

                if (decrypted === 'overrite') {

                    return next();

                } else if (decrypted) {

                    _ct.decrypted = JSON.parse(decrypted);

                    return next();

                } else {

                    return res.send(result);

                }

                console.log('解密' + decrypted);

            } else {

                return next();

            }

        } else {

            return next();

        }
    }


}

module.exports = exports = RSA;