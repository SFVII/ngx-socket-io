/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file SocketWrapper                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
import {EventEmitter, Injectable} from '@angular/core';
import {SocketIoConfig} from '../interface/Interface-config';
import {DefaultSocketConfig} from '../config/default';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import * as io from 'socket.io-client';

export class SocketWrapper {


}
