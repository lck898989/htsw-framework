/**
 * 基类
 */
class BaseClass {

    /**
     * 获取一个单例
     * @returns {any}
     */
    public static getInstance(...args: any[]): any {
        const classZ: any = this;
        if (!classZ._instance) {
            const argsLen: number = args.length;
            if (argsLen === 0) {
                classZ._instance = new classZ();
            } else if (argsLen === 1) {
                classZ._instance = new classZ(args[0]);
            } else if (argsLen === 2) {
                classZ._instance = new classZ(args[0], args[1]);
            } else if (argsLen === 3) {
                classZ._instance = new classZ(args[0], args[1], args[2]);
            } else if (argsLen === 4) {
                classZ._instance = new classZ(args[0], args[1], args[2], args[3]);
            } else if (argsLen === 5) {
                classZ._instance = new classZ(args[0], args[1], args[2], args[3], args[4]);
            }
        }
        return classZ._instance;
    }
    public constructor() {

    }
}
