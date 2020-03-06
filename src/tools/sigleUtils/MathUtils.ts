/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
class MathUtils extends BaseClass {
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    public getAngle(radian: number): number {
        return 180 * radian / Math.PI;
    }

//    /**
//     * 角度值转换为弧度制
//     * @param angle
//     */
//    public getRadian(angle:number):number {
//        return Math.PI = angle / 180 * Math.PI;
//    }

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        const xdis: number = p2X - p1X;
        const ydis: number = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        const disX: number = p2X - p1X;
        const disY: number = p2Y - p1Y;
        const disQ: number = disX * disX + disY * disY;
        return Math.sqrt(disQ);


    }

    /**
     * 求组合C(n,m)
     * @param   n   集合元素个数
     * @param   m   取出元素个数
     * @param   callback    运行中的回调
     * @param   end         运行结束后的回调
     */
    public Combination(n: number, m: number, callback: Handler, end: Handler): void {
        const result: number[] = new Array<number>();
        for ( let i = 0; i < n; ++i) {
            result[0] = i;
            if (!this.doCombination(n, m, i, 1, result, callback)) {
                end.execute();
                return;
            }
        }

        end.execute();
        return;
    }

    public doCombination(n: number, m: number, i: number, rlen: number, result: number[], callback: Handler): boolean {
        if (rlen == m ) {
            callback.executeWith([result, rlen]);
            return true;
        }

        for ( let j = ++i; j < n; ++j) {
            result[rlen] = j;
            if (!this.doCombination(n, m, j, rlen + 1, result, callback)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 求集合笛卡尔积
     * @param   sets    包含集合元素个数的数组
     */
    public cartesian(sets: number[], callback: Handler, end: Handler): void {
        const result: number[] = new Array<number>(sets.length);
        this.doCartesian(sets, 0, result, callback);

        end.execute();
    }

    public doCartesian(sets: number[], i: number, result: number[], callback: Handler): boolean {
        for (let j = 0; j < sets[i]; ++j) {
            result[i] = j;
            if ( i == sets.length - 1) {
                callback.executeWith([result, result.length]);
            } else {
                if (! this.doCartesian(sets, i + 1, result, callback)) {
                    return false;
                }
            }
        }
        return true;
    }

    // 得到指定数的位数
    public getNumberDigit(num: number): number {
        let n: number = 1;
        let m: number = Math.floor(num / 10);

        while (m > 0) {
            n++;
            m = Math.floor(m / 10);
        }

        return n;
    }

    // 计算阶乘
    public calNumberJieCheng(num: number): number {
        if (num < 1) {
            return 0;
        }

        let n: number = 1;
        for (let i: number = 1; i <= num; i++) {
            n = Math.floor(n * i);
        }

        return n;
    }
}
