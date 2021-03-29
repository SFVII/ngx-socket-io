import { ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SocketWrapper } from './socket-front-update.service';
export declare function SocketFactory(config: SocketIoConfig): SocketIoConfig;
declare class SocketIoModule {
    constructor(parentModule?: SocketIoModule);
    static forRoot(config: SocketWrapper): ModuleWithProviders<SocketIoModule>;
}
export { SocketIoModule };
