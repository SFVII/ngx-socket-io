/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file SocketWrapper                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
import { EventEmitter } from '@angular/core';
import { DefaultSocketConfig } from '../config/default';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
var SocketWrapper = /** @class */ (function () {
    function SocketWrapper(Config) {
        var _this = this;
        this.Config = Config;
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.config = !Config ? DefaultSocketConfig : Config.config;
        this.url = !Config ? '' : Config.url;
        if (Config && !Config.auth) {
            this.socket = this.connect();
        }
        else {
            this.tokenUpdater.subscribe(function (token) {
                if (token) {
                    _this.config.extraHeaders.Authorization = "Baerer " + token;
                    _this.socket = _this.connect();
                    _this.redirectLogin(Config.loginPage);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0V3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NvY2tldC1mcm9udC11cGRhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9Tb2NrZXRXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs2REFLNkQ7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXZDO0lBUUUsdUJBQW1CLE1BQXNGO1FBQXpHLGlCQWNDO1FBZGtCLFdBQU0sR0FBTixNQUFNLENBQWdGO1FBUGxHLGlCQUFZLEdBQVEsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0Qyx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFNckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3JDLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM5QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFhO2dCQUN4QyxJQUFJLEtBQUssRUFBRTtvQkFDVCxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcs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QUssRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUFBLENBQUM7SUFFRix3Q0FBZ0IsR0FBaEIsVUFBb0IsU0FBaUI7UUFBckMsaUJBRUM7UUFEQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQUEsQ0FBQztJQUVNLHFDQUFhLEdBQXJCLFVBQXNCLFNBQWlCO1FBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxHQUFRO2dCQUMxQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQXhGRCxJQXdGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICoqICBAcHJvamVjdCBuZ3gtZnJvbnQtbGl2ZS11cGRhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxuICoqICBAZmlsZSBTb2NrZXRXcmFwcGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxuICoqICBAYXV0aG9yIEJyaWNlIERhdXBpYXJkIDxicmljZS5kYXVwaWFyZEBzbWFydGlpei5jb20+ICAqKlxuICoqICBARGF0ZSAyNi8wMy8yMDIxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi4vaW50ZXJmYWNlL0ludGVyZmFjZS1jb25maWcnO1xuaW1wb3J0IHtEZWZhdWx0U29ja2V0Q29uZmlnfSBmcm9tICcuLi9jb25maWcvZGVmYXVsdCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzaGFyZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBjbGFzcyBTb2NrZXRXcmFwcGVyIHtcbiAgcHVibGljIHRva2VuVXBkYXRlcjogYW55ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgc29ja2V0OiBhbnk7XG4gIHByaXZhdGUgc3Vic2NyaWJlcnNDb3VudGVyOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gIHByaXZhdGUgY29uZmlnOiB7IHBhdGg/OiBzdHJpbmc7IGF1dG9Db25uZWN0PzogYm9vbGVhbjsgdHJhbnNwb3J0cz86IHN0cmluZ1tdOyBxdWVyeT86IHt9OyByZWNvbm5lY3Rpb25EZWxheU1heD86IG51bWJlcjsgZXh0cmFIZWFkZXJzPzoge307IHJlY29ubmVjdGlvbj86IGJvb2xlYW47IHJlY29ubmVjdGlvbkF0dGVtcHRzPzogbnVtYmVyOyB0aW1lb3V0PzogbnVtYmVyOyByZWNvbm5lY3Rpb25EZWxheT86IG51bWJlcjsgcmFuZG9taXphdGlvbkZhY3Rvcj86IG51bWJlciB9IHwgU29ja2V0SW9Db25maWc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIENvbmZpZz86IHsgdXJsPzogc3RyaW5nOyBjb25maWc/OiBTb2NrZXRJb0NvbmZpZywgYXV0aD86IGJvb2xlYW4sIGxvZ2luUGFnZT86IHN0cmluZyB9KSB7XG4gICAgdGhpcy5jb25maWcgPSAhQ29uZmlnID8gRGVmYXVsdFNvY2tldENvbmZpZyA6IENvbmZpZy5jb25maWc7XG4gICAgdGhpcy51cmwgPSAhQ29uZmlnID8gJycgOiBDb25maWcudXJsO1xuICAgIGlmIChDb25maWcgJiYgIUNvbmZpZy5hdXRoKSB7XG4gICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRva2VuVXBkYXRlci5zdWJzY3JpYmUoKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuZXh0cmFIZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmFlcmVyICR7dG9rZW59YDtcbiAgICAgICAgICB0aGlzLnNvY2tldCA9IHRoaXMuY29ubmVjdCgpO1xuICAgICAgICAgIHRoaXMucmVkaXJlY3RMb2dpbihDb25maWcubG9naW5QYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcm9vbURhdGEobmFtZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoJ2pvaW5yb29tJywgbmFtZSk7XG4gICAgdGhpcy5zb2NrZXQub24obmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgb2YobmFtZXNwYWNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vZihuYW1lc3BhY2UpO1xuICB9O1xuXG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIG9uY2UoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub25jZShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBjb25uZWN0KCkge1xuICAgIGNvbnN0IGlvU29ja2V0ID0gKGlvIGFzIGFueSkuZGVmYXVsdCA/IChpbyBhcyBhbnkpLmRlZmF1bHQgOiBpbztcbiAgICByZXR1cm4gaW9Tb2NrZXQodGhpcy51cmwsIHRoaXMuY29uZmlnKS5jb25uZWN0KCk7XG4gIH1cblxuICBkaXNjb25uZWN0KGNsb3NlPzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQuZGlzY29ubmVjdC5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGVtaXQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gdm9pZCk6IGFueSB7XG4gICAgdGhpcy5zb2NrZXQuZW1pdChldmVudE5hbWUsIGRhdGEsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZW1vdmVMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZT86IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycy5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBmcm9tRXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuc3Vic2NyaWJlcnNDb3VudGVyKys7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICB0aGlzLnNvY2tldC5vbihldmVudE5hbWUsIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlcnNDb3VudGVyID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KS5waXBlKHNoYXJlKCkpO1xuICB9O1xuXG4gIGZyb21PbmVUaW1lRXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHRoaXMub25jZShldmVudE5hbWUsIHJlc29sdmUpKTtcbiAgfTtcblxuICBwcml2YXRlIHJlZGlyZWN0TG9naW4obG9naW5QYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zb2NrZXQgJiYgbG9naW5QYWdlKSB7XG4gICAgICB0aGlzLnNvY2tldC5vbignc2Vzc2lvbi10aW1lLW91dCcsIChtc2c6IGFueSkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShsb2dpblBhZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==