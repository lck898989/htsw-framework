
/** 将大数(BigNum),表示为数+英文符号 */
class UnitUtil {

    public static getInstance(): UnitUtil {
        if (UnitUtil.instance == null) {
            UnitUtil.instance = new UnitUtil();
        }
        return UnitUtil.instance;
    }


    private static instance: UnitUtil;

    /** 用来表示单位的数字 */
    public _tag: string[] = ["K", "M", "B", "t", "q", "Q", "s", "S", "o", "n", "d", "U", "D", "T", "Qt", "Qd", "Sd", "St", "O", "N", "v", "c"];
    // _tag:Array<string> = ["千", "百万", "十亿", "兆", "千兆", "百京", "十垓", "秭", "千秭", "百穰", "十穰", "沟", "千沟", "百涧", "十正", "载", "千载", "百极", "O", "N", "v", "c"];
    public _low: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    public _cap: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    /** 所有数字的下标组合 */
    public unitKey: string[];
    public _r: number[];
    public constructor() {

        this.unitKey = this._tag.slice(0);
        this.comArray(this._tag, this._low);
        this.comArray(this._tag, this._cap);
        this._r = [];
        const max: number = this.unitKey.length;
        for (let i = 0; i < max; i++) {
            this._r.push(3 * (i + 1));
        }

    }

    /** 向上去整 */
    public easyNumberCeil(e: any): string {
        if (!e && e != 0) {
          return "-";
        }

        const i = new BigNum(e);
        if (i._e < 3) {
            const n: number = i._n * Math.pow(10, i._e);

            return Math.ceil(n).toString();

        }

        const max = this.unitKey.length;
        for (let k = 0; k < max; k++) {
            const a = i._e - this._r[k];
            if ( 3 > a) {
                let n = i._n * Math.pow(10, a);
                if (0 == a) {
                    n = Math.floor(100 * n) / 100;
                    return n + this.unitKey[k];
                } else if ( 1 == a) {
                    n = Math.floor(10 * n) / 10;
                    return parseFloat(n.toFixed(1)) + this.unitKey[k];
                } else {
                    n = Math.floor(n);
                    return parseFloat(n.toFixed(0)) + this.unitKey[k];

                }
            }
        }

        return i.toString() + this.unitKey[this.unitKey.length - 1];
    }

    /** 数 */
    public easyNumber(e: any): string {
        if (!e && e != 0) {
           return;
        }

        const i = new BigNum(e);
        if (i._e < 3) {
            const n: number = i._n * Math.pow(10, i._e);

            return Math.round(n).toString();
        }

        const max = this.unitKey.length;
        for (let k = 0; k < max; k++) {
            const a = i._e - this._r[k];
            if ( 3 > a) {
                let n = i._n * Math.pow(10, a);
                if (0 == a) {
                    n = Math.floor(100 * n) / 100;
                    return n + this.unitKey[k];
                } else if ( 1 == a) {
                    n = Math.floor(10 * n) / 10;
                    return parseFloat(n.toFixed(1)) + this.unitKey[k];
                } else {
                    n = Math.floor(n);
                    return parseFloat(n.toFixed(0)) + this.unitKey[k];

                }
            }
        }

    }

    /** 得到大数登机 */
    public getUnitLevel(e: any): string {
        if (!e && e != 0) {
           return "-";
        }

        const i = new BigNum(e);
        if (i._e < 3) {
           return "";
        }

        for (let n = 0; n < this.unitKey.length; n++) {
            const s = i._e - this._r[n];
            if ( 3 > s ) {
                return this.unitKey[n];
            }
        }
    }

    /** 组合数组,并把值放入unitkey */
    private comArray(res: string[], des: string[]): void {
        const max: number = res.length;
        for (let i = 0; i < max; i++) {
            const s: string = res[i];
            for (const iterator of des) {
                this.unitKey.push(s + iterator);
            }
        }
    }
}
