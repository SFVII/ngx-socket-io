import { __decorate, __metadata, __param } from "tslib";
import { EventEmitter, Optional } from '@angular/core';
import { DefaultSocketConfig } from './config/default';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
// @dynamic
var SocketWrapper = /** @class */ (function () {
    function SocketWrapper(config, url, auth, loginPage) {
        var _this = this;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.loginPage = null;
        this.config = !config ? DefaultSocketConfig : config;
        this.url = !url ? '' : url;
        if (auth) {
            this.socket = this.connect();
        }
        else {
            this.tokenUpdater.subscribe(function (token) {
                if (token) {
                    _this.config.extraHeaders.Authorization = "Baerer " + token;
                    _this.socket = _this.connect();
                    _this.redirectLogin(loginPage);
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
        return ioSocket(this.url, this.config).connect();
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
    SocketWrapper = __decorate([
        __param(0, Optional()),
        __metadata("design:paramtypes", [Object, String, Boolean, String])
    ], SocketWrapper);
    return SocketWrapper;
}());
export { SocketWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFdkMsV0FBVztBQUNYO0lBV0UsdUJBQXdCLE1BQXVCLEVBQUUsR0FBWSxFQUFFLElBQWMsRUFBRSxTQUFrQjtRQUFqRyxpQkFjQztRQXZCTSxpQkFBWSxHQUFRLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBSy9CLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFHL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQWE7Z0JBQ3hDLElBQUksS0FBSyxFQUFFO29CQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFD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QUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFBQSxDQUFDO0lBRUYsd0NBQWdCLEdBQWhCLFVBQW9CLFNBQWlCO1FBQXJDLGlCQUVDO1FBREMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUFBLENBQUM7SUFFTSxxQ0FBYSxHQUFyQixVQUFzQixTQUFpQjtRQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQUMsR0FBUTtnQkFDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUF6RlUsYUFBYTtRQVdYLFdBQUEsUUFBUSxFQUFFLENBQUE7O09BWFosYUFBYSxDQTBGekI7SUFBRCxvQkFBQztDQUFBLEFBMUZELElBMEZDO1NBMUZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge0RlZmF1bHRTb2NrZXRDb25maWd9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIFNvY2tldFdyYXBwZXIge1xuXG4gIHB1YmxpYyB0b2tlblVwZGF0ZXI6IGFueSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIHNvY2tldDogYW55O1xuICBwcml2YXRlIHN1YnNjcmliZXJzQ291bnRlcjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICBwcml2YXRlIGNvbmZpZzogU29ja2V0SW9Db25maWc7XG4gIHByaXZhdGUgYXV0aDogZmFsc2U7XG4gIHByaXZhdGUgbG9naW5QYWdlOiBzdHJpbmcgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldElvQ29uZmlnLCB1cmw/OiBzdHJpbmcsIGF1dGg/OiBib29sZWFuLCBsb2dpblBhZ2U/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbmZpZyA9ICFjb25maWcgPyBEZWZhdWx0U29ja2V0Q29uZmlnIDogY29uZmlnO1xuICAgIHRoaXMudXJsID0gIXVybCA/ICcnIDogdXJsO1xuICAgIGlmIChhdXRoKSB7XG4gICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRva2VuVXBkYXRlci5zdWJzY3JpYmUoKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuZXh0cmFIZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmFlcmVyICR7dG9rZW59YDtcbiAgICAgICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgICAgICAgIHRoaXMucmVkaXJlY3RMb2dpbihsb2dpblBhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByb29tRGF0YShuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zb2NrZXQuZW1pdCgnam9pbnJvb20nLCBuYW1lKTtcbiAgICB0aGlzLnNvY2tldC5vbihuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBvZihuYW1lc3BhY2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9mKG5hbWVzcGFjZSk7XG4gIH07XG5cbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgb25jZShldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbmNlKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIGNvbm5lY3QoKSB7XG4gICAgY29uc3QgaW9Tb2NrZXQgPSAoaW8gYXMgYW55KS5kZWZhdWx0ID8gKGlvIGFzIGFueSkuZGVmYXVsdCA6IGlvO1xuICAgIHJldHVybiBpb1NvY2tldCh0aGlzLnVybCwgdGhpcy5jb25maWcpLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY2xvc2U/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5kaXNjb25uZWN0LmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZW1pdChldmVudE5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiB2b2lkKTogYW55IHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KGV2ZW50TmFtZSwgZGF0YSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIHJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86ICgpID0+IHZvaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lPzogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIGZyb21FdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIrKztcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pLnBpcGUoc2hhcmUoKSk7XG4gIH07XG5cbiAgZnJvbU9uZVRpbWVFdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5vbmNlKGV2ZW50TmFtZSwgcmVzb2x2ZSkpO1xuICB9O1xuXG4gIHByaXZhdGUgcmVkaXJlY3RMb2dpbihsb2dpblBhZ2U6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNvY2tldCAmJiBsb2dpblBhZ2UpIHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdzZXNzaW9uLXRpbWUtb3V0JywgKG1zZzogYW55KSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGxvZ2luUGFnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==