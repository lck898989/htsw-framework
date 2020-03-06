namespace one {

    /**
     * 视频标签的适配类型。
     */
    export namespace FitType {
        /**
         * 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。
         */
        export const FILL = "fill";

        /**
         * 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。
         */
        export const CONTAIN = "contain";

        /**
         * 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。
         */
        export const COVER = "cover";

        /**
         * 被替换的内容将保持其原有的尺寸。
         */
        export const NONE = "none";

        /**
         * 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。
         */
        export const SCALEDOWN = "scale-down";
    }

    export class WebVideo extends WebNode {

        public get src(): string {
            return this._src;
        }

        public set src(v: string) {
            this._src = v;
            this.video.src = v;
        }

        public video: HTMLVideoElement;
        private _src: string;
        public videoId: string;

        public constructor() {
            super();
            
            document.addEventListener(
                'WeixinJSBridgeReady',
                this.play.bind(this),
                false
            );

            this.video = document.createElement("video");
            const cur: Date = new Date();
            this.videoId = "video_"+cur.getTime();
            this.video.setAttribute("id", this.videoId);
            this.video.autoplay = true;
            this.video.controls = true;
            this.video.addEventListener("canplay", this.onVideoLoaded);
            this.video.addEventListener("ended", () => this.onVideoEnded());
            this.video.addEventListener("error", () => this.onVideoError());
            this.bind(this.video);
        }

        protected addToStage(): void {
            super.addToStage();

            if(!this._fullscreen){//非全屏状态
                const _cssText = this.video.style.cssText + "object-fit: " + this._fittype + ";";
                this.video.style.cssText = _cssText;
            }     
        }


        public play(): void {
            this.video.setAttribute("webkit-playsinline", "true");
            this.video.setAttribute("playsinline", "true");
            this.video.setAttribute("x5-video-player-type", "h5");
            this.video.setAttribute("x5-video-player-fullscreen", "false");
            
            const _video = document.getElementById(this.videoId) as HTMLVideoElement;
            if(_video)
                _video.play();
        }

        /**
         * @inheritDoc
         */
        public close() {

            this.video.removeEventListener("canplay", this.onVideoLoaded);
            this.video.removeEventListener("error", () => this.onVideoError());
            this.video.removeEventListener("ended", () => this.onVideoEnded());

            this.removeFromStage();
        }

        public contentFullScreen(): void {
            const _cssText = "position: absolute; border: 0px; left: 0px; top: 0px; object-fit: " + this._fittype + ";";
            const _player = document.getElementsByClassName("egret-player")[0];
            const _canvasNode = _player.getElementsByTagName("canvas")[0];
            this.video.width = _canvasNode.width;
            this.video.height = _canvasNode.height;
            this.video.style.cssText = _cssText;
        }
        
        public swapHierarchy(): void {
            const _player = document.getElementsByClassName("egret-player")[0];
            const _canvasNode = _player.getElementsByTagName("canvas")[0];
            const _domNode = this.getDomNode();
            const _rootDiv = document.getElementById("egretDOMRoot") as HTMLDivElement;
            _domNode.swapDom(_rootDiv, _canvasNode);
        }

        public pause(): void {
            if (!this.video)
                return;
            this.video.pause();
        }

        /**
         * @private
         *
         */
        private onVideoLoaded = () => {
            this.video.removeEventListener("canplay", this.onVideoLoaded);
            window.setTimeout(() => {
                this.dispatchEventWith(egret.Event.COMPLETE);
            }, 200);
        };

        /**
         * @private
         *
         */
        private onVideoError() {
            this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
        }

        /**
         * @private
         *
         */
        private onVideoEnded() {
            this.dispatchEventWith(egret.Event.ENDED);
        }

        /**
         * 获取视频的长度
         */
        public get duration(): number {
            if (!this.video)
                return 0;
            return this.video.duration;
        }

        /**
         * 设置视频播放的位置
         */
        public get position(): number {
            if (!this.video)
                return 0;
            return this.video.currentTime;
        }

        /**
         * 设置视频播放的位置
         */
        public set position(value: number) {
            if (!this.video)
                return;
            this.video.currentTime = value;
        }

        /**
         * 视频声音设置
         */
        public get volume(): number {
            if (!this.video)
                return 1;
            return this.video.volume;
        }

        /**
         * 视频声音设置
         */
        public set volume(value: number) {
            if (!this.video)
                return;
            this.video.volume = value;
        }

        public get controls(): boolean {
            return this.video.controls;
        }

        public set controls(value: boolean) {
            this.video.controls = value;
        }

        public get autoPlay(): boolean {
            return this.video.autoplay;
        }

        public set autoPlay(value: boolean) {
            this.video.autoplay = value;
        }

        private _fullscreen = true;

        public get fullscreen(): boolean {
            return this._fullscreen;
        }

        public set fullscreen(value: boolean) {
            this._fullscreen = value;
            if(this._fullscreen)
                this.contentFullScreen();
        }

        private _fittype = one.FitType.CONTAIN;

        public get fittype(): any {
            return this._fittype;
        }

        public set fittype(value: any) {
            this._fittype = value;
        }
    }
}
