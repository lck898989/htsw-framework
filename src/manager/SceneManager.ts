/**
 * Created by yangsong on 2014/11/28.
 * 场景管理类
 */
class SceneManager {
    public _loadArray: SceneInfo[];      // 加载资源数组
    private _currScene: any;

    /** 要传递给进入场景的参数 */
    private _data: Object;

    /** 切换场景时播放的动画 */
    private animType: number;

    /** 老场景 */
    private _oldName: string;
    private _oldScene: any;

    /** 是否正在载入场景 */
    private _loadingScene: boolean;

    /**
     * 构造函数
     */
    public constructor() {
        this._oldScene = null;
        this._currScene = null;
        this._loadingScene = false;
        this._loadArray = new Array<SceneInfo>();
    }

    /**
     * 切换场景
     * @param key      场景唯一标识
     * @param resName  场景需要加载的资源Group名称
     */
    public runScene(classFactory: any, resName: string, data: Object = null, animType: number = 0): void {
        Log.trace("debug", "运行前场景========" + classFactory.key + "====" + this._loadingScene);
        // 正在加载场景资源和界面，新添加的场景放到队列中
        if (this._loadingScene) {
            this.insertSceneInfo(classFactory, resName, data, animType);
            return;
        }

        // 查看队列中是否有已存在的场景，有的话优先加载
        if (this.addNext()) {
            // Log.trace("debug", "加载队列中的场景");
            return;
        }

        // 载入资源
        this._loadingScene = true;
        this._currScene = classFactory;
        this._data = data;
        this.animType = animType;
        ResLoad.getInstance().LoadResByQueue(resName, new Handler(this, this.loadEnd));
    }

    /**
     * 载入资源完成后的回调函数
     */
    private loadEnd() {
        if (this.animType > 0) {
            ScreenMovies.MovieStart(this.animType);
        }

        this.turnScene();
    }

    private turnScene(): void {
        // 移除上一个显示的场景  (异步，有可能不按顺序)
        if (this._oldScene && GameLayerManager.gameLayer().sceneLayer.contains(this._oldScene)) {
            // Log.trace("debug", "移除画布有该场景:"+this._oldScene.keyName);
            UIPool.getInstance().destroyObject(this._oldScene);
            GameLayerManager.gameLayer().sceneLayer.removeChild(this._oldScene);
        }

        Log.trace("debug", "运行后场景===" + this._currScene.key);

        // 当前显示的场景
        const curScene: UIObject = UIPool.getInstance().createObject(this._currScene);
        if (curScene) {
            if (!GameLayerManager.gameLayer().sceneLayer.contains(curScene)) {
                Log.trace("debug", "画布中没有该场景:" + this._currScene.key);
                curScene.data = this._data;
                const dis: egret.DisplayObject = GameLayerManager.gameLayer().sceneLayer.addChild(curScene);
                if (!dis) {
                    Log.trace("debug", "加入场景失败");
                } else {
                    // 当前场景赋给要删除的场景
                    this._oldScene = curScene;
                }
            } else {
                Log.trace("debug", "画布中已经有该场景:" + this._currScene.key);
            }
        }

        if (this._loadArray.length <= 0) {
            this._loadingScene = false;
        }

        this.addNext();
    }

    /**
     * 同时加载多个场景，排入队列
     * param:  group:资源组名称
     */
    private insertSceneInfo(classFactory: any, resName: string, data: Object = null, animType: number): void {
        const info: SceneInfo = new SceneInfo();
        info.classFactory = classFactory;
        info.resName = resName;
        info.data = data;
        info.animType = animType;
        this._loadArray.push(info);
    }

    /**
     * 加载数组中的场景
     */
    private addNext(): boolean {
        if (this._loadArray.length <= 0) {
            return false;
        }
        // 载入资源
        this._loadingScene = true;

        const info: SceneInfo = this._loadArray.shift();
        this._currScene = info.classFactory;
        this._data = info.data;
        this.animType = info.animType;

        ResLoad.getInstance().LoadResByQueue(info.resName, new Handler(this, this.loadEnd));
        return true;
    }
}
