/**
 * 本地存储信息管理
 */
class LocalStorageManager {
    private static _instance: LocalStorageManager;

    /**
     * key: "LOGIN_INFO"
     * value: {"prev": {"uname":xx, "server": {}},
     *         "hist": {xx1: [serverInfo, serverInfo...]}, xx2, [serverInfo, serverInfo...], ...}}
     * key: "MUSIC_IS_OPEN"
     * value: "0"/"1"
     */
    constructor() {

    }

    public static get instance(): LocalStorageManager {
        if (!LocalStorageManager._instance) {
            LocalStorageManager._instance = new LocalStorageManager();
        }
        return LocalStorageManager._instance;
    }
}
