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
const SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_' +
    Math.floor(Math.random() * Math.floor(100)).toString() + '__');

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

/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file SocketWrapper                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
class SocketWrapper {
    constructor(Config) {
        this.Config = Config;
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
        this.socket.join(name);
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
}

const SocketFactory = (config) => {
    return new SocketWrapper(config);
};

class SocketFrontUpdateModule {
    static forRoot(config) {
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
    }
}
SocketFrontUpdateModule.ɵmod = ɵɵdefineNgModule({ type: SocketFrontUpdateModule });
SocketFrontUpdateModule.ɵinj = ɵɵdefineInjector({ factory: function SocketFrontUpdateModule_Factory(t) { return new (t || SocketFrontUpdateModule)(); } });
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
