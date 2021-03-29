var SocketIoModule_1;
import { __decorate, __metadata, __param } from "tslib";
import { InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketWrapper } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return (new SocketWrapper(config));
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
                    provide: SocketWrapper,
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
    NgModule({
        providers: [SocketWrapper]
    }),
    __param(0, Optional()), __param(0, SkipSelf()),
    __metadata("design:paramtypes", [SocketIoModule])
], SocketIoModule);
export { SocketIoModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRTVELDJDQUEyQztBQUMzQyxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXNCO0lBQ2xELE9BQU8sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBaUIscUJBQXFCLENBQUMsQ0FBQztBQUs3RixJQUFNLGNBQWMsc0JBQXBCLE1BQU0sY0FBYztJQUNsQixZQUFvQyxZQUE2QjtRQUMvRCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLDRFQUE0RSxDQUFDLENBQUM7U0FDakY7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFxQjtRQUN6QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUNoRDtvQkFDRSxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUM1QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBOztZQXBCb0QsY0FBYyx1QkFBcEQsUUFBUSxZQUFJLFFBQVE7O0FBRDdCLGNBQWM7SUFIbkIsUUFBUSxDQUFDO1FBQ1IsU0FBUyxFQUFHLENBQUMsYUFBYSxDQUFDO0tBQzVCLENBQUM7SUFFYSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTtxQ0FBZ0IsY0FBYztHQUQ3RCxjQUFjLENBcUJuQjtBQUVELE9BQU8sRUFBQyxjQUFjLEVBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge1NvY2tldFdyYXBwZXJ9IGZyb20gJy4vc29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlJztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGZ1bmN0aW9uIFNvY2tldEZhY3RvcnkoY29uZmlnOiBTb2NrZXRJb0NvbmZpZykge1xuICByZXR1cm4gKG5ldyBTb2NrZXRXcmFwcGVyKGNvbmZpZykpO1xufVxuXG5leHBvcnQgY29uc3QgU09DS0VUX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTb2NrZXRJb0NvbmZpZz4oJ19fU09DS0VUX0lPX0NPTkZJR18nKTtcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzIDogW1NvY2tldFdyYXBwZXJdXG59KVxuY2xhc3MgU29ja2V0SW9Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU/OiBTb2NrZXRJb01vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NvY2tldEZyb250VXBkYXRlTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU29ja2V0V3JhcHBlcik6IE1vZHVsZVdpdGhQcm92aWRlcnM8U29ja2V0SW9Nb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNvY2tldElvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBTT0NLRVRfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNvY2tldFdyYXBwZXIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogU29ja2V0RmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbU09DS0VUX0NPTkZJR19UT0tFTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHtTb2NrZXRJb01vZHVsZX07XG5cbiJdfQ==