/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file SocketWrapper                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
import {EventEmitter} from '@angular/core';
import {SocketIoConfig} from '../interface/Interface-config';
import {DefaultSocketConfig} from '../config/default';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import * as io from 'socket.io-client';


export class SocketWrapper {
  public tokenUpdater: any = new EventEmitter();
  public socket: any;
  private subscribersCounter: number = 0;

  // tslint:disable-next-line:max-line-length
  constructor(public url: string = '', public config?: { path: string; autoConnect: boolean; transports: string[]; query: {}; reconnectionDelayMax: number; extraHeaders: {}; reconnection: boolean; reconnectionAttempts: number; timeout: number; reconnectionDelay: number; randomizationFactor: number } | SocketIoConfig) {
    this.config = !config ? DefaultSocketConfig : config;
  }

  roomData(name: string, callback: () => void) {
    this.socket.join(name);
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

}
