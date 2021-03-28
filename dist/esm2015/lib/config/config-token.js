/***********************************************************
 **  @project ngx-front-live-update                       **
 **  @file config-token                                   **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com> **
 **  @Date 26/03/2021                                     **
 ***********************************************************/
import { InjectionToken } from '@angular/core';
export const SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_' +
    Math.floor(Math.random() * Math.floor(100)).toString() + '__');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXRva2VuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcvY29uZmlnLXRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs2REFLNkQ7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3QyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBQyxxQkFBcUI7SUFDekUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiogIEBwcm9qZWN0IG5neC1mcm9udC1saXZlLXVwZGF0ZSAgICAgICAgICAgICAgICAgICAgICAgKipcbiAqKiAgQGZpbGUgY29uZmlnLXRva2VuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxuICoqICBAYXV0aG9yIEJyaWNlIERhdXBpYXJkIDxicmljZS5kYXVwaWFyZEBzbWFydGlpei5jb20+ICoqXG4gKiogIEBEYXRlIDI2LzAzLzIwMjEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKipcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgU09DS0VUX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbignX19TT0NLRVRfSU9fQ09ORklHXycgK1xuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDEwMCkpLnRvU3RyaW5nKCkgKyAnX18nKTtcbiJdfQ==