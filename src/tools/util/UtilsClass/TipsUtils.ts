/**
  * tips特效汇总
  * TipsUtils.showTipsDownToUp()
  */

 namespace TipsUtils {
     // 从下到上弹出
     export function showTipsDownToUp(str: string = "", isWarning: boolean = false): void {
         const dw: number = GM.gamec.curWidth();
         const dh: number = GM.gamec.curHeight();

         let effectTips = new egret.TextField();
         effectTips.size = 24;
         effectTips.y = dh * 0.4;
         if (isWarning) {
             effectTips.textColor = GM.gamec.TEXT_COLORS.red;
         } else {
             effectTips.textColor = GM.gamec.TEXT_COLORS.green;
         }
         effectTips.alpha = 0;

         // effectTips.text = str;
         effectTips.textFlow = (new egret.HtmlTextParser()).parser(str);
         effectTips.fontFamily = "黑体";
         effectTips.strokeColor = 0x000000;
         effectTips.x = dw / 2 - effectTips.width / 2;
         effectTips.stroke = 2;
         effectTips.bold = true;
         effectTips.textAlign = egret.HorizontalAlign.CENTER;

         if (!GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
             GameLayerManager.gameLayer().effectLayer.addChild(effectTips);
         }

         const onComplete2: Function = function() {
             if (GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
                 GameLayerManager.gameLayer().effectLayer.removeChild(effectTips);
                 effectTips = null;
             }
         };
         const onComplete1: Function = function() {
             egret.Tween.get(effectTips).to({ alpha: 0 }, 2000).call(onComplete2, this);
         };
         effectTips.visible = true;
         egret.Tween.get(effectTips).to({ y: effectTips.y - 120, alpha: 1 }, 800, egret.Ease.backOut).call(onComplete1, this);
     }

     // 从左至右 或者 从右至左
     export function showTipsLeftOrRight(str: string = "", isWarning: boolean = false, isFromeLeft: boolean = true): void {
         const dw: number = GM.gamec.curHeight();
         const dh: number = GM.gamec.curWidth();


         let effectTips = new egret.TextField();

         effectTips.size = 24;
         effectTips.y = dh * 0.5;
         if (isWarning) {
             effectTips.textColor = GM.gamec.TEXT_COLORS.red;
         } else {
             effectTips.textColor = GM.gamec.TEXT_COLORS.green;
         }
         effectTips.alpha = 0;

         effectTips.textFlow = (new egret.HtmlTextParser()).parser(str);
         // effectTips.text = str;
         effectTips.fontFamily = "黑体";
         effectTips.strokeColor = 0x000000;
         if (isFromeLeft) {
             effectTips.x = - effectTips.width;
         } else {
             effectTips.x = dw;
         }
         effectTips.stroke = 2;
         effectTips.bold = true;
         effectTips.textAlign = egret.HorizontalAlign.CENTER;

         if (!GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
             GameLayerManager.gameLayer().effectLayer.addChild(effectTips);
         }

         if (isFromeLeft) {
             egret.Tween.get(effectTips).to({ x: dw / 2 - effectTips.width / 2 - 50, alpha: 1 }, 300, egret.Ease.sineInOut);
         } else {
             egret.Tween.get(effectTips).to({ x: dh / 2 - effectTips.width / 2 + 50, alpha: 1 }, 300, egret.Ease.sineInOut);
         }

         egret.setTimeout(function() {
             if (isFromeLeft) {
                 egret.Tween.get(effectTips).to({ x: effectTips.x + 100 }, 500);
             } else {
                 egret.Tween.get(effectTips).to({ x: effectTips.x - 100 }, 500);
             }
         },               this, 300);

         egret.setTimeout(function() {
             if (isFromeLeft) {
                 egret.Tween.get(effectTips).to({ x: dw }, 300, egret.Ease.sineIn);
             } else {
                 egret.Tween.get(effectTips).to({ x: -effectTips.width }, 300, egret.Ease.sineIn);
             }
         },               this, 800);

         egret.setTimeout(function() {
             if (GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
                 GameLayerManager.gameLayer().effectLayer.removeChild(effectTips);
                 effectTips = null;
             }
         },               this, 1100);

     }

     // 从里到外
     export function showTipsFromCenter(str: string = "", isWarning: boolean = false): void {
         const dw: number = GM.gamec.curHeight();
         const dh: number = GM.gamec.curWidth();


         let effectTips = new egret.TextField();

         effectTips.size = 24;
         effectTips.y = dh / 2;
         if (isWarning) {
             effectTips.textColor = GM.gamec.TEXT_COLORS.red;
         } else {
             effectTips.textColor = GM.gamec.TEXT_COLORS.green;
         }
         effectTips.alpha = 0;

         // effectTips.text = str;
         effectTips.textFlow = (new egret.HtmlTextParser()).parser(str);
         effectTips.fontFamily = "黑体";
         effectTips.strokeColor = 0x000000;
         effectTips.x = dw / 2;
         effectTips.stroke = 2;
         effectTips.bold = true;
         effectTips.textAlign = egret.HorizontalAlign.CENTER;
        // effectTips.anchorX = 0.5;
        // effectTips.anchorY = 0.5;
         AnchorUtil.setAnchorX(effectTips, 0.5);
         AnchorUtil.setAnchorY(effectTips, 0.5);
         effectTips.scaleX = 0;
         effectTips.scaleY = 0;

         if (!GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
             GameLayerManager.gameLayer().effectLayer.addChild(effectTips);
         }

         const onComplete2: Function = function() {
             if (GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
                 GameLayerManager.gameLayer().effectLayer.removeChild(effectTips);
                 effectTips = null;
             }
         };
         egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
         egret.setTimeout(function() {
             egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
         },               this, 1000);

     }

     // 从外到里
     export function showTipsBigToSmall(str: string = "", isWarning: boolean = false): void {
         let effectTips = new egret.TextField();
         const dw: number = GM.gamec.curHeight();
         const dh: number = GM.gamec.curWidth();


         effectTips.size = 24;
         effectTips.y = dh / 2;
         if (isWarning) {
             effectTips.textColor = GM.gamec.TEXT_COLORS.red;
         } else {
             effectTips.textColor = GM.gamec.TEXT_COLORS.green;
         }
         effectTips.alpha = 0;

         // effectTips.text = str;
         effectTips.textFlow = (new egret.HtmlTextParser()).parser(str);
         effectTips.fontFamily = "黑体";
         effectTips.strokeColor = 0x000000;
         effectTips.x = dw / 2;
         effectTips.stroke = 2;
         effectTips.bold = true;
         effectTips.textAlign = egret.HorizontalAlign.CENTER;

         AnchorUtil.setAnchorX(effectTips, 0.5);
         AnchorUtil.setAnchorY(effectTips, 0.5);
         effectTips.scaleX = 4;
         effectTips.scaleY = 4;

         if (!GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
             GameLayerManager.gameLayer().effectLayer.addChild(effectTips);
         }

         const onComplete2: Function = function() {
             if (GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
                 GameLayerManager.gameLayer().effectLayer.removeChild(effectTips);
                 effectTips = null;
             }
         };
         egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
         egret.setTimeout(function() {
             egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
         },               this, 1000);

     }

     // 从右至左 走马灯
     export function showTipsNotice(str: string = "", isWarning: boolean = false): void {
         const effsprite: egret.Sprite = new egret.Sprite();
         let effectTips = new egret.TextField();
         const dw: number = GM.gamec.curHeight();
         const dh: number = GM.gamec.curWidth();

         effectTips.size = 24;
         effectTips.y = dh * 0.2;


         if (isWarning) {
             effectTips.textColor = GM.gamec.TEXT_COLORS.red;
         } else {
             effectTips.textColor = GM.gamec.TEXT_COLORS.green;
         }
         // effectTips.alpha = 0;

         effectTips.textFlow = (new egret.HtmlTextParser()).parser(str);
         // effectTips.text = str;
         effectTips.fontFamily = "黑体";
         effectTips.strokeColor = 0x000000;
         effectTips.x = dw;
         effectTips.stroke = 2;
         effectTips.bold = true;
         effectTips.textAlign = egret.HorizontalAlign.CENTER;

         if (!GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
             effsprite.graphics.beginFill(0x000000, 0.4);
             effsprite.graphics.drawRect(0, (dh * 0.2) - 7, 960, 40);
             effsprite.graphics.endFill();
             GameLayerManager.gameLayer().effectLayer.addChild(effsprite);
             GameLayerManager.gameLayer().effectLayer.addChild(effectTips);
         }

         egret.Tween.get(effectTips).to({ x: -effectTips.width }, 10000);
         egret.setTimeout(function() {
             if (GameLayerManager.gameLayer().effectLayer.contains(effectTips)) {
                 effsprite.graphics.clear();
                 GameLayerManager.gameLayer().effectLayer.removeChild(effectTips);
                 GameLayerManager.gameLayer().effectLayer.removeChild(effsprite);
                 effectTips = null;
             }
         },               this, 10000);

     }

 }
