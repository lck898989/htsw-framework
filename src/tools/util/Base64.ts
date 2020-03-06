/*
  *  Base64的解码
 */

namespace Base64 {
    export function base64_Decode(input: string): string {
        const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // private method for UTF-8 decoding
        const utf8Decode: Function = function(utftext: string) {
            let str = "";
            let i2 = 0;
            let c = 0;
            const c1 = 0;
            let c2 = 0;
            while ( i2 < utftext.length ) {
                c = utftext.charCodeAt(i2);
                if (c < 128) {
                    str += String.fromCharCode(c);
                    i2++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i2 + 1);
                    str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i2 += 2;
                } else {
                    c2 = utftext.charCodeAt(i2 + 1);
                    const c3 = utftext.charCodeAt(i2 + 2);
                    str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i2 += 3;
                }
            }
            return str;
        };

        // public method for decoding
        let output = "";
        let chr1: number;
        let chr2: number;
        let chr3: number;
        let enc1: number;
        let enc2: number;
        let enc3: number;
        let enc4: number;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = utf8Decode(output);
        return output;
    }

    // 加码
    export function base64_Encode(input: string): string {
        const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // private method for UTF-8 encoding
        const utf8Encode: Function = function(str: string) {
            str = str.replace(/\r\n/g, "\n");
            let utftext = "";
            for (let n = 0; n < str.length; n++) {
                const c = str.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        };

        let output = "";
        let chr1: number;
        let chr2: number;
        let chr3: number;
        let enc1: number;
        let enc2: number;
        let enc3: number;
        let enc4: number;

        let i = 0;
        input = utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
}

