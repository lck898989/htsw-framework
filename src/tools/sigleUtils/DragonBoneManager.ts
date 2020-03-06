/** 龙骨动画管理列 */
class DragonBoneManager {
	public constructor() {
		this._hash = new HashMap();
	}

    /** 记录是否加载过龙骨资源 */
	_hash:HashMap;

	/** 获取龙骨动画
	 * @param dbName  			龙骨文件名称
	 * @param armatureName      骨架名称 
	 */
	public getDBArmature( dbName:string,armatureName:string):dragonBones.Armature
	{
		this.makeDragonData(dbName);

		let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
  
		//let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay("Armature");
        if(dbName == "suiphd")
			dbName += "_ske";
		else if(dbName == "ssxg")
			dbName += "_ske_2";
		else if(dbName == "ksxg1")
			dbName = "ksxg_ske";
		var armature = egretFactory.buildArmature(armatureName,dbName);
        var armatureDisplay = armature.getDisplay();
		dragonBones.WorldClock.clock.add(armature);

		return armature;
	}

	/** 给龙骨类工厂添加数据 */
	private  makeDragonData(dbName:string):void
	{
		if(this._hash.containsKey(dbName))
		{
			return;
		}

		var dragonbonesData = RES.getRes( dbName + "_ske_json" );  
        var textureData = RES.getRes( dbName + "_tex_json" );  
        var texture = RES.getRes( dbName + "_tex_png" );

		let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
        egretFactory.parseDragonBonesData(dragonbonesData);  
        egretFactory.parseTextureAtlasData(textureData, texture);

		this._hash.put(dbName,1);
	}
	
	
	private static instance:DragonBoneManager;
    
    public static getInstance(): DragonBoneManager {
        if (DragonBoneManager.instance == null) {
            DragonBoneManager.instance = new DragonBoneManager();
        }
        return DragonBoneManager.instance;
    }
}