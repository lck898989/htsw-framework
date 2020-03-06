/**
 * Created by yangsong on 14/12/18.
 * 字符串操作工具类
 */
class StringUtils extends BaseClass {
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    public trimSpace(str: string): string {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, "$1");
    }

    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    public getStringLength(str: string): number {
        const strArr = str.split("");
        let length = 0;
        for (const iterator of strArr) {
            if (this.isChinese(iterator)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }

    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    public isChinese(str: string): boolean {
        const reg = /^[u4E00-u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    }

    /**  将字符串的后两位组成数字 */
    public makeStrToNumer(str: string): number {
        if (str.length < 2) {
            return 0;
        }

        const b: string = str.charAt(str.length - 2);
        const g: string = str.charAt(str.length - 1);

        const bn: number = Number(b);
        const gn: number = Number(g);

        return bn * 10 + gn;
    }
}
