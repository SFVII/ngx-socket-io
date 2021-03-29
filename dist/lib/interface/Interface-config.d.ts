/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file Interface-config                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
export interface SocketConfig {
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
    transportOptions?: any;
}
export interface SocketIoConfig {
    socket_path?: string;
    socket_reconnection?: boolean;
    socket_reconnectionAttempts?: number;
    socket_reconnectionDelay?: number;
    socket_reconnectionDelayMax?: number;
    socket_randomizationFactor?: number;
    socket_timeout?: number;
    socket_autoConnect?: boolean;
    socket_query?: any;
    socket_extraHeaders?: any;
    socket_transports?: string[];
    url?: string;
    loginPage: string;
    auth: boolean;
}
