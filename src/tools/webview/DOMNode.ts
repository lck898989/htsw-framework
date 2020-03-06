namespace one {
    class DOMRoot {

        private static tempStage: egret.Stage;
        public static scaleX:number = 0;
        public static scaleY:number = 0;

        public static getDOMRoot(): HTMLDivElement {
            const rootDiv = document.getElementById("egretDOMRoot") as HTMLDivElement;
            if (DEBUG) {
                if (rootDiv == null) {
                    // tslint:disable-next-line: no-console
                    // console.error("请先调用 initDOMRoot 初始化");
                }
            }
            return rootDiv;
        }
        
        /**
         * 初始化 DOM root，调用一次即可
         */
        public static initDOMRoot(stage: egret.Stage): void {
            let rootDiv = document.getElementById("egretDOMRoot") as HTMLDivElement;
            if (rootDiv == null) {
                const player = document.getElementsByClassName("egret-player")[0];
                rootDiv = document.createElement("div");
                initElementStyle(rootDiv);
                rootDiv.setAttribute("id", "egretDOMRoot");

                player.appendChild(rootDiv);

                DOMRoot.tempStage = stage;

                const onResize = () => {
                    // tslint:disable-next-line: no-shadowed-variable
                    const player = document.getElementsByClassName("egret-player")[0];
                    const canvas = player.getElementsByTagName("canvas")[0];

                    const playerRect = player.getBoundingClientRect();
                    const canvasRect = canvas.getBoundingClientRect();
                    let boundingClientWidth = playerRect.width;
                    let boundingClientHeight = playerRect.height;
                    let shouldRotate = false;

                    const orientation: string = this.tempStage.orientation;
                    if (orientation != egret.OrientationMode.AUTO) {
                        shouldRotate = orientation != egret.OrientationMode.PORTRAIT && playerRect.height > playerRect.width
                            || orientation == egret.OrientationMode.PORTRAIT && playerRect.width > playerRect.height;
                    }

                    let screenWidth = shouldRotate ? boundingClientHeight : boundingClientWidth;
                    let screenHeight = shouldRotate ? boundingClientWidth : boundingClientHeight;

                    let stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, screenWidth, screenHeight, GM.gamec.getOriginWidth(), GM.gamec.getOriginHeight());
                    let stageWidth = stageSize.stageWidth;
                    let stageHeight = stageSize.stageHeight;
                    let displayWidth = stageSize.displayWidth;
                    let displayHeight = stageSize.displayHeight;
                    let scalex = displayWidth / stageWidth;
                    let scaley = displayHeight / stageHeight;
                    this.scaleX = scalex * egret.sys.DisplayList.$canvasScaleFactor;
                    this.scaleY = scaley * egret.sys.DisplayList.$canvasScaleFactor;
                    if (egret.Capabilities.renderMode == "canvas") {
                        this.scaleX = Math.ceil(this.scaleX);
                        this.scaleY = Math.ceil(this.scaleY);
                    }

                    rootDiv.style.left = canvas.style.left;
                    rootDiv.style.top = canvas.style.top;
                    rootDiv.style.transformOrigin = "0% 0% 0px";
                    rootDiv.style.transform = canvas.style.transform + " scale(" + 1 + "," + 1 + ")";
                };

                this.tempStage.addEventListener(egret.Event.RESIZE, onResize, this);
                onResize();
            }
        }

    }

    function initElementStyle(element: HTMLElement): void {
        element.style.position = "absolute";
        element.style.border = "0";
        element.style.left = "0px";
        element.style.top = "0px";
    }

    /**
     * DOM 元件和 egret 显示对象的映射。 egret 显示对象属性的修改会同时改变 DOM 元件属性
     */
    // tslint:disable-next-line: max-classes-per-file
    export class DOMNode {
        private node: HTMLDivElement;
        private element: HTMLElement;
        private dp: egret.DisplayObject;

        private lastMatrix: egret.Matrix = new egret.Matrix();
        private lastWidth: number = 0;
        private lastHeight: number = 0;

        public domScaleX:number = 0;
        public domScaleY:number = 0;

        public constructor() {
            this.node = document.createElement("div");
            initElementStyle(this.node);
            this.node.setAttribute("id", "egretDOMDiv");
        }
        
        /**
         * 将 DOM 节点和 egret 对象映射
         */
        public mapDisplayObject(displayObject: egret.DisplayObject): void {
            this.dp = displayObject;
        }

        /**
         * 交换节点的位置
         */
        public swapDom(dom1, dom2): void {
            const tempDiv = document.createElement("tempDiv");
            dom1.parentNode.insertBefore(tempDiv, dom1);
            dom2.parentNode.insertBefore(dom1, dom2);
            tempDiv.parentNode.insertBefore(dom2, tempDiv);
            tempDiv.parentNode.removeChild(tempDiv);
        }

        /**
         * 显示 DOM 节点
         */
        public show(): void {
            DOMRoot.initDOMRoot(this.dp.stage);
            const rootDiv = DOMRoot.getDOMRoot();
            rootDiv.appendChild(this.node);

            this.domScaleX = DOMRoot.scaleX;
            this.domScaleY = DOMRoot.scaleY;
        }

        /**
         * 隐藏 DOM 节点
         */
        public hide(): void {
            const rootDiv = DOMRoot.getDOMRoot();
            if (rootDiv && rootDiv.parentNode) {
                rootDiv.parentNode.removeChild(rootDiv);
            }
        }

        /**
         * 绑定一个 DOM 元件
         * @element DOM 元件，不要修改此元件的 style 的位置、旋转、缩放、边框等属性
         */
        public bind(element: HTMLElement): void {
            this.unbind();

            this.element = element;
            this.element.style.width = "100%";
            this.element.style.height = "100%";
            initElementStyle(this.element);
            this.node.appendChild(element);
        }

        /**
         * 解绑 DOM 元件
         */
        public unbind(): void {
            if (this.element && this.element.parentNode == this.node) {
                this.node.removeChild(this.element);
            }
            this.element = null;
        }

        public updatePosition(): void {
            const displayObject = this.dp;

            if (displayObject.stage == null) {
                return;
            }

            let isVisible: boolean = true;
            let p = displayObject;
            while (p && p != displayObject.stage) {
                if (!p.visible || p.alpha == 0) {
                    isVisible = false;
                    break;
                }
                p = p.parent;
            }

            if (!isVisible) {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                    return;
                }
            } else {
                if (this.element && this.element.parentNode == null) {
                    this.node.appendChild(this.element);
                }
            }

            let _scalemode = egret.MainContext.instance.stage.scaleMode;
            const matrix = displayObject.$getConcatenatedMatrix();
            // let matrix = displayObject.$renderNode.renderMatrix;
            if (this.lastMatrix.a != matrix.a
                || this.lastMatrix.b != matrix.b
                || this.lastMatrix.c != matrix.c
                || this.lastMatrix.d != matrix.d
                || this.lastMatrix.tx != matrix.tx
                || this.lastMatrix.ty != matrix.ty
            ) {
                const transformKey = egret["web"]["getPrefixStyleName"]("transform");
                this.node.style.transformOrigin = "0% 0% 0px";

                switch(_scalemode){
                    case egret.StageScaleMode.FIXED_NARROW:
                        matrix.tx = matrix.tx * this.domScaleX;
                        matrix.ty = matrix.ty * this.domScaleY;
                        break;
                    case egret.StageScaleMode.EXACT_FIT:
                    case egret.StageScaleMode.FIXED_HEIGHT:
                    case egret.StageScaleMode.FIXED_WIDTH:
                    case egret.StageScaleMode.NO_BORDER:
                        break;
                    case egret.StageScaleMode.SHOW_ALL:
                    case egret.StageScaleMode.FIXED_WIDE:
                    default:
                        break;
                }

                this.node.style[transformKey] = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.tx + "," + matrix.ty + ")";

                this.lastMatrix.a = matrix.a;
                this.lastMatrix.b = matrix.b;
                this.lastMatrix.c = matrix.c;
                this.lastMatrix.d = matrix.d;
                this.lastMatrix.tx = matrix.tx;
                this.lastMatrix.ty = matrix.ty;
            }

            let width = displayObject.width;
            let height = displayObject.height;

            
            switch(_scalemode){
                case egret.StageScaleMode.FIXED_NARROW:
                    width = width * this.domScaleX;
                    height = height * this.domScaleY;
                    break;
                case egret.StageScaleMode.EXACT_FIT:
                case egret.StageScaleMode.FIXED_HEIGHT:
                case egret.StageScaleMode.FIXED_WIDTH:
                case egret.StageScaleMode.NO_BORDER:
                    break;
                case egret.StageScaleMode.SHOW_ALL:
                case egret.StageScaleMode.FIXED_WIDE:
                default:
                    break;
            }

            if (this.lastWidth != width) {
                this.node.style.width = width + "px";
                this.lastWidth = width;
            }
            
            if (this.lastHeight != height) {
                this.node.style.height = height + "px";
                this.lastHeight = height;
            }
        }
    }
}
