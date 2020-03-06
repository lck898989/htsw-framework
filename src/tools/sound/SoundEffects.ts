/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
class SoundEffects extends BaseSound {
    private _volume: number;
    private _currSoundChannel: egret.SoundChannel;
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 播放一个音效
     * @param effectName
     */
    public play(effectName: string, volume: number = 0.5): void {
        this._volume = volume;
        const sound: egret.Sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    }

     /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string): void {
        this.playSound(RES.getRes(key));
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        if (this._currSoundChannel) {
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound: egret.Sound): void {
        if (!sound) { return; }
        this._currSoundChannel = sound.play(0, 1);
        this._currSoundChannel.volume = this._volume;
    }
}
