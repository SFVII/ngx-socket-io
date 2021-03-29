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
        // tslint:disable-next-line:max-line-length
        //private Config: SocketIoConfig;
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
        }
        else {
            this.socket = this.connect();
            this.tokenUpdater.subscribe(function (token) {
                var e_1, _a;
                _this.disconnect();
                console.log('Got a token', token);
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
    SocketWrapper.prototype.redirectLogin = function (loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', function (msg) {
                window.location.replace(loginPage);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELG1FQUFtRTtBQUVuRSxXQUFXO0FBRVg7SUF1QkUsdUJBQWlELE1BQXNCO1FBQXZFLGlCQXlDQztRQXpDZ0QsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUF0QmhFLGlCQUFZLEdBQVEsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWdCdEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRXZDLDJDQUEyQztRQUMzQyxpQ0FBaUM7UUFDaEIsaUJBQVksR0FBaUIsbUJBQW1CLENBQUM7UUFHaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7UUFDRCxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN0QixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENB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QVM7Z0JBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPO2dCQUNMLElBQUksS0FBSSxDQUFDLGtCQUFrQixLQUFLLENBQUMsRUFBRTtvQkFDakMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUFBLENBQUM7SUFFRix3Q0FBZ0IsR0FBaEIsVUFBb0IsU0FBaUI7UUFBckMsaUJBRUM7UUFEQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQUEsQ0FBQztJQUVNLHFDQUFhLEdBQXJCLFVBQXNCLFNBQWlCO1FBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxHQUFRO2dCQUMxQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0RBMUdZLE1BQU0sU0FBQyxtQkFBbUI7O0lBdkI1QixhQUFhO1FBRHpCLFVBQVUsRUFBRTtRQXdCRSxXQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBOztPQXZCN0IsYUFBYSxDQWtJekI7SUFBRCxvQkFBQztDQUFBLEFBbElELElBa0lDO1NBbElZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29ja2V0Q29uZmlnLCBTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzaGFyZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge0RlZmF1bHRTb2NrZXRDb25maWd9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQnO1xuLy9pbXBvcnQge1NPQ0tFVF9DT05GSUdfVE9LRU59IGZyb20gJy4vc29ja2V0LWZyb250LXVwZGF0ZS5tb2R1bGUnO1xuXG4vLyBAZHluYW1pY1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2tldFdyYXBwZXIge1xuICBwdWJsaWMgdG9rZW5VcGRhdGVyOiBhbnkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBzb2NrZXQ6IGFueTtcbiAgcHVibGljIHNvY2tldF9wYXRoPzogc3RyaW5nOyAvLyBkZWZhdWx0ID0gJy9zb2NrZXQuaW8nXG4gIHB1YmxpYyBzb2NrZXRfcmVjb25uZWN0aW9uPzogYm9vbGVhbjsgLy8gZGVmYXVsdCB0cnVlXG4gIHB1YmxpYyBzb2NrZXRfcmVjb25uZWN0aW9uQXR0ZW1wdHM/OiBudW1iZXI7IC8vIGRlZmF1bHQgSW5maW5pdHlcbiAgcHVibGljIHNvY2tldF9yZWNvbm5lY3Rpb25EZWxheT86IG51bWJlcjsgLy8gZGVmYXVsdCAxMDAwXG4gIHB1YmxpYyBzb2NrZXRfcmVjb25uZWN0aW9uRGVsYXlNYXg/OiBudW1iZXI7IC8vIGRlZmF1bHQgNTAwMFxuICBwdWJsaWMgc29ja2V0X3JhbmRvbWl6YXRpb25GYWN0b3I/OiBudW1iZXI7IC8vIGRlZmF1bHQgMC41LFxuICBwdWJsaWMgc29ja2V0X3RpbWVvdXQ/OiBudW1iZXI7IC8vIGRlZmF1bHQgMjAwMDAsXG4gIHB1YmxpYyBzb2NrZXRfYXV0b0Nvbm5lY3Q/OiBib29sZWFuOyAvLyBkZWZhdWx0IHRydWUsXG4gIHB1YmxpYyBzb2NrZXRfcXVlcnk/OiBhbnk7IC8vIGRlZmF1bHQge31cbiAgcHVibGljIHNvY2tldF9leHRyYUhlYWRlcnM/OiBhbnk7IC8vIGRlZmF1bHQge31cbiAgcHVibGljIHNvY2tldF90cmFuc3BvcnRzPzogc3RyaW5nW107XG4gIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgcHVibGljIGxvZ2luUGFnZTogc3RyaW5nO1xuICBwdWJsaWMgYXV0aDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzdWJzY3JpYmVyc0NvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAvL3ByaXZhdGUgQ29uZmlnOiBTb2NrZXRJb0NvbmZpZztcbiAgcHJpdmF0ZSByZWFkb25seSBTb2NrZXRDb25maWc6IFNvY2tldENvbmZpZyA9IERlZmF1bHRTb2NrZXRDb25maWc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgnX19Tb2NrZXRXcmFwcGVyX18nKSBwcml2YXRlIENvbmZpZzogU29ja2V0SW9Db25maWcpIHtcbiAgICB0aGlzLkNvbmZpZyA9IENvbmZpZztcbiAgICBpZiAoIXRoaXMuU29ja2V0Q29uZmlnKSB7XG4gICAgICB0aGlzLlNvY2tldENvbmZpZyA9IHt9O1xuICAgIH1cbiAgICBmb3IgKGxldCBrZXkgaW4gQ29uZmlnKSB7XG4gICAgICBpZiAoa2V5LmluY2x1ZGVzKCdzb2NrZXRfJykpIHtcbiAgICAgICAgdGhpcy5Tb2NrZXRDb25maWdba2V5LnJlcGxhY2UoJ3NvY2tldF8nLCAnJyldID0gQ29uZmlnW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXJsID0gKCFDb25maWcgfHwgQ29uZmlnICYmICFDb25maWcudXJsKSA/ICcnIDogQ29uZmlnLnVybDtcbiAgICBpZiAoKENvbmZpZyAmJiAhQ29uZmlnLmF1dGggfHwgIUNvbmZpZykpIHtcbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgICB0aGlzLnRva2VuVXBkYXRlci5zdWJzY3JpYmUoKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHb3QgYSB0b2tlbicsIHRva2VuKTtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLlNvY2tldENvbmZpZy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycyA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMuU29ja2V0Q29uZmlnLnRyYW5zcG9ydE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLnRyYW5zcG9ydE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgZW4gb2YgdGhpcy5Tb2NrZXRDb25maWcudHJhbnNwb3J0cykge1xuICAgICAgICAgICAgdGhpcy5Tb2NrZXRDb25maWcudHJhbnNwb3J0T3B0aW9uc1tlbl0gPSB7XG4gICAgICAgICAgICAgIGV4dHJhSGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCYWVyZXIgJHt0b2tlbn1gXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJhZXJlciAke3Rva2VufWA7XG4gICAgICAgICAgdGhpcy5Tb2NrZXRDb25maWcuZXh0cmFIZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmFlcmVyICR7dG9rZW59YDtcbiAgICAgICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgICAgICAgIGlmIChDb25maWcgJiYgQ29uZmlnLmxvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdExvZ2luKENvbmZpZy5sb2dpblBhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcm9vbURhdGEobmFtZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoJ2pvaW5yb29tJywgbmFtZSk7XG4gICAgdGhpcy5zb2NrZXQub24obmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgb2YobmFtZXNwYWNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vZihuYW1lc3BhY2UpO1xuICB9O1xuXG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIG9uY2UoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub25jZShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBjb25uZWN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdDb25maWcnLCB0aGlzLlNvY2tldENvbmZpZylcbiAgICBjb25zdCBpb1NvY2tldCA9IChpbyBhcyBhbnkpLmRlZmF1bHQgPyAoaW8gYXMgYW55KS5kZWZhdWx0IDogaW87XG4gICAgcmV0dXJuIGlvU29ja2V0KHRoaXMudXJsLCB0aGlzLlNvY2tldENvbmZpZykuY29ubmVjdCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdChjbG9zZT86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IHZvaWQpOiBhbnkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgZnJvbUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnN1YnNjcmliZXJzQ291bnRlcisrO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzQ291bnRlciA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkucGlwZShzaGFyZSgpKTtcbiAgfTtcblxuICBmcm9tT25lVGltZUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLm9uY2UoZXZlbnROYW1lLCByZXNvbHZlKSk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZWRpcmVjdExvZ2luKGxvZ2luUGFnZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0ICYmIGxvZ2luUGFnZSkge1xuICAgICAgdGhpcy5zb2NrZXQub24oJ3Nlc3Npb24tdGltZS1vdXQnLCAobXNnOiBhbnkpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UobG9naW5QYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19