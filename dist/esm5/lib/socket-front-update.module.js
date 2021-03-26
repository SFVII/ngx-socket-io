import { NgModule } from '@angular/core';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketWrapper } from './core/SocketWrapper';
import { SocketFactory } from './factory/SocketFactory';
import * as i0 from "@angular/core";
var SocketFrontUpdateModule = /** @class */ (function () {
    function SocketFrontUpdateModule() {
    }
    SocketFrontUpdateModule.forRoot = function (url, config) {
        if (url === void 0) { url = ''; }
        return {
            ngModule: SocketFrontUpdateModule,
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
    SocketFrontUpdateModule.ɵmod = i0.ɵɵdefineNgModule({ type: SocketFrontUpdateModule });
    SocketFrontUpdateModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SocketFrontUpdateModule_Factory(t) { return new (t || SocketFrontUpdateModule)(); } });
    return SocketFrontUpdateModule;
}());
export { SocketFrontUpdateModule };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SocketFrontUpdateModule, [{
        type: NgModule,
        args: [{}]
    }], null, null); })();
export { SocketFrontUpdateModule as SocketIoModule, SocketWrapper as Socket, SOCKET_CONFIG_TOKEN, SocketFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0seUJBQXlCLENBQUM7O0FBRXREO0lBQUE7S0FlQztJQWJlLCtCQUFPLEdBQXJCLFVBQXNCLEdBQWdCLEVBQUUsTUFBc0I7UUFBeEMsb0JBQUEsRUFBQSxRQUFnQjtRQUNwQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDaEQ7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDNUI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOytEQWJVLHVCQUF1QjtpSUFBdkIsdUJBQXVCO2tDQVBwQztDQXFCQyxBQWZELElBZUM7U0FkWSx1QkFBdUI7a0RBQXZCLHVCQUF1QjtjQURuQyxRQUFRO2VBQUMsRUFBRTs7QUFpQlosT0FBTyxFQUFDLHVCQUF1QixJQUFJLGNBQWMsRUFBRSxhQUFhLElBQUksTUFBTSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7U09DS0VUX0NPTkZJR19UT0tFTn0gZnJvbSAnLi9jb25maWcvY29uZmlnLXRva2VuJztcbmltcG9ydCB7U29ja2V0V3JhcHBlcn0gZnJvbSAnLi9jb3JlL1NvY2tldFdyYXBwZXInO1xuaW1wb3J0IHtTb2NrZXRGYWN0b3J5fSBmcm9tICcuL2ZhY3RvcnkvU29ja2V0RmFjdG9yeSc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCh1cmw6IHN0cmluZyA9ICcnLCBjb25maWc6IFNvY2tldElvQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29ja2V0RnJvbnRVcGRhdGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IFNPQ0tFVF9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU29ja2V0V3JhcHBlcixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBTb2NrZXRGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtTT0NLRVRfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldEZyb250VXBkYXRlTW9kdWxlIGFzIFNvY2tldElvTW9kdWxlLCBTb2NrZXRXcmFwcGVyIGFzIFNvY2tldCwgU09DS0VUX0NPTkZJR19UT0tFTiwgU29ja2V0RmFjdG9yeX07XG4iXX0=