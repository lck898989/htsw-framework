/**
 * Created by yangsong on 2014/11/22.
 */
class Log {
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    public static trace(key, ...optionalParams: any[]): void {

        if (GM.debugKey.containsKey(key)) {
            return;
        }

        if (GM.isDebug) {
            optionalParams[0] = "[" + key + "]" + "[DebugLog]" + optionalParams[0];
            // tslint:disable-next-line: no-console
            console.log.apply(console, optionalParams);
        }
    }
}
