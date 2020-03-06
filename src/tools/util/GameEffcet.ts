/**
 *
 * 游戏中用到的动画效果 可以复用的效果（单体类)
 *
 */
namespace GameEffcet {

    export function onlineShow(source: string, x: number, y: number): void {

        const img: eui.Image = new eui.Image();
        img.source = source + "_png";
        img.x = x;
        img.y = y;

        const onComplete2: Function = function() {
            if (GameLayerManager.gameLayer().effectLayer.contains(img)) {
                GameLayerManager.gameLayer().effectLayer.removeChild(img);

            }
        };

        if (!GameLayerManager.gameLayer().effectLayer.contains(img)) {
            GameLayerManager.gameLayer().effectLayer.addChild(img);

        }

        egret.Tween.get(img).wait(1500).to({alpha: 1}, 100).call(onComplete2, this);


    }

    /** 用于物体的闪烁效果 alpha循环从0到1 */
    export function  alphaChange(obj: any, time: number= 200): void {
        const onComplete1: Function = function() {
            // tslint:disable-next-line: no-use-before-declare
            egret.Tween.get(obj).to({ alpha: 0 }, time).call(onComplete2, this);
        };

        const onComplete2: Function = function() {
            egret.Tween.get(obj).to({ alpha: 1}, 1200).call(onComplete1, this);
        };

        onComplete1();
    }

    /** 用于文字的放大和回原效果 */
    export function bigText(obj: any, time: number = 300): void {
        const onComplete2: Function = function() {
            egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1 }, 1200);
        };

        const onComplete1: Function = function() {
            egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5 }, time).call(onComplete2, this);
        };
        onComplete1();
    }

    /** 用于上下移动 */
    export function UpMove(obj: any, time: number = 1200): void {
        const old: number = obj.y;

        const onComplete1: Function = function() {
            // tslint:disable-next-line: no-use-before-declare
            egret.Tween.get(obj).to({ y: old - 10}, time).call(onComplete2, this);
        };

        const onComplete2: Function = function() {
            egret.Tween.get(obj).to({ y: old }, time).call(onComplete1, this);
             // onComplete1();
        };

        onComplete1();
    }

     /** 用于上下连续移动 */
    export function upAndDowMove(obj: any, time: number = 1200): void {
        const old: number = obj.y;

        const onComplete1: Function = function() {
            // tslint:disable-next-line: no-use-before-declare
            egret.Tween.get(obj).to({ y: old - 10 }, time).call(onComplete2, this);
        };

        const onComplete2: Function = function() {
            egret.Tween.get(obj).to({ y: old }, time).call(onComplete1, this);
        };

        onComplete1();
    }


}
