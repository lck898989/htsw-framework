/**
 * Created by zringhost on 14-12-14.
 */
namespace zmovie {
    export class ZMovieClip extends  egret.DisplayObjectContainer {

        public static EVENT_FRAME_COMPLETE: string = "frameComplete";
        public static EVENT_MOVE: string = "move";
        public static EVENT_ENTER_FRAME: string = "enterFrame";
        public static EVENT_MC_NAME: string = "mcName";
        public static EVENT_AREA: string = "area";
        public static EVENT_GOTOANDPLAYLABEL: string = "gotoAndPlayLabel";

        public static getFrameMovieObject(o: any, frameI: number): any {
                if (null == o.f_arr) {
                    o.f_arr = [];
                }
                o.f_arr.unshift(o);
                return o;
        }
        public _mcName: string;
        public libScale: number;
        public _direction: number;
        public fmObj: any;
        public beginFrame: number;
        public endFrame: number;
        public parentCFOObj: any;
        public areaObj: any;
        public totalFrame: number; public frameTime: number; public isPlay: boolean; public currPlaylabel: string;
        public isLoop: boolean;
        public currArea: any[];
        public imgDepth: number;
        public mcObj: any;
        public parentPlayTime: number; public scale: number; public imgArr: any;

        public endHander: Handler;

        public _scale: number;
        private libObj: any;        private currFrame: number;        private layerArr: any[];
        private _timeScale: number;

        public constructor(imgArr: any, libObj: any, mcName: string = null, scale_: number = 1) {
            super();
            this.isPlay = false;
            this.endHander = null;
            this.setMovieObject(imgArr, libObj, mcName, scale_);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDestory, this);
        }

        public onDestory(): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDestory, this);
            this.disposeLayerImg();
        }

        public getTotalFrame(): number {
            return this.totalFrame;
        }
        public getCurrPlayLabel(): string {
            return this.currPlaylabel;
        }

        public getCurrFrame(): number {
            return this.currFrame;
        }

        public getIsPlay(): boolean {
            return this.isPlay;
        }
        public setTimeScale(num: number): void {
            if (0 >= num) {
                num = 0.01;
            }
            this._timeScale = num;
            if (null != this.mcObj) {
                this.frameTime =  this.mcObj.frameTime / num;
            }

            for (let i: number = this.numChildren - 1; i >= 0; i--) {
                let mc: ZMovieClip = null;
                if (this.getChildAt(i) instanceof ZMovieClip) {
                    mc = this.getChildAt(i) as ZMovieClip;
                }
                if (null != mc) {
                    mc.setTimeScale(num);
                }
            }
        }

        public getTimeScale(): number {
         return this._timeScale;
        }

        public  getLabels(): any {
            return this.mcObj.frameLabels;
        }


        public getIsExistLabel(lName: string): boolean {
        if (null != this.mcObj.frameLabels && null != this.mcObj.frameLabels[lName]) {
            return true;
        }
        return false;
    }

        public getCurrLabelObj(): any {
        const labelObj: any = this.getLabels();
        if (null != labelObj) {
            for (const name in labelObj) {
                if (this.currFrame >= labelObj[name].begin) {
                    if (null != labelObj[name].end && this.currFrame >= labelObj[name].end) {
                        continue;
                    }

                    return labelObj[name];
                }
            }
        }
        return null;
    }


        public gotoAndPlayLabel(label: string, isPlayToEnd: boolean = false): any {
            let labelObj: any;

            if (null != this.mcObj.frameLabels) {
                labelObj = this.mcObj.frameLabels[label];
                if (null != labelObj) {
                    this.currPlaylabel = label;
                    this.beginFrame = labelObj.begin as number;
                    if (null == labelObj.end || isPlayToEnd) {
                        this.endFrame = -1;
                    } else {
                        this.endFrame = labelObj.end - 1;
                    }
                    this.gotoAndPlay(this.beginFrame);
                } else {
                    this.beginFrame = 0;
                    this.endFrame = -1;
                    this.currPlaylabel = null;
                    this.gotoAndPlay(this.beginFrame);
                }
                this.dispatchEventWith(ZMovieClip.EVENT_GOTOANDPLAYLABEL, false, label);
            }
            return labelObj;
         }

        public disposeLayerImg(): void {
        if (null != this.layerArr) {
            for (let l: number = this.layerArr.length - 1; l >= 0; l--) {
                const img: ZImage = this.layerArr[l].img;
                if (null != img) {
                    if (null != img.parent) {
                        img.parent.removeChild(img);
                    }
                }
                const mc: ZMovieClip = this.layerArr[l].mc;
                if (null != mc) {
                    if (null != mc.parent) {
                        mc.parent.removeChild(mc);
                    }
                }


                const li: LargeImage = this.layerArr[l].li;
                if (null != li) {
                    if (null != li.parent) {
                        li.parent.removeChild(li);
                    }
                }

            }
        }
    }

        public setMovieObject(imgArr: any, libObj: any, mcName: string, scale_: number = 1): void {

            if (null == mcName) {
                mcName = "root";
            }
            this.imgArr = imgArr;

            this.libObj = libObj;
            this._mcName = mcName;

            this.mcObj = libObj.mcObjs[mcName];

            this.areaObj = this.mcObj.areaObject;
            this.libScale = 1;
            this._direction = 1;
            this.fmObj = this.mcObj.frameMoveObj;


            this.currFrame = -1;
            this.totalFrame = this.mcObj.totalFrame;
            this.frameTime = this.mcObj.frameTime;
            this.beginFrame = 0;
            this.endFrame = -1;

            this._timeScale = 1;
            this.isLoop = true;
            this.disposeLayerImg();

            this.parentCFOObj = {};
            this.layerArr = new Array();
            this.currArea = null;


            const arr: any[] = this.mcObj.layers;
            const len: number = arr.length;


            for (let i: number = 0; i < len; i++) {
                const frameArr: any[] = new Array();
                const fArr: any[] = arr[i];
                const fLen: number = fArr.length;
                let pcfo: any = null;
                let k: number;

                for (let j: number = 0; j < fLen; j++) {
                    const cfo: any = fArr[j];
                    let obj3d: any = null;

                    if (null == cfo.matrix) {
                        const frameNum: number = cfo.frameNum;

                        if (null == cfo.libName && null != pcfo) {
                            if (null != cfo.x) {
                                cfo.libName = pcfo.libName;
                            }
                        }

                        if (null == cfo.a) {
                            cfo.a = 1;
                        }
                        if (null == cfo.b) {
                            cfo.b = 0;
                        }
                        if (null == cfo.c) {
                            cfo.c = 0;
                        }
                        if (null == cfo.d) {
                            cfo.d = 1;
                        }
                        if (null == cfo.al) {
                            cfo.al = 1;
                        }
                        if (null == cfo.cx) {
                            cfo.cx = 0;
                        } else {
                            cfo.cx *= -1;
                        }
                        if (null == cfo.cy) {
                            cfo.cy = 0;
                        } else {
                            cfo.cy *= -1;
                        }

                        if (null == cfo.r) {
                            cfo.r = 0;
                        }
                        if (null == cfo.sx) {
                            cfo.sx = 1;
                        }
                        if (null == cfo.sy) {
                            cfo.sy = 1;
                        }

                        if (null != cfo.scaleX || null != cfo.scaleY || null != cfo.scaleZ || null != cfo.rotationX || null != cfo.rotationY || null != cfo.rotationZ) {
                            obj3d = {};
                            obj3d.scaleX = cfo.scaleX;
                            obj3d.scaleY = cfo.scaleY;
                            obj3d.scaleZ = cfo.scaleZ;
                            obj3d.x = cfo.x;
                            obj3d.y = cfo.y;
                            obj3d.cx = cfo.cx;
                            obj3d.cy = cfo.cy;

                            cfo.cx = 0;
                            cfo.cy = 0;

                            cfo.x = 0;
                            cfo.y = 0;

                            obj3d.rotationX = cfo.rotationX;
                            obj3d.rotationY = cfo.rotationY;
                            obj3d.rotationZ = cfo.rotationZ;

                            if (null == obj3d.scaleX) {
                                obj3d.scaleX = 1;
                            }
                            if (null == obj3d.scaleY) {
                                obj3d.scaleY = 1;
                            }
                            if (null == obj3d.scaleZ) {
                                obj3d.scaleZ = 1;
                            }

                            if (null == obj3d.rotationX) {
                                obj3d.rotationX = 0;
                            }
                            if (null == obj3d.rotationY) {
                                obj3d.rotationY = 0;
                            }
                            if (null == obj3d.rotationZ) {
                                obj3d.rotationZ = 0;
                            }


                        }


                        cfo.matrix = new egret.Matrix(cfo.a, cfo.b, cfo.c, cfo.d, cfo.x, cfo.y);
                        for (k = 0; k < frameNum; k++) {
                            ZMovieClip.getFrameMovieObject(cfo, k + 1);
                        }

                        for (const oName in cfo) {
                            if ("id" != oName && "maskID" != oName && "op" != oName
                            && "mcName" != oName && "matrix" != oName && "al" != oName
                            && "libName" != oName && "f_arr" != oName && "cx" != oName && "cy" != oName && "r" != oName && "sx" != oName && "sy" != oName) {
                                delete cfo[oName];
                            }
                        }
                        if (null != obj3d) {
                            cfo.obj3d = obj3d;
                        }
                    }

                    frameArr.push(cfo);

                    const inFrameArr: any[] = cfo.f_arr;
                    if (null != inFrameArr) {
                        for (k = inFrameArr.length - 1; k >= 0; k--) {
                            frameArr.push(inFrameArr[k]);
                        }
                    }
                    pcfo = cfo;
                }
                this.layerArr.push({frames: frameArr});
            }

            this.parentPlayTime = 0;
            this.scale = scale_;
            this.advanceTime();
        }


        public nextFrame(): void {
        this.stop();
        this.parentPlayTime = 0;
        this.isPlay = true;
        this.advanceTime();
        this.isPlay = false;
    }

        public prevFrame(): void {
        this.stop();
        this.currFrame -= 2;

        if (-1 > this.currFrame) {
            this.currFrame = this.totalFrame - 2;
        }
        if (-1 > this.currFrame) {
            this.currFrame = -1;
        }

        this.parentPlayTime = 0;
        this.isPlay = true;
        this.advanceTime();
        this.isPlay = false;
    }


        public stop(): void {
            if (this.isPlay) {
                this.isPlay = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
                for (let i: number = this.numChildren - 1; i >= 0; i--) {
                    if (this.getChildAt(i) instanceof ZMovieClip) {
                        const fmc: ZMovieClip = this.getChildAt(i) as ZMovieClip;
                        fmc.stop();
                    }
            }
            }
            }

        public play(): void {
            if (!this.isPlay) {
                this.isPlay = true;
                this.addEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);

                for (let i: number = this.numChildren - 1; i >= 0; i--) {
                    if (this.getChildAt(i) instanceof ZMovieClip) {
                        const fmc: ZMovieClip = this.getChildAt(i) as ZMovieClip;
                        if (this.mcObj.frameTime != fmc.mcObj.frameTime) {
                            fmc.play();
                        }
                    }
                }


            }
        }

        public gotoAndStop(frame: number): void {
        this.stop();
        this.currFrame = frame - 1;
        this.parentPlayTime = 0;
        this.isPlay = true;
        this.advanceTime();
        this.isPlay = false;
    }
        public gotoAndPlay(frame: number): void {
        this.currFrame = frame - 1;
        this.parentPlayTime = 0;
        this.advanceTime();
        this.play();
    }

        public advanceTime(): void {
           const now: number = new Date().getTime();


           if (this.frameTime < now - this.parentPlayTime) {
                this.parentPlayTime = now;
                this.currFrame++;

                if (this.currFrame >= this.totalFrame || (-1 != this.endFrame && this.currFrame > this.endFrame)) {
                    if (!this.isLoop) {
                        this.currFrame -= 1;
                        this.stop();
                        this.frameComplete();
                        return;
                    }
                    this.frameComplete();
                    if (!this.isPlay) {
                        return;
                    }
                    this.currFrame = this.beginFrame;
                }
                let maskObj: any;
                const len: number = this.layerArr.length;
                for (let i: number = 0; i < len; i++) {
                    try {
                        const lObj: any = this.layerArr[i];
                        const frames: any[] = lObj.frames;
                        let cfo: any;
                        let img: ZImage = null;
                        let mc: ZMovieClip = null;
                        let li: LargeImage = null;
                        if (lObj.img instanceof ZImage) {
                            img = lObj.img as ZImage;
                        }
                        if (lObj.mc instanceof ZMovieClip) {
                            mc = lObj.mc as ZMovieClip;
                        }
                        if (lObj.li instanceof LargeImage) {
                            li = lObj.li as LargeImage;
                        }
                        try {
                            cfo = frames[this.currFrame];
                            if (this.parentCFOObj[i] == cfo || null == cfo) {


                                if (null != mc && null != mc.parent && this.mcObj.frameTime == mc.mcObj.frameTime) {
                                    mc.nextFrame();
                                }


                                continue;
                            }
                            this.parentCFOObj[i] = cfo;
                        } catch (err) {
                            if (null != img && this == img.parent) {
                                this.removeChild(img);
                            }
                            if (null != mc && null != mc.parent) {
                                mc.stop();
                                mc.parent.removeChild(mc);
                            }
                            if (null != li && this == li.parent) {
                                this.removeChild(li);
                            }
                            continue;
                        }
                        if (null == cfo.libName) {
                            if (null != img && this == img.parent) {
                                this.removeChild(img);
                            }

                            if (null != mc && null != mc.parent) {
                                mc.stop();
                                mc.parent.removeChild(mc);
                            }
                            if (null != li && this == li.parent) {
                                this.removeChild(li);
                            }
                        } else {
                            const t: egret.Texture = Util.getTextureByName(this.imgArr, cfo.libName);

                            if (null == t) {
                                let showDisplay: egret.DisplayObject;
                                if (null == this.libObj.mcObjs[cfo.libName]) {
                                   if (null == li) {
                                        li = new LargeImage(this.imgArr, this.libObj, cfo.libName);
                                        li.touchEnabled = false;
                                        lObj.li = li;
                                        li.imgDepth = i;
                                    } else {
                                        li.setObject(this.imgArr, this.libObj, cfo.libName);
                                    }
                                   showDisplay = li;

                                   li.matrix = cfo.matrix;
                                   if (null == li.parent) {
                                        this.addChildToDepth(li);
                                    }


                                   if (null != mc && this == mc.parent) {
                                        this.removeChild(mc);
                                        mc.visible = false;
                                    }

                                } else {
                                    if (null == mc) {
                                        mc = new ZMovieClip(this.imgArr, this.libObj, cfo.libName);
                                        mc.touchEnabled = false;
                                        lObj.mc = mc;
                                        mc.imgDepth = i;
                                    } else {
                                        if (cfo.libName != mc._mcName) {
                                            mc.setMovieObject(this.imgArr, this.libObj, cfo.libName);
                                        }
                                    }
                                    showDisplay = mc;


                                    if (null == mc.parent) {
                                            if (this.isPlay) {
                                                if (this.mcObj.frameTime == mc.mcObj.frameTime) {
                                                    mc.gotoAndStop(0);
                                                } else {
                                                    mc.gotoAndPlay(0);
                                                }
                                            } else {
                                                mc.gotoAndStop(0);
                                            }
                                            mc.setTimeScale(this._timeScale);
                                            this.addChildToDepth(mc);
                                        } else {
                                            if (this.mcObj.frameTime == mc.mcObj.frameTime) {
                                                mc.nextFrame();
                                            }
                                        }

                                    if (this == mc.parent) {
                                        mc.matrix = cfo.matrix;
                                    }

                                    if (null != li && this == li.parent) {
                                        this.removeChild(li);
                                    }

                                }

                                showDisplay.anchorOffsetX = cfo.cx;
                                showDisplay.anchorOffsetY = cfo.cy;
                                showDisplay.alpha = cfo.al;

                                if (null != img && this == img.parent) {
                                    this.removeChild(img);
                                }

                            } else {

                                if (null == img) {
                                    img = new ZImage(t);
                                    img.imgDepth = i;
                                    img.touchEnabled = false;
                                    lObj.img = img;
                                } else {
                                    img.setTexture(t);
                                }

                                if (null != this.libObj.imgScale && null != this.libObj.imgScale[cfo.libName]) {
                                    img.setScale(this.libObj.scale * this.libObj.imgScale[cfo.libName]);
                                } else {
                                    img.setScale(this.libObj.scale);
                                }


                                img.displayLibName = cfo.libName;

                                img.matrix = cfo.matrix;
                                img.anchorOffsetX = cfo.cx;
                                img.anchorOffsetY = cfo.cy;
                                img.alpha = cfo.al;

                                if (null == img.parent) {
                                    this.addChildToDepth(img);
                                }
                                if (null != mc && null != mc.parent) {
                                    mc.stop();
                                    mc.parent.removeChild(mc);
                                }
                                if (null != li && this == li.parent) {
                                    this.removeChild(li);
                                }

                            }

                        }

                        let d: egret.DisplayObject = null;
                        if (null != img && null != img.parent) {
                            d = img;
                        } else if (null != mc && null != mc.parent) {
                            d = mc;
                        } else if (null != li && null != li.parent) {
                            d = li;
                        }

                        if (null != d) {

                           /*var sp3d:ZSprite3D = l_obj.sp3d;

                            var obj3d:any = cfo.obj3d;
                            if(null != obj3d){
                                if(d.parent != sp3d){
                                    if(null == sp3d){
                                        sp3d = new ZSprite3D();
                                        l_obj.sp3d = sp3d;
                                    }
                                    sp3d.addIDisplay(<IDisplay><any> d);
                                    this.addChildToDepth(sp3d);
                                }

                                sp3d.pivotX = obj3d.cx;
                                sp3d.pivotY = obj3d.cy;

                                sp3d.x = obj3d.x;
                                sp3d.y = obj3d.y;
                                sp3d.scaleX = obj3d.scaleX;
                                sp3d.scaleY = obj3d.scaleY;
                                sp3d.scaleZ = obj3d.scaleZ;
                                sp3d.rotationX = obj3d.rotationX;
                                sp3d.rotationY = obj3d.rotationY;
                                sp3d.rotationZ = obj3d.rotationZ;

                            }else{
                                if(d.parent == sp3d){
                                    if(null != sp3d.parent){
                                        sp3d.parent.removeChild(sp3d);
                                    }
                                    this.addChildToDepth(<IDisplay><any> d);
                                }
                            }*/


                            if (null != cfo.maskID) {

                                if (null != maskObj && null != maskObj[cfo.maskID] && null == d.parent.mask) {
                                    const maskD: egret.DisplayObject = maskObj[cfo.maskID];
                                    const maskRect: egret.Rectangle = new egret.Rectangle(maskD.x, maskD.y, maskD.width, maskD.height);
                                    // d.mask = maskRect;
                                    d.parent.mask = maskRect;
                                }
                            } else if (null != cfo.id) {
                                if (null == maskObj) {
                                    maskObj = {};
                                }
                                maskObj[cfo.id] = d;
                                d.visible = false;
                            }


                            if (null != cfo.mcName) {
                                d.name = cfo.mcName;
                                this.dispatchEventWith(ZMovieClip.EVENT_MC_NAME, false, d);
                            }

                        }

                    } catch (err) {
                    }
                }
                if (null != this.fmObj) {
                    const mo: any = this.fmObj[this.currFrame];
                    if (null != mo) {
                        if (null == mo[this._scale]) {
                            mo[this._scale] = {};
                            mo[this._scale].x = mo.x * this._scale;
                            mo[this._scale].y = mo.y * this._scale;
                            mo[this._scale].moveType = mo.moveType;
                        }
                        this.dispatchEventWith(ZMovieClip.EVENT_MOVE, false, mo[this._scale]);
                    }
                }
                this.framePlay();


            }
        }

        private frameComplete(): void {
            this.dispatchEventWith(ZMovieClip.EVENT_FRAME_COMPLETE, false);
        }

        private framePlay(): void {
            if (null != this.areaObj) {
                this.currArea = this.areaObj[this.currFrame];
                if (null != this.currArea) {
                    this.dispatchEventWith(ZMovieClip.EVENT_AREA, false, this.currArea);
                }
            }
            this.dispatchEventWith(ZMovieClip.EVENT_ENTER_FRAME);
        }

        private addChildToDepth(id: any): void {
            const children: number = this.numChildren - 1;
            if (0 == children) {
                this.addChild(id);
                return;
            }
            for (let i: number = children; i >= 0; i--) {
                try {
                    const tId: any = this.getChildAt(i);
                    if (null != tId) {
                        if (tId.imgDepth < id.imgDepth) {
                            if (children == i) {
                                this.addChild(id);
                            } else {
                                this.addChildAt(id, i + 1);
                            }
                            return;
                        }
                    }
                } catch (err) {}
            }
            this.addChildAt(id, 0);
        }


    }
// tslint:disable-next-line: max-file-line-count
}
