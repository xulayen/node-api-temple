var crypto = require("crypto");

const secret = "pgyer.yesno.com.cn";

var token = {
    createToken: function (obj, req, res) {
        var obj2 = {
            data: obj,//payload
            created: parseInt(Date.now() / 1000) //token生成的时间的，单位秒
        };

        //payload信息
        var base64Str = Buffer.from(JSON.stringify(obj2), "utf8").toString("base64");

        //添加签名，防篡改
        var hash = crypto.createHmac('sha256', secret);
        hash.update(base64Str);
        var signature = hash.digest('base64');

        var _token = base64Str + "." + signature;

        req.session.NodejsToken = _token;

        return _token;
    },
    decodeToken: function (req, res, n) {

        if(!req.session.NodejsToken){
            return false;
        }

        var decArr = req.session.NodejsToken.split(".");

        if (decArr.length < 2) {
            //token不合法
            return false;
        }

        var payload = {};
        //将payload json字符串 解析为对象
        try {

            payload = JSON.parse(Buffer.from(decArr[0], "base64").toString("utf8"));

            if (!n) {
                req.session.NodejsToken = null;
            }

        } catch (e) {
            return false;
        }

        //检验签名

        var hash = crypto.createHmac('sha256', secret);
        hash.update(decArr[0]);
        var checkSignature = hash.digest('base64');

        return {
            payload: payload,
            signature: decArr[1],
            checkSignature: checkSignature
        }
    },
    checkToken: function (token, req, res) {
        var resDecode = this.decodeToken(req, res, true);
        if (!resDecode || !req.session.NodejsToken || req.session.NodejsToken != token) {
            return false;
        }

        if (resDecode.signature === resDecode.checkSignature) {
            return true;
        }
        return false;
    }

}
module.exports = exports = token;