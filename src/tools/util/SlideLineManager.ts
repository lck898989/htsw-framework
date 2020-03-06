/** 管理屏幕划痕的管理类 */
class SlideLineManager {

    public static getInstance(): SlideLineManager {
        if (SlideLineManager.instance == null) {
            SlideLineManager.instance = new SlideLineManager();
        }
        return SlideLineManager.instance;
    }


    private static instance: SlideLineManager;

    /** 线条 */
    public _slideLines: SlideLine[];
    public _recordPoint: egret.Point;


    public constructor() {
        this._slideLines = [];
        this._recordPoint = null;
    }

    /** 画线 */
    public drawPoint(x: number, y: number): void {
        if (this._recordPoint == null) {
            this._recordPoint = new egret.Point(x, y);
        } else {
            // 得到距离
            const distance = App.MathUtils.getDistance(this._recordPoint.x, this._recordPoint.y, x, y);
            if (distance > 50) {
                if (this._slideLines.length > 0) {
                    this._slideLines.pop();
                } else {
                    const slide = new SlideLine();
                    const end: egret.Point = new egret.Point(x, y);
                    slide.drawPoint(this._recordPoint, end);
                    this._recordPoint = end;
                }
            }
        }
    }

    /** 画线完成的返回 */
    public backLine(slide: SlideLine): void {
        this._slideLines.push(slide);
    }

    /** 完成划线 */
    public endDraw(): void {
        this._recordPoint = null;
    }
}
