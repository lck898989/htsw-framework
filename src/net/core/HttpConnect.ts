class HttpConnect {

    /** 接口地址 */
    public apiUrl: string;
    public constructor() {

    }

    protected SendHttpMsg(msg: string, handler: Handler, isJson?: boolean): void {
        Log.trace("debug", "请求消息= " + msg);
        const request = new HLoad();
        request.time = egret.getTimer();
        request.hander = handler;
        if (isJson !== undefined) {
            request.isJson = isJson;
        }

        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.apiUrl, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(msg);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    }

    protected SendUrlHttpMsg(url: string, msg: string, hander: Handler, isJson: boolean = false, type: string = egret.HttpMethod.POST): void {
        Log.trace("debug", "请求消息= " + msg);
        const request = new HLoad();
        request.time = egret.getTimer();
        request.hander = hander;
        if (isJson !== undefined) {
            request.isJson = isJson;
        }

        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, type);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(msg);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    }

    /**
     * 加载完成
     */
    private onPostComplete(event: egret.Event): void {
        const request: HLoad =  event.currentTarget as HLoad;
        Log.trace("debug", "回来消息用时= " + (egret.getTimer() - request.time));
        Log.trace("debug", "消息：" + JSON.stringify(request.response));

        if (request.hander) {
            if (request.isJson) {
                const obj: any = JSON.parse(request.response);
                request.hander.executeWith([obj]);
            } else {
                request.hander.executeWith([request.response]);
            }
        }
    }

    /**
     * 报错
     */
    private onPostIOError(event: egret.IOErrorEvent): void {
        Log.trace("debug", "post error : " + event);
    }

    /**
     *
     */
    private onPostProgress(event: egret.ProgressEvent): void {
        Log.trace("debug", "post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
}
