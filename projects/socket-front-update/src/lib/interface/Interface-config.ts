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

export interface SocketConfig {
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
  transports?: string[];
}

export interface SocketIoConfig {
  socket_path?: string; // default = '/socket.io'
  socket_reconnection?: boolean; // default true
  socket_reconnectionAttempts?: number; // default Infinity
  socket_reconnectionDelay?: number; // default 1000
  socket_reconnectionDelayMax?: number; // default 5000
  socket_randomizationFactor?: number; // default 0.5,
  socket_timeout?: number; // default 20000,
  socket_autoConnect?: boolean; // default true,
  socket_query?: any; // default {}
  socket_extraHeaders?: any; // default {}
  socket_transports?: string[];
  url?: string;
  loginPage: string;
  auth: boolean;
}
