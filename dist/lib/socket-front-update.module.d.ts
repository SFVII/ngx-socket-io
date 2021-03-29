import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SocketWrapper } from './socket-front-update.service';
export declare function SocketFactory(config: SocketIoConfig): SocketWrapper;
export declare const SOCKET_CONFIG_TOKEN: InjectionToken<SocketIoConfig>;
declare class SocketIoModule {
    constructor(parentModule?: SocketIoModule);
    static forRoot(config: SocketIoConfig): ModuleWithProviders;
}
export { SocketIoModule, SocketWrapper, SocketWrapper as Socket };
