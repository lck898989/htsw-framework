
class TcpServer implements IMessageListener {
/**
     *  发送
     */
    public static sendMessages(cmd: number, body: egret.ByteArray): void {
        if (TcpServer._socket && TcpServer._socket.getConnected()) {
            TcpServer._socket.sendPackage(cmd, body);
        }
    }

    /**
     * 关闭
     */
    public static close(): void {
        if (TcpServer._socket) {
            if (TcpServer._socket.getConnected()) {
                TcpServer._socket.close();
            }
        }
    }

    /**
     *  废掉socket，再使用重新创建
     *
     */
    public static unUseFul(): void {
        close();
        GameSocketNew.setInstanceNull();
        TcpServer._socket = null;
    }

    public static hadSocket(): Boolean {
        if (TcpServer._socket) {
            return true;
        } else {
            return false;
        }
    }


    protected static _socket: GameSocketNew;

    constructor() {
        this.init();
    }

    /** 初始化 */
    public init(): void {
        TcpServer._socket = GameSocketNew.getInstance();
        TcpServer._socket.register(this);
    }

    /**
     * 连接
     */
    public connect(host: string, port: number): void {
        if (!TcpServer._socket) {
            this.init();
        }

        if (!TcpServer._socket.getConnected()) {
            TcpServer._socket.connect(host, port);
        }
    }

    /**
     * 得到是否连接中
     */
    public getConnected(): Boolean {
        return TcpServer._socket ? TcpServer._socket.getConnected() : false;
    }


    /**
     * 子类MessageManager重写了此方法
     */
    public onConnect(): void {}

    /**
     * 子类MessageManager重写了此方法
     */
    public onMessageReceived(messageType: number, bytes: egret.ByteArray): void {}

    /**
     * 处理连接断开
     */
    public onDisConnect(): void {
        this.onLoseConnectionWithServer();
    }

    /**
     * 处理链接错误
     */
    public onConnectError(): void {
        this.showErrorMessageContent();
        this.receiveIOError();

    }

    private showErrorMessageContent(): void {
        // TODO 显示连接失败信息

    }

    /**
     * 处理数据链接IO错误
     */
    private receiveIOError(): void {
        close();
        this.onLoseConnectionWithServer();
    }

    /**
     * 断开连接后
     */
    private onLoseConnectionWithServer(): void {

    }
}
