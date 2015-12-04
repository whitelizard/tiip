(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./src/tiip/tiip.js');

module.exports = 'tiip';
},{"./src/tiip/tiip.js":2}],2:[function(require,module,exports){
///<reference path="../../typings/tsd.d.ts"/>
var tiip;
(function (tiip) {
    'use strict';
    var Tiip = (function () {
        function Tiip() {
        }
        Tiip.prototype.pack = function (type, pid, signal, arguments_, payload, mid, tenant, source, sid, ok) {
            var msg = this.baseMessage();
            if (angular.isDefined(type) && type !== null)
                msg.type = type;
            if (angular.isDefined(pid) && pid !== null)
                msg.pid = pid;
            if (angular.isDefined(signal) && signal !== null)
                msg.signal = signal;
            if (angular.isDefined(arguments_) && arguments_ !== null)
                msg.arguments = arguments_;
            if (angular.isDefined(payload) && payload !== null)
                msg.payload = payload;
            if (angular.isDefined(mid) && mid !== null)
                msg.mid = mid;
            if (angular.isDefined(tenant) && tenant !== null)
                msg.tenant = tenant;
            if (angular.isDefined(source) && source !== null)
                msg.source = source;
            if (angular.isDefined(sid) && sid !== null)
                msg.sid = sid;
            if (angular.isDefined(ok) && ok !== null)
                msg.ok = ok;
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

},{}]},{},[1])


//# sourceMappingURL=tiip.js.map
