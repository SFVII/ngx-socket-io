import {EventEmitter, Inject, Injectable} from '@angular/core';
import {SocketConfig, SocketIoConfig} from './interface/Interface-config';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import * as io from 'socket.io-client';

// @dynamic
@Injectable()
export class SocketWrapper {
  public tokenUpdater: any = new EventEmitter();
  public socket: any;
  public socket_path?: string; // default = '/socket.io'
  public socket_reconnection?: boolean; // default true
  public socket_reconnectionAttempts?: number; // default Infinity
  public socket_reconnectionDelay?: number; // default 1000
  public socket_reconnectionDelayMax?: number; // default 5000
  public socket_randomizationFactor?: number; // default 0.5,
  public socket_timeout?: number; // default 20000,
  public socket_autoConnect?: boolean; // default true,
  public socket_query?: any; // default {}
  public socket_extraHeaders?: any; // default {}
  public socket_transports?: string[];
  public url: string;
  public loginPage: string;
  public auth: boolean;
  private subscribersCounter: number = 0;

  // tslint:disable-next-line:max-line-length
  private Config: SocketIoConfig;
  private SocketConfig: SocketConfig;

  constructor(@Inject('__SOCKET_IO_CONFIG_') Config: SocketIoConfig) {
    this.Config = Config;
    for (let key in Config) {
      if (key.includes('socket_')) {
        this.SocketConfig[key.replace('socket_', '')] = Config[key];
      }
    }
    this.url = (!Config || Config && !Config.url) ? '' : Config.url;
    if ((Config && !Config.auth || !Config)) {
      this.socket = this.connect();
    } else {
      this.tokenUpdater.subscribe((token: string) => {
        if (token) {
          if (!this.SocketConfig.extraHeaders) {
            this.SocketConfig.extraHeaders = {};
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
