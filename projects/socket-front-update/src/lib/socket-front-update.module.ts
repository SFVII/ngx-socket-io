import {ModuleWithProviders, NgModule} from '@angular/core';
import {SocketIoConfig} from './interface/Interface-config';
import {SOCKET_CONFIG_TOKEN} from './config/config-token';
import {SocketWrapper} from './core/SocketWrapper';
import {SocketFactory} from './factory/SocketFactory';

@NgModule({})
export class SocketFrontUpdateModule {
  public static forRoot(config: { url?: string, config?: SocketIoConfig, auth?: boolean, loginPage?: string }): ModuleWithProviders<SocketFrontUpdateModule> {
    return {
      ngModule: SocketFrontUpdateModule,
      providers: [
        {provide: SOCKET_CONFIG_TOKEN, useValue: config},
        {
          provide: SocketWrapper,
          useFactory: SocketFactory,
          deps: [SOCKET_CONFIG_TOKEN]
        }
      ]
    };
  }
}

export {SocketFrontUpdateModule as SocketIoModule, SocketWrapper as Socket, SOCKET_CONFIG_TOKEN, SocketFactory};
