CONFIG.set('documentRootFileIndex','index.html');
CONFIG.set('projectPath',`${process.cwd()}/`);
CONFIG.set('useConfigService',false); // this is only true useful for client web side
CONFIG.set('documentRoot','./');
CONFIG.set('serverPortHTTP',80);
CONFIG.set('serverPortHTTPS',443);
CONFIG.set('private-key-pem','localhost-privkey.pem');
CONFIG.set('private-cert-pem','localhost-cert.pem');
CONFIG.set('allowHTTP1',true);
CONFIG.set('useTemplate',false);
CONFIG.set('domain','localhost');

try {
  const _config = require(CONFIG.get('projectPath')+'config.json');
  logger.debug('Loading settings from your config.json');
  for (var k in _config){
    CONFIG.set(k,_config[k]);
  }
  if (typeof CONFIG.get('devmode') !== 'undefined'){
    switch (true) {
      case CONFIG.get('devmode')=='debug':
        logger.debugEnabled = true;
        logger.warnEnabled = true;
        logger.infoEnabled = true;
        break;
      case CONFIG.get('devmode')=='warn':
        logger.debugEnabled = false;
        logger.warnEnabled = true;
        logger.infoEnabled = true;
        break;
      case CONFIG.get('devmode')=='info':
        logger.debugEnabled = false;
        logger.warnEnabled = false;
        logger.infoEnabled = true;
        break;

      default:
        logger.debugEnabled = false;
        logger.warnEnabled = false;
        logger.infoEnabled = false;
        break;
    }
  } else {
    logger.debugEnabled = false;
    logger.warnEnabled = false;
    logger.infoEnabled = false;
  }
  if (typeof CONFIG.get('backend') !== 'undefined'){
    global.set('backendAvailable',true);

    if (typeof CONFIG.get('basePath') !== 'undefined'){
      logger.debug(`Changing the current directory: ${process.cwd()}`);
      try {
        process.chdir(CONFIG.get('basePath'));
        logger.debug(`New directory: ${process.cwd()}`);
      } catch (err) {
        logger.warn(`It was impossible to change the current chdir: ${err}`);
      }
    }
  }
}catch (e){
  logger.debug('No config.json file in your project');
}
