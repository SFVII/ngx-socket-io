import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SocketWrapper } from './socket-front-update.service';
export declare function SocketFactory(config: {
    url?: string;
    config?: SocketIoConfig;
    auth?: boolean;
    loginPage?: string;
}): SocketWrapper;
export declare const SOCKET_CONFIG_TOKEN: InjectionToken<{
    config?: SocketIoConfig;
    url?: string;
    auth?: boolean;
    loginPage?: string;
}>;
declare class SocketIoModule {
    constructor(parentModule?: SocketIoModule);
    static forRoot(config: {
        config: SocketIoConfig;
        url: string;
        auth: boolean;
        loginPage: string;
    }): ModuleWithProviders;
}
export { SocketIoModule, SocketWrapper, SocketWrapper as Socket };
