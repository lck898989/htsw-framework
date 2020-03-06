/**
 *
 * @author
 * 飞出效果类
 *
 */
namespace EffectFly {
    /**开始显示提示 */
    export function showTips(data: Object): void {
        // var tip: FlyInfoDlg = new FlyInfoDlg();
        // tip.showInfo(data);

        // tip.x = 640;
        // tip.y = 0;
        // GameLayerManager.gameLayer().effectLayer.addChild(tip);

        // this.showMove(tip);
    }

    /**显示飞出 */
    // export function showMove(tip: FlyInfoDlg): void
    // {
    //     var posx = 640 * GM.viewpointScale - tip.width;
    //     egret.Tween.get(tip).to({x: posx},200,egret.Ease.backOut).wait(1500).to({alpha: 0},500).call(this.tipRemove,this,[tip]);
    // }

    /**移除tween */
    // export function tipRemove(tip: FlyInfoDlg): void
    // {
    //     tip.showRemove();
    // }
}
