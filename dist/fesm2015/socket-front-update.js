import { EventEmitter, Optional, InjectionToken, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵinject, ɵsetClassMetadata, NgModule, SkipSelf } from '@angular/core';
import { __decorate, __param, __metadata } from 'tslib';
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
let SocketWrapper = class SocketWrapper {
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
SocketWrapper = __decorate([
    __param(0, Optional()),
    __metadata("design:paramtypes", [Object])
], SocketWrapper);

// tslint:disable-next-line:max-line-length
function SocketFactory(config) {
    return new SocketWrapper(config);
}
const SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_');
class SocketIoModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(config) {
        return {
            ngModule: SocketIoModule,
            providers: [
                { provide: SOCKET_CONFIG_TOKEN, useValue: config },
                {
                    provide: SocketWrapper,
                    useFactory: SocketFactory,
                    deps: [SOCKET_CONFIG_TOKEN]
                }
            ]
        };
    }
}
SocketIoModule.ɵmod = ɵɵdefineNgModule({ type: SocketIoModule });
SocketIoModule.ɵinj = ɵɵdefineInjector({ factory: function SocketIoModule_Factory(t) { return new (t || SocketIoModule)(ɵɵinject(SocketIoModule, 12)); } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SocketIoModule, [{
        type: NgModule,
        args: [{}]
    }], function () { return [{ type: SocketIoModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }]; }, null); })();

/*
 * Public API Surface of socket-front-update
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SOCKET_CONFIG_TOKEN, SocketWrapper as Socket, SocketFactory, SocketIoModule, SocketWrapper };
//# sourceMappingURL=socket-front-update.js.map
