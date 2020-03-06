interface IMessageListener {
    onConnect(): void;
    onDisConnect(): void;
    onMessageReceived(messageType: number, bytes: egret.ByteArray): void;
    onConnectError(): void;
}
