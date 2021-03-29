import { EventEmitter } from '@angular/core';
import { DefaultSocketConfig } from './config/default';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
// @dynamic
var SocketWrapper = /** @class */ (function () {
    function SocketWrapper(Config) {
        var _this = this;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.config = (!Config || Config && !Config.SocketConfig) ? DefaultSocketConfig : Config.SocketConfig;
        this.url = (!Config || Config && !Config.url) ? '' : Config.url;
        if ((Config && !Config.auth || !Config)) {
            this.socket = this.connect();
        }
        else {
            this.tokenUpdater.subscribe(function (token) {
                if (token) {
                    _this.config.extraHeaders.Authorization = "Baerer " + token;
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
    return SocketWrapper;
}());
export { SocketWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXZDLFdBQVc7QUFDWDtJQVNFLHVCQUFZLE1BQXNCO1FBQWxDLGlCQWdCQztRQXZCTSxpQkFBWSxHQUFRLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBTXJDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNoRSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJ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QU87Z0JBQ0wsSUFBSSxLQUFJLENBQUMsa0JBQWtCLEtBQUssQ0FBQyxFQUFFO29CQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDdkM7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQUEsQ0FBQztJQUVGLHdDQUFnQixHQUFoQixVQUFvQixTQUFpQjtRQUFyQyxpQkFFQztRQURDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFBQSxDQUFDO0lBRU0scUNBQWEsR0FBckIsVUFBc0IsU0FBaUI7UUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEdBQVE7Z0JBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBMUZELElBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge0RlZmF1bHRTb2NrZXRDb25maWd9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIFNvY2tldFdyYXBwZXIge1xuXG4gIHB1YmxpYyB0b2tlblVwZGF0ZXI6IGFueSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIHNvY2tldDogYW55O1xuICBwcml2YXRlIHN1YnNjcmliZXJzQ291bnRlcjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICBwcml2YXRlIGNvbmZpZzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKENvbmZpZzogU29ja2V0SW9Db25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9ICghQ29uZmlnIHx8IENvbmZpZyAmJiAhQ29uZmlnLlNvY2tldENvbmZpZykgPyBEZWZhdWx0U29ja2V0Q29uZmlnIDogQ29uZmlnLlNvY2tldENvbmZpZztcbiAgICB0aGlzLnVybCA9ICghQ29uZmlnIHx8IENvbmZpZyAmJiAhQ29uZmlnLnVybCkgPyAnJyA6IENvbmZpZy51cmw7XG4gICAgaWYgKChDb25maWcgJiYgIUNvbmZpZy5hdXRoIHx8ICFDb25maWcpKSB7XG4gICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRva2VuVXBkYXRlci5zdWJzY3JpYmUoKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuZXh0cmFIZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmFlcmVyICR7dG9rZW59YDtcbiAgICAgICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgICAgICAgIGlmIChDb25maWcgJiYgQ29uZmlnLmxvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdExvZ2luKENvbmZpZy5sb2dpblBhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcm9vbURhdGEobmFtZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoJ2pvaW5yb29tJywgbmFtZSk7XG4gICAgdGhpcy5zb2NrZXQub24obmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgb2YobmFtZXNwYWNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vZihuYW1lc3BhY2UpO1xuICB9O1xuXG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIG9uY2UoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub25jZShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBjb25uZWN0KCkge1xuICAgIGNvbnN0IGlvU29ja2V0ID0gKGlvIGFzIGFueSkuZGVmYXVsdCA/IChpbyBhcyBhbnkpLmRlZmF1bHQgOiBpbztcbiAgICByZXR1cm4gaW9Tb2NrZXQodGhpcy51cmwsIHRoaXMuY29uZmlnKS5jb25uZWN0KCk7XG4gIH1cblxuICBkaXNjb25uZWN0KGNsb3NlPzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQuZGlzY29ubmVjdC5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGVtaXQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gdm9pZCk6IGFueSB7XG4gICAgdGhpcy5zb2NrZXQuZW1pdChldmVudE5hbWUsIGRhdGEsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZW1vdmVMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZT86IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycy5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBmcm9tRXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuc3Vic2NyaWJlcnNDb3VudGVyKys7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICB0aGlzLnNvY2tldC5vbihldmVudE5hbWUsIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNDb3VudGVyID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KS5waXBlKHNoYXJlKCkpO1xuICB9O1xuXG4gIGZyb21PbmVUaW1lRXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHRoaXMub25jZShldmVudE5hbWUsIHJlc29sdmUpKTtcbiAgfTtcblxuICBwcml2YXRlIHJlZGlyZWN0TG9naW4obG9naW5QYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zb2NrZXQgJiYgbG9naW5QYWdlKSB7XG4gICAgICB0aGlzLnNvY2tldC5vbignc2Vzc2lvbi10aW1lLW91dCcsIChtc2c6IGFueSkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShsb2dpblBhZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=