/***********************************************************
 **  @project ngx-front-live-update                       **
 **  @file config-token                                   **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com> **
 **  @Date 26/03/2021                                     **
 ***********************************************************/
import {InjectionToken} from '@angular/core';

export const SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_' +
  Math.floor(Math.random() * Math.floor(100)).toString() + '__');
