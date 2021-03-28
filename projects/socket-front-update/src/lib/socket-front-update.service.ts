import {EventEmitter, Optional} from '@angular/core';
import {SocketIoConfig} from './interface/Interface-config';
import {DefaultSocketConfig} from './config/default';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import * as io from 'socket.io-client';
import { Inject } from '@angular/core';


export class SocketFrontUpdateService {

  public tokenUpdater: any = new EventEmitter();
  public socket: any;
  private subscribersCounter: number = 0;
  private url: string;
  // tslint:disable-next-line:max-line-length
  private config: { path?: string; autoConnect?: boolean; transports?: string[]; query?: {}; reconnectionDelayMax?: number; extraHeaders?: {}; reconnection?: boolean; reconnectionAttempts?: number; timeout?: number; reconnectionDelay?: number; randomizationFactor?: number } | SocketIoConfig;

  constructor(@Optional() Config?: { url?: string; config?: SocketIoConfig, auth?: boolean, loginPage?: string }) {
    this.config = !Config ? DefaultSocketConfig : Config.config;
    this.url = !Config ? '' : Config.url;
    if (Config && !Config.auth) {
      this.socket = this.connect();
    } else {
      this.tokenUpdater.subscribe((token: string) => {
        if (token) {
          this.config.extraHeaders.Authorization = `Baerer ${token}`;
          this.socket = this.connect();
          this.redirectLogin(Config.loginPage);
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
    return ioSocket(this.url, this.config).connect();
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
