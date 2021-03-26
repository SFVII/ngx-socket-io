import { ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketWrapper } from './core/SocketWrapper';
import { SocketFactory } from './factory/SocketFactory';
export declare class SocketFrontUpdateModule {
    static forRoot(config: {
        url?: string;
        config?: SocketIoConfig;
        auth?: boolean;
        loginPage?: string;
    }): ModuleWithProviders<SocketFrontUpdateModule>;
}
export { SocketFrontUpdateModule as SocketIoModule, SocketWrapper as Socket, SOCKET_CONFIG_TOKEN, SocketFactory };
