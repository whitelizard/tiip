///<reference path="../../DefinitelyTyped/angularjs/angular.d.ts"/>
var tiip;
(function (tiip) {
    'use strict';
    /////////////////////////
    var Tiip = (function () {
        function Tiip() {
        }
        //------ MEMBERS ------//
        //------ METHODS ------//
        Tiip.prototype.pack = function (type, pid, signal, payload, ok, mid, destination, source) {
            var msg = {
                'protocol': 'tiip.0.7',
                'clientTime': Date.now() / 1000 + ''
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
        };
        Tiip.prototype.packObj = function (obj) {
            var msg = {
                'protocol': 'tiip.0.7',
                'clientTime': Date.now() / 1000 + ''
            };
            angular.merge(msg, obj);
            return JSON.stringify(msg);
        };
        Tiip.prototype.unpack = function (textMsg) {
            return JSON.parse(textMsg);
        };
        Tiip.prototype.unpackVerify = function (textMsg) {
            // TODO: Perform validation etc here
            return this.unpack(textMsg);
        };
        //------ SETUP ------//
        Tiip.$inject = [];
        return Tiip;
    })();
    /////////////////////////
    angular.module('tiip', []);
    angular
        .module('tiip')
        .factory('tiip', factory);
    factory.$inject = [];
    function factory() {
        return new Tiip();
    }
})(tiip || (tiip = {}));


