/**
 * 场景切换特效类
//切换场景的特效
//1.卷帘特效
//2.左右切换移动
//3.直接翻
//4.旋转掉落
//5.随机一种
 */

namespace ScreenMovies {
    // 当前舞台
    export function MovieStart(_txnums) {
        // 创建一个截图Bitmap
        const taget = GM.gamec.curStage();
        const w = GM.gamec.curWidth();
        const h = GM.gamec.curHeight();

        // 新建一个group
        const loadTxGrp = new eui.Group();
        loadTxGrp.width = w;
        loadTxGrp.height = h;
        taget.addChild(loadTxGrp);

        // 循环创建多个截图bitmap 这里num自由设置
        const tx1Number = 40;
        // 每个横着的数量
        const Xnumber = 5;
        // 高数量自动计算
        const Ynumber = tx1Number / Xnumber;

        const _mcW = Math.floor(w / Xnumber);
        const _mcH = Math.floor(h / Ynumber);

        for (let i = 0; i < tx1Number; i++) {
            // 计算每个的XY及宽高
            const _mcX = i % Xnumber * _mcW;
            const _mcY = Math.floor(i / Xnumber) * _mcH;

            const renderTexture: egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(taget, new egret.Rectangle(_mcX, _mcY, _mcW, _mcH));

            const bmp = new egret.Bitmap();
            bmp.texture = renderTexture;
            bmp.x = _mcX + 10;
            bmp.y = _mcY + 10;
            loadTxGrp.addChild(bmp);

            if (_txnums == 5) {
                _txnums = Math.ceil(Math.random() * 4);
            }

            // 开始特效
            switch (_txnums) {
                case 1:
                    const tw1 = egret.Tween.get(bmp);
                    tw1.to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 359 }, 800, egret.Ease.circIn).call(onComplete, this);
                    break;
                case 2:
                    let my_x = -w;
                    if (!(i % 2)) {
                        my_x = w * 2;
                    }
                    const tw2 = egret.Tween.get(bmp);
                    tw2.to({ x: my_x, alpha: 0 }, 800, egret.Ease.circIn).call(onComplete, this);
                    break;
                case 3:
                    const tw3 = egret.Tween.get(bmp);
                    tw3.to({ scaleX: 0.2, scaleY: 1, alpha: 0, blurFliter: 0 }, 800, egret.Ease.backInOut).call(onComplete, this);
                    break;
                case 4:
                    const tw4 = egret.Tween.get(bmp);
                    tw4.to({ alpha: 0}, 900, egret.Ease.circIn).call(onComplete, this);
                    break;
                default:
                    const tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 1, scaleY: 0, alpha: 0 }, 800, egret.Ease.circIn).call(onComplete, this);
            }
        }

        let upNumber = 0;
        function onComplete(evt: Comment) {
            upNumber++;
            if (upNumber == tx1Number) {
                taget.removeChild(loadTxGrp);
            }
        }
    }
}
