const rp = require('request-promise');
const log = require('../../common/log4js');
const SelfCookie = require('../../common/SetCookie');
const config = require('../../config/index');
const DEBUGGER = require('../../config/index').DEBUGGER;
var formidable = require('formidable');
const Client = require('../../common/ClientIP');
const redisClient = require('../../common/redis');
const qqwry = require('../../common/IPqqwry');
var fs = require('fs');

function iparea(clientIp, uri) {
    if(clientIp.indexOf('::1') >-1) return "本机";
    var mulips = clientIp.split(','), ip;
    if (mulips.length === 3) {
        ip = mulips[1].trim();
    } else {
        ip = mulips[0].trim();
    }
    var ip1 = qqwry.searchIP(ip);

    console.log(`${uri} - clientIp:${clientIp} Country:${ip1.Country} Area:${ip1.Area}`);
}

class Generator {
    constructor(HttpApis) {
        //recursion dynamic construction
        return this.Stack(HttpApis);
    }

    setMethodWithUri(option) {

        var __log = option.url.toLowerCase().indexOf('backstagemanage') > -1 ? log.logger_background : log.logger;

        //return async (req, params = {}, method = 'POST', notNeedRsa = true) => {
        return async (req, _client) => {

            var params = _client.params || {},
                method = _client.method || 'POST',
                notNeedRsa = _client.notNeedRsa || true,

                _f = DEBUGGER(req, notNeedRsa) ? req.body : req.body,

                _f2 = req.query,

                //j = SelfCookie.SetUid(req, option.url),
                j = SelfCookie.SetAcCodeLanLon(req, option.url, _f.latitude || '', _f.longitude || '', _f.AcCode || ''),

                clientIp = Client.Ip(req),

                __params = Object.assign(params, (_f.decrypted || _f), _f2, this.PageRequest1(_f), this.PageRequest2(_f)),

                uri = `${req.baseUrl}${req.path}`;

            __log.info(`${uri} - ${option.url} Begin: ${JSON.stringify(__params)} clientIp: ${clientIp} SessionId: ${req.session.id}  ${JSON.stringify(req.cookies)} \n`);

            console.log(`${uri} - ${option.url} Begin SessionId: ${req.session.id} clientIp: ${clientIp}`);

            iparea(clientIp, uri);

            console.log(`${uri} - params：${JSON.stringify(__params)}`);

            console.time(`${uri} - ${option.url} / ${req.session.id}`);

            if (!req) {

                return;

            };

            console.log(`${uri} - req.session.Authorization：${req.session.Authorization}`)

            var reply = await redisClient.get(config.ApiTokenKey), _history;

            if (reply) {

                _history = "Bearer " + reply.Payload.replace(/\"/g, "");

                console.log(`${uri} - req.session.Authorization-history: ${JSON.stringify(reply)}`);

            }

            var __option = {
                url: option.url,
                method: method,
                json: true,
                headers: {
                    "content-type": "application/json",
                    "Authorization": req ? req.session.Authorization ? req.session.Authorization : _history : ''
                },
                form: __params,
                jar: j
            }

            return rp(__option);

        }
    }

    downLoad(option) {

        var __log = option.url.toLowerCase().indexOf('backstagemanage') > -1 ? log.logger_background : log.logger;

        return async (req, _client) => {

            var params = _client.params,
                method = _client.method,
                notNeedRsa = _client.notNeedRsa,

                _f = DEBUGGER(req, notNeedRsa) ? req.body : req.body,

                _f2 = req.query,

                //j = SelfCookie.SetUid(req, option.url),
                j = SelfCookie.SetAcCodeLanLon(req, option.url, _f.latitude || '', _f.longitude || '', _f.AcCode || ''),

                clientIp = Client.Ip(req),

                __params = Object.assign(params, (_f.decrypted || _f), _f2, this.PageRequest1(_f), this.PageRequest2(_f));

            __log.info(`${req.baseUrl}${req.path} - ${option.url} Begin: ${JSON.stringify(__params)} clientIp: ${clientIp} SessionId: ${req.session.id}  ${JSON.stringify(req.cookies)} \n`);

            console.log(`${req.baseUrl}${req.path} - ${option.url} Begin SessionId: ${req.session.id} clientIp: ${clientIp}`);

            console.log(`${req.baseUrl}${req.path} - clientIp:${clientIp}`);

            console.log(`${req.baseUrl}${req.path} - params：${JSON.stringify(__params)}`);

            console.time(`${req.baseUrl}${req.path} - ${option.url}`);

            if (!req) {

                return;

            };

            var __option = {
                url: option.url,
                method: method,
                json: true,
                encoding: "binary",
                headers: {
                    "content-type": 'application/json',
                    "Authorization": req ? req.session.Authorization : ''
                },
                form: __params,
                jar: j
            }

            return rp(__option);

        }
    }

    uploadForm(option) {

        var __log = option.url.toLowerCase().indexOf('backstagemanage') > -1 ? log.logger_background : log.logger;

        return async (req, _client) => {

            var params = _client.params,
                method = _client.method,
                notNeedRsa = _client.notNeedRsa;

            if (!req) {

                return;

            };

            var j = SelfCookie.SetUid(req, option.url),

                clientIp = Client.Ip(req);

            var form = new formidable.IncomingForm();

            form.maxFileSize = 200 * 1024 * 1024 * 1000;

            var t = {}, t2 = [];

            form.on('file', function (name, file) {
                t2.push(file);
            }).on('field', function (name, value) {
                t[name] = value;
            }).on('error', function (err) {
                console.log('error');
                console.log(err);
            }).on('end', function (cc) {
                var custom_file_array = [];
                for (var i in t2) {
                    console.log(t2[i]) // 879394
                    custom_file_array.push(
                        {
                            value: fs.createReadStream(t2[i].path),
                            options: {
                                filename: t2[i].name,
                                contentType: t2[i].type
                            }
                        }
                    )
                }

                var ___f = {
                    custom_file: custom_file_array,
                };

                var __params = Object.assign(___f, t);


                __log.info(`${req.baseUrl}${req.path} - ${option.url} Begin: ${JSON.stringify(__params)} clientIp: ${clientIp} SessionId: ${req.session.id}  ${JSON.stringify(req.cookies)} \n`);

                console.log(`${req.baseUrl}${req.path} - ${option.url} Begin SessionId: ${req.session.id} clientIp: ${clientIp}`);

                console.log(`${req.baseUrl}${req.path} - clientIp：${clientIp}`);

                console.log(`${req.baseUrl}${req.path} - params：${JSON.stringify(__params)}`);

                console.time(`${req.baseUrl}${req.path} - ${option.url}`);

                var __option = {
                    url: option.url,
                    method: method,
                    json: true,
                    headers: {
                        "content-type": "application/json",
                        "Authorization": req ? req.session.Authorization : ''
                    },
                    formData: __params,
                    jar: j
                }

                return rp(__option).then(func_then).catch(func_catch);

            })




            // 此段代码不能删除
            form.parse(req, function (err, fields, files) { });



        }
    }

    Stack(HttpApis) {

        for (var api in HttpApis) {

            if (Object.prototype.toString.call(HttpApis[api]) === "[object String]") {

                var __option = {
                    url: HttpApis[api],
                    method: 'POST'
                }

                HttpApis[api] = this.setMethodWithUri(__option);
                HttpApis[api].uploadForm = this.uploadForm(__option);
                HttpApis[api].downLoad = this.downLoad(__option);
                HttpApis[api].option = __option;

            } else if (Object.prototype.toString.call(HttpApis[api]) === "[object Object]") {

                this.Stack(HttpApis[api]);

            }

        }

        return HttpApis;

    }

    PageRequest1(_f) {

        //接口统一参数
        var pageIndex = 1, pageNum = 10;

        if (_f.pageIndex) {
            pageIndex = parseInt(_f.pageIndex);
        }

        if (_f.pageNum) {
            pageNum = parseInt(_f.pageNum);
        }

        _f.PagedRequest = {};

        _f.PagedRequest.MaxResultCount = pageNum;

        _f.PagedRequest.SkipCount = (pageIndex - 1) * pageNum;

        _f.DateTimeRange = {};

        _f.DateTimeRange.StartTime = _f.StartTime;

        _f.DateTimeRange.EndTime = _f.EndTime;

        return _f;
    }

    PageRequest2(_f) {

        //接口统一参数
        var pageIndex = 1, pageNum = 10;

        if (_f.pageIndex) {
            _f.index = _f.pageIndex;
        }
        else {
            _f.index = pageIndex;
        }


        if (_f.pageNum) {
            _f.PageSize = _f.pageNum;
        }
        else {
            _f.PageSize = pageNum;
        }

        return _f;
    }
}

module.exports = Generator;