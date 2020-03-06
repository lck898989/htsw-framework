
/** 划线，实现屏幕的划屏特效 */
class SlideLine extends egret.Sprite {
    public constructor() {
        super();
    }


    /** 画线
	 * @param	p1		第一点坐标
	 * @param 	p2		第2点坐标
	 */
    public drawPoint(p1: egret.Point, p2: egret.Point): void {
        this.alpha = 1;
        const n = (p1.x + p2.x) * 0.5;
        const s = (p1.y + p2.y) * 0.5;

        this.graphics.clear();
        this.graphics.beginFill(0xFFFFFF, 1);  // 白色填充
        this.graphics.moveTo(p1.x, p1.y);
        this.graphics.lineTo(n, s - 5);
        this.graphics.lineTo(p2.x, p2.y);
        this.graphics.lineTo(n, s + 5);
        this.graphics.lineTo(p1.x, p1.y);
        this.graphics.endFill();

        // 加入到效果层
        GameLayerManager.gameLayer().effectLayer.addChild(this);

        // 渐隐后消息
        egret.Tween.get(this).to({alpha: 0}, 800).call(() => {
            SlideLineManager.getInstance().backLine(this);
            if (GameLayerManager.gameLayer().effectLayer.contains(this)) {
               GameLayerManager.gameLayer().effectLayer.removeChild(this);
            }
        },                                             this);
    }

}
