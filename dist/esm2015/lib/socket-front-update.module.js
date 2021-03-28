var SocketIoModule_1;
import { __decorate, __param } from "tslib";
import { InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketFrontUpdateService } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return new SocketFrontUpdateService(config);
}
export const SOCKET_CONFIG_TOKEN = new InjectionToken('__SOCKET_IO_CONFIG_');
let SocketIoModule = SocketIoModule_1 = class SocketIoModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocketFrontUpdateModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(config) {
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
    }
};
SocketIoModule.ctorParameters = () => [
    { type: SocketIoModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
SocketIoModule = SocketIoModule_1 = __decorate([
    NgModule({}),
    __param(0, Optional()), __param(0, SkipSelf())
], SocketIoModule);
export { SocketIoModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFdkUsMkNBQTJDO0FBQzNDLE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBd1Y7SUFDcFgsT0FBTyxJQUFJLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBaUIscUJBQXFCLENBQUMsQ0FBQztBQUc3RixJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBYztJQUN6QixZQUFvQyxZQUE2QjtRQUMvRCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLDRFQUE0RSxDQUFDLENBQUM7U0FDakY7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFxRjtRQUN6RyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUNoRDtvQkFDRSxPQUFPLEVBQUUsd0JBQXdCO29CQUNqQyxVQUFVLEVBQUUsYUFBYTtvQkFDekIsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7O1lBcEJvRCxjQUFjLHVCQUFwRCxRQUFRLFlBQUksUUFBUTs7QUFEdEIsY0FBYztJQUQxQixRQUFRLENBQUMsRUFBRSxDQUFDO0lBRUUsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsUUFBUSxFQUFFLENBQUE7R0FEeEIsY0FBYyxDQXFCMUI7U0FyQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge1NvY2tldEZyb250VXBkYXRlU2VydmljZX0gZnJvbSAnLi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5leHBvcnQgZnVuY3Rpb24gU29ja2V0RmFjdG9yeShjb25maWc6IHsgdXJsPzogc3RyaW5nLCBjb25maWc/OiB7IHBhdGg/OiBzdHJpbmc7IGF1dG9Db25uZWN0PzogYm9vbGVhbjsgdHJhbnNwb3J0cz86IHN0cmluZ1tdOyBxdWVyeT86IHt9OyByZWNvbm5lY3Rpb25EZWxheU1heD86IG51bWJlcjsgZXh0cmFIZWFkZXJzPzoge307IHJlY29ubmVjdGlvbj86IGJvb2xlYW47IHJlY29ubmVjdGlvbkF0dGVtcHRzPzogbnVtYmVyOyB0aW1lb3V0PzogbnVtYmVyOyByZWNvbm5lY3Rpb25EZWxheT86IG51bWJlcjsgcmFuZG9taXphdGlvbkZhY3Rvcj86IG51bWJlciB9IHwgU29ja2V0SW9Db25maWcsIGF1dGg/OiBib29sZWFuLCBsb2dpblBhZ2U/OiBzdHJpbmcgfSkge1xuICByZXR1cm4gbmV3IFNvY2tldEZyb250VXBkYXRlU2VydmljZShjb25maWcpO1xufVxuXG5leHBvcnQgY29uc3QgU09DS0VUX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTb2NrZXRJb0NvbmZpZz4oJ19fU09DS0VUX0lPX0NPTkZJR18nKTtcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFNvY2tldElvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogU29ja2V0SW9Nb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc6IHsgdXJsPzogc3RyaW5nLCBjb25maWc/OiBTb2NrZXRJb0NvbmZpZywgYXV0aD86IGJvb2xlYW4sIGxvZ2luUGFnZT86IHN0cmluZyB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NrZXRJb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogU09DS0VUX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTb2NrZXRGcm9udFVwZGF0ZVNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogU29ja2V0RmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbU09DS0VUX0NPTkZJR19UT0tFTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuIl19