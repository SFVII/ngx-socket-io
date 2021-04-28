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
        this.socket = this.connect();
        if ((Config && !Config.auth || !Config)) {
            this.onReconnect();
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELG1FQUFtRTtBQUVuRSxXQUFXO0FBRVg7SUFVRSx1QkFBaUQsTUFBc0I7UUFBdkUsaUJBMkNDO1FBM0NnRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQVRoRSxpQkFBWSxHQUFTLElBQUksWUFBWSxFQUFFLENBQUM7UUFLdkMsdUJBQWtCLEdBQVksQ0FBQyxDQUFDO1FBQ2hDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDZixpQkFBWSxHQUFpQixtQkFBbUIsQ0FBQztRQUdoRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjtRQUNELEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzth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Qyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVPLHFDQUFhLEdBQXJCLFVBQXNCLFNBQWlCO1FBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxHQUFRO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2dEQXJKWSxNQUFNLFNBQUMsbUJBQW1COztJQVY1QixhQUFhO1FBRHpCLFVBQVUsRUFBRTtRQVdFLFdBQUEsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7O09BVjdCLGFBQWEsQ0FnS3pCO0lBQUQsb0JBQUM7Q0FBQSxBQWhLRCxJQWdLQztTQWhLWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldENvbmZpZywgU29ja2V0SW9Db25maWd9IGZyb20gJy4vaW50ZXJmYWNlL0ludGVyZmFjZS1jb25maWcnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtEZWZhdWx0U29ja2V0Q29uZmlnfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0Jztcbi8vaW1wb3J0IHtTT0NLRVRfQ09ORklHX1RPS0VOfSBmcm9tICcuL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlJztcblxuLy8gQGR5bmFtaWNcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb2NrZXRXcmFwcGVyIHtcbiAgcHVibGljIHRva2VuVXBkYXRlcj86IGFueSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIHNvY2tldD86IGFueTtcbiAgcHVibGljIHVybD86IHN0cmluZztcbiAgcHVibGljIGxvZ2luUGFnZT86IHN0cmluZztcbiAgcHVibGljIGF1dGg/OiBib29sZWFuO1xuICBwcml2YXRlIHN1YnNjcmliZXJzQ291bnRlcj86IG51bWJlciA9IDA7XG4gIHByaXZhdGUgcm9vbUxpc3Q6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgU29ja2V0Q29uZmlnOiBTb2NrZXRDb25maWcgPSBEZWZhdWx0U29ja2V0Q29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ19fU29ja2V0V3JhcHBlcl9fJykgcHJpdmF0ZSBDb25maWc6IFNvY2tldElvQ29uZmlnKSB7XG4gICAgdGhpcy5Db25maWcgPSBDb25maWc7XG4gICAgaWYgKCF0aGlzLlNvY2tldENvbmZpZykge1xuICAgICAgdGhpcy5Tb2NrZXRDb25maWcgPSB7fTtcbiAgICB9XG4gICAgZm9yIChsZXQga2V5IGluIENvbmZpZykge1xuICAgICAgaWYgKGtleS5pbmNsdWRlcygnc29ja2V0XycpKSB7XG4gICAgICAgIHRoaXMuU29ja2V0Q29uZmlnW2tleS5yZXBsYWNlKCdzb2NrZXRfJywgJycpXSA9IENvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVybCA9ICghQ29uZmlnIHx8IENvbmZpZyAmJiAhQ29uZmlnLnVybCkgPyAnJyA6IENvbmZpZy51cmw7XG4gICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICBpZiAoKENvbmZpZyAmJiAhQ29uZmlnLmF1dGggfHwgIUNvbmZpZykpIHtcbiAgICAgIHRoaXMub25SZWNvbm5lY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b2tlblVwZGF0ZXIuc3Vic2NyaWJlKCh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgIGlmICghdGhpcy5Tb2NrZXRDb25maWcuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy5leHRyYUhlYWRlcnMgPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLlNvY2tldENvbmZpZy50cmFuc3BvcnRPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy50cmFuc3BvcnRPcHRpb25zID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGVuIG9mIHRoaXMuU29ja2V0Q29uZmlnLnRyYW5zcG9ydHMpIHtcbiAgICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLnRyYW5zcG9ydE9wdGlvbnNbZW5dID0ge1xuICAgICAgICAgICAgICBleHRyYUhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFlcmVyICR7dG9rZW59YFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLlNvY2tldENvbmZpZy5leHRyYUhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCYWVyZXIgJHt0b2tlbn1gO1xuICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLnF1ZXJ5LnRva2VuID0gYCR7dG9rZW59YDtcbiAgICAgICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgICAgICAgIGlmIChDb25maWcgJiYgQ29uZmlnLmxvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdExvZ2luKENvbmZpZy5sb2dpblBhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9uUmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVuc3Vic2NyaWJlKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Vuc3Vic2NyaWJlJywgbmFtZSk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJvb21MaXN0LmZpbmRJbmRleCgocm9vbTogc3RyaW5nKSA9PiByb29tID09PSBuYW1lKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5yb29tTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgY29uc29sZS5sb2coJ3Vuc3Vic2NyaWJlIHJvb20gJXMnLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ25vIGpvaW5lZCByb29tJyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdW5zdWJzY3JpYmVBbGwoKSB7XG4gICAgaWYgKHRoaXMucm9vbUxpc3QubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJvb21MaXN0LmZvckVhY2goKHJvb206IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKHJvb20pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc3Vic2NyaWJlKG5hbWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnJvb21MaXN0LmluZGV4T2YobmFtZSkgPiAtMSkge1xuICAgICAgYXdhaXQgdGhpcy51bnN1YnNjcmliZShuYW1lKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucm9vbUxpc3QuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMucm9vbUxpc3QucHVzaChuYW1lKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ3N1YnNjcmliZSByb29tICVzJywgbmFtZSk7XG4gICAgYXdhaXQgdGhpcy5zb2NrZXQuZW1pdCgnc3Vic2NyaWJlJywgbmFtZSk7XG4gIH1cblxuICBvZihuYW1lc3BhY2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9mKG5hbWVzcGFjZSk7XG4gIH1cblxuICBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uY2UoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgY29ubmVjdCgpIHtcbiAgICBjb25zb2xlLmxvZygnQ29uZmlnJywgdGhpcy5Tb2NrZXRDb25maWcpO1xuICAgIGNvbnN0IGlvU29ja2V0ID0gKGlvIGFzIGFueSkuZGVmYXVsdCA/IChpbyBhcyBhbnkpLmRlZmF1bHQgOiBpbztcbiAgICByZXR1cm4gaW9Tb2NrZXQodGhpcy51cmwsIHRoaXMuU29ja2V0Q29uZmlnKS5jb25uZWN0KCk7XG4gIH1cblxuICBkaXNjb25uZWN0KGNsb3NlPzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQuZGlzY29ubmVjdC5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGVtaXQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gdm9pZCk6IGFueSB7XG4gICAgdGhpcy5zb2NrZXQuZW1pdChldmVudE5hbWUsIGRhdGEsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZW1vdmVMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZT86IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycy5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBmcm9tRXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuc3Vic2NyaWJlcnNDb3VudGVyKys7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICB0aGlzLnNvY2tldC5vbihldmVudE5hbWUsIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNDb3VudGVyID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KS5waXBlKHNoYXJlKCkpO1xuICB9O1xuXG4gIGZyb21PbmVUaW1lRXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHRoaXMub25jZShldmVudE5hbWUsIHJlc29sdmUpKTtcbiAgfTtcblxuICBwcml2YXRlIG9uUmVjb25uZWN0KCkge1xuICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgdGhpcy5zb2NrZXQub24oJ3JlY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucm9vbUxpc3QgJiYgdGhpcy5yb29tTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnJvb21MaXN0LmZvckVhY2goKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUobmFtZSkuY2F0Y2goKGVycjogYW55KSA9PiBjb25zb2xlLmxvZygnZXJyb3Igc29ja2V0IHJlY29ubmVjdCcsIGVycikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdyb29tIGlzIGVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnc29ja2V0IGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWRpcmVjdExvZ2luKGxvZ2luUGFnZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0ICYmIGxvZ2luUGFnZSkge1xuICAgICAgdGhpcy5zb2NrZXQub24oJ3Nlc3Npb24tdGltZS1vdXQnLCAobXNnOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Nlc3Npb24tdGltZS1vdXQnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19