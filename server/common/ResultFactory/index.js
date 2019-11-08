const DEBUGGER = require('../../config/index').DEBUGGER;
const codeState = require('../../config/codeState');
//const NodeRSA = require('node-rsa');
//const key = new NodeRSA({ b: 1024 });

var ResultFactory = {
    ResultFormart: function (result, body, req, notRsa) {

        if (!body.hasOwnProperty('code')) {
            return body;
        }

        var pubKey, encrypted, result;


        if (!body) {

            result.code = codeState.CUSTOMERROR.code();
            result.result = codeState.CUSTOMERROR.result('has exception!');

            return result;
        }



        result.code = codeState.CUSTOMERROR.code();
        result.result = codeState.CUSTOMERROR.result('has exception!');
        result.details = [];
        result.data = null;

        if (body.success !== undefined) {
            result.success = body.success;
        }

        if (body.Success !== undefined) {
            result.success = body.Success;
        }

        result.code = codeState.SUCCESS.code();
        result.result = codeState.SUCCESS.result();

        if (body && body.error) {

            result.code = body.error.code;
            result.result = body.error.message;
            result.details = body.error.validationErrors;

        } else if (body && body.Error) {

            result.code = body.Error.Code;
            result.result = body.Error.Message;
            result.details = body.Error.ValidationErrors;

        } else {

            result.code = body.code;
            result.result = "success";

        }

        if (body && body.result) {
            result.data = body.result;
        }

        if (body && body.Result) {
            result.data = body.Result;
        }

        if (!DEBUGGER(req) && !notRsa) {

            try {

                // pubKey = new NodeRSA(req.session.pubkey2, 'pkcs8-public');//导入客户端公钥

                // encrypted = pubKey.encrypt(result, 'base64');//加密

                // result = encrypted;
            }
            catch (e) {

            }
        }


        return result;

    },
    ResultFormartBack: function (result, body, req, notRsa) {

        if (!body.hasOwnProperty('code')) {
            return body;
        }


        var result, pubKey, encrypted;


        result.code = codeState.CUSTOMERROR.code();
        result.result = codeState.CUSTOMERROR.result('has exception!');
        result.details = [];
        result.data = null;


        if (!body) {

            result.code = codeState.CUSTOMERROR.code();
            result.result = codeState.CUSTOMERROR.result('has exception!');

            return result;
        }


        if (body.success !== undefined) {
            result.success = body.success;
        }

        if (body.Success !== undefined) {
            result.success = body.Success;
        }

        result.code = codeState.SUCCESS.code();
        result.result = codeState.SUCCESS.result();

        result.data = null;

        if (body && body.error) {

            result.code = body.error.code;
            result.result = body.error.message;
            result.details = body.error.validationErrors;

        } else if (body && body.Error) {

            result.code = body.Error.Code;
            result.result = body.Error.Message;
            result.details = body.Error.ValidationErrors;

        } else {

            result.code = body.code;
            result.result = "success";

        }

        if (body && body.Result) {
            result.data = body.Result;
        }

        if (body && body.result) {
            result.data = body.result;
        }

        if (!DEBUGGER(req) && !notRsa) {

            try {

                // pubKey = new NodeRSA(req.session.pubkey2, 'pkcs8-public');//导入客户端公钥

                // encrypted = pubKey.encrypt(result, 'base64');//加密

                // result = encrypted;
            }
            catch (e) {

                console.log(e);

            }
        }



        return result;

    },
    ResultFormartCustomer: function (req, message) {

        console.warn(message);

        var _b = { Success: false, success: false, error: { message: codeState.CUSTOMERROR.result(message), code: codeState.CUSTOMERROR.code() } };

        return ResultFactory.ResultFormart({}, _b, req, true);

    }
}

module.exports = exports = ResultFactory;
