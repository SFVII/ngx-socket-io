import {EventEmitter, Inject, Injectable} from '@angular/core';
import {SocketConfig, SocketIoConfig} from './interface/Interface-config';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import * as io from 'socket.io-client';
import {DefaultSocketConfig} from './config/default';
//import {SOCKET_CONFIG_TOKEN} from './socket-front-update.module';

// @dynamic
@Injectable()
export class SocketWrapper {
  public tokenUpdater: any = new EventEmitter();
  public socket: any;
  public url: string;
  public loginPage: string;
  public auth: boolean;
  private subscribersCounter: number = 0;
  private readonly SocketConfig: SocketConfig = DefaultSocketConfig;

  constructor(@Inject('__SocketWrapper__') private Config: SocketIoConfig) {
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
    } else {
      this.socket = this.connect();
      this.tokenUpdater.subscribe((token: string) => {
        this.disconnect();
        console.log('Got a token', token);
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
          this.socket = this.connect();
          if (Config && Config.loginPage) {
            this.redirectLogin(Config.loginPage);
          }
        }
      });
    }
  }

  roomData(name: string, callback: () => void) {
    this.socket.emit('joinroom', name);
    this.socket.on(name, callback);
  }

  of(namespace: string): void {
    this.socket.of(namespace);
  };

  on(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  };

  once(eventName: string, callback: (data: any) => void): void {
    this.socket.once(eventName, callback);
  };

  connect() {
    console.log('Config', this.SocketConfig);
    const ioSocket = (io as any).default ? (io as any).default : io;
    return ioSocket(this.url, this.SocketConfig).connect();
  }

  disconnect(close?: any): any {
    return this.socket.disconnect.apply(this.socket, arguments);
  }

  emit(eventName: string, data?: any, callback?: (data: any) => void): any {
    this.socket.emit(eventName, data, callback);
  };

  removeListener(eventName: string, callback?: () => void): any {
    return this.socket.removeListener.apply(this.socket, arguments);
  };

  removeAllListeners(eventName?: string): any {
    return this.socket.removeAllListeners.apply(this.socket, arguments);
  };

  fromEvent<T>(eventName: string): Observable<any> {
    this.subscribersCounter++;
    return new Observable((observer: any) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
      return () => {
        if (this.subscribersCounter === 1) {
          this.socket.removeListener(eventName);
        }
      };
    }).pipe(share());
  };

  fromOneTimeEvent<T>(eventName: string): Promise<any> {
    return new Promise(resolve => this.once(eventName, resolve));
  };

  private redirectLogin(loginPage: string) {
    if (this.socket && loginPage) {
      this.socket.on('session-time-out', (msg: any) => {
        window.location.replace(loginPage);
      });
    }
  }
}
