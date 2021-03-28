import { __decorate, __param } from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketFactory } from './factory/SocketFactory';
import { SocketFrontUpdateService } from './socket-front-update.service';
// @dynamic
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxXQUFXO0FBRVg7SUFDRSx3QkFBb0MsWUFBNkI7UUFDL0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYiw0RUFBNEUsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQzt1QkFOVSxjQUFjO0lBT1gsc0JBQU8sR0FBckIsVUFBc0IsTUFBcUY7UUFDekcsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDaEQ7b0JBQ0UsT0FBTyxFQUFFLHdCQUF3QjtvQkFDakMsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUM1QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztnQkFsQmtELGNBQWMsdUJBQXBELFFBQVEsWUFBSSxRQUFROztJQUR0QixjQUFjO1FBRDFCLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFFRSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQUR4QixjQUFjLENBb0IxQjtJQUFELHFCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7U09DS0VUX0NPTkZJR19UT0tFTn0gZnJvbSAnLi9jb25maWcvY29uZmlnLXRva2VuJztcbmltcG9ydCB7U29ja2V0RmFjdG9yeX0gZnJvbSAnLi9mYWN0b3J5L1NvY2tldEZhY3RvcnknO1xuaW1wb3J0IHtTb2NrZXRGcm9udFVwZGF0ZVNlcnZpY2V9IGZyb20gJy4vc29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlJztcbi8vIEBkeW5hbWljXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU29ja2V0SW9Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU/OiBTb2NrZXRJb01vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NvY2tldEZyb250VXBkYXRlTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc6IHsgdXJsPzogc3RyaW5nLCBjb25maWc/OiBTb2NrZXRJb0NvbmZpZywgYXV0aD86IGJvb2xlYW4sIGxvZ2luUGFnZT86IHN0cmluZyB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NrZXRJb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogU09DS0VUX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTb2NrZXRGcm9udFVwZGF0ZVNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogU29ja2V0RmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbU09DS0VUX0NPTkZJR19UT0tFTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==