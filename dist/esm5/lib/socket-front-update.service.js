import { __decorate, __metadata, __param, __values } from "tslib";
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { DefaultSocketConfig } from './config/default';
//import {SOCKET_CONFIG_TOKEN} from './socket-front-update.module';
// @dynamic
var SocketWrapper = /** @class */ (function () {
    function SocketWrapper(Config) {
        var _this = this;
        this.Config = Config;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.roomList = [];
        this.SocketConfig = DefaultSocketConfig;
        this.Config = Config;
        if (!this.SocketConfig) {
            this.SocketConfig = {};
        }
        for (var key in Config) {
            if (key.includes('socket_')) {
                this.SocketConfig[key.replace('socket_', '')] = Config[key];
            }
        }
        this.url = (!Config || Config && !Config.url) ? '' : Config.url;
        if ((Config && !Config.auth || !Config)) {
            this.socket = this.connect();
            this.onReconnect();
        }
        else {
            this.socket = this.connect();
            this.tokenUpdater.subscribe(function (token) {
                var e_1, _a;
                _this.disconnect();
                if (token) {
                    if (!_this.SocketConfig.extraHeaders) {
                        _this.SocketConfig.extraHeaders = {};
                    }
                    if (!_this.SocketConfig.transportOptions) {
                        _this.SocketConfig.transportOptions = {};
                    }
                    try {
                        for (var _b = __values(_this.SocketConfig.transports), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var en = _c.value;
                            _this.SocketConfig.transportOptions[en] = {
                                extraHeaders: {
                                    Authorization: "Baerer " + token
                                }
                            };
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    _this.SocketConfig.extraHeaders.Authorization = "Baerer " + token;
                    _this.SocketConfig.query.token = "" + token;
                    _this.socket = _this.connect();
                    if (Config && Config.loginPage) {
                        _this.redirectLogin(Config.loginPage);
                    }
                    _this.onReconnect();
                }
            });
        }
    }
    SocketWrapper.prototype.subscribe = function (name) {
        this.socket.emit('subscribe', name);
        if (this.roomList.indexOf(name) === -1) {
            this.roomList.push(name);
        }
    };
    SocketWrapper.prototype.of = function (namespace) {
        this.socket.of(namespace);
    };
    SocketWrapper.prototype.on = function (eventName, callback) {
        this.socket.on(eventName, callback);
    };
    ;
    SocketWrapper.prototype.once = function (eventName, callback) {
        this.socket.once(eventName, callback);
    };
    ;
    SocketWrapper.prototype.connect = function () {
        console.log('Config', this.SocketConfig);
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
    SocketWrapper.prototype.onReconnect = function () {
        var _this = this;
        if (this.socket) {
            this.socket.on('reconnect', function () {
                if (_this.roomList && _this.roomList.length) {
                    console.log('current rooms', _this.roomList.length);
                    _this.roomList.forEach(function (name) {
                        _this.subscribe(name);
                    });
                }
                else {
                    console.log('room is empty');
                }
            });
        }
        else {
            console.log('socket does not exist');
        }
    };
    SocketWrapper.prototype.redirectLogin = function (loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', function (msg) {
                console.log('session-time-out');
            });
        }
    };
    SocketWrapper.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['__SocketWrapper__',] }] }
    ]; };
    SocketWrapper = __decorate([
        Injectable(),
        __param(0, Inject('__SocketWrapper__')),
        __metadata("design:paramtypes", [Object])
    ], SocketWrapper);
    return SocketWrapper;
}());
export { SocketWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELG1FQUFtRTtBQUVuRSxXQUFXO0FBRVg7SUFVRSx1QkFBaUQsTUFBc0I7UUFBdkUsaUJBMENDO1FBMUNnRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQVRoRSxpQkFBWSxHQUFTLElBQUksWUFBWSxFQUFFLENBQUM7UUFLdkMsdUJBQWtCLEdBQVksQ0FBQyxDQUFDO1FBQ2hDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDZixpQkFBWSxHQUFpQixtQkFBbUIsQ0FBQztRQUdoRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjtRQUNELEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzth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QUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBRU8scUNBQWEsR0FBckIsVUFBc0IsU0FBaUI7UUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEdBQVE7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0RBOUhZLE1BQU0sU0FBQyxtQkFBbUI7O0lBVjVCLGFBQWE7UUFEekIsVUFBVSxFQUFFO1FBV0UsV0FBQSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTs7T0FWN0IsYUFBYSxDQXlJekI7SUFBRCxvQkFBQztDQUFBLEFBeklELElBeUlDO1NBeklZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29ja2V0Q29uZmlnLCBTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzaGFyZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge0RlZmF1bHRTb2NrZXRDb25maWd9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQnO1xuLy9pbXBvcnQge1NPQ0tFVF9DT05GSUdfVE9LRU59IGZyb20gJy4vc29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUnO1xuXG4vLyBAZHluYW1pY1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2tldFdyYXBwZXIge1xuICBwdWJsaWMgdG9rZW5VcGRhdGVyPzogYW55ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgc29ja2V0PzogYW55O1xuICBwdWJsaWMgdXJsPzogc3RyaW5nO1xuICBwdWJsaWMgbG9naW5QYWdlPzogc3RyaW5nO1xuICBwdWJsaWMgYXV0aD86IGJvb2xlYW47XG4gIHByaXZhdGUgc3Vic2NyaWJlcnNDb3VudGVyPzogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSByb29tTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSByZWFkb25seSBTb2NrZXRDb25maWc6IFNvY2tldENvbmZpZyA9IERlZmF1bHRTb2NrZXRDb25maWc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgnX19Tb2NrZXRXcmFwcGVyX18nKSBwcml2YXRlIENvbmZpZzogU29ja2V0SW9Db25maWcpIHtcbiAgICB0aGlzLkNvbmZpZyA9IENvbmZpZztcbiAgICBpZiAoIXRoaXMuU29ja2V0Q29uZmlnKSB7XG4gICAgICB0aGlzLlNvY2tldENvbmZpZyA9IHt9O1xuICAgIH1cbiAgICBmb3IgKGxldCBrZXkgaW4gQ29uZmlnKSB7XG4gICAgICBpZiAoa2V5LmluY2x1ZGVzKCdzb2NrZXRfJykpIHtcbiAgICAgICAgdGhpcy5Tb2NrZXRDb25maWdba2V5LnJlcGxhY2UoJ3NvY2tldF8nLCAnJyldID0gQ29uZmlnW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXJsID0gKCFDb25maWcgfHwgQ29uZmlnICYmICFDb25maWcudXJsKSA/ICcnIDogQ29uZmlnLnVybDtcbiAgICBpZiAoKENvbmZpZyAmJiAhQ29uZmlnLmF1dGggfHwgIUNvbmZpZykpIHtcbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgICB0aGlzLm9uUmVjb25uZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgICB0aGlzLnRva2VuVXBkYXRlci5zdWJzY3JpYmUoKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgIGlmICghdGhpcy5Tb2NrZXRDb25maWcuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy5leHRyYUhlYWRlcnMgPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLlNvY2tldENvbmZpZy50cmFuc3BvcnRPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy50cmFuc3BvcnRPcHRpb25zID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGVuIG9mIHRoaXMuU29ja2V0Q29uZmlnLnRyYW5zcG9ydHMpIHtcbiAgICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLnRyYW5zcG9ydE9wdGlvbnNbZW5dID0ge1xuICAgICAgICAgICAgICBleHRyYUhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFlcmVyICR7dG9rZW59YFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy5leHRyYUhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCYWVyZXIgJHt0b2tlbn1gO1xuICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLnF1ZXJ5LnRva2VuID0gYCR7dG9rZW59YDtcbiAgICAgICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgICAgICAgIGlmIChDb25maWcgJiYgQ29uZmlnLmxvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdExvZ2luKENvbmZpZy5sb2dpblBhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9uUmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN1YnNjcmliZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KCdzdWJzY3JpYmUnLCBuYW1lKTtcbiAgICBpZiAodGhpcy5yb29tTGlzdC5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgdGhpcy5yb29tTGlzdC5wdXNoKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIG9mKG5hbWVzcGFjZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub2YobmFtZXNwYWNlKTtcbiAgfVxuXG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIG9uY2UoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub25jZShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBjb25uZWN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdDb25maWcnLCB0aGlzLlNvY2tldENvbmZpZyk7XG4gICAgY29uc3QgaW9Tb2NrZXQgPSAoaW8gYXMgYW55KS5kZWZhdWx0ID8gKGlvIGFzIGFueSkuZGVmYXVsdCA6IGlvO1xuICAgIHJldHVybiBpb1NvY2tldCh0aGlzLnVybCwgdGhpcy5Tb2NrZXRDb25maWcpLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY2xvc2U/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5kaXNjb25uZWN0LmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZW1pdChldmVudE5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiB2b2lkKTogYW55IHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KGV2ZW50TmFtZSwgZGF0YSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIHJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86ICgpID0+IHZvaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lPzogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIGZyb21FdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIrKztcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pLnBpcGUoc2hhcmUoKSk7XG4gIH07XG5cbiAgZnJvbU9uZVRpbWVFdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5vbmNlKGV2ZW50TmFtZSwgcmVzb2x2ZSkpO1xuICB9O1xuXG4gIHByaXZhdGUgb25SZWNvbm5lY3QoKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICB0aGlzLnNvY2tldC5vbigncmVjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5yb29tTGlzdCAmJiB0aGlzLnJvb21MaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IHJvb21zJywgdGhpcy5yb29tTGlzdC5sZW5ndGgpO1xuICAgICAgICAgIHRoaXMucm9vbUxpc3QuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZShuYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygncm9vbSBpcyBlbXB0eScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3NvY2tldCBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVkaXJlY3RMb2dpbihsb2dpblBhZ2U6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNvY2tldCAmJiBsb2dpblBhZ2UpIHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdzZXNzaW9uLXRpbWUtb3V0JywgKG1zZzogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXNzaW9uLXRpbWUtb3V0Jyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==