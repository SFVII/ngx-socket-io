import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {SocketIoConfig} from './interface/Interface-config';
import {SOCKET_CONFIG_TOKEN} from './config/config-token';
import {SocketFactory} from './factory/SocketFactory';
import {SocketFrontUpdateService} from './socket-front-update.service';
// @dynamic
@NgModule({})
export class SocketIoModule {
  constructor(@Optional() @SkipSelf() parentModule?: SocketIoModule) {
    if (parentModule) {
      throw new Error(
        'SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
    }
  }
  public static forRoot(config: { url?: string, config?: SocketIoConfig, auth?: boolean, loginPage?: string }): ModuleWithProviders {
    return {
      ngModule: SocketIoModule,
      providers: [
        {provide: SOCKET_CONFIG_TOKEN, useValue: config},
        {
          provide: SocketFrontUpdateService,
          useFactory: SocketFactory,
          deps: [SOCKET_CONFIG_TOKEN]
        }
      ]
    };
  }
}
