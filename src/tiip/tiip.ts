///<reference path="../../typings/tsd.d.ts"/>

export interface ITiipMessage {
    type?: string;
    pid?: string;
    signal?: string;
    payload?: any[];
    ok?: boolean;
    mid?: string;
    destination?: string[];
    source?: string[];
    tenant?: string;
    protocol?: string;
    timestamp?: string;
    clientTime?: string;
}

module tiip {
    'use strict';
    
    interface ITiip {
        pack(
            type: string, 
            pid: string, 
            signal: string, 
            payload: any[], 
            mid: string,
            tenant: string, 
            destination: string[], 
            source: string[],
            ok: boolean
        ):string;
        packObj(obj:ITiipMessage):string;
        unpack(textMsg:string):ITiipMessage;
        unpackVerify(textMsg:string):ITiipMessage;
    }
    
    /////////////////////////
    
    class Tiip implements ITiip {

        //------ SETUP ------//
        
        static $inject = [];
        
        constructor() {}

        //------ MEMBERS ------//

        //------ METHODS ------//
        
        pack(
            type: string, 
            pid: string, 
            signal: string, 
            payload: any[], 
            mid: string, 
            tenant: string, 
            destination: string[], 
            source: string[], 
            ok: boolean
        ):string {
        
            var msg:ITiipMessage = {
                'protocol': 'tiip.0.8',
                'clientTime': Date.now()/1000+''
            };
            if (angular.isDefined(pid) && pid !== null) {
                msg['pid'] = pid;
            }
            if (angular.isDefined(signal) && signal !== null) {
                msg['signal'] = signal;
            }
            if (angular.isDefined(ok) && ok !== null) {
                msg['ok'] = ok;
            }
            if (angular.isDefined(payload) && payload !== null) {
                msg['payload'] = payload;
            }
            if (angular.isDefined(type) && type !== null) {
                msg['type'] = type;
            }
            if (angular.isDefined(destination) && destination !== null) {
                msg['destination'] = destination;
            }
            if (angular.isDefined(source) && source !== null) {
                msg['source'] = source;
            }
            if (angular.isDefined(mid) && mid !== null) {
                msg['mid'] = mid;
            }
            if (angular.isDefined(tenant) && tenant !== null) {
                msg['tenant'] = tenant;
            }
            return JSON.stringify(msg);
        }
        
        packObj(obj:ITiipMessage):string {
            var msg:ITiipMessage = {
                'protocol': 'tiip.0.8',
                'clientTime': Date.now()/1000+''
            };
            angular.merge(msg, obj);
            return JSON.stringify(msg);
        }

        unpack(textMsg:string):ITiipMessage {
            return JSON.parse(textMsg);
        }

        unpackVerify(textMsg:string):ITiipMessage {
            // TODO: Perform validation etc here
            return this.unpack(textMsg);
        }
    }
    
    /////////////////////////

    angular.module('tiip', []);
    
    angular
        .module('tiip')
        .factory('tiip', factory)
    ;
    
    factory.$inject = [];

    function factory() {
        return new Tiip();
    }
}
