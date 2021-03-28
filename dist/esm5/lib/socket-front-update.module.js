import { __decorate, __param } from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import SOCKET_CONFIG_TOKEN from './config/config-token';
import { SocketFrontUpdateService } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return new SocketFrontUpdateService(config);
}
var SocketIoModule = /** @class */ (function () {
    function SocketIoModule(parentModule) {
        if (parentModule) {
            throw new Error('SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
        }
    }
    SocketIoModule_1 = SocketIoModule;
    SocketIoModule.forRoot = function (config) {
        return {
            ngModule: SocketIoModule_1,
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
    var SocketIoModule_1;
    SocketIoModule.ctorParameters = function () { return [
        { type: SocketIoModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    SocketIoModule = SocketIoModule_1 = __decorate([
        NgModule({}),
        __param(0, Optional()), __param(0, SkipSelf())
    ], SocketIoModule);
    return SocketIoModule;
}());
export { SocketIoModule };
export { SocketFrontUpdateService as Socket };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sbUJBQW1CLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFdkUsMkNBQTJDO0FBQzNDLE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBd1Y7SUFDcFgsT0FBTyxJQUFJLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFJRDtJQUNFLHdCQUFvQyxZQUE2QjtRQUMvRCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLDRFQUE0RSxDQUFDLENBQUM7U0FDakY7SUFDSCxDQUFDO3VCQU5VLGNBQWM7SUFRWCxzQkFBTyxHQUFyQixVQUFzQixNQUFxRjtRQUN6RyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUNoRDtvQkFDRSxPQUFPLEVBQUUsd0JBQXdCO29CQUNqQyxVQUFVLEVBQUUsYUFBYTtvQkFDekIsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O2dCQW5Ca0QsY0FBYyx1QkFBcEQsUUFBUSxZQUFJLFFBQVE7O0lBRHRCLGNBQWM7UUFEMUIsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUVFLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO09BRHhCLGNBQWMsQ0FxQjFCO0lBQUQscUJBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSxjQUFjO0FBdUIzQixPQUFPLEVBQUMsd0JBQXdCLElBQUksTUFBTSxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQgU09DS0VUX0NPTkZJR19UT0tFTiBmcm9tICcuL2NvbmZpZy9jb25maWctdG9rZW4nO1xuaW1wb3J0IHtTb2NrZXRGcm9udFVwZGF0ZVNlcnZpY2V9IGZyb20gJy4vc29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlJztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGZ1bmN0aW9uIFNvY2tldEZhY3RvcnkoY29uZmlnOiB7IHVybD86IHN0cmluZywgY29uZmlnPzogeyBwYXRoPzogc3RyaW5nOyBhdXRvQ29ubmVjdD86IGJvb2xlYW47IHRyYW5zcG9ydHM/OiBzdHJpbmdbXTsgcXVlcnk/OiB7fTsgcmVjb25uZWN0aW9uRGVsYXlNYXg/OiBudW1iZXI7IGV4dHJhSGVhZGVycz86IHt9OyByZWNvbm5lY3Rpb24/OiBib29sZWFuOyByZWNvbm5lY3Rpb25BdHRlbXB0cz86IG51bWJlcjsgdGltZW91dD86IG51bWJlcjsgcmVjb25uZWN0aW9uRGVsYXk/OiBudW1iZXI7IHJhbmRvbWl6YXRpb25GYWN0b3I/OiBudW1iZXIgfSB8IFNvY2tldElvQ29uZmlnLCBhdXRoPzogYm9vbGVhbiwgbG9naW5QYWdlPzogc3RyaW5nIH0pIHtcbiAgcmV0dXJuIG5ldyBTb2NrZXRGcm9udFVwZGF0ZVNlcnZpY2UoY29uZmlnKTtcbn1cblxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU29ja2V0SW9Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU/OiBTb2NrZXRJb01vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NvY2tldEZyb250VXBkYXRlTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZzogeyB1cmw/OiBzdHJpbmcsIGNvbmZpZz86IFNvY2tldElvQ29uZmlnLCBhdXRoPzogYm9vbGVhbiwgbG9naW5QYWdlPzogc3RyaW5nIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNvY2tldElvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBTT0NLRVRfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNvY2tldEZyb250VXBkYXRlU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBTb2NrZXRGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtTT0NLRVRfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldEZyb250VXBkYXRlU2VydmljZSBhcyBTb2NrZXR9O1xuIl19