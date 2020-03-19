'use strict';

Package('org.quickcorp.qcobjects.api.client_services', [
  Class('QuickCorpCloud', Service, {
    name: 'quickcorp_cloud',
    external: true,
    useHTTP2:false,
    cached: false,
    method: 'post',
    headers: {
      'Origin': 'localhost',
      'Content-Type': 'application/json',
      '::method':'post'
    },
    basePath: 'https://cloud.quickcorp.org/',
    url: '',
    withCredentials: false,
    _new_: function(o) {
      // service instantiated
      logger.debugEnabled=true
      this.headers['Authorization'] = `Basic token`;
      this.url = this.basePath + o.apiMethod;
      this.data = o.data;
    },
    done: function(service,standardResponse) {
      // service loaded
      console.log(standardResponse)
    },
    fail: function (e){
        console.log(e)
    }
  })
]);
