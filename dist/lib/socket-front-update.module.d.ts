import { ModuleWithProviders } from '@angular/core';
import { SocketIoConfig } from './interface/Interface-config';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketWrapper } from './core/SocketWrapper';
import { SocketFactory } from './factory/SocketFactory';
import * as i0 from "@angular/core";
export declare class SocketFrontUpdateModule {
    static forRoot(config: {
        url?: string;
        config?: SocketIoConfig;
        auth?: boolean;
        loginPage?: string;
    }): ModuleWithProviders<SocketFrontUpdateModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SocketFrontUpdateModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDef<SocketFrontUpdateModule>;
}
export { SocketFrontUpdateModule as SocketIoModule, SocketWrapper as Socket, SOCKET_CONFIG_TOKEN, SocketFactory };