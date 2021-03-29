import { __decorate, __param, __metadata } from 'tslib';
import { EventEmitter, Inject, Injectable, Optional, SkipSelf, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
import io__default from 'socket.io-client';

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

//import {SOCKET_CONFIG_TOKEN} from './socket-front-update.module';
// @dynamic
var SocketWrapper = /** @class */ (function () {
    function SocketWrapper(Config) {
        var _this = this;
        this.Config = Config;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        // tslint:disable-next-line:max-line-length
        //private Config: SocketIoConfig;
        this.SocketConfig = DefaultSocketConfig;
        this.Config = Config;
        if (!this.SocketConfig) {
            this.SocketConfig = {};
        }
        for (var key in Config) {
            if (key.includes('socket_')) {
                this.SocketConfig[key.replace('socket_', '')] = Config[key];
            }
        }
        this.url = (!Config || Config && !Config.url) ? '' : Config.url;
        if ((Config && !Config.auth || !Config)) {
            this.socket = this.connect();
        }
        else {
            this.socket = this.connect();
            this.tokenUpdater.subscribe(function (token) {
                _this.disconnect();
                console.log('Got a token', token);
                if (token) {
                    if (!_this.SocketConfig.extraHeaders) {
                        _this.SocketConfig.extraHeaders = {};
                    }
                    _this.SocketConfig.extraHeaders.Authorization = "Baerer " + token;
                    _this.socket = _this.connect();
                    if (Config && Config.loginPage) {
                        _this.redirectLogin(Config.loginPage);
                    }
                }
            });
        }
    }
    SocketWrapper.prototype.roomData = function (name, callback) {
        this.socket.emit('joinroom', name);
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
        console.log('Config', this.SocketConfig);
        var ioSocket = io__default ? io__default : io;
        return ioSocket(this.url, this.SocketConfig).connect();
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
    SocketWrapper.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['__SocketWrapper__',] }] }
    ]; };
    SocketWrapper = __decorate([
        Injectable(),
        __param(0, Inject('__SocketWrapper__')),
        __metadata("design:paramtypes", [Object])
    ], SocketWrapper);
    return SocketWrapper;
}());

// tslint:disable-next-line:max-line-length
function SocketFactory(config) {
    return (config);
}
//export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SocketWrapper__');
var SocketIoModule = /** @class */ (function () {
    function SocketIoModule(parentModule) {
        if (parentModule) {
            throw new Error('SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
        }
    }
    SocketIoModule_1 = SocketIoModule;
    SocketIoModule.forRoot = function (config) {
        return {
            ngModule: SocketIoModule_1,
            providers: [
                //SocketWrapper,
                { provide: '__SocketWrapper__', useValue: config },
                SocketWrapper
            ]
        };
    };
    var SocketIoModule_1;
    SocketIoModule.ctorParameters = function () { return [
        { type: SocketIoModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    SocketIoModule = SocketIoModule_1 = __decorate([
        NgModule({
            providers: [SocketWrapper]
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [SocketIoModule])
    ], SocketIoModule);
    return SocketIoModule;
}());

/*
 * Public API Surface of socket-front-update
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SocketWrapper as Socket, SocketFactory, SocketIoModule };
//# sourceMappingURL=socket-front-update.js.map
