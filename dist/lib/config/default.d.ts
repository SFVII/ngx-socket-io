/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file default                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
export declare const DefaultSocketConfig: {
    url: string;
    path: string;
    reconnection: boolean;
    reconnectionAttempts: number;
    reconnectionDelay: number;
    reconnectionDelayMax: number;
    randomizationFactor: number;
    timeout: number;
    autoConnect: boolean;
    query: {};
    transports: string[];
    extraHeaders: {};
};
