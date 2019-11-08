const log = require('../log4js');
var safe = require('safe-regex');
var client = require('../ClientIP');
const DEBUGGER = require('../../config/index').DEBUGGER;


var inputAttacks = [
    { title: "SQL Batch Injection", regex: /'.*;/ },
    { title: "SQL Or Injection", regex: /'.*or/i },
    { title: "SQL And Injection", regex: /'.*and/i },
    { title: "File Inclusion", regex: /\.\.\// },
    { title: "File Inclusion", regex: /^\// }
];

// Fields that are not checked for the three field types
var exemptGet = [];
var exemptPost = ["/login:exempt"];
var exemptCookie = [];

var logBadInputAttack = function (req, str, title) {
    var entry = {};
    entry.timeStamp = new Date();
    entry.title = "Bad input: " + title;
    entry.target = req.originalUrl;
    entry.value = str;
    entry.attacker = client.Ip(req);

    log.logger.warn(JSON.stringify(entry));

};

var checkInputAttacks = function (location, str, req, res) {
    for (var i = 0; i < inputAttacks.length; i++) {
        if (typeof str === "object") {
            str = JSON.stringify(str);
        }
        try {

            if (str && str.match(inputAttacks[i].regex)) {
                logBadInputAttack(req, str, inputAttacks[i].title + " in the " + location);
                return "Your " + inputAttacks[i].title + " attack in the " +
                    location + " has been noted.";
            }

        } catch (error) {

        }
    }
    if (typeof str === "object") {
        str = JSON.stringify(str);
    }

    var isok = safe(str);
    if (!isok) {
        return "Has attack in the " + location + " has been noted.";
    }
};

/******
 * 校验参数是否合法，是否存在sql注入等风险
 */
var ParamterInputAttacks = {
    Attacks: function (req, res, next) {

        if (!DEBUGGER(req)) {
            var key, _valid;


            try {
                if (!_valid) {
                    // Check all GET queries
                    for (key in req.query) {
                        if (exemptGet.indexOf(req.path + ":" + key) === -1) { // Don't check exempt fields
                            _valid = checkInputAttacks('query parameter "' + key + '"', req.query[key], req, res);
                            break;
                        }
                    }
                }

                if (!_valid) {
                    // Check all POST data
                    for (key in req.body) {
                        if (exemptPost.indexOf(req.path + ":" + key) === -1) { // Don't check exempt fields  
                            _valid = checkInputAttacks('post parameter "' + key + '"', req.body[key], req, res);
                            break;
                        }
                    }
                }

                if (!_valid) {
                    // Check all cookies
                    for (key in req.cookies) {
                        if (exemptCookie.indexOf(req.path + ":" + key) === -1) {  // Don't check exempt fields    
                            _valid = checkInputAttacks('cookie "' + key + '"', req.cookies[key], req, res);
                            break;
                        }
                    }
                }
            } catch (ee) {
                console.log(ee);
            }


            if (_valid) {
                //debugger;
                return res.send(_valid);
            }
            // If we ran res.send (which checkInputAttacks does when it detects an attack), 
            // next() won't continue the processing anyway.
            return next();

        } else {

            return next();

        }
    }
};

module.exports = exports = ParamterInputAttacks;