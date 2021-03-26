import { NgModule } from '@angular/core';
import { SOCKET_CONFIG_TOKEN } from './config/config-token';
import { SocketWrapper } from './core/SocketWrapper';
import { SocketFactory } from './factory/SocketFactory';
import * as i0 from "@angular/core";
export class SocketFrontUpdateModule {
    static forRoot(url = '', config) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0seUJBQXlCLENBQUM7O0FBR3RELE1BQU0sT0FBTyx1QkFBdUI7SUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFjLEVBQUUsRUFBRSxNQUFzQjtRQUM1RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDaEQ7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDNUI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzsyREFiVSx1QkFBdUI7NkhBQXZCLHVCQUF1QjtrREFBdkIsdUJBQXVCO2NBRG5DLFFBQVE7ZUFBQyxFQUFFOztBQWlCWixPQUFPLEVBQUMsdUJBQXVCLElBQUksY0FBYyxFQUFFLGFBQWEsSUFBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29ja2V0SW9Db25maWd9IGZyb20gJy4vaW50ZXJmYWNlL0ludGVyZmFjZS1jb25maWcnO1xuaW1wb3J0IHtTT0NLRVRfQ09ORklHX1RPS0VOfSBmcm9tICcuL2NvbmZpZy9jb25maWctdG9rZW4nO1xuaW1wb3J0IHtTb2NrZXRXcmFwcGVyfSBmcm9tICcuL2NvcmUvU29ja2V0V3JhcHBlcic7XG5pbXBvcnQge1NvY2tldEZhY3Rvcnl9IGZyb20gJy4vZmFjdG9yeS9Tb2NrZXRGYWN0b3J5JztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFNvY2tldEZyb250VXBkYXRlTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KHVybDogc3RyaW5nID0gJycsIGNvbmZpZzogU29ja2V0SW9Db25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNvY2tldEZyb250VXBkYXRlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogU09DS0VUX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTb2NrZXRXcmFwcGVyLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IFNvY2tldEZhY3RvcnksXG4gICAgICAgICAgZGVwczogW1NPQ0tFVF9DT05GSUdfVE9LRU5dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7U29ja2V0RnJvbnRVcGRhdGVNb2R1bGUgYXMgU29ja2V0SW9Nb2R1bGUsIFNvY2tldFdyYXBwZXIgYXMgU29ja2V0LCBTT0NLRVRfQ09ORklHX1RPS0VOLCBTb2NrZXRGYWN0b3J5fTtcbiJdfQ==