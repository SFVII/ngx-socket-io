import { __decorate, __param } from 'tslib';
import { EventEmitter, Optional, InjectionToken, SkipSelf, NgModule } from '@angular/core';
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

// @dynamic
let SocketFrontUpdateService = class SocketFrontUpdateService {
    constructor(Config) {
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.config = !Config ? DefaultSocketConfig : Config.config;
        this.url = !Config ? '' : Config.url;
        if (Config && !Config.auth) {
            this.socket = this.connect();
        }
        else {
            this.tokenUpdater.subscribe((token) => {
                if (token) {
                    this.config.extraHeaders.Authorization = `Baerer ${token}`;
                    this.socket = this.connect();
                    this.redirectLogin(Config.loginPage);
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
        const ioSocket = io__default ? io__default : io;
        return ioSocket(this.url, this.config).connect();
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
SocketFrontUpdateService = __decorate([
    __param(0, Optional())
], SocketFrontUpdateService);

// tslint:disable-next-line:max-line-length
function SocketFactory(config) {
    return new SocketFrontUpdateService(config);
}
;

/***********************************************************
 **  @project ngx-front-live-update                       **
 **  @file config-token                                   **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com> **
 **  @Date 26/03/2021                                     **
 ***********************************************************/
const SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_');

var SocketIoModule_1;
// @dynamic
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
                { provide: SOCKET_CONFIG_TOKEN, useValue: config },
                {
                    provide: SocketFrontUpdateService,
                    useFactory: SocketFactory,
                    deps: [SOCKET_CONFIG_TOKEN]
                }
            ]
        };
    }
};
SocketIoModule.ctorParameters = () => [
    { type: SocketIoModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
SocketIoModule = SocketIoModule_1 = __decorate([
    NgModule({}),
    __param(0, Optional()), __param(0, SkipSelf())
], SocketIoModule);

/*
 * Public API Surface of socket-front-update
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SocketFrontUpdateService as Socket, SocketFactory, SocketFrontUpdateService, SocketIoModule, SOCKET_CONFIG_TOKEN as ɵa };
//# sourceMappingURL=socket-front-update.js.map
