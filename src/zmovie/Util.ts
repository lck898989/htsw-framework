
namespace zmovie {
    export class Util {
        public static clearDisposeDisplay(d: egret.DisplayObjectContainer): void {
            try {
                let tmpD: egret.DisplayObject;
                for (let i: number = d.numChildren - 1; i >= 0; i--) {
                    tmpD = d.getChildAt(i);
                    d.removeChild(tmpD);
                }
            } catch (err) {}
        }
        public static getTextureArrByName(imgArr: any, libObj: any, libName: string): any[] {
            const ret: any[] = [];
            let t: egret.Texture = Util.getTextureByName(imgArr, libName);
            if (null == t) {
                const arr: any[] = libObj.clipping[libName];
                if (null != arr) {
                    for (let i: number = arr.length - 1; i >= 0; i--) {
                        t = Util.getTextureByName(imgArr, arr[i].name);
                        if (null != t) {
                            ret.push({t, x: arr[i].x, y: arr[i].y});
                        } else {
                            return ret;
                        }
                    }
                }
                return ret;
            }
            ret.push({t, x: 0, y: 0});
            return ret;
        }

        public static getTextureByName(imgArr: any, libName: string): egret.Texture {
        let t: egret.Texture = null;
        try {
          t  = RES.getRes(imgArr + "." + libName);
        } catch (err) {}
        try {
            if (null == t) {
                const arr: string[] = imgArr;
                for (let i: number = arr.length - 1; i >= 0; i--) {
                    const t2: egret.Texture = RES.getRes(arr[i] + "." + libName);
                    if (null != t2) {
                        return t2;
                    }
                }
            }
        } catch (err) {}
        return t;
    }

    }
}
