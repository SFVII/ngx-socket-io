import {InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {SocketIoConfig} from './interface/Interface-config';
import {SocketWrapper} from './socket-front-update.service';

// tslint:disable-next-line:max-line-length
export function SocketFactory(config: SocketIoConfig) {
  return (config);
}

export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SocketWrapper__');

@NgModule({
  providers: [SocketWrapper]
})
class SocketIoModule {
  constructor(@Optional() @SkipSelf() parentModule?: SocketIoModule) {
    if (parentModule) {
      throw new Error(
        'SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config: SocketWrapper): ModuleWithProviders<SocketIoModule> {
    return {
      ngModule: SocketIoModule,
      providers: [
        SocketWrapper,
        {provide: SOCKET_CONFIG_TOKEN, useValue: config},
        {
          provide: SocketWrapper,
          deps: [SOCKET_CONFIG_TOKEN]
        }
      ]
    };
  }
}

export {SocketIoModule};

