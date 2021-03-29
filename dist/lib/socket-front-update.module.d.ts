import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SocketWrapper } from './socket-front-update.service';
import * as i0 from "@angular/core";
export declare function SocketFactory(config: {
    url?: string;
    config?: SocketIoConfig;
    auth?: boolean;
    loginPage?: string;
}): SocketWrapper;
export declare const SOCKET_CONFIG_TOKEN: InjectionToken<SocketIoConfig>;
declare class SocketIoModule {
    constructor(parentModule?: SocketIoModule);
    static forRoot(config: {
        url?: string;
        config?: SocketIoConfig;
        auth?: boolean;
        loginPage?: string;
    }): ModuleWithProviders;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SocketIoModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDef<SocketIoModule>;
}
export { SocketIoModule, SocketWrapper, SocketWrapper as Socket };
