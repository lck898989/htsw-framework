
/**
 *  游戏中玩家数据类的管理类
 */

class PlayerManager {

    //role:用户角色，-1-回放者，0-老师，1-助教，2-学生，4-巡课
    public role:number = -2;

    constructor() {
        
    }

    public init(): void {
        let _param = this.getParamData();
        this.role = _param.role;
    }

    public getParamData(): any {
        let search = window.location.search;	//获取location的search属性，保存在search中
        let params = {};		//创建空对象params
        if(search != ""){		//如果search不是空字符串
            search.slice(1).split("&").forEach(	//?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
                function(val){
                    var arr=val.split("=");		//将当前元素值按=切割，保存在arr中
                    params[arr[0]]=arr[1];		//向params中添加一个元素,属性名为arr[0],值为arr[1]
                }
            );
        }
        return params;		//返回params
    }


}
