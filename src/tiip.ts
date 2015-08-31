///<reference path="../../DefinitelyTyped/angularjs/angular.d.ts"/>

module tspcom {
    'use strict';
    
    export interface ITiipMessage {  // move this to new ts version of tiip
        type?: string;
        pid?: string;
        signal?: string;
        payload?: any[];
        ok?: boolean;
        mid?: string;
        destination?: string[];
        source?: string[];
        protocol?: string;
        timestamp?: string;
        clientTime?: string;
    }
    
    interface ITiip {
        pack: (
            type: string, 
            pid: string, 
            signal: string, 
            payload: any[], 
            ok: boolean, 
            mid: string,
            destination: string[], 
            source: string[]
        )=>string;
        packObj: (obj:ITiipMessage)=>string;
        unpack: (textMsg:string)=>ITiipMessage;
        unpackVerify: (textMsg:string)=>ITiipMessage;
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
            ok: boolean, 
            mid: string, 
            destination: string[], 
            source: string[]
        ):string {
        
            var msg:ITiipMessage = {
                'protocol': 'tiip.0.7',
                'clientTime': Date.now()/1000+''
            };
            if (angular.isDefined(pid)) {
                msg['pid'] = pid;
            }
            if (angular.isDefined(signal)) {
                msg['signal'] = signal;
            }
            if (angular.isDefined(ok)) {
                msg['ok'] = ok;
            }
            if (angular.isDefined(payload)) {
                msg['payload'] = payload;
            }
            if (angular.isDefined(type)) {
                msg['type'] = type;
            }
            if (angular.isDefined(destination)) {
                msg['destination'] = destination;
            }
            if (angular.isDefined(source)) {
                msg['source'] = source;
            }
            if (angular.isDefined(mid)) {
                msg['mid'] = mid;
            }
            return JSON.stringify(msg);
        }
        
        packObj(obj:ITiipMessage):string {
            var msg:ITiipMessage = {
                'protocol': 'tiip.0.7',
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
