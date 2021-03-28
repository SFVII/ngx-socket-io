import { __decorate, __param } from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketFactory } from './factory/SocketFactory';
import { SocketFrontUpdateService } from './socket-front-update.service';
// @dynamic
var SocketFrontUpdateModule = /** @class */ (function () {
    function SocketFrontUpdateModule(parentModule) {
        if (parentModule) {
            throw new Error('SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
        }
    }
    SocketFrontUpdateModule_1 = SocketFrontUpdateModule;
    SocketFrontUpdateModule.forRoot = function (config) {
        return {
            ngModule: SocketFrontUpdateModule_1,
            providers: [
                { provide: SOCKET_CONFIG_TOKEN, useValue: config },
                {
                    provide: SocketFrontUpdateService,
                    useFactory: SocketFactory,
                    deps: [SOCKET_CONFIG_TOKEN]
                }
            ]
        };
    };
    var SocketFrontUpdateModule_1;
    SocketFrontUpdateModule.ctorParameters = function () { return [
        { type: SocketFrontUpdateModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    SocketFrontUpdateModule = SocketFrontUpdateModule_1 = __decorate([
        NgModule({}),
        __param(0, Optional()), __param(0, SkipSelf())
    ], SocketFrontUpdateModule);
    return SocketFrontUpdateModule;
}());
export { SocketFrontUpdateModule };
export { SocketFrontUpdateModule as SocketIoModule, SocketFrontUpdateService as Socket, SOCKET_CONFIG_TOKEN, SocketFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxXQUFXO0FBRVg7SUFDRSxpQ0FBb0MsWUFBc0M7UUFDeEUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYiw0RUFBNEUsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQztnQ0FOVSx1QkFBdUI7SUFPcEIsK0JBQU8sR0FBckIsVUFBc0IsTUFBcUY7UUFDekcsT0FBTztZQUNMLFFBQVEsRUFBRSx5QkFBdUI7WUFDakMsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7Z0JBQ2hEO29CQUNFLE9BQU8sRUFBRSx3QkFBd0I7b0JBQ2pDLFVBQVUsRUFBRSxhQUFhO29CQUN6QixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDNUI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Z0JBbEJrRCx1QkFBdUIsdUJBQTdELFFBQVEsWUFBSSxRQUFROztJQUR0Qix1QkFBdUI7UUFEbkMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUVFLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO09BRHhCLHVCQUF1QixDQW9CbkM7SUFBRCw4QkFBQztDQUFBLEFBcEJELElBb0JDO1NBcEJZLHVCQUF1QjtBQXNCcEMsT0FBTyxFQUFDLHVCQUF1QixJQUFJLGNBQWMsRUFBRSx3QkFBd0IsSUFBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge1NPQ0tFVF9DT05GSUdfVE9LRU59IGZyb20gJy4vY29uZmlnL2NvbmZpZy10b2tlbic7XG5pbXBvcnQge1NvY2tldEZhY3Rvcnl9IGZyb20gJy4vZmFjdG9yeS9Tb2NrZXRGYWN0b3J5JztcbmltcG9ydCB7U29ja2V0RnJvbnRVcGRhdGVTZXJ2aWNlfSBmcm9tICcuL3NvY2tldC1mcm9udC11cGRhdGUuc2VydmljZSc7XG4vLyBAZHluYW1pY1xuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFNvY2tldEZyb250VXBkYXRlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogU29ja2V0RnJvbnRVcGRhdGVNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnOiB7IHVybD86IHN0cmluZywgY29uZmlnPzogU29ja2V0SW9Db25maWcsIGF1dGg/OiBib29sZWFuLCBsb2dpblBhZ2U/OiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29ja2V0RnJvbnRVcGRhdGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IFNPQ0tFVF9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU29ja2V0RnJvbnRVcGRhdGVTZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IFNvY2tldEZhY3RvcnksXG4gICAgICAgICAgZGVwczogW1NPQ0tFVF9DT05GSUdfVE9LRU5dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7U29ja2V0RnJvbnRVcGRhdGVNb2R1bGUgYXMgU29ja2V0SW9Nb2R1bGUsIFNvY2tldEZyb250VXBkYXRlU2VydmljZSBhcyBTb2NrZXQsIFNPQ0tFVF9DT05GSUdfVE9LRU4sIFNvY2tldEZhY3Rvcnl9O1xuIl19