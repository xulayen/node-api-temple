const request = require('request');
const client = require('../ClientIP');

var SelfCookie = {

    SetUid: function (req, url) {

        if (!req) return;

        var uid = req.cookies.uid;

        var j = request.jar();

        if (uid) {

            var cookie = request.cookie('uid=' + uid);

            j.setCookie(cookie, url);

        }

        debugger;
        var clientip = client.Ip(req);

        if (clientip) {

            console.log('clientip:' + clientip);

            var cookie2 = request.cookie('ip=' + clientip);

            j.setCookie(cookie2, url);
        }


        return j;

    },
    SetAcCodeLanLon: function (req, url, lan, lon, accode) {

        if (!req) return;

        var uid = req.cookies.uid;

        var j = request.jar();

        var cookie1, cookie2, cookie3, cookie4;

        if (uid) {

            cookie1 = request.cookie('uid=' + uid);

            j.setCookie(cookie1, url);

        }

        if (lan || lon) {

            cookie2 = request.cookie('gps=' + (lon + ',' + lan));


            j.setCookie(cookie2, url);

        }

        if (accode) {

            cookie3 = request.cookie('accode=' + accode);

            j.setCookie(cookie3, url);

        }


        var clientip = client.Ip(req);

        if (clientip) {

            cookie4 = request.cookie('ip=' + clientip);

            j.setCookie(cookie4, url);
        }

        return j;

    }

};

module.exports = exports = SelfCookie;