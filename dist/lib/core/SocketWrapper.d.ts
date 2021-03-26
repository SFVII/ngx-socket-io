import { SocketIoConfig } from '../interface/Interface-config';
import { Observable } from 'rxjs';
export declare class SocketWrapper {
    url: string;
    config?: {
        path: string;
        autoConnect: boolean;
        transports: string[];
        query: {};
        reconnectionDelayMax: number;
        extraHeaders: {};
        reconnection: boolean;
        reconnectionAttempts: number;
        timeout: number;
        reconnectionDelay: number;
        randomizationFactor: number;
    } | SocketIoConfig;
    tokenUpdater: any;
    socket: any;
    private subscribersCounter;
    constructor(url?: string, config?: {
        path: string;
        autoConnect: boolean;
        transports: string[];
        query: {};
        reconnectionDelayMax: number;
        extraHeaders: {};
        reconnection: boolean;
        reconnectionAttempts: number;
        timeout: number;
        reconnectionDelay: number;
        randomizationFactor: number;
    } | SocketIoConfig);
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
}
