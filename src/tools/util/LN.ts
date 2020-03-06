/**
 * 缓动eui.label 的数字
 * @author
 *
 */
class LN {

    public static getInstance(): LN {
        if (LN.instance == null) {
            LN.instance = new LN();
        }
        return LN.instance;
    }

    private static instance: LN;

    public _hash: HashMap;
    public constructor() {
        this._hash = new HashMap();
    }


    /** 缓动数字的变化
	 * @param label 缓动的label
	 * @param num   变化后的数字
	 * @param time  缓动的时间，默认2秒
	 */
    public playNum(label: eui.Label, num: number, time: number = 1000): void {
        let m: MoveNum = this._hash.getValue(label);
        if (m == null) {
            m = new MoveNum();
            this._hash.put(label, m);
            m.play(label, num, time);
        } else {
            m.stop();
            m.play(label, num, time);
        }
    }

    public deleteMoveNum(m: MoveNum): void {
        this._hash.remove(m._label);
        m = null;
    }

    /** 创建图形数字 */
    public addPicNum(g: eui.Group, num: number, gray: boolean = false): void {
        const str: string = String(num);
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            const img: eui.Image = new eui.Image ();
            let key: string = "font_num" + char + "_png";
            if ( gray) {
                key = "font_numh" + char + "_png";
            }
            img.source = RES.getRes(key);
            img.x = i * 20;
            g.addChild(img);
        }
    }

    /** 根据name和num得到zmovie **/
    public getMovieClip(moveName: string, num: number): zmovie.ZMovieClip {
        const arr: string[] = new Array<string>();
        for (let i = 0; i < num; i++) {
            const s: string = moveName + "_" + i + "_json";
            arr.push(s);

        }
        const res: string = moveName + "_json";
        const z: zmovie.ZMovieClip = new zmovie.ZMovieClip(arr, RES.getRes(res));

        return z;
    }

     /** 博放技能状态的动画(循环播放，最后要调用stopZmove停止 )
     * @param key       动画名称
     * @param num       动画图片数量
     * @param x
     * @param y
     */
    public playZmoveLoop(key: string, num: number, x: number, y: number, scale: number = 1): zmovie.ZMovieClip {
        const z: zmovie.ZMovieClip = this.getMovieClip(key, num);
        z.x = x;
        z.y = y;
        z.isLoop = true;

        z.scaleX = scale;
        z.scaleY = scale;

        GameLayerManager.gameLayer().effectLayer.addChild(z);
        z.gotoAndPlayLabel("1");

        return z;
    }

     /** 停止播放动画
     */
    public stopZmove(z: zmovie.ZMovieClip): void {
        if (GameLayerManager.gameLayer().effectLayer.contains(z)) {
            GameLayerManager.gameLayer().effectLayer.removeChild(z);
        }

        z.stop();
        z = null;
    }

    /** 博放技能状态的动画
     * @param key       动画名称
     * @param num       动画图片数量
     * @param x
     * @param y
     * @param hander    动画播放完后的回调函数
     */
    public playZmove(key: string, num: number, x: number, y: number, hander: Handler = null, scale: number = 1, stopName: string = "1"): void {
        const z: zmovie.ZMovieClip = this.getMovieClip(key, num);
        z.endHander = hander;
        z.x = x;
        z.y = y;
        z.isLoop = false;
        z.scaleX = scale;
        z.scaleY = scale;

        GameLayerManager.gameLayer().effectLayer.addChild(z);
        z.addEventListener(zmovie.ZMovieClip.EVENT_FRAME_COMPLETE, this.endZmove, this);
        z.gotoAndPlayLabel(stopName);
    }

    /** 飞文字的函数 可以有多排文字 用数组给进 可以是html */
    public flyText(str: any[], cor: any[]= null, p: egret.Point = null): void {
        // var g:eui.Group = new eui.Group();
        // g.width = 400;
        // var max = str.length;
        // for( var i=0; i<max; i++)
        // {
        //     var lab:FlyLab = new FlyLab();
        //     lab.y = i * 32;
        //     g.addChild(lab);
        //     if(cor != null )
        //        lab.init(str[i], cor[i]);
        //     else
        //        lab.init(str[i]);
        // }

        // g.x = GM.gamec.curWidth() / 2;
        // g.y = GM.gamec.curHeight() / 2;

        // g.height = max * 32;

        // if( p)
        //    g.name = String(p.x + "#" + p.y);
        // else
        //    g.name = "0"

        // g.addEventListener(egret.Event.RESIZE,this.hSize,this);

        // if(!GameLayerManager.gameLayer().effectLayer.contains(g))
        //     GameLayerManager.gameLayer().effectLayer.addChild(g);


    }

    /** 将妖侠增加的攻击 生命  物防 法防 生成字符串 并放入数组 */
    public getHeroAddInfoArray(arr: any[], atk: number, hp: number, def: number, m: number): void {

        let one: string = "<font color='#9bff37'> 攻击 + " + atk  + "< /font>";
        if (atk < 0 ) {
            one = "<font color='#ca2600'> 攻击 - " + Math.abs(atk) + "< /font>";
        }

        let two: string = "<font color='#9bff37'> 生命 + " + hp + "< /font>";
        if (hp < 0 ) {
            two = "<font color='#ca2600'> 生命 - " + Math.abs(hp) + "< /font>";
        }

        let three: string = "<font color='#9bff37'> 物防 + " + def + "< /font>";
        if ( def < 0) {
            three = "<font color='#ca2600'> 物防 - " + Math.abs(def) + "< /font>";
        }

        let four: string = "<font color='#9bff37'> 法防 + " + m + "< /font>";
        if (m < 0) {
            four = "<font color='#ca2600'> 法防 - " + Math.abs(m) + "< /font>";
        }

        if (atk != 0 ) {
             arr.push(one);
        }

        if (hp != 0 ) {
            arr.push(two);
        }

        if (def != 0) {
            arr.push(three);
        }

        if (m != 0) {
            arr.push(four);
        }

    }


    private endZmove(e: egret.Event): void {
        let z: zmovie.ZMovieClip =  e.target as zmovie.ZMovieClip;
        z.stop();
        z.removeEventListener(zmovie.ZMovieClip.EVENT_FRAME_COMPLETE, this.endZmove, this);
        if (GameLayerManager.gameLayer().effectLayer.contains(z)) {
              GameLayerManager.gameLayer().effectLayer.removeChild(z);
        }

        if (z.endHander) {
           z.endHander.execute();
        }

        z = null;
    }

    private hSize(e: egret.Event): void {
       const g: eui.Group = e.target;
       g.removeEventListener(egret.Event.RESIZE, this.hSize, this);
       g.anchorOffsetX = g.width * 0.5;
       g.anchorOffsetY = g.height * 0.5;
       g.scaleX = 0;
       g.scaleY = 0;
       egret.Tween.get(g).to({ scaleX: 1.2, scaleY: 1.2 }, 500).call(this.flyOne, this, [g]);
    }

    private flyOne(g: eui.Group): void {
        egret.Tween.get(g).to({ scaleX: 1, scaleY: 1 }, 200).call(this.flyTwo, this, [g]);
    }

    private flyTwo(g: eui.Group): void {
        if (g.name == "0") {
             egret.Tween.get(g).wait(1000).to({y: g.y - 200, alpha: 0}, 1000).call(this.flyEnd, this, [g]);
        } else {
            const s: string = g.name;
            const arr: any[] = s.split("#");
            egret.Tween.get(g).wait(1000).to({ x: Number(arr[0]), y: Number(arr[1]), scaleX: 0, scaleY: 0}, 500).call(this.flyEnd, this, [g]);
        }
    }

    private flyEnd(g: eui.Group): void {
        if (GameLayerManager.gameLayer().effectLayer.contains(g)) {
            GameLayerManager.gameLayer().effectLayer.removeChild(g);
        }
    }
}

