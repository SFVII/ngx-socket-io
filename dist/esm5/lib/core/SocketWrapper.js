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
        this.socket.join(name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0V3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NvY2tldC1mcm9udC11cGRhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9Tb2NrZXRXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs2REFLNkQ7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3ZDO0lBUUUsdUJBQW1CLE1BQXNGO1FBQXpHLGlCQWNDO1FBZGtCLFdBQU0sR0FBTixNQUFNLENBQWdGO1FBUGxHLGlCQUFZLEdBQVEsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0Qyx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFNckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3JDLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM5QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFhO2dCQUN4QyxJQUFJLEtBQUssRUFBRTtvQkFDVCxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcs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QUMsQ0FBQztJQUNuQixDQUFDO0lBQUEsQ0FBQztJQUVGLHdDQUFnQixHQUFoQixVQUFvQixTQUFpQjtRQUFyQyxpQkFFQztRQURDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFBQSxDQUFDO0lBRU0scUNBQWEsR0FBckIsVUFBc0IsU0FBaUI7UUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEdBQVE7Z0JBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUgsb0JBQUM7QUFBRCxDQUFDLEFBeEZELElBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiogIEBwcm9qZWN0IG5neC1mcm9udC1saXZlLXVwZGF0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqXG4gKiogIEBmaWxlIFNvY2tldFdyYXBwZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqXG4gKiogIEBhdXRob3IgQnJpY2UgRGF1cGlhcmQgPGJyaWNlLmRhdXBpYXJkQHNtYXJ0aWl6LmNvbT4gICoqXG4gKiogIEBEYXRlIDI2LzAzLzIwMjEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICoqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2tldElvQ29uZmlnfSBmcm9tICcuLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge0RlZmF1bHRTb2NrZXRDb25maWd9IGZyb20gJy4uL2NvbmZpZy9kZWZhdWx0JztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3NoYXJlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuXG5leHBvcnQgY2xhc3MgU29ja2V0V3JhcHBlciB7XG4gIHB1YmxpYyB0b2tlblVwZGF0ZXI6IGFueSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIHNvY2tldDogYW55O1xuICBwcml2YXRlIHN1YnNjcmliZXJzQ291bnRlcjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICBwcml2YXRlIGNvbmZpZzogeyBwYXRoPzogc3RyaW5nOyBhdXRvQ29ubmVjdD86IGJvb2xlYW47IHRyYW5zcG9ydHM/OiBzdHJpbmdbXTsgcXVlcnk/OiB7fTsgcmVjb25uZWN0aW9uRGVsYXlNYXg/OiBudW1iZXI7IGV4dHJhSGVhZGVycz86IHt9OyByZWNvbm5lY3Rpb24/OiBib29sZWFuOyByZWNvbm5lY3Rpb25BdHRlbXB0cz86IG51bWJlcjsgdGltZW91dD86IG51bWJlcjsgcmVjb25uZWN0aW9uRGVsYXk/OiBudW1iZXI7IHJhbmRvbWl6YXRpb25GYWN0b3I/OiBudW1iZXIgfSB8IFNvY2tldElvQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBDb25maWc/OiB7IHVybD86IHN0cmluZzsgY29uZmlnPzogU29ja2V0SW9Db25maWcsIGF1dGg/OiBib29sZWFuLCBsb2dpblBhZ2U/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMuY29uZmlnID0gIUNvbmZpZyA/IERlZmF1bHRTb2NrZXRDb25maWcgOiBDb25maWcuY29uZmlnO1xuICAgIHRoaXMudXJsID0gIUNvbmZpZyA/ICcnIDogQ29uZmlnLnVybDtcbiAgICBpZiAoQ29uZmlnICYmICFDb25maWcuYXV0aCkge1xuICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b2tlblVwZGF0ZXIuc3Vic2NyaWJlKCh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmV4dHJhSGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJhZXJlciAke3Rva2VufWA7XG4gICAgICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmNvbm5lY3QoKTtcbiAgICAgICAgICB0aGlzLnJlZGlyZWN0TG9naW4oQ29uZmlnLmxvZ2luUGFnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJvb21EYXRhKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNvY2tldC5qb2luKG5hbWUpO1xuICAgIHRoaXMuc29ja2V0Lm9uKG5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9mKG5hbWVzcGFjZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub2YobmFtZXNwYWNlKTtcbiAgfTtcblxuICBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9uY2UoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgY29ubmVjdCgpIHtcbiAgICBjb25zdCBpb1NvY2tldCA9IChpbyBhcyBhbnkpLmRlZmF1bHQgPyAoaW8gYXMgYW55KS5kZWZhdWx0IDogaW87XG4gICAgcmV0dXJuIGlvU29ja2V0KHRoaXMudXJsLCB0aGlzLmNvbmZpZykuY29ubmVjdCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdChjbG9zZT86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IHZvaWQpOiBhbnkge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgZnJvbUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnN1YnNjcmliZXJzQ291bnRlcisrO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZXJzQ291bnRlciA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkucGlwZShzaGFyZSgpKTtcbiAgfTtcblxuICBmcm9tT25lVGltZUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLm9uY2UoZXZlbnROYW1lLCByZXNvbHZlKSk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZWRpcmVjdExvZ2luKGxvZ2luUGFnZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0ICYmIGxvZ2luUGFnZSkge1xuICAgICAgdGhpcy5zb2NrZXQub24oJ3Nlc3Npb24tdGltZS1vdXQnLCAobXNnOiBhbnkpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UobG9naW5QYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=