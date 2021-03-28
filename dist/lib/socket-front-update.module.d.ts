import { ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SocketFrontUpdateService } from './socket-front-update.service';
export declare function SocketFactory(config: {
    url?: string;
    config?: {
        path?: string;
        autoConnect?: boolean;
        transports?: string[];
        query?: {};
        reconnectionDelayMax?: number;
        extraHeaders?: {};
        reconnection?: boolean;
        reconnectionAttempts?: number;
        timeout?: number;
        reconnectionDelay?: number;
        randomizationFactor?: number;
    } | SocketIoConfig;
    auth?: boolean;
    loginPage?: string;
}): SocketFrontUpdateService;
export declare class SocketIoModule {
    constructor(parentModule?: SocketIoModule);
    static forRoot(config: {
        url?: string;
        config?: SocketIoConfig;
        auth?: boolean;
        loginPage?: string;
    }): ModuleWithProviders;
}
