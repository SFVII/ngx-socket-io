import { __decorate, __param } from "tslib";
import { EventEmitter, Optional } from '@angular/core';
import { DefaultSocketConfig } from './config/default';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as io from 'socket.io-client';
let SocketFrontUpdateService = class SocketFrontUpdateService {
    constructor(Config) {
        this.tokenUpdater = new EventEmitter();
        this.subscribersCounter = 0;
        this.config = !Config ? DefaultSocketConfig : Config.config;
        this.url = !Config ? '' : Config.url;
        if (Config && !Config.auth) {
            this.socket = this.connect();
        }
        else {
            this.tokenUpdater.subscribe((token) => {
                if (token) {
                    this.config.extraHeaders.Authorization = `Baerer ${token}`;
                    this.socket = this.connect();
                    this.redirectLogin(Config.loginPage);
                }
            });
        }
    }
    roomData(name, callback) {
        this.socket.emit('joinroom', name);
        this.socket.on(name, callback);
    }
    of(namespace) {
        this.socket.of(namespace);
    }
    ;
    on(eventName, callback) {
        this.socket.on(eventName, callback);
    }
    ;
    once(eventName, callback) {
        this.socket.once(eventName, callback);
    }
    ;
    connect() {
        const ioSocket = io.default ? io.default : io;
        return ioSocket(this.url, this.config).connect();
    }
    disconnect(close) {
        return this.socket.disconnect.apply(this.socket, arguments);
    }
    emit(eventName, data, callback) {
        this.socket.emit(eventName, data, callback);
    }
    ;
    removeListener(eventName, callback) {
        return this.socket.removeListener.apply(this.socket, arguments);
    }
    ;
    removeAllListeners(eventName) {
        return this.socket.removeAllListeners.apply(this.socket, arguments);
    }
    ;
    fromEvent(eventName) {
        this.subscribersCounter++;
        return new Observable((observer) => {
            this.socket.on(eventName, (data) => {
                observer.next(data);
            });
            return () => {
                if (this.subscribersCounter === 1) {
                    this.socket.removeListener(eventName);
                }
            };
        }).pipe(share());
    }
    ;
    fromOneTimeEvent(eventName) {
        return new Promise(resolve => this.once(eventName, resolve));
    }
    ;
    redirectLogin(loginPage) {
        if (this.socket && loginPage) {
            this.socket.on('session-time-out', (msg) => {
                window.location.replace(loginPage);
            });
        }
    }
};
SocketFrontUpdateService = __decorate([
    __param(0, Optional())
], SocketFrontUpdateService);
export { SocketFrontUpdateService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWZyb250LXVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc29ja2V0LWZyb250LXVwZGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXQtZnJvbnQtdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFJdkMsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFTbkMsWUFBd0IsTUFBc0Y7UUFQdkcsaUJBQVksR0FBUSxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXRDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQU1yQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1RCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDckMsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEtBQUssRUFBRTtvQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFlB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QUNuQixDQUFDO0lBQUEsQ0FBQztJQUVGLGdCQUFnQixDQUFJLFNBQWlCO1FBQ25DLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFBQSxDQUFDO0lBRU0sYUFBYSxDQUFDLFNBQWlCO1FBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRixDQUFBO0FBeEZZLHdCQUF3QjtJQVN0QixXQUFBLFFBQVEsRUFBRSxDQUFBO0dBVFosd0JBQXdCLENBd0ZwQztTQXhGWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NrZXRJb0NvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJmYWNlLWNvbmZpZyc7XG5pbXBvcnQge0RlZmF1bHRTb2NrZXRDb25maWd9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IGNsYXNzIFNvY2tldEZyb250VXBkYXRlU2VydmljZSB7XG5cbiAgcHVibGljIHRva2VuVXBkYXRlcjogYW55ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgc29ja2V0OiBhbnk7XG4gIHByaXZhdGUgc3Vic2NyaWJlcnNDb3VudGVyOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gIHByaXZhdGUgY29uZmlnOiB7IHBhdGg/OiBzdHJpbmc7IGF1dG9Db25uZWN0PzogYm9vbGVhbjsgdHJhbnNwb3J0cz86IHN0cmluZ1tdOyBxdWVyeT86IHt9OyByZWNvbm5lY3Rpb25EZWxheU1heD86IG51bWJlcjsgZXh0cmFIZWFkZXJzPzoge307IHJlY29ubmVjdGlvbj86IGJvb2xlYW47IHJlY29ubmVjdGlvbkF0dGVtcHRzPzogbnVtYmVyOyB0aW1lb3V0PzogbnVtYmVyOyByZWNvbm5lY3Rpb25EZWxheT86IG51bWJlcjsgcmFuZG9taXphdGlvbkZhY3Rvcj86IG51bWJlciB9IHwgU29ja2V0SW9Db25maWc7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQ29uZmlnPzogeyB1cmw/OiBzdHJpbmc7IGNvbmZpZz86IFNvY2tldElvQ29uZmlnLCBhdXRoPzogYm9vbGVhbiwgbG9naW5QYWdlPzogc3RyaW5nIH0pIHtcbiAgICB0aGlzLmNvbmZpZyA9ICFDb25maWcgPyBEZWZhdWx0U29ja2V0Q29uZmlnIDogQ29uZmlnLmNvbmZpZztcbiAgICB0aGlzLnVybCA9ICFDb25maWcgPyAnJyA6IENvbmZpZy51cmw7XG4gICAgaWYgKENvbmZpZyAmJiAhQ29uZmlnLmF1dGgpIHtcbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9rZW5VcGRhdGVyLnN1YnNjcmliZSgodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy5leHRyYUhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCYWVyZXIgJHt0b2tlbn1gO1xuICAgICAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5jb25uZWN0KCk7XG4gICAgICAgICAgdGhpcy5yZWRpcmVjdExvZ2luKENvbmZpZy5sb2dpblBhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByb29tRGF0YShuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zb2NrZXQuZW1pdCgnam9pbnJvb20nLCBuYW1lKTtcbiAgICB0aGlzLnNvY2tldC5vbihuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBvZihuYW1lc3BhY2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0Lm9mKG5hbWVzcGFjZSk7XG4gIH07XG5cbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zb2NrZXQub24oZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgb25jZShldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNvY2tldC5vbmNlKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIGNvbm5lY3QoKSB7XG4gICAgY29uc3QgaW9Tb2NrZXQgPSAoaW8gYXMgYW55KS5kZWZhdWx0ID8gKGlvIGFzIGFueSkuZGVmYXVsdCA6IGlvO1xuICAgIHJldHVybiBpb1NvY2tldCh0aGlzLnVybCwgdGhpcy5jb25maWcpLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY2xvc2U/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5kaXNjb25uZWN0LmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZW1pdChldmVudE5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiB2b2lkKTogYW55IHtcbiAgICB0aGlzLnNvY2tldC5lbWl0KGV2ZW50TmFtZSwgZGF0YSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIHJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86ICgpID0+IHZvaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lPzogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIGZyb21FdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIrKztcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc0NvdW50ZXIgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pLnBpcGUoc2hhcmUoKSk7XG4gIH07XG5cbiAgZnJvbU9uZVRpbWVFdmVudDxUPihldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5vbmNlKGV2ZW50TmFtZSwgcmVzb2x2ZSkpO1xuICB9O1xuXG4gIHByaXZhdGUgcmVkaXJlY3RMb2dpbihsb2dpblBhZ2U6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNvY2tldCAmJiBsb2dpblBhZ2UpIHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdzZXNzaW9uLXRpbWUtb3V0JywgKG1zZzogYW55KSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGxvZ2luUGFnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==