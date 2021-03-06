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
  public tokenUpdater?: any = new EventEmitter();
  public socket?: any;
  public url?: string;
  public loginPage?: string;
  public auth?: boolean;
  private subscribersCounter?: number = 0;
  private roomList: string[] = [];
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
    this.socket = this.connect();
    if ((Config && !Config.auth || !Config)) {
      this.onReconnect();
    } else {
      this.tokenUpdater.subscribe((token: string) => {
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

  async unsubscribe(name: string) {
    this.socket.emit('unsubscribe', name);
    const index = this.roomList.findIndex((room: string) => room === name);
    if (index > -1) {
      this.roomList.splice(index, 1);
      console.log('unsubscribe room %s', name);
    } else {
      console.log('no joined room');
    }
  }

  async unsubscribeAll() {
    if (this.roomList.length) {
      this.roomList.forEach((room: string) => {
        this.unsubscribe(room);
      });
    }
  }

  async subscribe(name: string) {
    if (this.roomList.indexOf(name) > -1) {
      await this.unsubscribe(name);
    }
    if (this.roomList.indexOf(name) === -1) {
      this.roomList.push(name);
    }
    console.log('subscribe room %s', name);
    await this.socket.emit('subscribe', name);
  }

  of(namespace: string): void {
    this.socket.of(namespace);
  }

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

  private onReconnect() {
    if (this.socket) {
      this.socket.on('reconnect', () => {
        if (this.roomList && this.roomList.length) {
          this.roomList.forEach((name: string) => {
            this.subscribe(name).catch((err: any) => console.log('error socket reconnect', err));
          });
        } else {
          console.log('room is empty');
        }
      });
    } else {
      console.log('socket does not exist');
    }
  }

  private redirectLogin(loginPage: string) {
    if (this.socket && loginPage) {
      this.socket.on('session-time-out', (msg: any) => {
        console.log('session-time-out');
      });
    }
  }
}
