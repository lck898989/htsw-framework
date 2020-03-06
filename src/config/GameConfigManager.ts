/*
  * 游戏配置文件
  * All Rights Reserved.
  * 存放游戏的配置数据
  * 比如：游戏界面尺寸、分享随机百分比、获取系统数据
  */
class GameConfigManager {
    // 全局字体颜色表--可以扩展
    public TEXT_COLORS = {
        black: 0x000000, // 黑色
        blue: 0x1a94d7, // 蓝色
        green: 0x00e500, // 绿色
        grayblue: 0x3fcbcc, // 灰蓝色
        golden: 0xFFD700, // 金色
        white: 0xFFFFFF, // 白色
        milkWhite: 0xfbf1af, // 乳白色
        grayWhite: 0x808080, // 灰白色
        yellow: 0xffff00, // 金黄色
        lightYellow: 0xffd375, // 淡黄色
        orangeYellow: 0xf4a445, // 橘黄色//道具名称 //玩家姓名
        red: 0xd91d36, // 红色
        purple: 0xde3b40, // 紫色
        pink: 0xFF3030, // 粉色
        ligthRed: 0xD115A8,  // 紫红色
    };

    // 全局字体大小表--可以扩展
    public LABEL_FONT_SIZE = {
        bigSize: 36, // 大型字体大小
        littleSize: 12, // 小型字体大小
        middleSize: 18, // 中型字体大小
        normalSize: 24, // 正常字体大小
    };

    // 当前面板
    public curPanel: egret.DisplayObjectContainer;

    public originWidth: number;
    public originHeight: number;

    // 获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    public systemType(): string {
       if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
           return;
       }
       const ua = window.navigator.userAgent.toLowerCase();
       const microStr = "" + ua.match(/MicroMessenger/i);
       if (("" + ua.match(/windows nt/i)) == "windows nt") {
           return "windows";
       } else if (("" + ua.match(/iphone/i)) == "iphone") {
           return "ios";
       } else if (("" + ua.match(/android/i)) == "android") {
           return "android";
       } else if (("" + ua.match(/ipad/i)) == "ipad") {
           return "ipad";
       } else if (("" + ua.match(/linux/i)) == "linux") {
           return "linux";
       } else if (("" + ua.match(/mac/i)) == "mac") {
           return "mac";
       } else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
           return "ucbrower";
       } else {
           Log.trace("debug", "未知系统类型");
       }
    }

    public init(): void {
        const _player = document.getElementsByClassName("egret-player")[0];

        this.originWidth = Number(_player.getAttribute("data-content-width"));
        this.originHeight = Number(_player.getAttribute("data-content-height"));
    }

    // 当前舞台
    public curStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    // 当前游戏宽度
    public curWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    // 当前游戏宽度
    public curHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    // 原始游戏宽度
    public getOriginWidth(): number {
        return this.originWidth;
    }

    // 原始游戏高度
    public getOriginHeight(): number {
        return this.originHeight;
    }
}
