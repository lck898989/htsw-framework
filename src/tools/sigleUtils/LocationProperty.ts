/**
 * Created by Saco on 2014/12/1.
 */
class LocationProperty {
    /*
     * 获取url参数值，没有返回null
     * 不传递paraUrl参数默认获取当前url
     * */
    public static getPara(paraName: string, paraUrl?: string): any {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) { return null; }
        const url = paraUrl || location.href;
        if (url.indexOf("?") != -1) {
            const urlPara = "&" + url.split("?")[1];
            const reg = new RegExp("\&" + paraName + "\=.*?(?:\&|$)");
            const result = reg.exec(urlPara);
            if (result) {
                const value: string = result[0];
                return value.split("&")[1].split("=")[1];
            }
        }
        return null;
    }

    /*
     * 给Url参数赋值
     * 不传递paraUrl参数默认获取当前url
     * */
    public static setProperty(paraName: string, paraValue: string, paraUrl?: string): string {
        let url = paraUrl || location.href;
        const urlPara = "&" + url.split("?")[1];
        if (url.indexOf("?") == -1) {
            return url += "?" + paraName + "=" + paraValue;
        } else {
            const urlParam = url.split("?")[1];
            if (urlParam == "") {
                return url += paraName + "=" + paraValue;
            }
            const regParaKV = new RegExp("(?:^|\&)" + paraName + "\=.*?(?:\&|$)");
            const result = regParaKV.exec(urlParam);
            if (!result || result[0] == "") {
                return url += "&" + paraName + "=" + paraValue;
            } else {
                const oldValue = result[0];
                const regParaKey = new RegExp("\=.*$");
                const newValue = oldValue.replace(regParaKey, "=" + paraValue);
                return url.replace(oldValue, newValue);
            }
        }
    }

    /*
     * 检查url中是否包含某参数
     * 这代码有一个例外就是paraName = "undefined", paraUrl中不含"?"会返回true
     * 相信你不会这么用的 =.=
     * */
    public static hasProperty(paraName: string, paraUrl?: string): boolean {
        const url = paraUrl || location.href;
        const para = "&" + url.split("?")[1]; // 加&是为了把&作为参数名开始=作为参数名结束，防止uid=1&id=2此类误判
        return para.indexOf("&" + paraName + "=") != -1;
    }
}
