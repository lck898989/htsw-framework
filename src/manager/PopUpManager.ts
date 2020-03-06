  /*
    * 面板弹出管理类
    * 面板弹出的管理类
    */
class PopUpManager {

    public static getInstance(): PopUpManager {
        if (!PopUpManager.instance) {
            PopUpManager.instance = new PopUpManager();
        }
        return PopUpManager.instance;
    }

    private static instance: PopUpManager;

    public _mask: eui.UILayer;
    public darkSprite: eui.Rect;
    constructor() {
        this._mask = new eui.UILayer(); // new egret.Sprite();
        this.darkSprite = new eui.Rect();
        this.darkSprite.fillColor = 0x000000;
        this.darkSprite.top = 0;
        this.darkSprite.bottom = 0;

        this._mask.addChild(this.darkSprite);
    }

    /** 屏幕适配
     */
    public  reSizePop(): void {
        if (this._mask.numChildren <= 1) {
               return;
        }

        for (let i = 0; i < this._mask.numChildren; i++) {
            const obj: Object = this._mask.getChildAt(i);
            if (obj instanceof UIObject) {
                this.resizePannel(obj);
            }
        }

       // this.darkSprite.width =   GM.gamec.curHeight();//GM.gamec.curWidth();
      //  this.darkSprite.height =  GM.gamec.curWidth(); //GM.gamec.curHeight();
    }

    public resizePannel(panel): void {
            const popUpWidth = panel.width;
            const popUpHeight = panel.height;

            panel.x = GM.gamec.curWidth() / 2 - popUpWidth / 2;
            panel.y = GM.gamec.curHeight() / 2 - popUpHeight / 2;
    }

    /*
    * 添加面板方法
    * panel       		面板
    * dark        		背景是否变黑
    * popUpWidth      	指定弹窗宽度，定位使用
    * popUpHeight      	指定弹窗高度，定位使用
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    * isAlert
    * isTransparent     背景的透明度 0 完全透明
    */
    public  addPopUp(panel, dark: boolean = false,
                     popUpWidth: number = 0, popUpHeight: number = 0, effectType: number = 0,
                     isAlert: boolean = false, isTransparent: number): void {
        if (GameLayerManager.gameLayer().panelLayer.contains(panel)) {// 判断是否包含panel
            return;
        }

        panel.scaleX = 1;
        panel.scaleY = 1;
        panel.x = 0;
        panel.y = 0;
        panel.alpha = 1;

        if (dark) {

            this.darkSprite.width = GM.gamec.curWidth();
            this.darkSprite.height = GM.gamec.curHeight();

            this.darkSprite.alpha = isTransparent;
            this.darkSprite.touchEnabled = true;

            this.darkSprite.visible = true;
        } else {
            this.darkSprite.visible = false;
        }

        this._mask.left = 0;
        this._mask.right = 0;
        this._mask.addChild(panel);
        this._mask.swapChildrenAt(this._mask.getChildIndex(this.darkSprite), this._mask.numChildren - 2);
        if (!GameLayerManager.gameLayer().panelLayer.contains(this._mask)) {
            GameLayerManager.gameLayer().panelLayer.addChild(this._mask);
        }

        // GameLayerManager.gameLayer().panelLayer.addChild(panel);
        GM.gamec.curPanel = panel;

        if (popUpWidth !== 0) {
            panel.x = GM.gamec.curWidth() / 2 - popUpWidth / 2;
            panel.y = GM.gamec.curHeight() / 2 - popUpHeight / 2;
        } else {
            popUpWidth = panel.width;
            popUpHeight = panel.height;

            panel.x = GM.gamec.curWidth() / 2 - popUpWidth / 2;
            panel.y = GM.gamec.curHeight() / 2 - popUpHeight / 2;
        }

        if (panel.x < 0) {
            panel.x = 0;
        }

        if (panel.y < 0) {
            panel.y = 0;
        }

        // 以下是弹窗动画
        const leftX: number = GM.gamec.curWidth() / 2 - popUpWidth / 2;
        const upY: number = GM.gamec.curHeight() / 2 - popUpHeight / 2;

        switch (effectType) {
            case 0:
                break;
            case 1:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                egret.Tween.get(panel)
                .to({alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4},
                    300, egret.Ease.backOut);
                break;
            case 2:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                egret.Tween.get(panel)
                .to({alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4},
                    600, egret.Ease.elasticOut);
                break;
            case 3:
                if (isAlert) {
                    panel.x = - popUpWidth;
                    egret.Tween.get(panel).to({x: leftX}, 500, egret.Ease.cubicOut);
                } else {
                    panel.x = - popUpWidth;
                    egret.Tween.get(panel).to({x: 0}, 500, egret.Ease.cubicOut);
                }
                break;
            case 4:
                if (isAlert) {
                    panel.x = popUpWidth;
                    egret.Tween.get(panel).to({x: leftX}, 500, egret.Ease.cubicOut);
                } else {
                    panel.x = popUpWidth;
                    egret.Tween.get(panel).to({x: 0}, 500, egret.Ease.cubicOut);
                }
                break;
            case 5:
                panel.y = - popUpHeight;
                egret.Tween.get(panel).to({y: upY}, 500, egret.Ease.cubicOut);
                break;
            case 6:
                if (isAlert) {
                    panel.y = GM.gamec.curHeight();
                    egret.Tween.get(panel).to({y: upY}, 500, egret.Ease.cubicOut);
                } else {
                    panel.y = popUpHeight;
                    egret.Tween.get(panel).to({y: 0}, 500, egret.Ease.cubicOut);
                }
                break;
            default:
                break;
        }

    }


    /*
    * 移除面板方法
    * panel       		面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    public  removePopUp(panel, effectType: number = 0): void {

// tslint:disable-next-line: only-arrow-functions
        const onComplete: Function = function(sp: egret.Sprite) {

        };

        if (this.darkSprite) {
            egret.Tween.get(this.darkSprite).to({alpha: 0}, 100).call(onComplete, this, [this.darkSprite]);
        }

        // 以下是弹窗动画
        switch (effectType) {
            case 0:
                break;
            case 1:
                egret.Tween.get(panel)
                .to({alpha: 0, scaleX: 0, scaleY: 0, x: panel.x + panel.width / 2, y: panel.y + panel.height / 2}, 300);
                break;
            case 2:
                break;
            case 3:
                egret.Tween.get(panel).to({x: panel.width}, 500, egret.Ease.cubicOut);
                break;
            case 4:
                egret.Tween.get(panel).to({x: -panel.width}, 500, egret.Ease.cubicOut);
                break;
            case 5:
                egret.Tween.get(panel).to({y: panel.height}, 500, egret.Ease.cubicOut);
                break;
            case 6:
                egret.Tween.get(panel).to({y: -panel.height}, 500, egret.Ease.cubicOut);
                break;
            default:
                break;
        }

        let waitTime = 500;
        if (effectType === 0) {
            waitTime = 0;
        }

        egret.setTimeout(this.close, this, waitTime, panel );


    }

    public close(panel: any) {
        if (this._mask.contains(panel)) {
            this._mask.removeChild(panel);
        }

        if (this._mask.numChildren > 1) {
            this._mask.swapChildrenAt(this._mask.getChildIndex(this.darkSprite), this._mask.numChildren - 2);
        } else {
            if (GameLayerManager.gameLayer().panelLayer.contains(this._mask)) {
                GameLayerManager.gameLayer().panelLayer.removeChild(this._mask);
            }
        }
    }

    public closeAllDlg(): void {
        while (this._mask.numChildren > 1) {
            const obj: Object = this._mask.getChildAt(0);
            if (obj instanceof UIObject ) {
                this._mask.removeChild(obj);
                UIPool.getInstance().destroyObject(obj);

            } else {
               this._mask.swapChildrenAt(this._mask.getChildIndex(this.darkSprite), this._mask.numChildren - 1);
            }
        }

        if (GameLayerManager.gameLayer().panelLayer.contains(this._mask)) {
            GameLayerManager.gameLayer().panelLayer.removeChild(this._mask);
        }
    }
}
