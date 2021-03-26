/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file SocketFactory                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
import {SocketIoConfig} from '../interface/Interface-config';
import {SocketWrapper} from '../core/SocketWrapper';

export const SocketFactory = (config: { url?: string, config?: { path?: string; autoConnect?: boolean; transports?: string[]; query?: {}; reconnectionDelayMax?: number; extraHeaders?: {}; reconnection?: boolean; reconnectionAttempts?: number; timeout?: number; reconnectionDelay?: number; randomizationFactor?: number } | SocketIoConfig, auth?: boolean, loginPage?: string  }) => {
  return new SocketWrapper(config);
};
