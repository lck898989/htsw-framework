/**
 * 背景音乐类
 */
class SoundBg extends BaseSound {
    private _currBg: string;
    private _currSound: egret.Sound;
    private _currSoundChannel: egret.SoundChannel;
    private _volume: number;
    private _endHandler: Handler;
    private _loops: number;
    private _soundTimer: egret.Timer;
    private _soundLength: number;
    private _soundFlag: number;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._currBg = "";
        this._soundLength = 0;
        this._soundFlag = 0;
        this._soundTimer = null;
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        if (this._currSoundChannel) {
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
        if (this._soundTimer) {
            this._soundTimer.stop();
        }
    }

    /**
     * 播放某个音乐
     * @param effectName
     */
    public play(effectName: string, volume: number, loops: number, end: Handler = null): void {
        this._volume = volume;
        if (this._currBg == effectName) {
            return;
        }
        this.stop();
        this._currBg = effectName;
        this._loops = loops;
        this._endHandler = end;

        // 创建一个计时器对象
        this._soundTimer = new egret.Timer(1000, 0);
        // 注册事件侦听器
        this._soundTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        Log.trace("debug", "effectName:" + effectName);
        const sound: egret.Sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound, loops, end);
        }
    }

    /**
     *如果有些机型 需要触发的话 就接着 播放login音乐
     */
    public continuePlay() {
        if (this._currSoundChannel) {
            const volume = this._currSoundChannel.volume;
            const pos = this._currSoundChannel.position;
            this._currSoundChannel.stop();
            this._currSoundChannel = this._currSound.play(pos, 0);
            this._currSoundChannel.volume = volume;
        }
    }

     /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    }


    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string): void {
        if (this._currBg == key) {
            this.playSound(RES.getRes(key), this._loops, this._endHandler);
        }
    }

    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        return this._currBg != key;
    }

    private timerFunc(): void {
        this._soundFlag++;
        if (this._soundFlag >= this._soundLength) {
            this._soundTimer.stop();
            if (this._endHandler) {
                this._endHandler.execute();
            }
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound: egret.Sound, loops: number, end: Handler): void {
        if (!sound) { return; }
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play(0, loops);
        this._currSoundChannel.volume = this._volume;
        this._soundLength = Math.round(this._currSound.length);
        this._soundFlag = 0;

        this._soundTimer.start();
    }
}
