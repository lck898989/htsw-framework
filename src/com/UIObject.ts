/*
  *  程序中所有UI显示的基类
  *  要显示的UI必须继承此类
 */
class UIObject extends eui.Component {

    public static guid: Handler;
    public keyName: string = "";
    public data: any;                          // 外界可以传入的数据
    public _closeHander: Handler;              // 关闭的回调接口

    constructor() {
        super();
        this.data = null;
        this._closeHander = null;
    }

    /* 生成类实例后的处理（未加入显示列表) **/
    public onCreate(): void {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
        this.addEventListener(eui.UIEvent.CHANGE_END, this.onAddEnd, this);
    }

    /** 创建子原件 */
    public onCreateChildren(): void {
    }

    public onAddEnd(e: egret.Event): void {
        this.removeEventListener(eui.UIEvent.CHANGE_END, this.onAddEnd, this);
        this.onJoin();
    }

    /* 加入到舞台后的调用 **/
    public onAddStage(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
        this.onAdd();
        if (UIObject.guid) {
            UIObject.guid.execute();
        }

        if (!CommunicationManager.getInstance().offlineRev) {
            lcp.LListener.getInstance().dispatchEventWithType("tky_offlinepost");
        }
    }

    public onJoin(): void {

    }

    /* 加入舞台后的处理 继承此函数**/
    public onAdd(): void {
    }

    /* 如果需要每帧处理，重写此函数 **/
    public onEnterFrame(advancedTime: number): void {

    }

    /* 如果需要处理网络消息，请重写此函数 **/
    public msgDo(msgType: number, obj: Object): void {
    }

    /* 如果需要处理动作消息，请重写此函数 **/
    public execMessage(data: any): void {
    }

    /* 这里进行移出场景的处理 **/
    public onDestroy(): void {                           // 这里是清理数据
    }

    /* 关闭时的处理 **/
    public onClose(key: string, other: any= null): void {
        if (this._closeHander) {
            this._closeHander.executeWith([key, other]);
        }
    }

    /** 如果是弹出的对话框(dlg) 关闭的时候请调用
     *  other            传回给Hander的参数
     *  effectType       移出的动画效果   0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public onDlgClose(key: string, other: any = null, effectType: number = 0): void {
        this.onClose(key, other);
        GM.dlg.dlgClose(key, effectType);
    }

    /** 如果是弹出的对话框(dlg) 关闭的时候请调用
     *  effectType       移出的动画效果   0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public onDlgOnlyClose(key: string, effectType: number = 0): void {
        GM.dlg.dlgClose(key, effectType);
    }
}
