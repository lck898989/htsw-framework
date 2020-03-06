/** 大数类 */
class BigNum {

    /** e前面的数 */
    public _n: number;
    /** e后面的数 */
    public _e: number;
    public constructor(num: any) {
        this.setNum(num);
    }

    /** 设置大数类 */
    public setNum(num: any): void {
        this._n = 0;
        this._e = 0;
        if ("string" == typeof(num)) {
            num = num.replace(/exp/g, "e");
            const arr: any[] = String(num).split("e");  // 分解
            if (arr.length == 1) {
                this._n = Number(arr[0]);
                if (isNaN(this._n)) {
                    this._n = 0;
                }
            } else {
                if (arr.length >= 2) {
                    this._n = Number(arr[0]);
                    this._e = Number(arr[1]);
                    if (isNaN(this._n)) {
                       this._n = 0;
                    }

                    if (isNaN(this._e) ) {
                       this._e = 0;
                    }
                }
            }
        } else if ("number" == typeof num) {
            this._n = num;
        } else if (num instanceof BigNum) {
            this._n = num._n;
            this._e = num._e;
        }

        // 重新组织数据
        this.format();
    }

    /** 重新组织数据，比如将10e2改成1.0e3 */
    public format(): void {
        if ( 0 == this._n) {
            this._e = 0;
            return;
        }

        let b = false;   // 是否负数
        if (this._n < 0) {
            this._n = -this._n;  // 将负数转成正数
            b = true;
        }

        if (this._n >= 10) {
            const add: number = Math.floor(this.log10(this._n));
            this._e += add;
            this._n /= Math.pow(10, add);
        }

        // 数是小数
        if (this._n < 1) {
            const n: number = -Math.ceil(-this.log10(this._n));
            this._e += n;
            this._n *= Math.pow(10, -n);
        }

        if (b) {   // 将负数置回去
           this._n = -this._n;
        }
    }

    /** 大数的对数运算 */
    public log10(num: number): number {
        if ( 0 > num) {   // 必须是大于0的数
             return;
        }

        return Math.log(num) * Math.LOG10E;
    }

    /** 转成字符串 */
    public toString(): string {
        this.format();
        return this._n + "e" + this._e;
    }

}
