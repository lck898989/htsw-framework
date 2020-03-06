/** 大数计算类 */
class BigMath {

    /** 得到大数string */
    public static toString(a: any): string {
        return new BigNum(a).toString();
    }

    /** 加 */
    public static add(a: any, b: any): string {
        const n: BigNum = new BigNum(a);
        const s: BigNum = new BigNum(b);
        const back: BigNum = new BigNum(0);

        const r: number = this.alignExp(n, s);

        if (0 == r) {
            back._n = n._n + s._n;
            back._e = n._e;
            return back.toString();
        } else if ( -1 == r) {
            return s.toString();
        }

        return n.toString();
    }

    /** 减 */
    public static sub(a: any, b: any): string {
        const n: BigNum = new BigNum(a);
        const s: BigNum = new BigNum(b);
        const back: BigNum = new BigNum(0);

        const r: number = this.alignExp(n, s);

        if (0 == r) {
            back._n = n._n - s._n;
            back._e = n._e;
            return back.toString();
        } else if ( -1 == r) {
            s._n = -s._n;
            return s.toString();
        }

        return n.toString();
    }

    /** 乘 */
    public static mul(a: any, b: any): string {
        const n: BigNum = new BigNum(a);
        const s: BigNum = new BigNum(b);
        const back: BigNum = new BigNum(0);

        back._n = n._n * s._n;
        back._e = n._e + s._e;
        return back.toString();
    }

    /** 除 */
    public static div(a: any, b: any): string {
        const n: BigNum = new BigNum(a);
        const s: BigNum = new BigNum(b);
        const back: BigNum = new BigNum(0);

        back._n = n._n / s._n;
        back._e = n._e - s._e;

        return back.toString();
    }

    /** 平方根 */
    public static sqrt(e: any): string {
        const i: BigNum = new BigNum(e);

        if (i._n < 0 ) {   // 负数不能开根号
           return "";
        }

        if (i._e % 2 == 1) {
            i._n *= 10;
            i._e--;
        }

        i._n = Math.sqrt(i._n);
        i._e = i._e / 2;

        return i.toString();
    }

    /** 返回基数（base）的指数（exponent）次幂 */
    public static pow(e: any, i: number): string {
        if ( 0 > i) {
            return "";
        }

        if ( e == 0) {
           return new BigNum(0).toString();
        }
        if (1 == e) {
           return new BigNum(1).toString();
        }
        if ( 0 == i) {
           return new BigNum(1).toString();
        }

        let n;
        let s;
        let a = new BigNum(e).toString();
        let r = "1";
        for ( n = 2 * i, s = 2; Math.round(n) < 1 || Math.abs(Math.round(n) / s - i) > 1e-5;) {
             n *= 2, s *= 2;
        }

        for (n = Math.round(n); 0 != n;) {
            if (n % 2 == 1) {
                r = this.mul(r, a);
            }

            n = Math.floor(n / 2);
            a = this.mul(a, a);
        }

        for (; s > 1;) {
            s /= 2;
            r = this.sqrt(r);
        }

        return r;
    }

    /** 比较大小 e > i true*/
    public static greater(e: any, i: any): boolean {
        const n: BigNum = new BigNum(e);
        const s: BigNum = new BigNum(i);

        if (n._n < 0) {
            if (s._n < 0) {
                if (n._e < s._e ) {
                   return true;
                }

                if (n._e == s._e && n._n < s._n) {
                   return true;
                }

            }
        } else if ( n._n == 0 ) {
            if (s._n < 0) {
               return true;
            }
        } else if (n._n > 0) {
            if (s._n <= 0 ) {
               return true;
            }
            if (n._e > s._e) {
               return true;
            }
            if (n._e == s._e && n._n > s._n) {
               return true;
            }
        }

        return false;
    }

    /** 大于等于 */
    public static greaterOrEqual(e: any, i: any): boolean {
        return false == this.less(e, i);
    }

    /** 小于 */
    public static less(e: any, i: any): boolean {
        const n: BigNum = new BigNum(e);
        const s: BigNum = new BigNum(i);
        if (n._n < 0) {
            if (s._n >= 0 ) {
               return true;
            }
            if (n._e > s._e) {
               return true;
            }
            if (n._e == s._e && n._n > s._n) {
               return true;
            }
        } else if ( 0 == n._n) {
            if (s._n > 0) {
              return true;
            }
        } else if ( n._n > 0 && s._n > 0 ) {
            if (n._e < s._e) {
               return true;
            }

            if (n._e == s._e && n._n < s._n) {
              return true;
            }
        }

        return false;
    }

    /** 小于等于 */
    public static lessOrEqual(e: any, i: any): boolean {
        return false == this.greater(e, i);
    }

    /** 等于 */
    public static equal(e: any, i: any): boolean {
        const n: BigNum = new BigNum(e);
        const s: BigNum = new BigNum(i);

        return n._e == s._e && n._n == s._n ? true : false;
    }

    /** 取小 */
    public static min(e: any, i: any): string {
        const n: BigNum = new BigNum(e);
        const s: BigNum = new BigNum(i);

        return this.less(n, s) ? n.toString() : s.toString();
    }

    /** 取大 */
    public static max(e: any, i: any): string {
        const n: BigNum = new BigNum(e);
        const s: BigNum = new BigNum(i);

        return this.greater(n, s) ? n.toString() : s.toString();
    }

    /** 取中间数 */
    public static clamp(e: any, i: any, n: any): string {
        const s: BigNum = new BigNum(e);
        const a: BigNum = new BigNum(i);
        const r: BigNum = new BigNum(n);

        return this.min(this.max(s, a), r);
    }

    /** 转换成number */
    public static parseNumber(e: any): number {
        const i: BigNum = new BigNum(e);
        return i._n * Math.pow(10, i._e);
    }

    /** 向下取整 */
    public static floor(e: any): string {
        const i: BigNum = new BigNum(e);
        if (i._e < 0) {
            i._n = 0;
            i._e = 0;
            return i.toString();
        }
        if (i._e > 200) {
           return i.toString();
        }

        for (; Math.floor(i._n) != i._n && i._e > 0;) {
            i._n *= 10;
            i._e--;
        }


        i._n = Math.floor(i._n);
        i.format();
        return i.toString();
    }


    /** 对齐e */
    public static alignExp(t: BigNum, e: BigNum): number {
        const i: number = Math.abs(t._e - e._e);
        if (t._e < e._e) {
            if ( i > 100) {
               return -1;
            }

            e._n *= Math.pow(10, i);
            e._e -= i;
        }

        if (t._e > e._e) {
            if (i > 100) {
               return 1;
            }

            t._n *= Math.pow(10, i);
            t._e -= i;
        }

        return 0;
    }

    public constructor() {
    }

}
