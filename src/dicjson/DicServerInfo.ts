/*
 *
 * @author
 * 服务器信息json表
 */
class DicServerInfo implements IReadJson {
    public serverUrl: string = "";
    /** 是否使用https */
    public usehttps: number = 0;

    constructor() {
    }

    /**
     * 初始化json
     */
    public initFromJson(name: string): void {
        const js: Object = RES.getRes(name);
        BaseFunc.objToClass(js, this);
    }
}
