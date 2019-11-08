
var CSRF = {

    /**
     * @api {get} /token/clientrsa.html B交换公钥并返回CSRF✔
     * @apiDescription 根据服务器端公钥解密客户端公钥，并且返回客户端CSRF令牌
     * @apiVersion 1.0.0
     * @apiGroup AsscessToken
     * @apiParam {string} pubkey2  客户端随机生成的公钥（用服务器端的公钥加密）
     * @apiSuccessExample {string} Response
     *  1qgNgou2-BAF6FDSnb2a3vysGYkagZXhjgYo
     */
    csrfToken: function (req, res, next) {

        console.log(req.session.id);

        try {

            // if (req.session.prikey1) {

            //     var priKey = new NodeRSA(req.session.prikey1, 'pkcs8-private');//导入私钥

            //     var decrypted = priKey.decrypt(req.query.pubkey2, 'utf8');

            //     req.session.pubkey2 = decrypted;

            if (!req.session.current_csrf) {

                var csrf = req.csrfToken ? req.csrfToken() : null;

                req.session.current_csrf = csrf;

            }

            console.log('=====CSRF====:'+req.session.current_csrf);
            return res.send(req.session.current_csrf);

            //}

        } catch (e) {

            console.log(e);

        } finally {



        }

        res.status(403);

        return res.send("!!!Unsecure links!!!");


    }


}

module.exports = exports = CSRF;