import {InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {SocketIoConfig} from './interface/Interface-config';
import {SocketWrapper} from './socket-front-update.service';

// tslint:disable-next-line:max-line-length
export function SocketFactory(config: { url?: string, config?: SocketIoConfig, auth?: boolean, loginPage?: string }) {
  return new SocketWrapper(config.config, config.url, config.auth, config.loginPage);
}

export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SOCKET_IO_CONFIG_');

@NgModule({})
class SocketIoModule {
  constructor(@Optional() @SkipSelf() parentModule?: SocketIoModule) {
    if (parentModule) {
      throw new Error(
        'SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config: { config?: SocketWrapper; url?: string; auth?: boolean; loginPage?: string }): ModuleWithProviders {
    return {
      ngModule: SocketIoModule,
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

export {SocketIoModule, SocketWrapper, SocketWrapper as Socket};

