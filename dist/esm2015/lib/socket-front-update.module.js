import { NgModule } from '@angular/core';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketWrapper } from './core/SocketWrapper';
import { SocketFactory } from './factory/SocketFactory';
import * as i0 from "@angular/core";
export class SocketFrontUpdateModule {
    static forRoot(config) {
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
    }
}
SocketFrontUpdateModule.ɵmod = i0.ɵɵdefineNgModule({ type: SocketFrontUpdateModule });
SocketFrontUpdateModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SocketFrontUpdateModule_Factory(t) { return new (t || SocketFrontUpdateModule)(); } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SocketFrontUpdateModule, [{
        type: NgModule,
        args: [{}]
    }], null, null); })();
export { SocketFrontUpdateModule as SocketIoModule, SocketWrapper as Socket, SOCKET_CONFIG_TOKEN, SocketFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0seUJBQXlCLENBQUM7O0FBR3RELE1BQU0sT0FBTyx1QkFBdUI7SUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUErQztRQUNuRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDaEQ7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDNUI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzsyREFiVSx1QkFBdUI7NkhBQXZCLHVCQUF1QjtrREFBdkIsdUJBQXVCO2NBRG5DLFFBQVE7ZUFBQyxFQUFFOztBQWlCWixPQUFPLEVBQUMsdUJBQXVCLElBQUksY0FBYyxFQUFFLGFBQWEsSUFBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29ja2V0SW9Db25maWd9IGZyb20gJy4vaW50ZXJmYWNlL0ludGVyZmFjZS1jb25maWcnO1xuaW1wb3J0IHtTT0NLRVRfQ09ORklHX1RPS0VOfSBmcm9tICcuL2NvbmZpZy9jb25maWctdG9rZW4nO1xuaW1wb3J0IHtTb2NrZXRXcmFwcGVyfSBmcm9tICcuL2NvcmUvU29ja2V0V3JhcHBlcic7XG5pbXBvcnQge1NvY2tldEZhY3Rvcnl9IGZyb20gJy4vZmFjdG9yeS9Tb2NrZXRGYWN0b3J5JztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFNvY2tldEZyb250VXBkYXRlTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZzogeyB1cmw6IHN0cmluZywgY29uZmlnOiBTb2NrZXRJb0NvbmZpZyB9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29ja2V0RnJvbnRVcGRhdGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IFNPQ0tFVF9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU29ja2V0V3JhcHBlcixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBTb2NrZXRGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtTT0NLRVRfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldEZyb250VXBkYXRlTW9kdWxlIGFzIFNvY2tldElvTW9kdWxlLCBTb2NrZXRXcmFwcGVyIGFzIFNvY2tldCwgU09DS0VUX0NPTkZJR19UT0tFTiwgU29ja2V0RmFjdG9yeX07XG4iXX0=