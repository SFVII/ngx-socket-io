import { __decorate, __metadata, __param } from "tslib";
import { InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketWrapper } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return new SocketWrapper(config.config, config.url, config.auth, config.loginPage);
}
export var SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_');
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
                    provide: SocketWrapper,
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
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [SocketIoModule])
    ], SocketIoModule);
    return SocketIoModule;
}());
export { SocketIoModule, SocketWrapper, SocketWrapper as Socket };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsMkNBQTJDO0FBQzNDLE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBcUY7SUFDakgsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckYsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUFnRixxQkFBcUIsQ0FBQyxDQUFDO0FBRzVKO0lBQ0Usd0JBQW9DLFlBQTZCO1FBQy9ELElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNEVBQTRFLENBQUMsQ0FBQztTQUNqRjtJQUNILENBQUM7dUJBTkcsY0FBYztJQVFKLHNCQUFPLEdBQXJCLFVBQXNCLE1BQWlGO1FBQ3JHLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7Z0JBQ2hEO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O2dCQW5Ca0QsY0FBYyx1QkFBcEQsUUFBUSxZQUFJLFFBQVE7O0lBRDdCLGNBQWM7UUFEbkIsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUVFLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO3lDQUFnQixjQUFjO09BRDdELGNBQWMsQ0FxQm5CO0lBQUQscUJBQUM7Q0FBQSxBQXJCRCxJQXFCQztBQUVELE9BQU8sRUFBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLGFBQWEsSUFBSSxNQUFNLEVBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge1NvY2tldFdyYXBwZXJ9IGZyb20gJy4vc29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlJztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGZ1bmN0aW9uIFNvY2tldEZhY3RvcnkoY29uZmlnOiB7IHVybD86IHN0cmluZywgY29uZmlnPzogU29ja2V0SW9Db25maWcsIGF1dGg/OiBib29sZWFuLCBsb2dpblBhZ2U/OiBzdHJpbmcgfSkge1xuICByZXR1cm4gbmV3IFNvY2tldFdyYXBwZXIoY29uZmlnLmNvbmZpZywgY29uZmlnLnVybCwgY29uZmlnLmF1dGgsIGNvbmZpZy5sb2dpblBhZ2UpO1xufVxuXG5leHBvcnQgY29uc3QgU09DS0VUX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjx7IGNvbmZpZz86IFNvY2tldElvQ29uZmlnOyB1cmw/OiBzdHJpbmc7IGF1dGg/OiBib29sZWFuOyBsb2dpblBhZ2U/OiBzdHJpbmcgfT4oJ19fU09DS0VUX0lPX0NPTkZJR18nKTtcblxuQE5nTW9kdWxlKHt9KVxuY2xhc3MgU29ja2V0SW9Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU/OiBTb2NrZXRJb01vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NvY2tldEZyb250VXBkYXRlTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZzogeyBjb25maWc6IFNvY2tldElvQ29uZmlnOyB1cmw6IHN0cmluZzsgYXV0aDogYm9vbGVhbjsgbG9naW5QYWdlOiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29ja2V0SW9Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IFNPQ0tFVF9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU29ja2V0V3JhcHBlcixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBTb2NrZXRGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtTT0NLRVRfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldElvTW9kdWxlLCBTb2NrZXRXcmFwcGVyLCBTb2NrZXRXcmFwcGVyIGFzIFNvY2tldH07XG5cbiJdfQ==