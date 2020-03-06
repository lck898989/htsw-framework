/**
 * Created by yangsong on 2014/11/23.
 */
class RandomUtils extends BaseClass {
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public limit($from: number, $end: number): number {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        const range: number = $end - $from;
        return $from + Math.random() * range;
    }

    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public limitInteger($from: number, $end: number): number {
        return Math.round(this.limit($from, $end));
    }

    /**
     * 获取一个变分比是否成功
     * @param per   百分比 比如30% 给30
     */
    public randPercent(per: number): boolean {
        const r = this.limitInteger(1, 100);
        if ( r <= per) {
            return true;
        }

        return false;
    }


    /**
     * 获取一个万分比是否成功
     * @param rand  万分比的数
     */
    public rand10000(rand: number): boolean {
        const r = this.limitInteger(1, 10000);
        if ( r <= rand) {
            return true;
        }

        return false;
    }

     /**
     * 获取一个千分比是否成功
     * @param rand  万分比的数
     */
    public rand1000(rand: number): boolean {
        const r = this.limitInteger(1, 1000);
        if (r <= rand) {
            return true;
        }

        return false;
    }

    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    public randomArray(arr: any[]): any {
        const index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    // 获取指定区间范围随机数，包括lowerValue和upperValue
    public randomFrom(lowerValue, upperValue): number {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }
}
