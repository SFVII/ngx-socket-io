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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRTVELDJDQUEyQztBQUMzQyxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXNCO0lBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQWlCLG1CQUFtQixDQUFDLENBQUM7QUFLM0YsSUFBTSxjQUFjLHNCQUFwQixNQUFNLGNBQWM7SUFDbEIsWUFBb0MsWUFBNkI7UUFDL0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYiw0RUFBNEUsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDekMsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDaEQ7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDNUI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUFwQm9ELGNBQWMsdUJBQXBELFFBQVEsWUFBSSxRQUFROztBQUQ3QixjQUFjO0lBSG5CLFFBQVEsQ0FBQztRQUNSLFNBQVMsRUFBRyxDQUFDLGFBQWEsQ0FBQztLQUM1QixDQUFDO0lBRWEsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsUUFBUSxFQUFFLENBQUE7cUNBQWdCLGNBQWM7R0FEN0QsY0FBYyxDQXFCbkI7QUFFRCxPQUFPLEVBQUMsY0FBYyxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29ja2V0SW9Db25maWd9IGZyb20gJy4vaW50ZXJmYWNlL0ludGVyZmFjZS1jb25maWcnO1xuaW1wb3J0IHtTb2NrZXRXcmFwcGVyfSBmcm9tICcuL3NvY2tldC1mcm9udC11cGRhdGUuc2VydmljZSc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbmV4cG9ydCBmdW5jdGlvbiBTb2NrZXRGYWN0b3J5KGNvbmZpZzogU29ja2V0SW9Db25maWcpIHtcbiAgcmV0dXJuIChjb25maWcpO1xufVxuXG5leHBvcnQgY29uc3QgU09DS0VUX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTb2NrZXRJb0NvbmZpZz4oJ19fU29ja2V0V3JhcHBlcl9fJyk7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVycyA6IFtTb2NrZXRXcmFwcGVyXVxufSlcbmNsYXNzIFNvY2tldElvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogU29ja2V0SW9Nb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdTb2NrZXRGcm9udFVwZGF0ZU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNvY2tldFdyYXBwZXIpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNvY2tldElvTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NrZXRJb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogU09DS0VUX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTb2NrZXRXcmFwcGVyLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IFNvY2tldEZhY3RvcnksXG4gICAgICAgICAgZGVwczogW1NPQ0tFVF9DT05GSUdfVE9LRU5dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7U29ja2V0SW9Nb2R1bGV9O1xuXG4iXX0=