import { __awaiter, __decorate, __param, __metadata } from 'tslib';
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
        this.roomList = [];
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
        this.socket = this.connect();
        if ((Config && !Config.auth || !Config)) {
            this.onReconnect();
        }
        else {
            this.tokenUpdater.subscribe((token) => {
                if (this.socket) {
                    this.disconnect();
                }
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
                    this.onReconnect();
                }
            });
        }
    }
    unsubscribe(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.socket.emit('unsubscribe', name);
            const index = this.roomList.findIndex((room) => room === name);
            if (index > -1) {
                this.roomList.splice(index, 1);
                console.log('unsubscribe room %s', name);
            }
            else {
                console.log('no joined room');
            }
        });
    }
    unsubscribeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.roomList.length) {
                this.roomList.forEach((room) => {
                    this.unsubscribe(room);
                });
            }
        });
    }
    subscribe(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.roomList.indexOf(name) > -1) {
                yield this.unsubscribe(name);
            }
            if (this.roomList.indexOf(name) === -1) {
                this.roomList.push(name);
            }
            console.log('subscribe room %s', name);
            yield this.socket.emit('subscribe', name);
        });
    }
    of(namespace) {
        this.socket.of(namespace);
    }
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
    onReconnect() {
        if (this.socket) {
            this.socket.on('reconnect', () => {
                if (this.roomList && this.roomList.length) {
                    this.roomList.forEach((name) => {
                        this.subscribe(name).catch((err) => console.log('error socket reconnect', err));
                    });
                }
                else {
                    console.log('room is empty');
                }
            });
        }
        else {
            console.log('socket does not exist');
        }
    }
    redirectLogin(loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', (msg) => {
                console.log('session-time-out');
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
