
/** 游戏中的回调类
 *  主要功能
 *  处理游戏中的回调
 */

class Handler {
    /** 处理方法 **/
    public method: Function;
    /** 参数 **/
    public args: any[];

    public thisArg: any;

    constructor(thisArg: any = null, method: Function = null, args: any[] = null) {
        this.thisArg = thisArg;
        this.method = method;
        this.args = args;
    }

    /** 执行处理 **/
    public execute(): void {
        if (this.method != null) {
            this.method.apply(this.thisArg, this.args);
        }
    }

    /** 执行处理（增加参数的输出) */
    public executeWith(data: any[]): void {
        if (data == null) {
            return this.execute();
        } else {
            if (this.method != null) {
                this.method.apply(this.thisArg, this.args ? this.args.concat(data) : data);
            }
        }
    }

}
window["Handler"] = Handler;
