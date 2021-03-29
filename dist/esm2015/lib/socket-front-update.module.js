var SocketIoModule_1;
import { __decorate, __metadata, __param } from "tslib";
import { InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketWrapper } from './socket-front-update.service';
// tslint:disable-next-line:max-line-length
export function SocketFactory(config) {
    return new SocketWrapper(config.config, config.url, config.auth, config.loginPage);
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
    NgModule({}),
    __param(0, Optional()), __param(0, SkipSelf()),
    __metadata("design:paramtypes", [SocketIoModule])
], SocketIoModule);
export { SocketIoModule, SocketWrapper, SocketWrapper as Socket };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zb2NrZXQtZnJvbnQtdXBkYXRlLyIsInNvdXJjZXMiOlsibGliL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGNBQWMsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRTVELDJDQUEyQztBQUMzQyxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXFGO0lBQ2pILE9BQU8sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBaUIscUJBQXFCLENBQUMsQ0FBQztBQUc3RixJQUFNLGNBQWMsc0JBQXBCLE1BQU0sY0FBYztJQUNsQixZQUFvQyxZQUE2QjtRQUMvRCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLDRFQUE0RSxDQUFDLENBQUM7U0FDakY7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFxRjtRQUN6RyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUNoRDtvQkFDRSxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUM1QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBOztZQXBCb0QsY0FBYyx1QkFBcEQsUUFBUSxZQUFJLFFBQVE7O0FBRDdCLGNBQWM7SUFEbkIsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUVFLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO3FDQUFnQixjQUFjO0dBRDdELGNBQWMsQ0FxQm5CO0FBRUQsT0FBTyxFQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsYUFBYSxJQUFJLE1BQU0sRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7U29ja2V0V3JhcHBlcn0gZnJvbSAnLi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5leHBvcnQgZnVuY3Rpb24gU29ja2V0RmFjdG9yeShjb25maWc6IHsgdXJsPzogc3RyaW5nLCBjb25maWc/OiBTb2NrZXRJb0NvbmZpZywgYXV0aD86IGJvb2xlYW4sIGxvZ2luUGFnZT86IHN0cmluZyB9KSB7XG4gIHJldHVybiBuZXcgU29ja2V0V3JhcHBlcihjb25maWcuY29uZmlnLCBjb25maWcudXJsLCBjb25maWcuYXV0aCwgY29uZmlnLmxvZ2luUGFnZSk7XG59XG5cbmV4cG9ydCBjb25zdCBTT0NLRVRfQ09ORklHX1RPS0VOID0gbmV3IEluamVjdGlvblRva2VuPFNvY2tldElvQ29uZmlnPignX19TT0NLRVRfSU9fQ09ORklHXycpO1xuXG5ATmdNb2R1bGUoe30pXG5jbGFzcyBTb2NrZXRJb01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZT86IFNvY2tldElvTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnU29ja2V0RnJvbnRVcGRhdGVNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnOiB7IGNvbmZpZz86IFNvY2tldElvQ29uZmlnOyB1cmw/OiBzdHJpbmc7IGF1dGg/OiBib29sZWFuOyBsb2dpblBhZ2U/OiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29ja2V0SW9Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IFNPQ0tFVF9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU29ja2V0V3JhcHBlcixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBTb2NrZXRGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtTT0NLRVRfQ09ORklHX1RPS0VOXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1NvY2tldElvTW9kdWxlLCBTb2NrZXRXcmFwcGVyLCBTb2NrZXRXcmFwcGVyIGFzIFNvY2tldH07XG5cbiJdfQ==