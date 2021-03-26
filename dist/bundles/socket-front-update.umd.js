(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('socket.io-client')) :
    typeof define === 'function' && define.amd ? define('socket-front-update', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'socket.io-client'], factory) :
    (global = global || self, factory(global['socket-front-update'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.io__default));
}(this, (function (exports, core, rxjs, operators, io__default) { 'use strict';

    var io__default__default = 'default' in io__default ? io__default['default'] : io__default;

    /***********************************************************
     **  @project ngx-front-live-update                       **
     **  @file config-token                                   **
     **  @author Brice Daupiard <brice.daupiard@smartiiz.com> **
     **  @Date 26/03/2021                                     **
     ***********************************************************/
    var SOCKET_CONFIG_TOKEN = new core.InjectionToken('__SOCKET_IO_CONFIG_' +
        Math.floor(Math.random() * Math.floor(100)).toString() + '__');

    /***********************************************************
     **  @project ngx-front-live-update                              **
     **  @file default                                         **
     **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
     **  @Date 26/03/2021                                         **
     ***********************************************************/
    var DefaultSocketConfig = {
        url: '',
        path: '/socket.io',
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        timeout: 20000,
        autoConnect: true,
        query: {},
        transports: ['polling', 'websocket'],
        extraHeaders: {}
    };

    /***********************************************************
     **  @project ngx-front-live-update                              **
     **  @file SocketWrapper                                         **
     **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
     **  @Date 26/03/2021                                         **
     ***********************************************************/
    var SocketWrapper = /** @class */ (function () {
        // tslint:disable-next-line:max-line-length
        function SocketWrapper(url, config) {
            if (url === void 0) { url = ''; }
            this.url = url;
            this.config = config;
            this.tokenUpdater = new core.EventEmitter();
            this.subscribersCounter = 0;
            this.config = !config ? DefaultSocketConfig : config;
        }
        SocketWrapper.prototype.roomData = function (name, callback) {
            this.socket.join(name);
            this.socket.on(name, callback);
        };
        SocketWrapper.prototype.of = function (namespace) {
            this.socket.of(namespace);
        };
        ;
        SocketWrapper.prototype.on = function (eventName, callback) {
            this.socket.on(eventName, callback);
        };
        ;
        SocketWrapper.prototype.once = function (eventName, callback) {
            this.socket.once(eventName, callback);
        };
        ;
        SocketWrapper.prototype.connect = function () {
            var ioSocket = io__default__default ? io__default__default : io__default;
            return ioSocket(this.url, this.config).connect();
        };
        SocketWrapper.prototype.disconnect = function (close) {
            return this.socket.disconnect.apply(this.socket, arguments);
        };
        SocketWrapper.prototype.emit = function (eventName, data, callback) {
            this.socket.emit(eventName, data, callback);
        };
        ;
        SocketWrapper.prototype.removeListener = function (eventName, callback) {
            return this.socket.removeListener.apply(this.socket, arguments);
        };
        ;
        SocketWrapper.prototype.removeAllListeners = function (eventName) {
            return this.socket.removeAllListeners.apply(this.socket, arguments);
        };
        ;
        SocketWrapper.prototype.fromEvent = function (eventName) {
            var _this = this;
            this.subscribersCounter++;
            return new rxjs.Observable(function (observer) {
                _this.socket.on(eventName, function (data) {
                    observer.next(data);
                });
                return function () {
                    if (_this.subscribersCounter === 1) {
                        _this.socket.removeListener(eventName);
                    }
                };
            }).pipe(operators.share());
        };
        ;
        SocketWrapper.prototype.fromOneTimeEvent = function (eventName) {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(eventName, resolve); });
        };
        ;
        return SocketWrapper;
    }());

    var SocketFactory = function (url, config) {
        if (url === void 0) { url = ''; }
        return new SocketWrapper(url, config);
    };

    var SocketFrontUpdateModule = /** @class */ (function () {
        function SocketFrontUpdateModule() {
        }
        SocketFrontUpdateModule.forRoot = function (url, config) {
            if (url === void 0) { url = ''; }
            return {
                ngModule: SocketFrontUpdateModule,
                providers: [
                    { provide: SOCKET_CONFIG_TOKEN, useValue: config },
                    {
                        provide: SocketWrapper,
                        useFactory: SocketFactory,
                        deps: [SOCKET_CONFIG_TOKEN]
                    }
                ]
            };
        };
        SocketFrontUpdateModule.ɵmod = core.ɵɵdefineNgModule({ type: SocketFrontUpdateModule });
        SocketFrontUpdateModule.ɵinj = core.ɵɵdefineInjector({ factory: function SocketFrontUpdateModule_Factory(t) { return new (t || SocketFrontUpdateModule)(); } });
        return SocketFrontUpdateModule;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(SocketFrontUpdateModule, [{
            type: core.NgModule,
            args: [{}]
        }], null, null); })();

    exports.SOCKET_CONFIG_TOKEN = SOCKET_CONFIG_TOKEN;
    exports.Socket = SocketWrapper;
    exports.SocketFactory = SocketFactory;
    exports.SocketFrontUpdateModule = SocketFrontUpdateModule;
    exports.SocketIoModule = SocketFrontUpdateModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=socket-front-update.umd.js.map
