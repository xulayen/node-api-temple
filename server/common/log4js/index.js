const log4js = require('log4js');
const logconfig = require('../../config');

log4js.configure({
  appenders: {
    frontend: logconfig.log4js.frontend,
    background: logconfig.log4js.background,
    deploy:logconfig.log4js.deploy,
  },
  categories: {
    default: { appenders: ['frontend'], level: 'trace' },
    background: { appenders: ['background'], level: 'trace' },
    deploy: { appenders: ['deploy'], level: 'trace' }
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
  disableClustering: true
});

const logger = log4js.getLogger('default');
const logger_background = log4js.getLogger('background');
const logger_deploy = log4js.getLogger('deploy');

//module.exports = log4js;

module.exports = {
  logger,
  logger_background,
  logger_deploy
}



// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');