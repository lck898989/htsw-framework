/**
 * 游戏中使用到的特效
 */

namespace EffectUtils {

    /**
   *                 飘字特效
   * str             提示内容
   * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
   * isWarning       是否是警告，警告是红色
   */
    export function showTips(str: string = "", effectType: number = 1, isWarning: boolean = false): void {
        switch (effectType) {
            case 1: {
                TipsUtils.showTipsDownToUp(str, isWarning);
                break;
            }
            case 2: {
                TipsUtils.showTipsLeftOrRight(str, isWarning, true);
                break;
            }
            case 3: {
                TipsUtils.showTipsLeftOrRight(str, isWarning, false);
                break;
            }
            case 4: {
                TipsUtils.showTipsFromCenter(str, isWarning);
                break;
            }
            case 5: {
                TipsUtils.showTipsBigToSmall(str, isWarning);
                break;
            }
            case 6: {
                TipsUtils.showTipsNotice(str, isWarning);
                break;
            }
            default: {
                // TODO: Implemente default case
            }
        }

    }

    /** 对象闪烁特效
     * obj         闪烁对象
     * interval    闪烁总时间 (毫秒)
     */
    export function blinkEffect(obj, interval: number = 1000): void {
// tslint:disable-next-line: no-unused-expression
        new Blink(obj, interval);
    }

    // 存储旋转对象
    const rotationArr: any[] = [];

    /** 对象旋转特效
     * obj   旋转对象
     * time  旋转一周用时，毫秒
    **/
    export function rotationEffect(obj, time: number = 1000): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        if (this.rotationArr[obj.hashCode]) {
            return;
        }
        if ((this.rotationArr[obj.hashCode] == null) || !this.rotationArr[obj.hashCode]) {
            this.rotationArr[obj.hashCode] = true;
        }
        const onComplete1: Function = function() {
            if (this.rotationArr[obj.hashCode] && (obj != null)) {
                obj.rotation = 0;
                egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
            }
        };
        obj.rotation = 0;
        egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
    }

    /** 取消对象旋转 **/
    // obj    旋转对象
    export function removeRotationEffect(obj): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }

    /**抖动对象特效 **/
    // 类似ios密码输入错误的特效
    export function shakeObj(obj): void {
        const shakeNum = 80;
        const oldX: number = obj.x;
        egret.Tween.get(obj).to({ x: obj.x - 10 }, shakeNum);

        egret.setTimeout(function() {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        },               this, shakeNum * 2);
        egret.setTimeout(function() {
            egret.Tween.get(obj).to({ x: obj.x - 20 }, shakeNum);
        },               this, shakeNum * 3);
        egret.setTimeout(function() {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        },               this, shakeNum * 4);
        egret.setTimeout(function() {
            egret.Tween.get(obj).to({ x: oldX }, shakeNum);
        },               this, shakeNum * 5);
    }

    /** 抖动对象特效(震屏)
      * effectType 1:抖动 2：震动
     **/

    export function shakeScreen(obj, effectType: number = 1): void {
        const panel = obj;
        const shakeNum = 40;
        const oldX: number = panel.x;
        const oldY: number = panel.y;

        if (effectType == 1) {
            egret.Tween.get(panel).to({ x: panel.x - 10 }, shakeNum);

            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
            },               this, shakeNum * 2);
            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: panel.x - 20 }, shakeNum);
            },               this, shakeNum * 3);
            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
            },               this, shakeNum * 4);
            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: oldX }, shakeNum);
            },               this, shakeNum * 5);
        } else {
            egret.Tween.get(panel).to({ x: panel.x - 10, y: panel.y }, shakeNum);

            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: panel.x + 20, y: panel.y }, shakeNum);
            },               this, shakeNum * 2);
            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 15 }, shakeNum);
            },               this, shakeNum * 3);
            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y - 20 }, shakeNum);
            },               this, shakeNum * 4);
            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 10 }, shakeNum);
            },               this, shakeNum * 5);
            egret.setTimeout(function() {
                egret.Tween.get(panel).to({ x: oldX, y: oldY }, shakeNum);
            },               this, shakeNum * 6);
        }
    }

    // ------------------------  给显示对象增加一些固定的效果 ------------------------------------//

    /**
   * 显示对象上下浮动特效
   * obj           对象
   * time          浮动时间 毫秒
   * space         浮动高度
   */
    export function flyObj(obj, time, space: number = 50): void {
        const onComplete1: Function = function() {
            if (obj != null) {
                const onComplete2: Function = function() {
                    egret.Tween.get(obj).to({ y: obj.y + space }, time / 3).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }

    const isPlayEffectPlay: Boolean = false;
    /**
    * 给显示对象增加特效
    * obj           对象
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    export function playEffect(obj, cartoonType: number = 1): void {
        if (this.isPlayEffectPlay) {
            return;
        }
        this.isPlayEffectPlay = true;
        const onComplete2: Function = function() {
            this.isPlayEffectPlay = false;
        };
        const onComplete1: Function = function() {
            if (cartoonType == 1) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            } else if (cartoonType == 2) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            } else if (cartoonType == 3) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }

    /**
     * 给显示对象增加从中心放大的效果(放大到1.5倍)
     */
    export function playCenterScale(obj): void {
        egret.Tween.removeTweens(obj);
        const onComplete1: Function = function() {
            egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: 162, y: 55}, 800, egret.Ease.backOut);
        };

        egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.sineIn).call(onComplete1, this);
    }


    /**
   * 给显示对象增加持续放大特效
   * obj           对象
   */
    export function playScaleEffect(obj): void {
        const onComplete1: Function = function() {
            if (obj != null) {
                const onComplete2: Function = function() {
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self);
                };
                obj.alpha = 1;
                egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self);
            }
        };

        onComplete1();

    }

    // 完成飞道具
    export function twComplete(tw: egret.Tween, img: eui.Image): void {
        // 移除动画
        egret.Tween.removeTweens(tw);
        if (img != null) {
            GameLayerManager.gameLayer().effectLayer.removeChild(img);
        }
    }
}
