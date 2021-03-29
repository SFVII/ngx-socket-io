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
const DefaultSocketConfig = {
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
let SocketWrapper = class SocketWrapper {
    constructor(Config) {
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
        for (let key in Config) {
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
            this.tokenUpdater.subscribe((token) => {
                this.disconnect();
                //console.log('Got a token', token);
                if (token) {
                    if (!this.SocketConfig.extraHeaders) {
                        this.SocketConfig.extraHeaders = {};
                    }
                    if (!this.SocketConfig.transportOptions) {
                        this.SocketConfig.transportOptions = {};
                    }
                    for (let en of this.SocketConfig.transports) {
                        this.SocketConfig.transportOptions[en] = {
                            extraHeaders: {
                                Authorization: `Baerer ${token}`
                            }
                        };
                    }
                    this.SocketConfig.extraHeaders.Authorization = `Baerer ${token}`;
                    this.SocketConfig.query.token = `${token}`;
                    this.socket = this.connect();
                    if (Config && Config.loginPage) {
                        this.redirectLogin(Config.loginPage);
                    }
                }
            });
        }
    }
    roomData(name, callback) {
        this.socket.emit('joinroom', name);
        this.socket.on(name, callback);
    }
    of(namespace) {
        this.socket.of(namespace);
    }
    ;
    on(eventName, callback) {
        this.socket.on(eventName, callback);
    }
    ;
    once(eventName, callback) {
        this.socket.once(eventName, callback);
    }
    ;
    connect() {
        console.log('Config', this.SocketConfig);
        const ioSocket = io__default ? io__default : io;
        return ioSocket(this.url, this.SocketConfig).connect();
    }
    disconnect(close) {
        return this.socket.disconnect.apply(this.socket, arguments);
    }
    emit(eventName, data, callback) {
        this.socket.emit(eventName, data, callback);
    }
    ;
    removeListener(eventName, callback) {
        return this.socket.removeListener.apply(this.socket, arguments);
    }
    ;
    removeAllListeners(eventName) {
        return this.socket.removeAllListeners.apply(this.socket, arguments);
    }
    ;
    fromEvent(eventName) {
        this.subscribersCounter++;
        return new Observable((observer) => {
            this.socket.on(eventName, (data) => {
                observer.next(data);
            });
            return () => {
                if (this.subscribersCounter === 1) {
                    this.socket.removeListener(eventName);
                }
            };
        }).pipe(share());
    }
    ;
    fromOneTimeEvent(eventName) {
        return new Promise(resolve => this.once(eventName, resolve));
    }
    ;
    redirectLogin(loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', (msg) => {
                window.location.replace(loginPage);
            });
        }
    }
};
SocketWrapper.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['__SocketWrapper__',] }] }
];
SocketWrapper = __decorate([
    Injectable(),
    __param(0, Inject('__SocketWrapper__')),
    __metadata("design:paramtypes", [Object])
], SocketWrapper);

var SocketIoModule_1;
// tslint:disable-next-line:max-line-length
function SocketFactory(config) {
    return (config);
}
//export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SocketWrapper__');
let SocketIoModule = SocketIoModule_1 = class SocketIoModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(config) {
        return {
            ngModule: SocketIoModule_1,
            providers: [
                //SocketWrapper,
                { provide: '__SocketWrapper__', useValue: config },
                SocketWrapper
            ]
        };
    }
};
SocketIoModule.ctorParameters = () => [
    { type: SocketIoModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
SocketIoModule = SocketIoModule_1 = __decorate([
    NgModule({
        providers: [SocketWrapper]
    }),
    __param(0, Optional()), __param(0, SkipSelf()),
    __metadata("design:paramtypes", [SocketIoModule])
], SocketIoModule);

/*
 * Public API Surface of socket-front-update
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SocketWrapper as Socket, SocketFactory, SocketIoModule };
//# sourceMappingURL=socket-front-update.js.map
