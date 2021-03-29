import { __decorate, __metadata, __param } from "tslib";
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { SOCKET_CONFIG_TOKEN } from './socket-front-update.module';
import * as i0 from "@angular/core";
import * as i1 from "./socket-front-update.module";
// @dynamic
var SocketWrapper = /** @class */ (function () {
    function SocketWrapper(Config) {
        var _this = this;
        this.Config = Config;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.Config = Config;
        for (var key in Config) {
            if (key.includes('socket_')) {
                this.SocketConfig[key.replace('socket_', '')] = Config[key];
            }
        }
        this.url = (!Config || Config && !Config.url) ? '' : Config.url;
        if ((Config && !Config.auth || !Config)) {
            this.socket = this.connect();
        }
        else {
            this.tokenUpdater.subscribe(function (token) {
                if (token) {
                    if (!_this.SocketConfig.extraHeaders) {
                        _this.SocketConfig.extraHeaders = {};
                    }
                    _this.SocketConfig.extraHeaders.Authorization = "Baerer " + token;
                    _this.socket = _this.connect();
                    if (Config && Config.loginPage) {
                        _this.redirectLogin(Config.loginPage);
                    }
                }
            });
        }
    }
    SocketWrapper.prototype.roomData = function (name, callback) {
        this.socket.emit('joinroom', name);
        this.socket.on(name, callback);
    };
    SocketWrapper.prototype.of = function (namespace) {
        this.socket.of(namespace);
    };
    ;
    SocketWrapper.prototype.on = function (eventName, callback) {
        this.socket.on(eventName, callback);
    };
    ;
    SocketWrapper.prototype.once = function (eventName, callback) {
        this.socket.once(eventName, callback);
    };
    ;
    SocketWrapper.prototype.connect = function () {
        var ioSocket = io.default ? io.default : io;
        return ioSocket(this.url, this.SocketConfig).connect();
    };
    SocketWrapper.prototype.disconnect = function (close) {
        return this.socket.disconnect.apply(this.socket, arguments);
    };
    SocketWrapper.prototype.emit = function (eventName, data, callback) {
        this.socket.emit(eventName, data, callback);
    };
    ;
    SocketWrapper.prototype.removeListener = function (eventName, callback) {
        return this.socket.removeListener.apply(this.socket, arguments);
    };
    ;
    SocketWrapper.prototype.removeAllListeners = function (eventName) {
        return this.socket.removeAllListeners.apply(this.socket, arguments);
    };
    ;
    SocketWrapper.prototype.fromEvent = function (eventName) {
        var _this = this;
        this.subscribersCounter++;
        return new Observable(function (observer) {
            _this.socket.on(eventName, function (data) {
                observer.next(data);
            });
            return function () {
                if (_this.subscribersCounter === 1) {
                    _this.socket.removeListener(eventName);
                }
            };
        }).pipe(share());
    };
    ;
    SocketWrapper.prototype.fromOneTimeEvent = function (eventName) {
        var _this = this;
        return new Promise(function (resolve) { return _this.once(eventName, resolve); });
    };
    ;
    SocketWrapper.prototype.redirectLogin = function (loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', function (msg) {
                window.location.replace(loginPage);
            });
        }
    };
    SocketWrapper.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [SOCKET_CONFIG_TOKEN,] }] }
    ]; };
    SocketWrapper.ɵprov = i0.ɵɵdefineInjectable({ factory: function SocketWrapper_Factory() { return new SocketWrapper(i0.ɵɵinject(i1.SOCKET_CONFIG_TOKEN)); }, token: SocketWrapper, providedIn: "root" });
    SocketWrapper = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(0, Inject(SOCKET_CONFIG_TOKEN)),
        __metadata("design:paramtypes", [Object])
    ], SocketWrapper);
    return SocketWrapper;
}());
export { SocketWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7QUFFakUsV0FBVztBQUlYO0lBdUJFLHVCQUFpRCxNQUFzQjtRQUF2RSxpQkF3QkM7UUF4QmdELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBdEJoRSxpQkFBWSxHQUFRLElBQUksWUFBWSxFQUFFLENBQUM7UUFnQnRDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQU9yQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN0QixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0Q7U0FDRjtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcs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QUNwQixDQUFDO1FBd0JhLFdBQUEsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7O09BdkI3QixhQUFhLENBZ0h6Qjt3QkEzSEQ7Q0EySEMsQUFoSEQsSUFnSEM7U0FoSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRDb25maWcsIFNvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3NoYXJlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7U09DS0VUX0NPTkZJR19UT0tFTn0gZnJvbSAnLi9zb2NrZXQtZnJvbnQtdXBkYXRlLm1vZHVsZSc7XG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW4gOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU29ja2V0V3JhcHBlciB7XG4gIHB1YmxpYyB0b2tlblVwZGF0ZXI6IGFueSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIHNvY2tldDogYW55O1xuICBwdWJsaWMgc29ja2V0X3BhdGg/OiBzdHJpbmc7IC8vIGRlZmF1bHQgPSAnL3NvY2tldC5pbydcbiAgcHVibGljIHNvY2tldF9yZWNvbm5lY3Rpb24/OiBib29sZWFuOyAvLyBkZWZhdWx0IHRydWVcbiAgcHVibGljIHNvY2tldF9yZWNvbm5lY3Rpb25BdHRlbXB0cz86IG51bWJlcjsgLy8gZGVmYXVsdCBJbmZpbml0eVxuICBwdWJsaWMgc29ja2V0X3JlY29ubmVjdGlvbkRlbGF5PzogbnVtYmVyOyAvLyBkZWZhdWx0IDEwMDBcbiAgcHVibGljIHNvY2tldF9yZWNvbm5lY3Rpb25EZWxheU1heD86IG51bWJlcjsgLy8gZGVmYXVsdCA1MDAwXG4gIHB1YmxpYyBzb2NrZXRfcmFuZG9taXphdGlvbkZhY3Rvcj86IG51bWJlcjsgLy8gZGVmYXVsdCAwLjUsXG4gIHB1YmxpYyBzb2NrZXRfdGltZW91dD86IG51bWJlcjsgLy8gZGVmYXVsdCAyMDAwMCxcbiAgcHVibGljIHNvY2tldF9hdXRvQ29ubmVjdD86IGJvb2xlYW47IC8vIGRlZmF1bHQgdHJ1ZSxcbiAgcHVibGljIHNvY2tldF9xdWVyeT86IGFueTsgLy8gZGVmYXVsdCB7fVxuICBwdWJsaWMgc29ja2V0X2V4dHJhSGVhZGVycz86IGFueTsgLy8gZGVmYXVsdCB7fVxuICBwdWJsaWMgc29ja2V0X3RyYW5zcG9ydHM/OiBzdHJpbmdbXTtcbiAgcHVibGljIHVybDogc3RyaW5nO1xuICBwdWJsaWMgbG9naW5QYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBhdXRoOiBib29sZWFuO1xuICBwcml2YXRlIHN1YnNjcmliZXJzQ291bnRlcjogbnVtYmVyID0gMDtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gIC8vcHJpdmF0ZSBDb25maWc6IFNvY2tldElvQ29uZmlnO1xuICBwcml2YXRlIFNvY2tldENvbmZpZzogU29ja2V0Q29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoU09DS0VUX0NPTkZJR19UT0tFTikgcHJpdmF0ZSBDb25maWc6IFNvY2tldElvQ29uZmlnKSB7XG4gICAgdGhpcy5Db25maWcgPSBDb25maWc7XG4gICAgZm9yIChsZXQga2V5IGluIENvbmZpZykge1xuICAgICAgaWYgKGtleS5pbmNsdWRlcygnc29ja2V0XycpKSB7XG4gICAgICAgIHRoaXMuU29ja2V0Q29uZmlnW2tleS5yZXBsYWNlKCdzb2NrZXRfJywgJycpXSA9IENvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVybCA9ICghQ29uZmlnIHx8IENvbmZpZyAmJiAhQ29uZmlnLnVybCkgPyAnJyA6IENvbmZpZy51cmw7XG4gICAgaWYgKChDb25maWcgJiYgIUNvbmZpZy5hdXRoIHx8ICFDb25maWcpKSB7XG4gICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRva2VuVXBkYXRlci5zdWJzY3JpYmUoKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLlNvY2tldENvbmZpZy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycyA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy5leHRyYUhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCYWVyZXIgJHt0b2tlbn1gO1xuICAgICAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgICAgICAgaWYgKENvbmZpZyAmJiBDb25maWcubG9naW5QYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0TG9naW4oQ29uZmlnLmxvZ2luUGFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByb29tRGF0YShuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zb2NrZXQuZW1pdCgnam9pbnJvb20nLCBuYW1lKTtcbiAgICB0aGlzLnNvY2tldC5vbihuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBvZihuYW1lc3BhY2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9mKG5hbWVzcGFjZSk7XG4gIH07XG5cbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgb25jZShldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbmNlKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIGNvbm5lY3QoKSB7XG4gICAgY29uc3QgaW9Tb2NrZXQgPSAoaW8gYXMgYW55KS5kZWZhdWx0ID8gKGlvIGFzIGFueSkuZGVmYXVsdCA6IGlvO1xuICAgIHJldHVybiBpb1NvY2tldCh0aGlzLnVybCwgdGhpcy5Tb2NrZXRDb25maWcpLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY2xvc2U/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5kaXNjb25uZWN0LmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZW1pdChldmVudE5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiB2b2lkKTogYW55IHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KGV2ZW50TmFtZSwgZGF0YSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIHJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86ICgpID0+IHZvaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lPzogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIGZyb21FdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIrKztcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pLnBpcGUoc2hhcmUoKSk7XG4gIH07XG5cbiAgZnJvbU9uZVRpbWVFdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5vbmNlKGV2ZW50TmFtZSwgcmVzb2x2ZSkpO1xuICB9O1xuXG4gIHByaXZhdGUgcmVkaXJlY3RMb2dpbihsb2dpblBhZ2U6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNvY2tldCAmJiBsb2dpblBhZ2UpIHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdzZXNzaW9uLXRpbWUtb3V0JywgKG1zZzogYW55KSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGxvZ2luUGFnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==