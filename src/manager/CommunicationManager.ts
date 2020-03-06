/**
 *
 */
class CommunicationManager {

    public static getInstance(): CommunicationManager {
        if (!CommunicationManager.instance) {
            CommunicationManager.instance = new CommunicationManager();
        }
        return CommunicationManager.instance;
    }

    private static instance: CommunicationManager;
    public courcewareName: string;
    public coursewareArray: any;
    public mOpData: any;
    public offlineRev = false;
    private curPage = -1;

    constructor() {
        lcp.LListener.getInstance().addEventListener("tky_topage", this.goPage, this);
        lcp.LListener.getInstance().addEventListener("tky_makepost", this.tkyMakePostAction, this);
    }

    /** 添加侦听 */
    public addListener(listenerType: string): void {
        window.addEventListener(listenerType, this.execMessage.bind(this), false);
    }

    public init(_name: string): void {

        // 拓课云默认会在学生端刷新的时候返回老师端操作的最后一个信令，学生端暂时不处理这个信令。
        Log.trace("当前的身份：", GM.pm.role);
        if (GM.pm.role == 0) {
            lcp.LListener.getInstance().addEventListener("tky_offlinepost", this.tkyOfflineRevAction, this);
        } else {
            this.offlineRev = true;
        }

        this.courcewareName = _name;
        const _obj = RES.getRes(this.courcewareName + "_json");
        this.mOpData = [];
        if (_obj) {
            this.coursewareArray = _obj.courseware;
            /** 发送课件页数 */
            CommunicationManager.getInstance().makePostMessage("onPagenum", "totalPages", this.coursewareArray.length);
            this.loadComplete();
        } else {
            this.coursewareArray = [];
        }
    }

    /**
     * name
     */
    public loadComplete() {
        /** 发送加载完成  发送屏幕适配比例*/
        const cour = 1562 / 1348;
        CommunicationManager.getInstance().makePostMessage("onLoadComplete", "coursewareRatio", cour);
    }

    /** 收原生js信令 */
    public execMessage(e): void {

        if (e.source !== window.parent) { return; }

        let data;
        try {
            data = JSON.parse(e.data);
        } catch (error) {
            Log.trace("error", error);
        }

        Log.trace("收到的信令", JSON.stringify(data));

        if (data["method"] === "onJumpPage") {
            const toPage: number = Number(data["toPage"]);
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(BaseDefines.TKCLOUD_TYPE.TO_PAGE, toPage, false));

            this.curPage = toPage;
            this.mOpData[this.curPage] = [];

        } else if (data["method"] === "onFileMessage") {
            const _str: string = e.data;

            if (!this.offlineRev && this.mOpData.length > 0) {
                this.mOpData[this.curPage].push(data);
            }

            UIPool.getInstance().execMessage(data);
        }
    }

    /** 前往指定页面 */
    public goTargetPageHandle(pageIndex: number, animType: number = 0): void {

        if (pageIndex <= 0) {
            Log.trace("error", "找不到指定页面=" + pageIndex);
            return;
        }

        const pageJumpNum = pageIndex - 1;
        if (this.coursewareArray && this.coursewareArray.length > pageJumpNum) {
            const pageJumpOjb = this.coursewareArray[pageJumpNum];

            let _pageJumpData = null;
            if (pageJumpOjb.hasOwnProperty("data")) {
                _pageJumpData = pageJumpOjb.data;
            }
            // tslint:disable-next-line: no-eval
            GM.scene.runScene(eval(pageJumpOjb.name), pageJumpOjb.curLoad, _pageJumpData, animType);
            let nextPageJumpOjb = null;
            if (this.coursewareArray.length > pageJumpNum + 1) {
                nextPageJumpOjb = this.coursewareArray[pageJumpNum + 1];
                this.loadNextPage(nextPageJumpOjb.curLoad);
            }

            Log.trace("debug", "已经跳往指定页面,page=" + pageJumpNum);
        } else {
            Log.trace("error", "跳往指定页失败,page=" + pageJumpNum);
        }
    }

    /** 发送消息 */
    public makePostMessage(methodType: string, keyName: string, value: any): void {
        // 格式{"method":methodType, "keyName":value};
        // 调用例子 CommunicationManager.getInstance().makePostMessage("onPagenum", "totalPages", 17);
        const obj: Object = new Object();
        obj["method"] = methodType;
        obj[keyName] = value;
        window.parent.postMessage(JSON.stringify(obj), "*");

        Log.trace("发出的信令", JSON.stringify(obj));
    }

    /** 离线接受通知 并 处理发送消息 */
    public tkyOfflineRevAction(e): void {
        lcp.LListener.getInstance().removeEventListener("tky_offlinepost", this.tkyOfflineRevAction, this);
        this.offlineRev = true;

        if (this.mOpData && this.mOpData[this.curPage] && this.mOpData[this.curPage].length > 0) {
            const _data = this.mOpData[this.curPage];

            for (const _temp of _data) {
                UIPool.getInstance().execMessage(_temp);
            }

            this.mOpData[this.curPage] = [];
        }
    }

    /** 接受通知 并 处理发送消息 */
    public tkyMakePostAction(e): void {
        Log.trace("debug", e.param);
        const _obj = e.param;
        this.makePostMessage(_obj.method, _obj.keyName, _obj.value);
    }

    private goPage(e): void {
        Log.trace("debug", e.param);
        const page = parseInt(e.param);
        this.goTargetPageHandle(page);
    }

    /** 加载下一页 */
    private loadNextPage(nextGroup: string): void {
        ResLoad.getInstance().LoadRes(nextGroup);
    }
}
