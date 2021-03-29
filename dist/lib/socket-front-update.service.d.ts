import { SocketIoConfig } from './interface/Interface-config';
import { Observable } from 'rxjs';
export declare class SocketWrapper {
    tokenUpdater: any;
    socket: any;
    private subscribersCounter;
    private url;
    private config;
    private auth;
    private loginPage;
    constructor(Config: SocketIoConfig, url: string, auth: boolean, loginPage: string);
    roomData(name: string, callback: () => void): void;
    of(namespace: string): void;
    on(eventName: string, callback: (data: any) => void): void;
    once(eventName: string, callback: (data: any) => void): void;
    connect(): any;
    disconnect(close?: any): any;
    emit(eventName: string, data?: any, callback?: (data: any) => void): any;
    removeListener(eventName: string, callback?: () => void): any;
    removeAllListeners(eventName?: string): any;
    fromEvent<T>(eventName: string): Observable<any>;
    fromOneTimeEvent<T>(eventName: string): Promise<any>;
    private redirectLogin;
}
