import { __awaiter, __decorate, __generator, __metadata, __param, __values } from "tslib";
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
            // this.socket = this.connect();
            this.tokenUpdater.subscribe(function (token) {
                var e_1, _a;
                if (_this.socket) {
                    _this.disconnect();
                }
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
    SocketWrapper.prototype.unsubscribe = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                this.socket.emit('unsubscribe', name);
                index = this.roomList.findIndex(function (room) { return room === name; });
                if (index > -1) {
                    this.roomList.splice(index, 1);
                    console.log('unsubscribe room %s', name);
                }
                else {
                    console.log('no joined room');
                }
                return [2 /*return*/];
            });
        });
    };
    SocketWrapper.prototype.unsubscribeAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.roomList.length) {
                    this.roomList.forEach(function (room) {
                        _this.unsubscribe(room);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    SocketWrapper.prototype.subscribe = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.roomList.indexOf(name) > -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.unsubscribe(name)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.roomList.indexOf(name) === -1) {
                            this.roomList.push(name);
                        }
                        console.log('subscribe room %s', name);
                        return [4 /*yield*/, this.socket.emit('subscribe', name)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
                    _this.roomList.forEach(function (name) {
                        _this.subscribe(name).catch(function (err) { return console.log('error socket reconnect', err); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELG1FQUFtRTtBQUVuRSxXQUFXO0FBRVg7SUFVRSx1QkFBaUQsTUFBc0I7UUFBdkUsaUJBNENDO1FBNUNnRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQVRoRSxpQkFBWSxHQUFTLElBQUksWUFBWSxFQUFFLENBQUM7UUFLdkMsdUJBQWtCLEdBQVksQ0FBQyxDQUFDO1FBQ2hDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDZixpQkFBWSxHQUFpQixtQkFBbUIsQ0FBQztRQUdoRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjtRQUNELEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzth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Q0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFTyxxQ0FBYSxHQUFyQixVQUFzQixTQUFpQjtRQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQUMsR0FBUTtnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztnREF0SlksTUFBTSxTQUFDLG1CQUFtQjs7SUFWNUIsYUFBYTtRQUR6QixVQUFVLEVBQUU7UUFXRSxXQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBOztPQVY3QixhQUFhLENBaUt6QjtJQUFELG9CQUFDO0NBQUEsQUFqS0QsSUFpS0M7U0FqS1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRDb25maWcsIFNvY2tldElvQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZS9JbnRlcmZhY2UtY29uZmlnJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3NoYXJlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7RGVmYXVsdFNvY2tldENvbmZpZ30gZnJvbSAnLi9jb25maWcvZGVmYXVsdCc7XG4vL2ltcG9ydCB7U09DS0VUX0NPTkZJR19UT0tFTn0gZnJvbSAnLi9zb2NrZXQtZnJvbnQtdXBkYXRlLm1vZHVsZSc7XG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU29ja2V0V3JhcHBlciB7XG4gIHB1YmxpYyB0b2tlblVwZGF0ZXI/OiBhbnkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBzb2NrZXQ/OiBhbnk7XG4gIHB1YmxpYyB1cmw/OiBzdHJpbmc7XG4gIHB1YmxpYyBsb2dpblBhZ2U/OiBzdHJpbmc7XG4gIHB1YmxpYyBhdXRoPzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzdWJzY3JpYmVyc0NvdW50ZXI/OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHJvb21MaXN0OiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IFNvY2tldENvbmZpZzogU29ja2V0Q29uZmlnID0gRGVmYXVsdFNvY2tldENvbmZpZztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdfX1NvY2tldFdyYXBwZXJfXycpIHByaXZhdGUgQ29uZmlnOiBTb2NrZXRJb0NvbmZpZykge1xuICAgIHRoaXMuQ29uZmlnID0gQ29uZmlnO1xuICAgIGlmICghdGhpcy5Tb2NrZXRDb25maWcpIHtcbiAgICAgIHRoaXMuU29ja2V0Q29uZmlnID0ge307XG4gICAgfVxuICAgIGZvciAobGV0IGtleSBpbiBDb25maWcpIHtcbiAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ3NvY2tldF8nKSkge1xuICAgICAgICB0aGlzLlNvY2tldENvbmZpZ1trZXkucmVwbGFjZSgnc29ja2V0XycsICcnKV0gPSBDb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cmwgPSAoIUNvbmZpZyB8fCBDb25maWcgJiYgIUNvbmZpZy51cmwpID8gJycgOiBDb25maWcudXJsO1xuICAgIGlmICgoQ29uZmlnICYmICFDb25maWcuYXV0aCB8fCAhQ29uZmlnKSkge1xuICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICAgIHRoaXMub25SZWNvbm5lY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICAgIHRoaXMudG9rZW5VcGRhdGVyLnN1YnNjcmliZSgodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICBpZiAoIXRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5Tb2NrZXRDb25maWcuZXh0cmFIZWFkZXJzID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdGhpcy5Tb2NrZXRDb25maWcudHJhbnNwb3J0T3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5Tb2NrZXRDb25maWcudHJhbnNwb3J0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBlbiBvZiB0aGlzLlNvY2tldENvbmZpZy50cmFuc3BvcnRzKSB7XG4gICAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy50cmFuc3BvcnRPcHRpb25zW2VuXSA9IHtcbiAgICAgICAgICAgICAgZXh0cmFIZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhZXJlciAke3Rva2VufWBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5Tb2NrZXRDb25maWcuZXh0cmFIZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmFlcmVyICR7dG9rZW59YDtcbiAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy5xdWVyeS50b2tlbiA9IGAke3Rva2VufWA7XG4gICAgICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICAgICAgICBpZiAoQ29uZmlnICYmIENvbmZpZy5sb2dpblBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RMb2dpbihDb25maWcubG9naW5QYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vblJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB1bnN1YnNjcmliZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KCd1bnN1YnNjcmliZScsIG5hbWUpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yb29tTGlzdC5maW5kSW5kZXgoKHJvb206IHN0cmluZykgPT4gcm9vbSA9PT0gbmFtZSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMucm9vbUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGNvbnNvbGUubG9nKCd1bnN1YnNjcmliZSByb29tICVzJywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdubyBqb2luZWQgcm9vbScpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVuc3Vic2NyaWJlQWxsKCkge1xuICAgIGlmICh0aGlzLnJvb21MaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5yb29tTGlzdC5mb3JFYWNoKChyb29tOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZShyb29tKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN1YnNjcmliZShuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5yb29tTGlzdC5pbmRleE9mKG5hbWUpID4gLTEpIHtcbiAgICAgIGF3YWl0IHRoaXMudW5zdWJzY3JpYmUobmFtZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnJvb21MaXN0LmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICB0aGlzLnJvb21MaXN0LnB1c2gobmFtZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdzdWJzY3JpYmUgcm9vbSAlcycsIG5hbWUpO1xuICAgIGF3YWl0IHRoaXMuc29ja2V0LmVtaXQoJ3N1YnNjcmliZScsIG5hbWUpO1xuICB9XG5cbiAgb2YobmFtZXNwYWNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vZihuYW1lc3BhY2UpO1xuICB9XG5cbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgb25jZShldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbmNlKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIGNvbm5lY3QoKSB7XG4gICAgY29uc29sZS5sb2coJ0NvbmZpZycsIHRoaXMuU29ja2V0Q29uZmlnKTtcbiAgICBjb25zdCBpb1NvY2tldCA9IChpbyBhcyBhbnkpLmRlZmF1bHQgPyAoaW8gYXMgYW55KS5kZWZhdWx0IDogaW87XG4gICAgcmV0dXJuIGlvU29ja2V0KHRoaXMudXJsLCB0aGlzLlNvY2tldENvbmZpZykuY29ubmVjdCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdChjbG9zZT86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IHZvaWQpOiBhbnkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgZnJvbUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnN1YnNjcmliZXJzQ291bnRlcisrO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzQ291bnRlciA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkucGlwZShzaGFyZSgpKTtcbiAgfTtcblxuICBmcm9tT25lVGltZUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLm9uY2UoZXZlbnROYW1lLCByZXNvbHZlKSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBvblJlY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdyZWNvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJvb21MaXN0ICYmIHRoaXMucm9vbUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5yb29tTGlzdC5mb3JFYWNoKChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKG5hbWUpLmNhdGNoKChlcnI6IGFueSkgPT4gY29uc29sZS5sb2coJ2Vycm9yIHNvY2tldCByZWNvbm5lY3QnLCBlcnIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygncm9vbSBpcyBlbXB0eScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3NvY2tldCBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVkaXJlY3RMb2dpbihsb2dpblBhZ2U6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNvY2tldCAmJiBsb2dpblBhZ2UpIHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdzZXNzaW9uLXRpbWUtb3V0JywgKG1zZzogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXNzaW9uLXRpbWUtb3V0Jyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==