import { SocketIoConfig } from './interface/Interface-config';
import { Observable } from 'rxjs';
export declare class SocketWrapper {
    private Config;
    tokenUpdater: any;
    socket: any;
    url: string;
    loginPage: string;
    auth: boolean;
    private subscribersCounter;
    private readonly SocketConfig;
    constructor(Config: SocketIoConfig);
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
