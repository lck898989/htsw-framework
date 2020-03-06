
        // this.webNode = new one.WebView();
        // this.webNode.src = "https://media.w3.org/2010/05/sintel/trailer.mp4?autoPlay=true";
        // this.webNode.width = this.width;
        // this.webNode.height = this.height;
        // this.webNode.x = 0;
        // this.webNode.y = 0;
        // this.addChild(this.webNode);


namespace one {
    export class WebView extends WebNode {
        public get src(): string {
            return this._src;
        }

        public set src(v: string) {
            this._src = v;

            this.iframe.src = v;
        }

        public iframe: HTMLIFrameElement;

        private _src: string;
        public constructor() {
            super();

            this.iframe = document.createElement("iframe");

            this.bind(this.iframe);
        }

        public setAllowFullscreen(v: boolean) {
            this.iframe.allowFullscreen = v;
        }
    }
}
