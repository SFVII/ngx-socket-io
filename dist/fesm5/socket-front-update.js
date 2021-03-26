import { InjectionToken, EventEmitter, ɵɵdefineNgModule, ɵɵdefineInjector, ɵsetClassMetadata, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
import io__default from 'socket.io-client';

/***********************************************************
 **  @project ngx-front-live-update                       **
 **  @file config-token                                   **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com> **
 **  @Date 26/03/2021                                     **
 ***********************************************************/
var SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_' +
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
    function SocketWrapper(Config) {
        var _this = this;
        this.Config = Config;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.config = !Config ? DefaultSocketConfig : Config.config;
        this.url = !Config ? '' : Config.url;
        if (Config && !Config.auth) {
            this.socket = this.connect();
        }
        else {
            this.tokenUpdater.subscribe(function (token) {
                if (token) {
                    _this.config.extraHeaders.Authorization = "Baerer " + token;
                    _this.socket = _this.connect();
                    _this.redirectLogin(Config.loginPage);
                }
            });
        }
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
        var ioSocket = io__default ? io__default : io;
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
        return new Observable(function (observer) {
            _this.socket.on(eventName, function (data) {
                observer.next(data);
            });
            return function () {
                if (_this.subscribersCounter === 1) {
                    _this.socket.removeListener(eventName);
                }
            };
        }).pipe(share());
    };
    ;
    SocketWrapper.prototype.fromOneTimeEvent = function (eventName) {
        var _this = this;
        return new Promise(function (resolve) { return _this.once(eventName, resolve); });
    };
    ;
    SocketWrapper.prototype.redirectLogin = function (loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', function (msg) {
                window.location.replace(loginPage);
            });
        }
    };
    return SocketWrapper;
}());

var SocketFactory = function (config) {
    return new SocketWrapper(config);
};

var SocketFrontUpdateModule = /** @class */ (function () {
    function SocketFrontUpdateModule() {
    }
    SocketFrontUpdateModule.forRoot = function (config) {
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
    SocketFrontUpdateModule.ɵmod = ɵɵdefineNgModule({ type: SocketFrontUpdateModule });
    SocketFrontUpdateModule.ɵinj = ɵɵdefineInjector({ factory: function SocketFrontUpdateModule_Factory(t) { return new (t || SocketFrontUpdateModule)(); } });
    return SocketFrontUpdateModule;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(SocketFrontUpdateModule, [{
        type: NgModule,
        args: [{}]
    }], null, null); })();

/*
 * Public API Surface of socket-front-update
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SOCKET_CONFIG_TOKEN, SocketWrapper as Socket, SocketFactory, SocketFrontUpdateModule, SocketFrontUpdateModule as SocketIoModule };
//# sourceMappingURL=socket-front-update.js.map
