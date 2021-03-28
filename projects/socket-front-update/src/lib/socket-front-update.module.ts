import {InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {SocketIoConfig} from './interface/Interface-config';
import {SocketFrontUpdateService as Socket} from './socket-front-update.service';

// tslint:disable-next-line:max-line-length
export function SocketFactory(config: { url?: string, config?: { path?: string; autoConnect?: boolean; transports?: string[]; query?: {}; reconnectionDelayMax?: number; extraHeaders?: {}; reconnection?: boolean; reconnectionAttempts?: number; timeout?: number; reconnectionDelay?: number; randomizationFactor?: number } | SocketIoConfig, auth?: boolean, loginPage?: string }) {
  return new Socket(config);
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

  public static forRoot(config: { url?: string, config?: SocketIoConfig, auth?: boolean, loginPage?: string }): ModuleWithProviders {
    return {
      ngModule: SocketIoModule,
      providers: [
        {provide: SOCKET_CONFIG_TOKEN, useValue: config},
        {
          provide: Socket,
          useFactory: SocketFactory,
          deps: [SOCKET_CONFIG_TOKEN]
        }
      ]
    };
  }
}

export {SocketIoModule, Socket};

