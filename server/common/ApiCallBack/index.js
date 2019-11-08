const log = require('../log4js');
const ResultFactory = require('../ResultFactory');
const config = require('../../config/index')
const result = require('../../config/index').result;
const uuidv1 = require('uuid/v1');
const fs = require('fs');

/**
 * @param req 请求对象
 * @param res 响应对象
 * @param __this 当前API
 * @param _client params 请求参数，默认为 {} | method 提交方式，默认POST | notNeedRsa 是否RSA，默认true 不需要
 * @return Promise形式返回Request
*/
//async function ApiCall(req, res, __this, params = {}, method = 'POST', notNeedRsa = true) {
async function ApiCall(req, res, __this, _client = {}) {

    var __log = __this.option.url.toLowerCase().indexOf('backstagemanage') > -1 ? log.logger_background : log.logger, _objResult = '';

    var uri = `${req.baseUrl}${req.path}`;

    // if (config.FrequentRoute.indexOf(uri) > -1) {

    //     if (req.session.sendtimes && req.session.sendtimes === 1) {

    //         _objResult = ResultFactory.ResultFormartCustomer(req, '操作过于频繁，请稍后再试！');

    //         return res.send(_objResult);

    //     }
    // }

    try {


        var notNeedRsa = _client.notNeedRsa || true;

        var body = await __this(req, _client);

        var uri = `${req.baseUrl}${req.path}`;

        // if (config.FrequentRoute.indexOf(uri) > -1) {
        //     //短信设置1分钟后才能重新提交
        //     req.session.sendtimes = 1;
        //     req.session.cookie.expires = new Date(Date.now() + (60 * 1000 * config.FrequentRouteInterval));
        // }

        console.log(`${uri} - ${__this.option.url} End SessionId: ${req.session.id}`);

        console.timeEnd(`${uri} - ${__this.option.url} / ${req.session.id}`);

        __log.info(`${uri} - ${__this.option.url} End: ${JSON.stringify(body)} SessionId: ${req.session.id} \n`);

        _objResult = ResultFactory.ResultFormartBack(result, body, req, notNeedRsa);

        console.log(`==========${uri} - body begin==================`);

        console.log(`${uri} - Response：${JSON.stringify(body)}`);

        console.log(`======${uri} - body ========================`);


    } catch (err) {

        console.error(err);

        var ct = JSON.stringify(err.error);

        var __err = err.error;

        if (!__err) {

            console.log(`err.error-----------------------------------------------------------------------:${JSON.stringify(err)}`);

            __err = { Success: false, success: false, code: "-1", Error: { message: "请重新进入！" }, error: { message: "请重新进入！" } };

        }

        console.error(`${req.baseUrl}${req.path} - Response：${ct}`);

        __log.error(`${ct}`);

        _objResult = ResultFactory.ResultFormartBack(result, __err, req, notNeedRsa);

        console.timeEnd(`${req.baseUrl}${req.path} - ${__this.option.url} / ${req.session.id}`);

        //return res.send(_objResult);
    } finally {
        return res.send(_objResult);
    }




}

/**
 * @param req 请求对象
 * @param res 响应对象
 * @param __this 当前API
 * @param _client params 请求参数，默认为 {} | method 提交方式，默认POST | notNeedRsa 是否RSA，默认true 不需要
 * @return Promise形式返回Request
*/
function ApiCallUploadForm(req, res, __this, _client) {

    var __log = __this.option.url.toLowerCase().indexOf('backstagemanage') > -1 ? log.logger_background : log.logger;

    var params = _client.params || {}, method = _client.method || 'POST', notNeedRsa = _client.notNeedRsa || true;

    function fun_then(body) {

        console.log(`${req.baseUrl}${req.path} - ${__this.option.url} End SessionId: ${req.session.id}`);

        console.timeEnd(`${req.baseUrl}${req.path} - ${__this.option.url}`);

        __log.info(`${req.baseUrl}${req.path} - ${__this.option.url} End: ${JSON.stringify(body)} SessionId: ${req.session.id} \n`);

        var _objResult = ResultFactory.ResultFormartBack(result, body, req, notNeedRsa);

        console.log(`${req.baseUrl}${req.path} - Response：${JSON.stringify(body)}`);

        res.send(_objResult);

    }

    function fun_catch(err) {

        var ct = JSON.stringify(err.error);

        console.error(`${req.baseUrl}${req.path} - Response：${ct}`);

        __log.error(`${req.baseUrl}${req.path} - ${JSON.stringify(err.error)}`);

        var _objResult = ResultFactory.ResultFormartBack(result, err.error, req, notNeedRsa);

        console.timeEnd(__this.option.url);

        res.send(_objResult);
    }
    __this.uploadForm(req, fun_then, fun_catch, method)

}



async function ApiCallDownLoad(req, res, __this, _client = {}) {

    var __log = __this.option.url.toLowerCase().indexOf('backstagemanage') > -1 ? log.logger_background : log.logger;

    __log.info('start.');

    try {


        var notNeedRsa = _client.notNeedRsa || true;

        var body = await __this.downLoad(req, _client);

        try {
            var uuid = uuidv1();
            console.log('start download ...');
            let writeStream = fs.createWriteStream(`./tmp/${uuid}.xlsx`);
            //console.log(body)
            //Object.prototype.toString.call(body)==='[object String]' [object Buffer]
            writeStream.write(body, 'binary');
            writeStream.on('finish', () => {
                console.log('wrote all data to file end');
                return res.download(`./tmp/${uuid}.xlsx`);
            });
            console.timeEnd(__this.option.url);
            writeStream.end();

        } catch (e) {

            console.error(e);

            var _objResult = ResultFactory.ResultFormartBack(result, body, req, notNeedRsa);

            res.send(_objResult);

        }

    } catch (err) {

        console.error(err);

        var ct = JSON.stringify(err.error);

        console.error(`${req.baseUrl}${req.path} - Response：${ct}`);

        __log.error(`${ct}`);

        var _objResult = ResultFactory.ResultFormartBack(result, err.error, req, notNeedRsa);

        console.timeEnd(__this.option.url);

        res.send(_objResult);
    }



}



/**
 * @param __this 当前API
 * @param params 请求参数，默认为 {}
 * @param _client params 请求参数，默认为 {} | method 提交方式，默认POST | notNeedRsa 是否RSA，默认true 不需要
 * @return Promise形式返回Request
*/
function ApiCallMiddleWare(__this, _client) {

    return function (req, res, next) {

        ApiCall(req, res, __this, _client);

    }

}



/**
 * @param __this 当前API
 * @param _client params 请求参数，默认为 {} | method 提交方式，默认POST | notNeedRsa 是否RSA，默认true 不需要
 * @return Promise形式返回Request
*/
function ApiCallUploadFormMiddleWare(__this, _client) {

    return function (req, res, next) {

        ApiCallUploadForm(req, res, _client);

    }

}

/**
 * @param __this 当前API
 * @param _client params 请求参数，默认为 {} | method 提交方式，默认POST | notNeedRsa 是否RSA，默认true 不需要
 * @return Promise形式返回Request
*/
function ApiCallDownLoadMiddleWare(__this, _client) {

    return function (req, res, next) {

        ApiCallDownLoad(req, res, _client);

    }

}


module.exports = {
    ApiCall,
    ApiCallUploadForm,
    ApiCallDownLoad,
    ApiCallMiddleWare,
    ApiCallUploadFormMiddleWare,
    ApiCallDownLoadMiddleWare
}

