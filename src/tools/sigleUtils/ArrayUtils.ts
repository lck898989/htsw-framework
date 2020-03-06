/**
 * Created by egret on 15-8-7.
 */
class ArrayUtils extends BaseClass {
    /**
     * 遍历操作
     * @param arr
     * @param func
     */
    public forEach(arr: any[], func: Function, funcObj: any): void {
        for (let i: number = 0, len: number = arr.length; i < len; i++) {
            func.apply(funcObj, [arr[i]]);
        }

    }


    /** 累加操作 */
    public addToltal(arr: any[]): number {
        const max = arr.length;
        let total: number = 0;
        for ( let i = 0; i < max; i++) {
            total += Number(arr[i]);
        }

        return total;
    }

    /** 找出数组中的最小数 */
    public findMin(arr: any[]): number {
        if (arr.length === 0) {
            return 0;
        }
        let m: number = Number(arr[0]);
        const max = arr.length;
        for (let i = 0; i < max; i++) {
            const a = Number(arr[i]);
            if (a < m) {
                m = a;
            }
        }

        return m;
    }

    /** 找出数组中的最大数 */
    public findMax(arr: any[]): number {
        let m: number = Number(arr[0]);
        const max = arr.length;
        for (let i = 0; i < max; i++) {
            const a = Number(arr[i]);
            if (a > m) {
                m = a;
            }
        }

        return m;
    }

     /** 看数组中有没有需要查找的数   */
    public findForm(arr: number[], a: number): boolean {
        const max = arr.length;
        for ( let i = 0; i < max; i++) {
            if (arr[i] === a) {
                return true;
            }
        }

        return false;
    }
}
