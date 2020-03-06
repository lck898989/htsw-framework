/**
 * 动画类
 */
class ActMovie {


    public static getInstance(): ActMovie {
        if (ActMovie.instance == null) {
            ActMovie.instance = new ActMovie();
        }

        return ActMovie.instance;
    }

    private static instance: ActMovie;


    public constructor() {
    }


    /** 得到帧动画 */
    public getMovieClip(resName: string, movieName: string): egret.MovieClip {
        const jsonName: string = resName + "_json";
        const _mcData: any = RES.getRes(jsonName);
        const _mcTexture: egret.Texture = RES.getRes(resName + "_png");

        const mcDataFactory = new egret.MovieClipDataFactory(_mcData, _mcTexture);
        const movie: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(movieName));
        return movie;
    }


}
