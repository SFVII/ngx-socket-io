import { __decorate, __metadata, __param } from "tslib";
import { InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketWrapper } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return (new SocketWrapper(config));
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
        NgModule({
            providers: [SocketWrapper]
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [SocketIoModule])
    ], SocketIoModule);
    return SocketIoModule;
}());
export { SocketIoModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsMkNBQTJDO0FBQzNDLE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBc0I7SUFDbEQsT0FBTyxDQUFDLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUFpQixxQkFBcUIsQ0FBQyxDQUFDO0FBSzdGO0lBQ0Usd0JBQW9DLFlBQTZCO1FBQy9ELElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNEVBQTRFLENBQUMsQ0FBQztTQUNqRjtJQUNILENBQUM7dUJBTkcsY0FBYztJQVFKLHNCQUFPLEdBQXJCLFVBQXNCLE1BQXFCO1FBQ3pDLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7Z0JBQ2hEO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O2dCQW5Ca0QsY0FBYyx1QkFBcEQsUUFBUSxZQUFJLFFBQVE7O0lBRDdCLGNBQWM7UUFIbkIsUUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFHLENBQUMsYUFBYSxDQUFDO1NBQzVCLENBQUM7UUFFYSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTt5Q0FBZ0IsY0FBYztPQUQ3RCxjQUFjLENBcUJuQjtJQUFELHFCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFFRCxPQUFPLEVBQUMsY0FBYyxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29ja2V0SW9Db25maWd9IGZyb20gJy4vaW50ZXJmYWNlL0ludGVyZmFjZS1jb25maWcnO1xuaW1wb3J0IHtTb2NrZXRXcmFwcGVyfSBmcm9tICcuL3NvY2tldC1mcm9udC11cGRhdGUuc2VydmljZSc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbmV4cG9ydCBmdW5jdGlvbiBTb2NrZXRGYWN0b3J5KGNvbmZpZzogU29ja2V0SW9Db25maWcpIHtcbiAgcmV0dXJuIChuZXcgU29ja2V0V3JhcHBlcihjb25maWcpKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNPQ0tFVF9DT05GSUdfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48U29ja2V0SW9Db25maWc+KCdfX1NPQ0tFVF9JT19DT05GSUdfJyk7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVycyA6IFtTb2NrZXRXcmFwcGVyXVxufSlcbmNsYXNzIFNvY2tldElvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogU29ja2V0SW9Nb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNvY2tldFdyYXBwZXIpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNvY2tldElvTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NrZXRJb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogU09DS0VUX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTb2NrZXRXcmFwcGVyLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IFNvY2tldEZhY3RvcnksXG4gICAgICAgICAgZGVwczogW1NPQ0tFVF9DT05GSUdfVE9LRU5dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7U29ja2V0SW9Nb2R1bGV9O1xuXG4iXX0=