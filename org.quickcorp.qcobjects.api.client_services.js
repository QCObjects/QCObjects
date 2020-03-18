'use strict';

Package('org.quickcorp.qcobjects.api.client_services', [
  Class('QuickCorpCloud', Service, {
    name: 'quickcorp_cloud',
    external: true,
    useHTTP2:true,
    cached: false,
    method: 'POST',
    headers: {
      'Origin': 'localhost',
      'Content-Type': 'application/json'
    },
    basePath: 'https://cloud.quickcorp.org/',
    url: '',
    withCredentials: false,
    _new_: function(o) {
      // service instantiated
      this.headers['Authorization'] = `Basic token`;
      this.url = this.basePath + o.apiMethod;
    },
    done: function() {
      // service loaded
    },
    fail: function (e){
        console.log(e)
    }
  })
]);
