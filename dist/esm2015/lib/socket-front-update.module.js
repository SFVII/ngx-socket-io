var SocketIoModule_1;
import { __decorate, __metadata, __param } from "tslib";
import { InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketWrapper } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return (config);
}
export const SOCKET_CONFIG_TOKEN = new InjectionToken('__SocketWrapper__');
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
                SocketWrapper,
                { provide: SOCKET_CONFIG_TOKEN, useValue: config },
                {
                    provide: SocketWrapper,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRTVELDJDQUEyQztBQUMzQyxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXNCO0lBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQWlCLG1CQUFtQixDQUFDLENBQUM7QUFLM0YsSUFBTSxjQUFjLHNCQUFwQixNQUFNLGNBQWM7SUFDbEIsWUFBb0MsWUFBNkI7UUFDL0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYiw0RUFBNEUsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDekMsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsYUFBYTtnQkFDYixFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUNoRDtvQkFDRSxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7O1lBcEJvRCxjQUFjLHVCQUFwRCxRQUFRLFlBQUksUUFBUTs7QUFEN0IsY0FBYztJQUhuQixRQUFRLENBQUM7UUFDUixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDM0IsQ0FBQztJQUVhLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO3FDQUFnQixjQUFjO0dBRDdELGNBQWMsQ0FxQm5CO0FBRUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7U29ja2V0V3JhcHBlcn0gZnJvbSAnLi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5leHBvcnQgZnVuY3Rpb24gU29ja2V0RmFjdG9yeShjb25maWc6IFNvY2tldElvQ29uZmlnKSB7XG4gIHJldHVybiAoY29uZmlnKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNPQ0tFVF9DT05GSUdfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48U29ja2V0SW9Db25maWc+KCdfX1NvY2tldFdyYXBwZXJfXycpO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtTb2NrZXRXcmFwcGVyXVxufSlcbmNsYXNzIFNvY2tldElvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogU29ja2V0SW9Nb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNvY2tldFdyYXBwZXIpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNvY2tldElvTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NrZXRJb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBTb2NrZXRXcmFwcGVyLFxuICAgICAgICB7cHJvdmlkZTogU09DS0VUX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTb2NrZXRXcmFwcGVyLFxuICAgICAgICAgIGRlcHM6IFtTT0NLRVRfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldElvTW9kdWxlfTtcblxuIl19