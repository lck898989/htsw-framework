/**
 * 素材需要提前加载好
 * 素材命名规则：类型_数值（有类型是因为一般会同时有几种数字图片，比如大小号或不同颜色）
 * 点号素材命名：类型_dot
 * 创建BitmapNumber使用createNumPic返回DisplayObjectContainer
 * 创建好的BitmapNumber数值需要变化是调用changeNum
 * 回收使用desstroyNumPic
 *
 */
class BitmapNumber extends BaseClass {
    private _imgPool: egret.Bitmap[];
    private _containerPool: egret.DisplayObjectContainer[];

    public constructor() {
        super();
        this._imgPool = [];
        this._containerPool = [];
    }

    /**
     * 根据需要的数字和类型返回一个DisplayObjectContainer
     * @param num 字值，支持小数点 也可以为图片ID 默认为字值
     * @param type 素材类型
     * @param b 是否加载ID字符串名称图片 默认为false 不必填写这个参数 需要时传true
     */
    public createNumPic(num: string, type: string, b: boolean= false): egret.DisplayObjectContainer {
        const container: egret.DisplayObjectContainer = this.getContainer();
        const numStr: string = num.toString();
        let index: number = 0;
        let tempBm: egret.Bitmap;
        // 加入判断用来读取技能和buff文字
        if ( b ) {
            tempBm = this.getSingleNumPic( numStr, type );
            container.addChild( tempBm );
        } else {
            for ( index; index < numStr.length; index++ ) {
                tempBm = this.getSingleNumPic( numStr.charAt( index ), type );
                container.addChild( tempBm );
            }
        }
        this.repositionNumPic(container);
        return container;
    }

    // 回收带数字的DisplayObjectContainer
    public desstroyNumPic(picContainer: egret.DisplayObjectContainer): void {
        this.clearContainer(picContainer);
        if (picContainer.parent) {
            picContainer.parent.removeChild(picContainer);
        }
    }

    /*
     * 改变带数字的DisplayObjectContainer数字值
     * 提供这个方法是为了提高效率，直接更换之前创建对象的texture，避免多余的删除和创建
     * */
    public changeNum(picContainer: egret.DisplayObjectContainer, num: number, type: string): void {
        const numStr: string = num.toString();
        // 如果当前数字个数多于目标个数则把多余的回收
        if (picContainer.numChildren > numStr.length) {
            while (picContainer.numChildren > numStr.length) {
                this.recycleBM(picContainer.getChildAt(picContainer.numChildren - 1) as egret.Bitmap);
            }
        }
        let index: number = 0;
        let tempStr: string;
        for (index; index < numStr.length; index++) {
            // 如果当前的Bitmap数量不够则获取新的Bitmap补齐
            if (index >= picContainer.numChildren) {
                picContainer.addChild(this.getBitmap());
            }
            tempStr = numStr.charAt(index);
            tempStr = tempStr === "." ? "dot" : tempStr;
            (picContainer.getChildAt(index) as egret.Bitmap).texture = this.getTexture(tempStr, type);
        }
        this.repositionNumPic(picContainer);
    }

    // 每个数字宽度不一样，所以重新排列
    private repositionNumPic(container: egret.DisplayObjectContainer): void {
        let index: number = 0;
        let lastX: number = 0;
        let temp: egret.DisplayObject;
        for (index; index < container.numChildren; index++) {
            temp = container.getChildAt(index);
            temp.x = lastX;
            lastX = temp.x + temp.width - 10;
        }
    }

    // 清理容器
    private clearContainer(picContainer: egret.DisplayObjectContainer): void {
        while (picContainer.numChildren) {
            this.recycleBM(picContainer.removeChildAt(0) as egret.Bitmap);
        }
    }

    // 回收Bitmap
    private recycleBM(bm: egret.Bitmap): void {
        if (bm && bm.parent) {
            bm.parent.removeChild(bm);
            bm.texture = null;
            this._imgPool.push(bm);
        }
    }

    private getContainer(): egret.DisplayObjectContainer {
        if (this._containerPool.length) {
            return this._containerPool.shift();
        }
        return new egret.DisplayObjectContainer();
    }

    // 获得单个数字Bitmap
    private getSingleNumPic(num: string, type: string): egret.Bitmap {
        if (num === ".") {
            num = "dot";
        }
        const bm: egret.Bitmap = this.getBitmap();
        bm.texture = this.getTexture(num, type);
        return bm;
    }

    private getTexture(num: string, type: string): egret.Texture {
        return RES.getRes( type + "_" + num + "_png" );
    }

    private getBitmap(): egret.Bitmap {
        if (this._imgPool.length) {
            return this._imgPool.shift();
        }
        return new egret.Bitmap();
    }
}
