/**
 *   常用的静态函数类
 */
class BaseFunc {
    // 解析json
    public static objToClass(obj: Object, cl: any): void {
        let key: string = "";
        for (key in obj) {
            if (key === "") {
                continue;
            }

            if (cl.hasOwnProperty(key)) {
                if (typeof (cl[key]) === "string") {
                    cl[key] = String(obj[key]);
                } else if (typeof (cl[key]) === "number") {
                    cl[key] = Number(obj[key]);
                } else {
                    cl[key] = obj[key];
                }
            }

        }
    }

    // 解析json
    public static objToObj(obj: Object, desc: Object): void {
        let key: string = "";
        for (key in obj) {

            desc[key] = obj[key];
            }

    }

    /** 深度复制一个类实例的属性（string，number)给另一个类实例
     *
     */
    public static ClassToClass(c1: any, c2: any) {
        let key: string = "";
        for (key in c1) {
            if (key === "") {
                continue;
            }

            if (c2.hasOwnProperty(key)) {
                if (typeof (c1[key]) === "string") {
                    c2[key] = String(c1[key]);
                } else if (typeof (c1[key]) === "number") {
                    c2[key] = Number(c1[key]);
                }
            }

        }
    }

    /*
    *   将一个key:value的字符串 转化成一个Object
    *   字符串格式 key:value,key:value
    */
    public static strToObj(str: string, s1: string = ",", s2: string = ":"): Object {
        const obj: Object = {};
        const arr: string[] = str.split(s1);
        const max: number = arr.length;
        let ar: string[];
        for (let i: number = 0; i < max; i++) {
            const t: string = arr[i];
            if (t.search(s2) === -1) {
                continue;
            }
            ar = t.split(s2);
            if (ar.length < 2) {
                continue;
            }

            obj[ar[0]] = ar[1];
        }
        return obj;
    }

    // 随机函数
    public static randomInRange(min: number, max: number): number {
        const scale: number = max - min;
        return Math.ceil(Math.random() * scale + min);
    }

    // 将秒格式化 hh:MM:ss;
    public static FormatTimeMM(sec: number): string {
        let strTime: string = "";
        const hour: number = Math.floor(sec / 3600);
        const minutes: number = Math.floor((sec - hour * 3600) / 60);
        const seconds: number = Math.floor(sec - minutes * 60 - hour * 3600);

        if (sec > 0) {
            strTime = this.formatTimeString(hour) + ":";
            strTime += this.formatTimeString(minutes) + ":";
            strTime += this.formatTimeString(seconds);
        } else {
            strTime = "00:00:00";
        }
        return strTime;
    }

    public static alignText(txt: eui.Label, max: number = 4): void {
        if (txt.text.length > max ) {
            txt.textAlign = "left";
        } else {
           txt.textAlign = "center";
        }
    }

    /*
    * 格式话数字成00格式
    */
    public static formatTimeString(n: number): String {
        let s: string = "";
        if (n < 10) {
            s = "0" + String(n);
        } else {
            s = String(n);
        }
        return s;
    }

    /*
    * 得到武将的职业图标
    * @param
    */
    public static getHeroOcImg(q: number): string {
        const str: string = "icon_job" + q + "_png";
        return str;
    }

    /*
    * 时间戳转换成年月日时分秒
    * @param
    */
    public static formatDate(num, type: number= 0): any {
        //        return new Date(parseInt(Num) * 1000).toLocaleString().replace("/", "-").replace("/", "-");
        //        new Date(parseInt(Num) * 1000).toLocaleString().replace(/\//gi, '-');
        const day = new Date(parseInt(num) * 1000)
        .toLocaleTimeString().replace("上午", "").replace("下午", "").replace(":", "").replace(":", "");
        let dayBy = new Date(parseInt(num) * 1000).toLocaleTimeString().replace("上午", "").replace("下午", "");
        const dayDal = new Date(parseInt(num) * 1000).toLocaleTimeString();
        const text = dayDal.substr(0, 1);
        let dayA = day;
        let dayB = day;
        let dayC = day;
        let dayH;
        let dayM;
        let dayS;
        const dateDal = new Date(parseInt(num) * 1000).toLocaleDateString().replace(/\//gi, "-");

        if (text === "下") {
            for (let i = 0; i < 4; i++) {
                dayA = dayA.substring(0, dayA.length - 1);
            }

            if (Number(dayA) >= 1 && Number(dayA) <= 9) {
                dayB = dayB.substring(1);
                for (let ic = 0; ic < 3; ic++) {
                    dayC = dayC.substring(1);
                }
            } else {
                for (let ib = 0; ib < 2; ib++) {
                    dayB = dayB.substring(1);
                }
                for (let ia = 0; ia < 4; ia++) {
                    dayC = dayC.substring(1);
                }
            }
            for (let id = 0; id < 2; id++) {
                dayB = dayB.substring(0, dayB.length - 1);
            }

            if (Number(dayA) === 12) {
                dayH = "12";
            } else {
                dayH = 12 + Number(dayA);
            }
        } else {
            for (let i = 0; i < 4; i++) {
                dayA = dayA.substring(0, dayA.length - 1);
            }

            if (Number(dayA) >= 0 && Number(dayA) <= 9) {
                dayB = dayB.substring(1);
                for (let ic = 0; ic < 3; ic++) {
                    dayC = dayC.substring(1);
                }
            } else {
                for (let ib = 0; ib < 2; ib++) {
                    dayB = dayB.substring(1);
                }
                for (let ia = 0; ia < 4; ia++) {
                    dayC = dayC.substring(1);
                }
            }
            for (let id = 0; id < 2; id++) {
                dayB = dayB.substring(0, dayB.length - 1);
            }
            if (Number(dayA) === 12) {
                dayH = "00";
            } else if (Number(dayA) >= 10 && Number(dayA) <= 11) {
                dayH = "0" + Number(dayA);
            } else {
                dayH = Number(dayA);
            }
        }
        dayM = dayB;
        dayS = dayC;
        if (type === 0) {
          dayBy = dateDal + " " + dayH + ":" + dayM + ":" + dayS;
        }
        if (type === 1) {
            dayBy = dateDal;
        }

        return dayBy;
    }

    //
    public static timestampDate(): any {
        return Math.round(new Date().getTime() / 1000);
    }

    // 传入数字返回品质符号
    public static getqualitymark(level: number): string {
        let mark: string = "";
        switch (level) {
            case 1:
                {
                     mark = "Ⅰ";
                }
                break;
            case 2:
                {
                     mark = "Ⅱ";
                }
                break;
            case 3:
                {
                     mark = "Ⅲ";
                }
                break;
            case 4:
                {
                    mark = "Ⅳ";
                }
                break;
            case 5:
                {
                    mark = "Ⅴ";
                }
                break;
            case 6:
                {
                    mark = "Ⅵ";
                }
                break;

        }
        return mark;
    }

    // 传入数字返回品质颜色
    public static getqualitycolor(level: number): number {
        let color: number = 0x0;
        switch (level) {
            case 1:
                {
                     color = 0xcdff91;
                }
                break;
            case 2:
                {
                     color = 0x90f5ff;
                }
                break;
            case 3:
                {
                     color = 0xff8ffe;
                }
                break;
            case 4:
                {
                    color = 0xff9d1f;
                }
                break;

        }

        return color;
    }

    /** 将带差字符串转化
     * @param source 员字符串
     * @param ...args 参数
     */
    public static getLang(source: string, ...args): string {
        let str: string = source;
        if (args.length > 0) {
            for (let i = 0, n = args.length; i < n; i++) {
                str = str.replace(("%" + (i + 1)), args[i]);
            }
        }

        return str;
    }

    /** 将带差字符串转化
     * @param source 员字符串
     * @param ...args 参数
     */
    public static getLangNum(source: string, ...args): string {
        let str: string = source;

        if (args.length > 0) {
            for (let i = 0, n = args.length; i < n; i++) {
                str = str.replace(("#num" + (i + 1) + "#"), args[i]);
            }
        }

        str = str.replace("#test#", "");

        return str;
    }

    /** 将带差字符串转化
     * @param testStr 替换 test 的字符串
     * @param source 员字符串
     * @param ...args 参数
     */
    public static getLangNumWithTest(testStr: string, source: string, ...args): string {
         let str: string = source;

         if (args.length > 0) {
             for (let i = 0, n = args.length; i < n; i++) {
                 str = str.replace(("#num" + (i + 1) + "#"), args[i]);
             }
         }

         str = str.replace("#test#", testStr);

         return str;
     }

     /* 根据传入的数得到相应的日期
     * @param day 0为今天 1为昨天 以此类推
     */
    public static GetDay(day: number): string {
        const today = new Date();
// tslint:disable-next-line: variable-name
        const yesterday_milliseconds = today.getTime() - (1000 * 60 * 60 * 24 * day);

        const yesterday = new Date();
        yesterday.setTime(yesterday_milliseconds);

        const strYear: any = yesterday.getFullYear();

        let strDay: any = yesterday.getDate();
        let strMonth: any = yesterday.getMonth() + 1;

        if (Number(strMonth) < 10) {
            strMonth = "0" + strMonth;
        }
        if (Number(strDay) < 10) {
            strDay = "0" + strDay;
        }
        const strYesterday: string = String(strYear) + String(strMonth) + String(strDay);
        return strYesterday;
    }

}
