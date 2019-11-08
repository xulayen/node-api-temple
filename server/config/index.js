

const codeState = require('./codeState');
const pro = (process.env.NODE_ENV === 'production');
const uat = (process.env.NODE_ENV === 'previewuat');
const develop = (process.env.NODE_ENV === 'develop');

function DEBUGGER(req, notRsa) {


    return false;

}

/**项目需要的配置  */
module.exports = {
    DEBUGGER: DEBUGGER,
    host: '127.0.0.1',
    port: (pro ? 8080 : 8012),
    apiHost: '127.0.0.1',
    apiPort: '8686',
    redis: {
        host: '10.20.31.11',
        port: '6379',
        db: 10
    },
    CookieExpire: (60 * 1000),//全局Cookie保存时间，15天：60 * 1000 * 60 * 24 * 15
    log4js: {
        systemRequest: './server/logs/systemrequest/log',
        frontend: {
            type: "dateFile",
            filename: './server/logs/fontend/log',
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd.log",
            category: "log_date",
            encoding: 'utf-8'//default "utf-8"，文件的编码
        },
        background: {
            type: "dateFile",
            filename: './server/logs/background/log',
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd.log",
            category: "log_date",
            encoding: 'utf-8'//default "utf-8"，文件的编码
        },
        deploy: {
            type: "dateFile",
            filename: './server/logs/deploy/log',
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd.log",
            category: "log_date",
            encoding: 'utf-8'//default "utf-8"，文件的编码
        }
    },
    result: {
        success: false,
        code: codeState.CUSTOMERROR.code(),
        result: codeState.CUSTOMERROR.result('Interface not initialized!'),
        data: null,
        details: []
    },
    HttpApi: {
        validcode: "http://doc.pgyer.zhsh.co/api/token/clientrsa.html"
    }
};