'use strict';
(function (){

    angular.module('tiip', []);
    
    angular
        .module('tiip')
        .factory('tiip', tiip)
    ;
    
    tiip.$inject = [];
    
    function tiip() {

        var service = {
            pack: pack,
            unpack: unpack
        };
        
        return service;

        //////////////
        
        function pack(signal, payload, type, pid, ok, destination, source, mid) {
            var msg = {
                "protocol": "tiip.0.7",
                "clientTime": Date.now()/1000+""
            };
            // Did we get an object with the keys instead of each key as separate argument?
            if (typeof(signal) === 'object') {
                angular.merge(msg, signal);
            } else {
                if (pid !== undefined) {
                    msg['pid'] = pid;
                }
                if (signal !== undefined) {
                    msg['signal'] = signal;
                }
                if (ok !== undefined) {
                    msg['ok'] = ok;
                }
                if (payload !== undefined) {
                    msg['payload'] = payload;
                }
                if (type !== undefined) {
                    msg['type'] = type;
                }
                if (destination !== undefined) {
                    msg['destination'] = destination;
                }
                if (source !== undefined) {
                    msg['source'] = source;
                }
                if (mid !== undefined) {
                    msg['mid'] = mid;
                }
            }
            return JSON.stringify(msg);
        }

        function unpack(textMsg) {
            return JSON.parse(textMsg);
        }

        function unpackVerify(textMsg) {
            // TODO: Perform validation etc here
            return unpack(textMsg);
        }
    }

})();
