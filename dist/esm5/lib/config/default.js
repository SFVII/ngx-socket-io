/***********************************************************
 **  @project ngx-front-live-update                              **
 **  @file default                                         **
 **  @author Brice Daupiard <brice.daupiard@smartiiz.com>  **
 **  @Date 26/03/2021                                         **
 ***********************************************************/
export var DefaultSocketConfig = {
    url: '',
    path: '/socket.io',
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    timeout: 20000,
    autoConnect: true,
    query: {},
    transports: ['polling', 'websocket'],
    extraHeaders: {}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NvY2tldC1mcm9udC11cGRhdGUvIiwic291cmNlcyI6WyJsaWIvY29uZmlnL2RlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzZEQUs2RDtBQUc3RCxNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBRztJQUNqQyxHQUFHLEVBQUcsRUFBRTtJQUNSLElBQUksRUFBRSxZQUFZO0lBQ2xCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLG9CQUFvQixFQUFFLFFBQVE7SUFDOUIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixvQkFBb0IsRUFBRSxJQUFJO0lBQzFCLG1CQUFtQixFQUFFLEdBQUc7SUFDeEIsT0FBTyxFQUFFLEtBQUs7SUFDZCxXQUFXLEVBQUUsSUFBSTtJQUNqQixLQUFLLEVBQUUsRUFBRTtJQUNULFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7SUFDcEMsWUFBWSxFQUFFLEVBQUU7Q0FDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICoqICBAcHJvamVjdCBuZ3gtZnJvbnQtbGl2ZS11cGRhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxuICoqICBAZmlsZSBkZWZhdWx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxuICoqICBAYXV0aG9yIEJyaWNlIERhdXBpYXJkIDxicmljZS5kYXVwaWFyZEBzbWFydGlpei5jb20+ICAqKlxuICoqICBARGF0ZSAyNi8wMy8yMDIxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0U29ja2V0Q29uZmlnID0ge1xuICB1cmwgOiAnJyxcbiAgcGF0aDogJy9zb2NrZXQuaW8nLFxuICByZWNvbm5lY3Rpb246IHRydWUsXG4gIHJlY29ubmVjdGlvbkF0dGVtcHRzOiBJbmZpbml0eSxcbiAgcmVjb25uZWN0aW9uRGVsYXk6IDEwMDAsXG4gIHJlY29ubmVjdGlvbkRlbGF5TWF4OiA1MDAwLFxuICByYW5kb21pemF0aW9uRmFjdG9yOiAwLjUsXG4gIHRpbWVvdXQ6IDIwMDAwLFxuICBhdXRvQ29ubmVjdDogdHJ1ZSxcbiAgcXVlcnk6IHt9LFxuICB0cmFuc3BvcnRzOiBbJ3BvbGxpbmcnLCAnd2Vic29ja2V0J10sXG4gIGV4dHJhSGVhZGVyczoge31cbn07XG4iXX0=