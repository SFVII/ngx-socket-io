import { ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketFactory } from './factory/SocketFactory';
import { SocketFrontUpdateService } from './socket-front-update.service';
export declare class SocketFrontUpdateModule {
    constructor(parentModule?: SocketFrontUpdateModule);
    static forRoot(config: {
        url?: string;
        config?: SocketIoConfig;
        auth?: boolean;
        loginPage?: string;
    }): ModuleWithProviders<SocketFrontUpdateModule>;
}
export { SocketFrontUpdateModule as SocketIoModule, SocketFrontUpdateService as Socket, SOCKET_CONFIG_TOKEN, SocketFactory };
