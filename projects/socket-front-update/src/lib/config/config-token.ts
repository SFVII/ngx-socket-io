/***********************************************************
 **  @project ngx-front-live-update                       **
 **  @file config-token                                   **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com> **
 **  @Date 26/03/2021                                     **
 ***********************************************************/
import {InjectionToken} from '@angular/core';
import {SocketIoConfig} from '../interface/Interface-config';

const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SOCKET_IO_CONFIG_');

export default SOCKET_CONFIG_TOKEN;
