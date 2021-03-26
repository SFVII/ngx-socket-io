import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketWrapper } from './core/SocketWrapper';
import { SocketFactory } from './factory/SocketFactory';
var SocketFrontUpdateModule = /** @class */ (function () {
    function SocketFrontUpdateModule() {
    }
    SocketFrontUpdateModule_1 = SocketFrontUpdateModule;
    SocketFrontUpdateModule.forRoot = function (config) {
        return {
            ngModule: SocketFrontUpdateModule_1,
            providers: [
                { provide: SOCKET_CONFIG_TOKEN, useValue: config },
                {
                    provide: SocketWrapper,
                    useFactory: SocketFactory,
                    deps: [SOCKET_CONFIG_TOKEN]
                }
            ]
        };
    };
    var SocketFrontUpdateModule_1;
    SocketFrontUpdateModule = SocketFrontUpdateModule_1 = __decorate([
        NgModule({})
    ], SocketFrontUpdateModule);
    return SocketFrontUpdateModule;
}());
export { SocketFrontUpdateModule };
export { SocketFrontUpdateModule as SocketIoModule, SocketWrapper as Socket, SOCKET_CONFIG_TOKEN, SocketFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBR3REO0lBQUE7SUFjQSxDQUFDO2dDQWRZLHVCQUF1QjtJQUNwQiwrQkFBTyxHQUFyQixVQUFzQixNQUFxRjtRQUN6RyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHlCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDaEQ7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDNUI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztJQWJVLHVCQUF1QjtRQURuQyxRQUFRLENBQUMsRUFBRSxDQUFDO09BQ0EsdUJBQXVCLENBY25DO0lBQUQsOEJBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSx1QkFBdUI7QUFnQnBDLE9BQU8sRUFBQyx1QkFBdUIsSUFBSSxjQUFjLEVBQUUsYUFBYSxJQUFJLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge1NPQ0tFVF9DT05GSUdfVE9LRU59IGZyb20gJy4vY29uZmlnL2NvbmZpZy10b2tlbic7XG5pbXBvcnQge1NvY2tldFdyYXBwZXJ9IGZyb20gJy4vY29yZS9Tb2NrZXRXcmFwcGVyJztcbmltcG9ydCB7U29ja2V0RmFjdG9yeX0gZnJvbSAnLi9mYWN0b3J5L1NvY2tldEZhY3RvcnknO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU29ja2V0RnJvbnRVcGRhdGVNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnOiB7IHVybD86IHN0cmluZywgY29uZmlnPzogU29ja2V0SW9Db25maWcsIGF1dGg/OiBib29sZWFuLCBsb2dpblBhZ2U/OiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U29ja2V0RnJvbnRVcGRhdGVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNvY2tldEZyb250VXBkYXRlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBTT0NLRVRfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNvY2tldFdyYXBwZXIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogU29ja2V0RmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbU09DS0VUX0NPTkZJR19UT0tFTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHtTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSBhcyBTb2NrZXRJb01vZHVsZSwgU29ja2V0V3JhcHBlciBhcyBTb2NrZXQsIFNPQ0tFVF9DT05GSUdfVE9LRU4sIFNvY2tldEZhY3Rvcnl9O1xuIl19