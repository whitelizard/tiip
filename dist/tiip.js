///<reference path="../../typings/tsd.d.ts"/>
var tiip;
(function (tiip) {
    'use strict';
    var Tiip = (function () {
        function Tiip() {
        }
        Tiip.prototype.pack = function (type, pid, signal, payload, mid, tenant, source, ok) {
            var msg = this.baseMessage();
            if (angular.isDefined(pid) && pid !== null)
                msg.pid = pid;
            if (angular.isDefined(signal) && signal !== null)
                msg.signal = signal;
            if (angular.isDefined(ok) && ok !== null)
                msg.ok = ok;
            if (angular.isDefined(payload) && payload !== null)
                msg.payload = payload;
            if (angular.isDefined(type) && type !== null)
                msg.type = type;
            if (angular.isDefined(source) && source !== null)
                msg.source = source;
            if (angular.isDefined(mid) && mid !== null)
                msg.mid = mid;
            if (angular.isDefined(tenant) && tenant !== null)
                msg.tenant = tenant;
            return JSON.stringify(msg);
        };
        Tiip.prototype.packObj = function (obj) {
            var msg = angular.merge(this.baseMessage(), obj);
            return JSON.stringify(msg);
        };
        Tiip.prototype.unpack = function (textMsg) {
            return JSON.parse(textMsg);
        };
        Tiip.prototype.unpackVerify = function (textMsg) {
            return this.unpack(textMsg);
        };
        Tiip.prototype.baseMessage = function () {
            return {
                'protocol': 'tiip.0.8',
                'clientTime': Date.now() / 1000 + ''
            };
        };
        Tiip.$inject = [];
        return Tiip;
    })();
    angular.module('tiip', []);
    angular
        .module('tiip')
        .factory('tiip', factory);
    factory.$inject = [];
    function factory() {
        return new Tiip();
    }
})(tiip || (tiip = {}));
