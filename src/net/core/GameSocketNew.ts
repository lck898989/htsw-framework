/**
 *
 */
class GameSocketNew {

    public static getInstance(): GameSocketNew {
        if (!GameSocketNew.instance) {
            GameSocketNew.instance = new GameSocketNew();
        }
        return GameSocketNew.instance;
    }

    public static setInstanceNull(): void {
        GameSocketNew.instance = null;
    }

    private static connected: boolean = false; // 连接状态
    private static socket: egret.WebSocket;

    private static instance: GameSocketNew;
    private listener: IMessageListener;

    constructor() {
        if (GameSocketNew.instance) {
            throw new Error("GameSocket instance has already been constructed!");
        }
        GameSocketNew.instance = this;
        GameSocketNew.connected = false;
    }

    public register(listener: IMessageListener): void {
        if (!listener) {
            throw new Error("Cannot registe a null hanlder to GameSocket");
        }

        this.listener = listener;
    }

    public unRegister(): void {
        this.listener = null;
    }

    /**
     * 是否为连接状态
     */
    public getConnected(): Boolean {
        return GameSocketNew.connected;
    }

    /**
     * 连接服务器 第一次握手
     */
    public connect(host: string, port: number): void {
        Log.trace("debug", "GameSocketNew.connect()");
        this.resetConnect();

        const ws: string = "wss://" + host + ":" + port;
        Log.trace("debug", "wss=" + ws);
        const dic: DicServerInfo = GM.jm.getClass("DicServerInfo");
        if (dic.usehttps == 1) {
            GameSocketNew.socket.connectByUrl(ws);
        } else {
            GameSocketNew.socket.connect(host, port);
        }
    }

    /**
     * 使接口可用， 并且客户端不主动断开连接
     */
    public close(): void {
        if (GameSocketNew.socket && GameSocketNew.socket.connected) {
            GameSocketNew.socket.close();
        }
    }

    public sendPackage(cmd: number, body: egret.ByteArray): void {
        if (!GameSocketNew.socket.connected) {
            Log.trace("debug", "GameSocket.sendPackage(), 无连接");
            return;
        }

        const bytes: egret.ByteArray = new egret.ByteArray();
        bytes.writeShort(body.length + 4);
        bytes.writeShort(cmd);
        bytes.writeBytes(body, 0, body.length);
        bytes.position = 0;

        GameSocketNew.socket.writeBytes(bytes);
        GameSocketNew.socket.flush();
    }

    /**
     * 初始化
     */
    private init(): void {
        GameSocketNew.socket = new egret.WebSocket();
        GameSocketNew.socket.type = egret.WebSocket.TYPE_BINARY;
        GameSocketNew.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.revSocketDataHandler, this);
        GameSocketNew.socket.addEventListener(egret.Event.CONNECT, this.connectHandler, this);
        GameSocketNew.socket.addEventListener(egret.Event.CLOSE, this.closeHandler, this);
        GameSocketNew.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
    }

    /**
     * 重置网络连接
     */
    private resetConnect(): void {
        if (GameSocketNew.socket) {
            GameSocketNew.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.revSocketDataHandler, this);
            GameSocketNew.socket.removeEventListener(egret.Event.CONNECT, this.connectHandler, this);
            GameSocketNew.socket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
            GameSocketNew.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            GameSocketNew.socket = null;
        }

        this.init();
    }

    /**
     * 连接
     */
    private connectHandler(e: egret.Event): void {
        Log.trace("debug", "GameSocket.connectHandler(), socket 连接成功");
        GameSocketNew.connected = true;
        this.excuteHandle(egret.Event.CONNECT, e);
    }

    /**
     * 接收数据
     */
    private revSocketDataHandler(e: egret.Event): void {
        Log.trace("debug", "WebSocket receiveData");
        const receiveBa: egret.ByteArray = new egret.ByteArray();
        GameSocketNew.socket.readBytes(receiveBa);
        receiveBa.position = 0;

        const packLen: number = receiveBa.readShort();
        const msgId: number = receiveBa.readShort();
        Log.trace("debug", "packLen", packLen, "msgId", msgId);

        const bytes: egret.ByteArray = new egret.ByteArray();
        bytes.writeBytes(receiveBa, 0, packLen);
        bytes.position = 4;
        // 是否需要处理粘包
        this.listener.onMessageReceived(msgId, bytes);
    }

    /**
     * 关闭连接
     */
    private closeHandler(e: egret.Event): void {
        Log.trace("debug", "WebSocket close");
        GameSocketNew.connected = false;
        this.excuteHandle(egret.Event.CLOSE, e);
    }

    /**
     * 抛出错误
     */
    private errorHandler(e: egret.IOErrorEvent): void {
        Log.trace("debug", "egret io_error");
        GameSocketNew.connected = false;
        this.excuteHandle(egret.IOErrorEvent.IO_ERROR, e);
    }

    /**
     *
     */
    private excuteHandle(type: string, content: any): void {
        switch (type) {
        case egret.Event.CONNECT:
            this.listener.onConnect();
            break;
        case egret.Event.CLOSE:
            // 连接关闭处理
            this.listener.onDisConnect();
            Log.trace("debug", "GameSocket.excuteHandle(), 数据连接关闭");
            break;
        case egret.IOErrorEvent.IO_ERROR:
            // 连接错误处理
            this.listener.onDisConnect();
            Log.trace("debug", "GameSocket.excuteHandle(), 数据连接异常!");
            break;
        }
    }
}
