/**
 * Created by ASUS on 15-2-9.
 */
namespace zmovie {
    export class ZImage extends  egret.DisplayObjectContainer {
        public imgDepth: number;
        public displayLibName: string;
        private img: egret.Bitmap;
        public constructor(t: egret.Texture) {
            super();
            this.img = new egret.Bitmap();
            this.addChild(this.img);
            this.setTexture(t);
        }

        public setTexture(t: egret.Texture): void {
            this.img.texture = t;
        }

        public setScale(s: number): void {

            this.img.scaleX = 1 / s;
            this.img.scaleY = 1 / s;
        }


    }
}
