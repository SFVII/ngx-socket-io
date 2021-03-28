import { __decorate, __param } from "tslib";
import { InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketFrontUpdateService as Socket } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return new Socket(config);
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
                    provide: Socket,
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
export { SocketIoModule, Socket };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUMsd0JBQXdCLElBQUksTUFBTSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFakYsMkNBQTJDO0FBQzNDLE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBd1Y7SUFDcFgsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQWlCLHFCQUFxQixDQUFDLENBQUM7QUFHN0Y7SUFDRSx3QkFBb0MsWUFBNkI7UUFDL0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYiw0RUFBNEUsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQzt1QkFORyxjQUFjO0lBUUosc0JBQU8sR0FBckIsVUFBc0IsTUFBcUY7UUFDekcsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDaEQ7b0JBQ0UsT0FBTyxFQUFFLE1BQU07b0JBQ2YsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUM1QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztnQkFuQmtELGNBQWMsdUJBQXBELFFBQVEsWUFBSSxRQUFROztJQUQ3QixjQUFjO1FBRG5CLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFFRSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQUQvQixjQUFjLENBcUJuQjtJQUFELHFCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFFRCxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7U29ja2V0RnJvbnRVcGRhdGVTZXJ2aWNlIGFzIFNvY2tldH0gZnJvbSAnLi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5leHBvcnQgZnVuY3Rpb24gU29ja2V0RmFjdG9yeShjb25maWc6IHsgdXJsPzogc3RyaW5nLCBjb25maWc/OiB7IHBhdGg/OiBzdHJpbmc7IGF1dG9Db25uZWN0PzogYm9vbGVhbjsgdHJhbnNwb3J0cz86IHN0cmluZ1tdOyBxdWVyeT86IHt9OyByZWNvbm5lY3Rpb25EZWxheU1heD86IG51bWJlcjsgZXh0cmFIZWFkZXJzPzoge307IHJlY29ubmVjdGlvbj86IGJvb2xlYW47IHJlY29ubmVjdGlvbkF0dGVtcHRzPzogbnVtYmVyOyB0aW1lb3V0PzogbnVtYmVyOyByZWNvbm5lY3Rpb25EZWxheT86IG51bWJlcjsgcmFuZG9taXphdGlvbkZhY3Rvcj86IG51bWJlciB9IHwgU29ja2V0SW9Db25maWcsIGF1dGg/OiBib29sZWFuLCBsb2dpblBhZ2U/OiBzdHJpbmcgfSkge1xuICByZXR1cm4gbmV3IFNvY2tldChjb25maWcpO1xufVxuXG5leHBvcnQgY29uc3QgU09DS0VUX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTb2NrZXRJb0NvbmZpZz4oJ19fU09DS0VUX0lPX0NPTkZJR18nKTtcblxuQE5nTW9kdWxlKHt9KVxuY2xhc3MgU29ja2V0SW9Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU/OiBTb2NrZXRJb01vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NvY2tldEZyb250VXBkYXRlTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZzogeyB1cmw/OiBzdHJpbmcsIGNvbmZpZz86IFNvY2tldElvQ29uZmlnLCBhdXRoPzogYm9vbGVhbiwgbG9naW5QYWdlPzogc3RyaW5nIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNvY2tldElvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBTT0NLRVRfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNvY2tldCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBTb2NrZXRGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtTT0NLRVRfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldElvTW9kdWxlLCBTb2NrZXR9O1xuXG4iXX0=