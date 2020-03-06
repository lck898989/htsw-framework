class ResInfo {
    public _endHander: Handler;     // 下载完成的回调
    public _proHander: Handler;     // 进度的回调
    public _loadDlg: boolean;
    public _groups: string;
    public _sec: number;
    constructor() {
        this._endHander = null;
        this._proHander = null;
        this._loadDlg = false;
        this._groups = "";
        this._sec = 0;
    }
}

