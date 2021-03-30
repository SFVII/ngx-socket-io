import { ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
export declare function SocketFactory(config: SocketIoConfig): SocketIoConfig;
declare class SocketIoModule {
    constructor(parentModule?: SocketIoModule);
    static forRoot(config: SocketIoConfig): ModuleWithProviders<SocketIoModule>;
}
export { SocketIoModule };
