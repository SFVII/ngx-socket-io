import { __decorate, __metadata, __param } from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketWrapper } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return (config);
}
//export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SocketWrapper__');
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
                //SocketWrapper,
                { provide: '__SocketWrapper__', useValue: config },
                SocketWrapper
            ]
        };
    };
    var SocketIoModule_1;
    SocketIoModule.ctorParameters = function () { return [
        { type: SocketIoModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    SocketIoModule = SocketIoModule_1 = __decorate([
        NgModule({
            providers: [SocketWrapper]
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [SocketIoModule])
    ], SocketIoModule);
    return SocketIoModule;
}());
export { SocketIoModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXNDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCwyQ0FBMkM7QUFDM0MsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUFzQjtJQUNsRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVELDZGQUE2RjtBQUs3RjtJQUNFLHdCQUFvQyxZQUE2QjtRQUMvRCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLDRFQUE0RSxDQUFDLENBQUM7U0FDakY7SUFDSCxDQUFDO3VCQU5HLGNBQWM7SUFRSixzQkFBTyxHQUFyQixVQUFzQixNQUFzQjtRQUMxQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7Z0JBQ2hCLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7Z0JBQy9DLGFBQWE7YUFDZjtTQUNGLENBQUM7SUFDSixDQUFDOzs7Z0JBaEJrRCxjQUFjLHVCQUFwRCxRQUFRLFlBQUksUUFBUTs7SUFEN0IsY0FBYztRQUhuQixRQUFRLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDM0IsQ0FBQztRQUVhLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO3lDQUFnQixjQUFjO09BRDdELGNBQWMsQ0FrQm5CO0lBQUQscUJBQUM7Q0FBQSxBQWxCRCxJQWtCQztBQUVELE9BQU8sRUFBQyxjQUFjLEVBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge1NvY2tldFdyYXBwZXJ9IGZyb20gJy4vc29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlJztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGZ1bmN0aW9uIFNvY2tldEZhY3RvcnkoY29uZmlnOiBTb2NrZXRJb0NvbmZpZykge1xuICByZXR1cm4gKGNvbmZpZyk7XG59XG5cbi8vZXhwb3J0IGNvbnN0IFNPQ0tFVF9DT05GSUdfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48U29ja2V0SW9Db25maWc+KCdfX1NvY2tldFdyYXBwZXJfXycpO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtTb2NrZXRXcmFwcGVyXVxufSlcbmNsYXNzIFNvY2tldElvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogU29ja2V0SW9Nb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNvY2tldElvQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTb2NrZXRJb01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29ja2V0SW9Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLy9Tb2NrZXRXcmFwcGVyLFxuICAgICAgICB7cHJvdmlkZTogJ19fU29ja2V0V3JhcHBlcl9fJywgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgICBTb2NrZXRXcmFwcGVyXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldElvTW9kdWxlfTtcblxuIl19