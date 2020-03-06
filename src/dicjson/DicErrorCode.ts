/*
 *
 * @author
 * 错误码
 */
class DicErrorCode implements IReadJson {
    public objErrorMsg: Object;

    public constructor() {
    }

    /*
    * 初始化json
    */
    public initFromJson(name: string): void {
        this.objErrorMsg = RES.getRes(name);
    }

    /*
    *  根据id 返回 Desc
    */
    public getDesc( id: number): string {
        const errMsg: string = this.objErrorMsg[id];
        if ( errMsg ) {
            return errMsg;
        }
        return "不存在的错误号";
    }

}
