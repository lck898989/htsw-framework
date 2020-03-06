/**
 *  游戏中json数据的管理类
 *  主要功能
 *  管理所有游戏中所有需要特殊处理的json文件
 */
class JsonManager {
    private _jsonArry: any[] = [            // 填写格式, 类名,resource.json中的name
        { DicServerInfo, name: "serverInfo_json"},
    ];

    private realClass: Object;
    private realName: Object;

    private _closeHander: Handler;
    private _proHander: Handler;

    constructor() {
        this.realClass = new Object();
        this.realName = new Object();

        this._closeHander = null;
        this._proHander = null;

    }

    public getClass(key: string): any {
        return this.realClass[key];
    }

    public init(): void {
        this.makeClass();
    }

    public loadJson(group: string, endHander: Handler = null, proHander: Handler = null) {
        this._closeHander = endHander;
        this._proHander = proHander;

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        RES.loadGroup(group);
    }

    private makeClass(): void {
        const self: JsonManager = this;
        const max: number = self._jsonArry.length;
        for (let i: number = 0; i < max; i++) {
            const obj: Object = self._jsonArry[i];
            for (const j in obj) {
                const key: string = obj["name"];
                if (String(j) !== "name") {
                    const cl = new obj[j]();
                    cl.constructor.apply(cl);

                    self.realClass[j] = cl;
                    self.realName[key] = j;

                }
            }

        }
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        this.clearResLoad();
        const name: string = event.groupName;
        const res: RES.ResourceItem[] = RES.getGroupByName(name);
        const max: number = res.length;
        for (let i: number = 0; i < max; i++) {
            const item: RES.ResourceItem = res[i];
            const cl: Object = this.getClass(this.realName[item.data["name"]]);
            const read: IReadJson =  cl as IReadJson;
            if (read) {
                read.initFromJson(item.data["name"]);
            }
        }

        if (this._closeHander) {
            this._closeHander.executeWith([name]);
        }

    }
    private onResourceLoadError(event: RES.ResourceEvent): void {
        Log.trace("debug", event);
        Log.trace("debug", "json文件加载失败 = " + event.groupName);
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        if (this._proHander) {
            this._proHander.executeWith([event.itemsLoaded, event.itemsTotal]);
        }

    }

    /*
     *  清除资源的监听
    */
    private clearResLoad(): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    }
}
