/**
 *  处理JS字符的静态函数类
 *  主要功能
 *  处理字符串的一些静态函数
 */
namespace MyUtil {
   export class ST {
        /**
         *  字符串转Uint8的数组
         */
        public static stringToUint(str: string): Uint8Array {
            const uint: Uint8Array = new Uint8Array(str.length);
            for (let i = 0, j = str.length; i < j; ++i) {
                uint[i] = str.charCodeAt(i);
            }
            return uint;
        }

        /**
         *  将uint8数组转换成字符串
         */
        public static uint8Tostring(unit: Uint8Array): string {
            const encodedString = String.fromCharCode.apply(null, unit);
            const decodedString = decodeURIComponent(encodedString);

            return decodedString;
        }

        public static strToUTF8(str: string): any {
            if (typeof (str) !== "string") {
                throw new TypeError("toUTF8 function only accept a string as its parameter.");
            }
            const ret = [];
            let c1;
            let c2;
            let c3;
            let cc = 0;
            for (let i = 0, l = str.length; i < l; i++) {
                cc = str.charCodeAt(i);
                if (cc > 0xFFFF) { throw new Error("InvalidCharacterError"); }
                if (cc > 0x80) {
                    if (cc < 0x07FF) {
                        c1 = String.fromCharCode((cc >>> 6) | 0xC0);
                        c2 = String.fromCharCode((cc & 0x3F) | 0x80);
                        ret.push(c1, c2);
                    } else {
                        c1 = String.fromCharCode((cc >>> 12) | 0xE0);
                        c2 = String.fromCharCode(((cc >>> 6) & 0x3F) | 0x80);
                        c3 = String.fromCharCode((cc & 0x3F) | 0x80);
                        ret.push(c1, c2, c3);
                    }
                } else {
                    ret.push(str[i]);
                }
            }
            return ret.join("");
        }
    }


}
