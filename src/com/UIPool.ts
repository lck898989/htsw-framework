/*
  *   UI管理池
 */
class UIPool {

    public static getInstance(): UIPool {
        if (!UIPool.instance) {
            UIPool.instance = new UIPool();
        }
        return UIPool.instance;
    }

    private static instance: UIPool;
    private _pool: HashMap = new HashMap();

    constructor() {
       egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }

    public msgDO(msgtype: number, obj: Object): void {
        const list: any[] = this._pool.values();

        for (let i = 0, length = list.length; i < length; i++) {
            const gameObject: UIObject = list[i];
            if (gameObject.parent) {
                gameObject.msgDo(msgtype, obj);
            }
        }
    }

    /** 处理动作消息 */
    public execMessage(data: any): void {

        const list: any[] = this._pool.values();

        for (let i = 0, length = list.length; i < length; i++) {
            const gameObject: UIObject = list[i];
            if (gameObject.parent) {
                gameObject.execMessage(data);
            }
        }
    }


    public createObject(classFactory: any): any {
        let result;
        const key = classFactory.key;

        result = this._pool.getValue(key);
        if (!result) {
            result = new classFactory();
            this._pool.put(key, result);
            result.onCreateChildren();
        }

        result.keyName = key;
        result.onCreate();

        return result;
    }

    /* 根据key 找到GameObject **/
    public getObject(key: string): UIObject {
        return this._pool.getValue(key);
    }

    public destroyObject(obj: UIObject) {
        obj.onDestroy();
    }

    private onEnterFrame(advancedTime: number): void {
        const list: any[] = this._pool.values();
        for (let i = 0, length = list.length; i < length; i++) {
            const obj: UIObject = list[i];
            if (!obj.parent) {
                obj.onEnterFrame(advancedTime);
            }
        }
    }
}
