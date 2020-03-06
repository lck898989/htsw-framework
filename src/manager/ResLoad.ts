/**
 * 资源加载类 对egret.RES的进一步封装
 */
class ResLoad {

    public static getInstance(): ResLoad {
        if (!ResLoad.instance) {
            ResLoad.instance = new ResLoad();
        }
        return ResLoad.instance;
    }

    private static instance: ResLoad;

    private _progressHander: Handler; // 进度的回调
    private _callBackMap: any; // 下载完成后的回调存储
    private _callBackQueue: any; // 下完完成后的回调队列

    constructor() {
        this._progressHander = null;
        this._callBackMap = {};
        this._callBackQueue = [];
    }

    /**
     * 加载场景资源 并行下载 下载完立即执行
     * @param group 资源组名称
     * @param end   结束后回调
     * @param pro   进行中回调
     */
    public LoadRes(group: string, complete: Handler = null, progress: Handler = null): void {

        Log.trace("debug", "加载的资源组: " + group);

        if (group === "") {
            Log.trace("error", "加载的资源组名称为空");
            return;
        }

        // 已有不再加载
        if (RES.isGroupLoaded(group)) {
            Log.trace("debug", "资源组: " + group + "已加载过");
            if (complete) {
                complete.executeWith([group]);
            }
            return;
        }

        const list = this._callBackMap[group];
        if (list) {
            list.push(complete);
            return;
        }

        this._callBackMap[group] = [complete];

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        RES.loadGroup(group);
    }

    /**
     * 加载场景资源 并行下载 按队列执行
     * @param group 资源组名称
     * @param end   结束后回调
     * @param pro   进行中回调
     */
    public LoadResByQueue(group: string, complete: Handler = null, progress: Handler = null): void {

        Log.trace("debug", "加载的资源组: " + group);

        if (group === "") {
            Log.trace("error", "加载的资源组名称为空");
            return;
        }

        // 已有不再加载
        if (RES.isGroupLoaded(group)) {
            Log.trace("debug", "资源组: " + group + "已加载过");
            if (complete) {
                complete.executeWith([group]);
            }
            return;
        }

        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent("show_wait"));

        const qLength = this._callBackQueue.length;

        this._callBackQueue[qLength] = {name: group, handler: complete, done: false, loaded: false};

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        RES.loadGroup(group);
    }

    private executeQueue(_name): void {
        const qLength = this._callBackQueue.length;
        for (let q = 0; q < qLength; q++) {
            const _callBack = this._callBackQueue[q];
            if (_callBack) {
                if (!_callBack.done) {
                    if (!_callBack.loaded) {
                        // 停止，等待加载完成, 由于脚本是按顺序添加到队列的，因此这里保证了脚本的执行顺序
                        break;
                    } else {
                        _callBack.done = true;
                        const _handler = _callBack.handler;
                        Log.trace("debug", "==资源组加载完成执行回调==" + _callBack.name);

                        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent("hide_wait"));

                        if (_handler) {
                            _handler.executeWith([_callBack.name]);
                        }
                    }
                }
            }
        }
    }

    /** 监听加载完成 */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        Log.trace("debug", "资源组 " + event.groupName + " 加载完成");
        if (event && event.groupName) {

            const qLength = this._callBackQueue.length;
            for (let q = 0; q < qLength; q++) {
                const _callBack = this._callBackQueue[q];
                if (_callBack && _callBack.name === event.groupName) {
                    _callBack.loaded = true;
                }
            }

            this.executeQueue(event.groupName);

            const list: any[] = this._callBackMap[event.groupName];
            delete this._callBackMap[event.groupName];
            const length = list ? list.length : 0;
            for (let i = 0; i < length; i++) {
                const _handler = list[i];
                if (_handler) {
                    _handler.executeWith([event.groupName]);
                }
            }
        }
    }

    private onResourceLoadError(event: RES.ResourceEvent): void {
        Log.trace("debug", "图片资源加载错误" + event);
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        // Log.trace("debug", "onResourceProgress:" + event.groupName);
        // Log.trace("debug", "onResourceProgress_event.itemsLoaded:" + event.itemsLoaded);
        // Log.trace("debug", "onResourceProgress_event.itemsTotal:" + event.itemsTotal);
        if (this._progressHander) {
            this._progressHander.executeWith([event.itemsLoaded, event.itemsTotal]);
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
