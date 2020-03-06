/**
 * 继承eui的Componet 添加了 OnAdd ondestory 和msgDO
 * @author
 *
 */
class EuiObject extends eui.Component {

    public _data: Object;

    /** 里面的元件全部添加到舞台的通知 */
    private _hander: Handler;

    public constructor() {
        super();
        this._hander = null;
        this._data = null;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    }

    /* 添加hander 要在加入舞台前面 */
    public addHander(hander: Handler): void {
        this._hander = hander;
    }

    /* 加入到舞台后的调用 */
    public onAddStage(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);

        this.onAdd();
    }

    /* 供继承的函数 */
    public onAdd(): void {
    }

    /** 移出舞台后调用 */
    public removeStage(): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onAddStage, this);
        this._hander = null;
        this.onDestroy();
    }

    /** 这里进行移出场景的处理 */
    public onDestroy(): void {
        // 这里是清理数据

    }

    /** 供继承的函数, 刷新显示 */
    public updataShow(): void {
    }

    /* 如果需要处理网络消息，请重写此函数 **/
    public msgDo(msgType: number, obj: Object): void {
    }

}
