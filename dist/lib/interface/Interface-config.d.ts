/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file Interface-config                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
export interface SocketIoConfig {
    path?: string;
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    reconnectionDelayMax?: number;
    randomizationFactor?: number;
    timeout?: number;
    autoConnect?: boolean;
    query?: any;
    extraHeaders?: any;
    transports?: string[];
}
