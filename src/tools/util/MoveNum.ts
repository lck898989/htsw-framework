class MoveNum {
    /** 变化前的数字 */
    public _oldValue: number;
    /** 变化后的数字 */
    public _cValue: number;
    /** 增加或减少的数字 */
    public _addVelue: number;
    /** 是增加还是减少 */
    public _bAdd: boolean;

    /** 变化的时间 */
    public _ctime: number;
    /** 缓动的事件 */
    public _endTime: number;
    /** 变化的label */
    public _label: eui.Label;
    constructor() {
        this._oldValue = 0;
        this._cValue = 0;
        this._bAdd = false;
        this._ctime = 0;
        this._endTime = 0;
        this._label = null;
        this._addVelue = 0;
    }

    public play(label: eui.Label, num: number, time: number): void {
        this._label = label;
        this._cValue = num;
        this._endTime = time;
        this._oldValue = Number(this._label.text);

        this._bAdd = true;

        if (this._cValue < this._oldValue) {
            this._bAdd = false;
            this._addVelue = this._oldValue - this._cValue;
        } else {
            this._addVelue = this._cValue - this._oldValue;
        }
        this._ctime = egret.getTimer();
        // egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }

    public stop(): void {
        // egret.Ticker.getInstance().unregister(this.onEnterFrame,this);
        this._label.text = String(this._cValue);
    }

    private onEnterFrame(advancedTime: number): void {
        let t: number = egret.getTimer();
        t = t - this._ctime;
        if (t > this._endTime) {
            t = this._endTime;
        }

        const c: number = Math.ceil(t * this._addVelue / this._endTime);
        if (this._bAdd) {
            this._label.text = String(this._oldValue + c);
        } else {
            this._label.text = String(this._oldValue - c);
        }

        if (t == this._endTime) {
            // egret.Ticker.getInstance().unregister(this.onEnterFrame,this);
            LN.getInstance().deleteMoveNum(this);
        }
    }

}

