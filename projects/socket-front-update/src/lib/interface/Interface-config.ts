/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file Interface-config                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/

const enum Transport {
  'pooling' = 'polling',
  'websocket' = 'websocket'
}

export interface SocketIoConfig {
  path?: string; // default = '/socket.io'
  reconnection?: boolean; // default true
  reconnectionAttempts?: number; // default Infinity
  reconnectionDelay?: number; // default 1000
  reconnectionDelayMax?: number; // default 5000
  randomizationFactor?: number; // default 0.5,
  timeout?: number; // default 20000,
  autoConnect?: boolean; // default true,
  query?: any; // default {}
  extraHeaders?: any; // default {}
  transports?: Transport[];
}
