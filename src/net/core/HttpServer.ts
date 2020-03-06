/**
 *
 */
class HttpServer extends HttpConnect {

    public static getInstance(): HttpServer {
        if (HttpServer.instance == null) {
            HttpServer.instance = new HttpServer();
        }
        return HttpServer.instance;
    }
    private static instance: HttpServer;

    constructor() {
        super();
    }

    /** 发送消息 */
    public sendHttpMsg(route: string, msg: string, hander: Handler): void {
        const dicServerInfo: DicServerInfo = GM.jm.getClass("DicServerInfo");
        const url: string = dicServerInfo.serverUrl + route;
        this.SendUrlHttpMsg(url, msg, hander);
    }

    /** 发送消息 get*/
    public sendHttpMsgWithType(route: string, msg: string, hander: Handler, isJson: boolean, type: string): void {
        const dicServerInfo: DicServerInfo = GM.jm.getClass("DicServerInfo");
        const url: string = dicServerInfo.serverUrl + route;
        this.SendUrlHttpMsg(url, msg, hander, isJson, type);
    }
}
