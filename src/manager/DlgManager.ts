/**
 * 游戏中的Dlg管理类
 */

class DlgManager {

    constructor() {
    }

    /*
    * 弹出模态对话框
    * @param dlg           要弹出的dlg类名
    * @param groups        要加载的资源组名
    * @param closeHander   对话框关闭后的回调函数
    * @param data          要传递给对话框的参数
    * @param effectType    动画类型 0:没有动画 1:从中间轻微弹出 2:从中间猛烈弹出 3:从左到右 4:从右向左 5:从上到下 6:从下到上
    * @param transparent   背景颜色的透明度
    */
    public popDlg(dlg: any, groups: string = "", closeHander: Handler = null,
                  data: any = null, effectType: number = 1, transparent: number = 0.6): void {
        if (!groups) {
            const pop: any = this.makeDlg(dlg, closeHander, data);
            this.addPopDlg(pop, effectType, transparent);
        } else {
            const _handle = new Handler(this, this.onLoad, [dlg, closeHander, data, true, effectType, transparent]);
            ResLoad.getInstance().LoadRes(groups, _handle);
        }
    }

    public popClickDlg(dlg: any, closeHander: Handler = null, data: any = null): void {
        const pop: any = this.makeDlg(dlg, closeHander, data);
        PopUpManager.getInstance().addPopUp(pop, false, 0, 0, 0, false, 0);
    }

    /*
    * 移除对话框
    * key            要移出的对话框的key
    * effectType     移出的动画效果   0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    public dlgClose(key: string, effectType: number = 0) {
        const obj: any = UIPool.getInstance().getObject(key);
        if (obj) {
            PopUpManager.getInstance().removePopUp(obj, effectType);
            UIPool.getInstance().destroyObject(obj);
            // HM.getInstance().onDlgClose(key);
        }

    }

    public closeAllDlg(): void {
        PopUpManager.getInstance().closeAllDlg();
    }


    private makeDlg(dlg: any, closeHander: Handler, data: any): any {
        const pop: any = UIPool.getInstance().createObject(dlg);
        ( pop as UIObject)._closeHander = closeHander;
        ( pop as UIObject).data = data;

        return pop;
    }

    /* 加载完成 **/
    private onLoad(dlg: any, closeHander: Handler, data: any, model: boolean,
                   effectType: number, transparent: number, key: string): void {
        const pop: any = this.makeDlg(dlg, closeHander, data);
        this.addPopDlg(pop, effectType, transparent);
    }

    /**
     * 调用PopUpManager
     */
    private addPopDlg(panel, effectType: number = 0, transparent: number) {
        PopUpManager.getInstance().addPopUp(panel, true, 0, 0, effectType, false, transparent);
    }
}
