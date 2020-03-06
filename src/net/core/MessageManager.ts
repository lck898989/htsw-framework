/**
 *
 */
class MessageManager extends TcpServer {

    public static getInstance(): MessageManager {
        if (!MessageManager.instance) {
            MessageManager.instance = new MessageManager();
        }
        return MessageManager.instance;
    }
    private static instance: MessageManager;

    constructor() {
        super();
        if (MessageManager.instance) {
            throw new Error("GameSocket instance has already been constructed!");
        }

        MessageManager.instance = null;
    }

    /**
     * 发送消息  todo
     */

    /**
     * 连接服务器 todo
     */

    /**
     * 接收 todo
     */
}
