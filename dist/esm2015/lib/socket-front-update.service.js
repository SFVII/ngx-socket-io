import { __decorate, __metadata, __param } from "tslib";
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { DefaultSocketConfig } from './config/default';
//import {SOCKET_CONFIG_TOKEN} from './socket-front-update.module';
// @dynamic
let SocketWrapper = class SocketWrapper {
    constructor(Config) {
        this.Config = Config;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        // tslint:disable-next-line:max-line-length
        //private Config: SocketIoConfig;
        this.SocketConfig = DefaultSocketConfig;
        this.Config = Config;
        if (!this.SocketConfig) {
            this.SocketConfig = {};
        }
        for (let key in Config) {
            if (key.includes('socket_')) {
                this.SocketConfig[key.replace('socket_', '')] = Config[key];
            }
        }
        this.url = (!Config || Config && !Config.url) ? '' : Config.url;
        if ((Config && !Config.auth || !Config)) {
            this.socket = this.connect();
        }
        else {
            this.socket = this.connect();
            this.tokenUpdater.subscribe((token) => {
                if (token) {
                    if (!this.SocketConfig.extraHeaders) {
                        this.SocketConfig.extraHeaders = {};
                    }
                    this.SocketConfig.extraHeaders.Authorization = `Baerer ${token}`;
                    this.socket = this.connect();
                    if (Config && Config.loginPage) {
                        this.redirectLogin(Config.loginPage);
                    }
                }
            });
        }
    }
    roomData(name, callback) {
        this.socket.emit('joinroom', name);
        this.socket.on(name, callback);
    }
    of(namespace) {
        this.socket.of(namespace);
    }
    ;
    on(eventName, callback) {
        this.socket.on(eventName, callback);
    }
    ;
    once(eventName, callback) {
        this.socket.once(eventName, callback);
    }
    ;
    connect() {
        const ioSocket = io.default ? io.default : io;
        return ioSocket(this.url, this.SocketConfig).connect();
    }
    disconnect(close) {
        return this.socket.disconnect.apply(this.socket, arguments);
    }
    emit(eventName, data, callback) {
        this.socket.emit(eventName, data, callback);
    }
    ;
    removeListener(eventName, callback) {
        return this.socket.removeListener.apply(this.socket, arguments);
    }
    ;
    removeAllListeners(eventName) {
        return this.socket.removeAllListeners.apply(this.socket, arguments);
    }
    ;
    fromEvent(eventName) {
        this.subscribersCounter++;
        return new Observable((observer) => {
            this.socket.on(eventName, (data) => {
                observer.next(data);
            });
            return () => {
                if (this.subscribersCounter === 1) {
                    this.socket.removeListener(eventName);
                }
            };
        }).pipe(share());
    }
    ;
    fromOneTimeEvent(eventName) {
        return new Promise(resolve => this.once(eventName, resolve));
    }
    ;
    redirectLogin(loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', (msg) => {
                window.location.replace(loginPage);
            });
        }
    }
};
SocketWrapper.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['__SocketWrapper__',] }] }
];
SocketWrapper = __decorate([
    Injectable(),
    __param(0, Inject('__SocketWrapper__')),
    __metadata("design:paramtypes", [Object])
], SocketWrapper);
export { SocketWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELG1FQUFtRTtBQUVuRSxXQUFXO0FBRVgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQXVCeEIsWUFBaUQsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUF0QmhFLGlCQUFZLEdBQVEsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWdCdEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRXZDLDJDQUEyQztRQUMzQyxpQ0FBaUM7UUFDaEIsaUJBQVksR0FBaUIsbUJBQW1CLENBQUM7UUFHaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7UUFDRCxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN0QixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMs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Q0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7NENBN0ZjLE1BQU0sU0FBQyxtQkFBbUI7O0FBdkI1QixhQUFhO0lBRHpCLFVBQVUsRUFBRTtJQXdCRSxXQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBOztHQXZCN0IsYUFBYSxDQW9IekI7U0FwSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRDb25maWcsIFNvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3NoYXJlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7RGVmYXVsdFNvY2tldENvbmZpZ30gZnJvbSAnLi9jb25maWcvZGVmYXVsdCc7XG4vL2ltcG9ydCB7U09DS0VUX0NPTkZJR19UT0tFTn0gZnJvbSAnLi9zb2NrZXQtZnJvbnQtdXBkYXRlLm1vZHVsZSc7XG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU29ja2V0V3JhcHBlciB7XG4gIHB1YmxpYyB0b2tlblVwZGF0ZXI6IGFueSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIHNvY2tldDogYW55O1xuICBwdWJsaWMgc29ja2V0X3BhdGg/OiBzdHJpbmc7IC8vIGRlZmF1bHQgPSAnL3NvY2tldC5pbydcbiAgcHVibGljIHNvY2tldF9yZWNvbm5lY3Rpb24/OiBib29sZWFuOyAvLyBkZWZhdWx0IHRydWVcbiAgcHVibGljIHNvY2tldF9yZWNvbm5lY3Rpb25BdHRlbXB0cz86IG51bWJlcjsgLy8gZGVmYXVsdCBJbmZpbml0eVxuICBwdWJsaWMgc29ja2V0X3JlY29ubmVjdGlvbkRlbGF5PzogbnVtYmVyOyAvLyBkZWZhdWx0IDEwMDBcbiAgcHVibGljIHNvY2tldF9yZWNvbm5lY3Rpb25EZWxheU1heD86IG51bWJlcjsgLy8gZGVmYXVsdCA1MDAwXG4gIHB1YmxpYyBzb2NrZXRfcmFuZG9taXphdGlvbkZhY3Rvcj86IG51bWJlcjsgLy8gZGVmYXVsdCAwLjUsXG4gIHB1YmxpYyBzb2NrZXRfdGltZW91dD86IG51bWJlcjsgLy8gZGVmYXVsdCAyMDAwMCxcbiAgcHVibGljIHNvY2tldF9hdXRvQ29ubmVjdD86IGJvb2xlYW47IC8vIGRlZmF1bHQgdHJ1ZSxcbiAgcHVibGljIHNvY2tldF9xdWVyeT86IGFueTsgLy8gZGVmYXVsdCB7fVxuICBwdWJsaWMgc29ja2V0X2V4dHJhSGVhZGVycz86IGFueTsgLy8gZGVmYXVsdCB7fVxuICBwdWJsaWMgc29ja2V0X3RyYW5zcG9ydHM/OiBzdHJpbmdbXTtcbiAgcHVibGljIHVybDogc3RyaW5nO1xuICBwdWJsaWMgbG9naW5QYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBhdXRoOiBib29sZWFuO1xuICBwcml2YXRlIHN1YnNjcmliZXJzQ291bnRlcjogbnVtYmVyID0gMDtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gIC8vcHJpdmF0ZSBDb25maWc6IFNvY2tldElvQ29uZmlnO1xuICBwcml2YXRlIHJlYWRvbmx5IFNvY2tldENvbmZpZzogU29ja2V0Q29uZmlnID0gRGVmYXVsdFNvY2tldENvbmZpZztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdfX1NvY2tldFdyYXBwZXJfXycpIHByaXZhdGUgQ29uZmlnOiBTb2NrZXRJb0NvbmZpZykge1xuICAgIHRoaXMuQ29uZmlnID0gQ29uZmlnO1xuICAgIGlmICghdGhpcy5Tb2NrZXRDb25maWcpIHtcbiAgICAgIHRoaXMuU29ja2V0Q29uZmlnID0ge307XG4gICAgfVxuICAgIGZvciAobGV0IGtleSBpbiBDb25maWcpIHtcbiAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ3NvY2tldF8nKSkge1xuICAgICAgICB0aGlzLlNvY2tldENvbmZpZ1trZXkucmVwbGFjZSgnc29ja2V0XycsICcnKV0gPSBDb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cmwgPSAoIUNvbmZpZyB8fCBDb25maWcgJiYgIUNvbmZpZy51cmwpID8gJycgOiBDb25maWcudXJsO1xuICAgIGlmICgoQ29uZmlnICYmICFDb25maWcuYXV0aCB8fCAhQ29uZmlnKSkge1xuICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICAgIHRoaXMudG9rZW5VcGRhdGVyLnN1YnNjcmliZSgodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICBpZiAoIXRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5Tb2NrZXRDb25maWcuZXh0cmFIZWFkZXJzID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJhZXJlciAke3Rva2VufWA7XG4gICAgICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICAgICAgICBpZiAoQ29uZmlnICYmIENvbmZpZy5sb2dpblBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RMb2dpbihDb25maWcubG9naW5QYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJvb21EYXRhKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KCdqb2lucm9vbScsIG5hbWUpO1xuICAgIHRoaXMuc29ja2V0Lm9uKG5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9mKG5hbWVzcGFjZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub2YobmFtZXNwYWNlKTtcbiAgfTtcblxuICBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uY2UoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgY29ubmVjdCgpIHtcbiAgICBjb25zdCBpb1NvY2tldCA9IChpbyBhcyBhbnkpLmRlZmF1bHQgPyAoaW8gYXMgYW55KS5kZWZhdWx0IDogaW87XG4gICAgcmV0dXJuIGlvU29ja2V0KHRoaXMudXJsLCB0aGlzLlNvY2tldENvbmZpZykuY29ubmVjdCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdChjbG9zZT86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IHZvaWQpOiBhbnkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgZnJvbUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnN1YnNjcmliZXJzQ291bnRlcisrO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzQ291bnRlciA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkucGlwZShzaGFyZSgpKTtcbiAgfTtcblxuICBmcm9tT25lVGltZUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLm9uY2UoZXZlbnROYW1lLCByZXNvbHZlKSk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZWRpcmVjdExvZ2luKGxvZ2luUGFnZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0ICYmIGxvZ2luUGFnZSkge1xuICAgICAgdGhpcy5zb2NrZXQub24oJ3Nlc3Npb24tdGltZS1vdXQnLCAobXNnOiBhbnkpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UobG9naW5QYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19