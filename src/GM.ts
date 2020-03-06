/**
 * 游戏中全局模块的快速使用
 */

class GM {
    public static pm: PlayerManager;              // 玩家信息的管理类
    public static jm: JsonManager;                // json文件的管理类
    public static dlg: DlgManager;                // 对话框的管理类
    public static scene: SceneManager;            // 场景管理类
    public static gamec: GameConfigManager;       // 类
    public static sound: SoundManager;            // 声音类

    public static isDebug: boolean = true;
    public static debugKey: HashMap;

    public static _curTime: number;                                        // 传来的时间
    public static _serverTime: number;                                     // 服务器时间

    public static init(): void {

        this.gamec = new GameConfigManager();
        this.gamec.init();
        this.pm = new PlayerManager();
        this.pm.init();
        this.jm = new JsonManager();
        this.jm.init();
        this.dlg = new DlgManager();
        this.scene = new SceneManager();
        this.sound = new SoundManager();
        this.debugKey = new HashMap();
        if (RELEASE) {
            this.debugKey.put("debug", "");
        }

        CommunicationManager.getInstance().addListener("message");

        Log.trace("version", "FrameworkVersion:" + BaseDefines.FrameworkVersion);
    }

    /*
    * @param time 服务器的时间
    */
    public static setTime(time: number): void {
        this._serverTime = Number(time);
        this._curTime = egret.getTimer();
    }

    /*
    * 根据服务器传来的时间得到此时间和当前时间的秒数 如果当前时间已经大于服务器传来的时间 返回0
    * @param time 服务器传来的时间
    */
    public static getTime(time: number): number {
        const c: number = egret.getTimer() - this._curTime;  // 毫秒
        const cs: number = this._serverTime + (c / 1000);

        let r: number = time - cs;
        if (r < 0) {
            r = 0;
        }
        return r;
    }

    constructor() {
    }
}
