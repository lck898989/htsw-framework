/**
 * @module Lcp
 * @class LEvent
 * @constructor
 */
namespace lcp {
    /**
     * 自定义事件类
     */
    export class LEvent extends egret.Event {
        public CLASS_NAME: string = "LEvent";
        private _obj: Object;
        public constructor(type: string, obj: Object = null, bubbles: boolean = false, cancelable: boolean = false) {
            super(type, bubbles, cancelable);
            if (obj) {
                this._obj = obj;
            }
        }

        public clone(obj?: Object): LEvent {
            return new LEvent(this.type, obj ? obj : this._obj, this.bubbles, this.cancelable);
        }

        public toString(): void {
            // tslint:disable-next-line: no-console
            // console.log(this.CLASS_NAME, "type", "bubbles", "cancelable");
        }

        /**
         * 传参获取
         * @returns {Object}
         */
        public get param(): Object {
            return this._obj;
        }

    }
}
