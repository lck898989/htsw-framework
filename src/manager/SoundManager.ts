/**
 * Sound管理类
 */
class SoundManager extends BaseClass {
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    public static CLEAR_TIME: number = 3 * 60 * 1000;

    // 新增全局声音开关
    public static IS_OPEN_SOUND: boolean = true;

    private effect: SoundEffects;
    private bg: SoundBg;
    private effectOn: boolean;
    private bgOn: boolean;
    private currBg: string;
    private bgVolume: number;
    private effectVolume: number;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.bg = new SoundBg();
        this.effect = new SoundEffects();

        this.bgVolume = 0.5;
        this.effectVolume = 0.5;

        this.bgOn = true;
        this.effectOn = true;

        this.bg.setVolume(this.bgVolume);
        this.effect.setVolume(this.effectVolume);
    }

    /**
     * 播放音效
     * @param effectName
     */
    public playEffect(effectName: string): void {

        if (!SoundManager.IS_OPEN_SOUND) {
            return;
        }

        if (!this.effectOn) {
            return;
        }

        this.effect.play(effectName, this.effectVolume);
    }

    /**
     * 停止背景音乐
     */
    public stopEffect(): void {
        this.effect.stop();
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public playBg(bgName: string, volume: number = 0.5, loops: number = 0, end: Handler = null): void {
        if (!SoundManager.IS_OPEN_SOUND) {
            return;
        }

        if ( this.currBg != bgName) {
            if (this.bg) {
                this.bg.stop();
            }
        }
        this.currBg = bgName;
        if (!this.bgOn) {
            return;
        }
        this.bg.play(bgName, volume, loops, end);
    }

    /**
     * 继续播放背景音乐
     */
    public continuePlayBg() {
        if (!SoundManager.IS_OPEN_SOUND) {
            return;
        }
        this.bg.continuePlay();
    }

    /**
     * 停止背景音乐
     */
    public stopBg(): void {
        this.bg.stop();
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn: boolean): void {
        this.effectOn = $isOn;
    }

    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn: boolean): void {
        this.bgOn = $isOn;
        if (!this.bgOn) {
            this.stopBg();
        } else {
            if (this.currBg) {
                this.playBg(this.currBg, 0);
            }
        }
    }

     /**
     * 设置背景音乐音量
     * @param volume
     */
    public setBgVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.bgVolume = volume;
        this.bg.setVolume(this.bgVolume);
    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public getBgVolume(): number {
        return this.bgVolume;
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.effectVolume = volume;
        this.effect.setVolume(this.effectVolume);
    }

    /**
     * 获取音效音量
     * @returns {number}
     */
    public getEffectVolume(): number {
        return this.effectVolume;
    }
}
