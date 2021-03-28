import { ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SocketFrontUpdateService } from './socket-front-update.service';
export declare class SocketIoModule {
    constructor(parentModule?: SocketIoModule);
    static forRoot(config: {
        url?: string;
        config?: SocketIoConfig;
        auth?: boolean;
        loginPage?: string;
    }): ModuleWithProviders;
}
export { SocketFrontUpdateService as Socket };
