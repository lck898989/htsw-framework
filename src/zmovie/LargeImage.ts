/**
 * Created by ASUS on 15-2-9.
 */
namespace zmovie {
    export class LargeImage extends  egret.DisplayObjectContainer {

    public libName: string;
    public displayLibName: string;
    public imgDepth: number;
    private libObj: any;

    public constructor(imgArr: any, libObj: any, libName: string) {
            super();
            this.setObject(imgArr, libObj, libName);
        }

    public setObject(imgArr: any, libObj: any, libName: string): void {

        if (this.libObj == libObj && this.libName == libName) {
            return;
        }
        this.libName = libName;
        this.libObj = libObj;
        Util.clearDisposeDisplay(this);
        const arr: any[] = Util.getTextureArrByName(imgArr, libObj, libName);
        const len: number = arr.length;
        for (let i: number = len - 1; i >= 0; i--) {
           const o: any = arr[i];
           const img: egret.Bitmap = new egret.Bitmap();
           img.touchEnabled = false;
           img.texture = o.t;
           img.x = o.x / libObj.scale;
           img.y = o.y / libObj.scale;
           this.addChild(img);
        }
    }

    }
}
