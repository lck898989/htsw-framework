/**
 * Created by yangsong on 15-2-11.
 * 资源加载工具类，
 * 支持多个resource.json文件加载
 * 封装Group的加载
 * 增加静默加载机制
 **/
class ResourceUtils extends BaseClass {
    private _configs: any[];
    private _onConfigComplete: Function;
    private _onConfigCompleteTarget: any;

    private _groups: any;

    /**
     * 构造函数
     */
    public constructor() {
        super();

        this._configs = new Array<any>();
        this._groups = {};

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    }

    /**
     * 加载资源组
     * @param $groupName 资源组名称
     * @param $onResourceLoadComplete 资源加载完成执行函数
     * @param $onResourceLoadProgress 资源加载进度监听函数
     * @param $onResourceLoadTarget 资源加载监听函数所属对象
     */
    public loadGroup($groupName: string, $onResourceLoadComplete: Function
        ,            $onResourceLoadProgress: Function, $onResourceLoadTarget: any): void {
        this._groups[$groupName] = [$onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget];
        RES.loadGroup($groupName);
    }

    /**
     * 同时加载多个组
     * @param $groupName 自定义的组名称
     * @param $subGroups 所包含的组名称或者key名称数组
     * @param $onResourceLoadComplete 资源加载完成执行函数
     * @param $onResourceLoadProgress 资源加载进度监听函数
     * @param $onResourceLoadTarget 资源加载监听函数所属对象
     */
    public loadGroups($groupName: string, $subGroups: any[], $onResourceLoadComplete: Function
                    , $onResourceLoadProgress: Function, $onResourceLoadTarget: any): void {
        RES.createGroup($groupName, $subGroups);
        this.loadGroup($groupName, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget);
    }

    /**
     * 静默加载
     * @param $groupName 资源组名称
     */
    public pilfererLoadGroup($groupName: string): void {
        // 添加前缀，防止与正常加载组名重复
        RES.loadGroup("pilferer_" + $groupName, -1);
    }


    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    public addConfig(jsonPath: string, filePath: string): void {
        this._configs.push([jsonPath, filePath]);
    }

    /**
     * 开始加载配置文件
     * @param $onConfigComplete 加载完成执行函数
     * @param $onConfigCompleteTarget 加载完成执行函数所属对象
     */
    public loadConfig($onConfigComplete: Function, $onConfigCompleteTarget: any): void {
        this._onConfigComplete = $onConfigComplete;
        this._onConfigCompleteTarget = $onConfigCompleteTarget;
        this.loadNextConfig();
    }

    /**
     * 加载
     */
    private loadNextConfig(): void {
        // 加载完成
        if (this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }

        const arr: any = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    }

    /**
     * 加载完成
     * @param event
     */
    private onConfigCompleteHandle(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    }


    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        const groupName: string = event.groupName;
        if (this._groups[groupName]) {
            const loadComplete: Function = this._groups[groupName][0];
            const loadCompleteTarget: any = this._groups[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }

            this._groups[groupName] = null;
            delete this._groups[groupName];
        }
    }

    /**
     * 资源组加载进度
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        const groupName: string = event.groupName;
        if (this._groups[groupName]) {
            const loadProgress: Function = this._groups[groupName][1];
            const loadProgressTarget: any = this._groups[groupName][2];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event.itemsLoaded, event.itemsTotal);
            }
        }
    }
}
