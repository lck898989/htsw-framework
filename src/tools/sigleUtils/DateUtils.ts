/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
class DateUtils extends BaseClass {
    public constructor() {
        super();
    }


    /* 判断当前时间是否大于指定时间
     *@param    time    时间格式的字符串 比如 2016-12-10 23:00
     *@return   如果当前时间大于指定时间 返回true;
    */
    public compareDay(time: string): boolean {
        const cur: Date = new Date();
        const end: Date = this.getDate(time);

        const n = cur.getTime() - end.getTime();
        if (n > 0) {
            return true;
        }

        return false;
    }

    /* 根据时间，判断比赛的状态 0:未开始 1：进行中 2：已完场*/
    public compareMatch(time: string, hour: number): number {
        const cur: Date = new Date();
        const end: Date = this.getDate(time);

        const n = cur.getTime() - end.getTime();
        if (n > 0) {
            if (n > hour * 60 * 60 * 1000) {
               return 2;
            } else {
               return 1;
            }
        }

        return 0;
    }

    public getDate(time: string): Date {
        const arr: any[] = time.split(" ");
        const y: string = arr[0];
        const yt: any[] = y.split("-");

        const d: string = arr[1];
        const dt: any[] = d.split(":");

        const date: Date = new Date(Number(yt[0]), Number(yt[1]) - 1, Number(yt[2]),
                                    Number(dt[0]), Number(dt[1]));

        return date;
    }

    /** 只保留小时 */
    public getXiaoTime(dt: string): string {
        const arr: any[] = dt.split(" ");
        return arr[1];
    }

    /**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前
     * @return
     *
     */
    public getFormatBySecond(second: number, type: number = 1): string {
        let str: string = "";
        switch (type) {
            case 1:
                str = this.getFormatBySecond1(second);
                break;
            case 2:
                str = this.getFormatBySecond2(second);
                break;
            case 3:
                str = this.getFormatBySecond3(second);
                break;
            case 4:
                str = this.getFormatBySecond4(second);
                break;
            case 5:
                str = this.getFormatBySecond5(second);
                break;
            case 6:
                str = this.getFormatBySecond6(second);
                break;
            case 7:
                str = this.getFormatBySecond7(second);
                break;
            case 8:
                str = this.getFormatBySecond8(second);
                break;
        }
        return str;
    }


    public formatDate(date: Date): string {
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1;
        const day: number = date.getDate();

        return year + "-" + month + "-" + day;
    }

    /** 判断是否是闰年 */
    public isLeapYear(year): boolean {
        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
    }

    // 1: 00:00:00
    private getFormatBySecond1(t: number = 0): string {
        const hourst: number = Math.floor(t / 3600);
        let hours: string;
        if (hourst === 0) {
            hours = "00";
        } else {
            if (hourst < 10) {
                hours = "0" + hourst;
            } else {
                hours = "" + hourst;
            }
        }
        const minst: number = Math.floor((t - hourst * 3600) / 60);
        const secondt: number = Math.floor((t - hourst * 3600) % 60);
        let mins: string;
        let sens: string;
        if (minst === 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt === 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return hours + ":" + mins + ":" + sens;
    }

    // 3: 00:00
    private getFormatBySecond3(t: number = 0): string {
        const hourst: number = Math.floor(t / 3600);
        const minst: number = Math.floor((t - hourst * 3600) / 60);
        const secondt: number = Math.floor((t - hourst * 3600) % 60);
        let mins: string;
        let sens: string;
        if (minst === 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt === 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return mins + ":" + sens;
    }

    // 2:yyyy-mm-dd h:m:s
    private getFormatBySecond2(time: number): string {
        const date: Date = new Date(time);
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1; 	// 返回的月份从0-11；
        const day: number = date.getDate();
        const hours: number = date.getHours();
        const minute: number = date.getMinutes();
        const second: number = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;

    }

    // 4:xx天前，xx小时前，xx分钟前
    private getFormatBySecond4(time: number): string {
        const t = Math.floor(time / 3600);
        if (t > 0) {
            if (t > 24) {
                return Math.floor(t / 24) + "天前";
            } else {
                return t + "小时前";
            }
        } else {
            return Math.floor(time / 60) + "分钟前";
        }
    }

    private getFormatBySecond5(time: number): string {
        // 每个时间单位所对应的秒数
        const oneDay: number = 3600 * 24;
        const oneHourst: number = 3600;
        const oneMinst: number = 60;

        const days = Math.floor(time / oneDay);
        const hourst: number = Math.floor(time % oneDay / oneHourst);
        const minst: number = Math.floor((time - hourst * oneHourst) / oneMinst);
        const secondt: number = Math.floor((time - hourst * oneHourst) % oneMinst); // time;

        let dayss: string = "";
        let hourss: string = "";
        let minss: string = "";
        let secss: string = "";
        if (time > 0) {
            // 天
            if (days === 0) {
                // 小时
                if (hourst === 0) {
                    // 分
                    if (minst === 0) {
                        if (secondt === 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                        return secss;
                    } else {
                        minss = "" + minst + "分";
                        if (secondt === 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                    }

                    return minss + secss;
                } else {
                    hourss = hourst + "小时";
                    if (minst === 0) {
                        if (secondt === 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                        return secss;

                    } else if (minst < 10) {
                        minss = "0" + minst + "分";
                    } else {
                        minss = "" + minst + "分";
                    }

                    return hourss + minss;

                }
            } else {
                dayss = days + "天";
                if (hourst === 0) {
                    hourss = "";
                } else {
                    if (hourst < 10) {
                        hourss = "0" + hourst + "小时";
                    } else {
                        hourss = "" + hourst + "小时";
                    }
                }
                return dayss + hourss;
            }
        }
        return "";
    }

    private getFormatBySecond6(time: number): string {
        // 每个时间单位所对应的秒数
        const oneDay: number = 3600 * 24;
        const oneHourst: number = 3600;
        const oneMinst: number = 60;

        const days = Math.floor(time / oneDay);
        const hourst: number = Math.floor(time % oneDay / oneHourst);
        const minst: number = Math.floor((time - days * oneDay - hourst * oneHourst) / oneMinst);
        const secondt: number = Math.floor((time - days * oneDay - hourst * oneHourst) % oneMinst); // time;

        let b: boolean = false;
        let str: string = "";
        if (days > 0) {
            str += days + "天";
            b = true;
        }
        if (b || hourst > 0) {
            str += hourst + "小时";
            b = true;
        }
        if (b || minst > 0) {
            str += minst + "分";
            b = true;
        }
        if (b || secondt) {
            str += secondt + "秒";
        }

        return str;
    }

    // 2:yyyy-mm-dd h:m:s
    private getFormatBySecond7(time: number): string {
        const date: Date = new Date(time);
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1; 	// 返回的月份从0-11；
        const day: number = date.getDate();
        return year + "年" + month + "月" + day + "日" ;
    }

    private getFormatBySecond8(time: number): string {
        // 每个时间单位所对应的秒数
        const oneDay: number = 3600 * 24;

        let days = Math.floor(time / oneDay);
        let str: string = "";
        if (days > 0) {
            str = (days + 1) + "天";
        } else {
            str = "1天";
        }
        return str;
    }
}
