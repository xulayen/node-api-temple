

const pro = (process.env.NODE_ENV === 'production');
const uat = (process.env.NODE_ENV === 'previewuat');
const develop = (process.env.NODE_ENV === 'develop');



/**项目需要的配置  */
module.exports = {
    host: '127.0.0.1',
    port: (pro ? 8080 : 8011),
    apiHost: '127.0.0.1',
    apiPort: '8686',
    redis: {
        host: '10.20.31.11',
        port: '6379',
        db: 10
    },
    CookieExpire: (60 * 1000),//全局Cookie保存时间，15天：60 * 1000 * 60 * 24 * 15
};