/**
 *
 * @author
 *
 */
class HLoad extends egret.HttpRequest {
    public hander: Handler;
    public time: number;
    public isJson: boolean;     // 返回数据是否为json（默认为true）
    public constructor() {
        super();
        this.hander = null;
        this.time = 0;
        this.isJson = true;
    }
}
