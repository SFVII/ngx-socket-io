import { __decorate, __metadata, __param } from "tslib";
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { SOCKET_CONFIG_TOKEN } from './socket-front-update.module';
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
    SocketWrapper = __decorate([
        Injectable(),
        __param(0, Inject(SOCKET_CONFIG_TOKEN)),
        __metadata("design:paramtypes", [Object])
    ], SocketWrapper);
    return SocketWrapper;
}());
export { SocketWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRWpFLFdBQVc7QUFFWDtJQXVCRSx1QkFBaUQsTUFBc0I7UUFBdkUsaUJBd0JDO1FBeEJnRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQXRCaEUsaUJBQVksR0FBUSxJQUFJLFlBQVksRUFBRSxDQUFDO1FBZ0J0Qyx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFPckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDdEIsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdEO1NBQ0Y7UUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENB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QW1CLENBQUMsQ0FBQTs7T0F2QjdCLGFBQWEsQ0FnSHpCO0lBQUQsb0JBQUM7Q0FBQSxBQWhIRCxJQWdIQztTQWhIWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldENvbmZpZywgU29ja2V0SW9Db25maWd9IGZyb20gJy4vaW50ZXJmYWNlL0ludGVyZmFjZS1jb25maWcnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtTT0NLRVRfQ09ORklHX1RPS0VOfSBmcm9tICcuL3NvY2tldC1mcm9udC11cGRhdGUubW9kdWxlJztcblxuLy8gQGR5bmFtaWNcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb2NrZXRXcmFwcGVyIHtcbiAgcHVibGljIHRva2VuVXBkYXRlcjogYW55ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgc29ja2V0OiBhbnk7XG4gIHB1YmxpYyBzb2NrZXRfcGF0aD86IHN0cmluZzsgLy8gZGVmYXVsdCA9ICcvc29ja2V0LmlvJ1xuICBwdWJsaWMgc29ja2V0X3JlY29ubmVjdGlvbj86IGJvb2xlYW47IC8vIGRlZmF1bHQgdHJ1ZVxuICBwdWJsaWMgc29ja2V0X3JlY29ubmVjdGlvbkF0dGVtcHRzPzogbnVtYmVyOyAvLyBkZWZhdWx0IEluZmluaXR5XG4gIHB1YmxpYyBzb2NrZXRfcmVjb25uZWN0aW9uRGVsYXk/OiBudW1iZXI7IC8vIGRlZmF1bHQgMTAwMFxuICBwdWJsaWMgc29ja2V0X3JlY29ubmVjdGlvbkRlbGF5TWF4PzogbnVtYmVyOyAvLyBkZWZhdWx0IDUwMDBcbiAgcHVibGljIHNvY2tldF9yYW5kb21pemF0aW9uRmFjdG9yPzogbnVtYmVyOyAvLyBkZWZhdWx0IDAuNSxcbiAgcHVibGljIHNvY2tldF90aW1lb3V0PzogbnVtYmVyOyAvLyBkZWZhdWx0IDIwMDAwLFxuICBwdWJsaWMgc29ja2V0X2F1dG9Db25uZWN0PzogYm9vbGVhbjsgLy8gZGVmYXVsdCB0cnVlLFxuICBwdWJsaWMgc29ja2V0X3F1ZXJ5PzogYW55OyAvLyBkZWZhdWx0IHt9XG4gIHB1YmxpYyBzb2NrZXRfZXh0cmFIZWFkZXJzPzogYW55OyAvLyBkZWZhdWx0IHt9XG4gIHB1YmxpYyBzb2NrZXRfdHJhbnNwb3J0cz86IHN0cmluZ1tdO1xuICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gIHB1YmxpYyBsb2dpblBhZ2U6IHN0cmluZztcbiAgcHVibGljIGF1dGg6IGJvb2xlYW47XG4gIHByaXZhdGUgc3Vic2NyaWJlcnNDb3VudGVyOiBudW1iZXIgPSAwO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgLy9wcml2YXRlIENvbmZpZzogU29ja2V0SW9Db25maWc7XG4gIHByaXZhdGUgU29ja2V0Q29uZmlnOiBTb2NrZXRDb25maWc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChTT0NLRVRfQ09ORklHX1RPS0VOKSBwcml2YXRlIENvbmZpZzogU29ja2V0SW9Db25maWcpIHtcbiAgICB0aGlzLkNvbmZpZyA9IENvbmZpZztcbiAgICBmb3IgKGxldCBrZXkgaW4gQ29uZmlnKSB7XG4gICAgICBpZiAoa2V5LmluY2x1ZGVzKCdzb2NrZXRfJykpIHtcbiAgICAgICAgdGhpcy5Tb2NrZXRDb25maWdba2V5LnJlcGxhY2UoJ3NvY2tldF8nLCAnJyldID0gQ29uZmlnW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXJsID0gKCFDb25maWcgfHwgQ29uZmlnICYmICFDb25maWcudXJsKSA/ICcnIDogQ29uZmlnLnVybDtcbiAgICBpZiAoKENvbmZpZyAmJiAhQ29uZmlnLmF1dGggfHwgIUNvbmZpZykpIHtcbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9rZW5VcGRhdGVyLnN1YnNjcmliZSgodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICBpZiAoIXRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5Tb2NrZXRDb25maWcuZXh0cmFIZWFkZXJzID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuU29ja2V0Q29uZmlnLmV4dHJhSGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJhZXJlciAke3Rva2VufWA7XG4gICAgICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICAgICAgICBpZiAoQ29uZmlnICYmIENvbmZpZy5sb2dpblBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RMb2dpbihDb25maWcubG9naW5QYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJvb21EYXRhKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KCdqb2lucm9vbScsIG5hbWUpO1xuICAgIHRoaXMuc29ja2V0Lm9uKG5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9mKG5hbWVzcGFjZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub2YobmFtZXNwYWNlKTtcbiAgfTtcblxuICBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uY2UoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgY29ubmVjdCgpIHtcbiAgICBjb25zdCBpb1NvY2tldCA9IChpbyBhcyBhbnkpLmRlZmF1bHQgPyAoaW8gYXMgYW55KS5kZWZhdWx0IDogaW87XG4gICAgcmV0dXJuIGlvU29ja2V0KHRoaXMudXJsLCB0aGlzLlNvY2tldENvbmZpZykuY29ubmVjdCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdChjbG9zZT86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IHZvaWQpOiBhbnkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgZnJvbUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnN1YnNjcmliZXJzQ291bnRlcisrO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzQ291bnRlciA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkucGlwZShzaGFyZSgpKTtcbiAgfTtcblxuICBmcm9tT25lVGltZUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLm9uY2UoZXZlbnROYW1lLCByZXNvbHZlKSk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZWRpcmVjdExvZ2luKGxvZ2luUGFnZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0ICYmIGxvZ2luUGFnZSkge1xuICAgICAgdGhpcy5zb2NrZXQub24oJ3Nlc3Npb24tdGltZS1vdXQnLCAobXNnOiBhbnkpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UobG9naW5QYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19