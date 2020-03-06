cd ../CoursewareModule
git reset --hard HEAD
git clean -dfx
git pull
echo "========>>CoursewareModule更新成功<<========"

cd ../Courseware_Framework
git reset --hard HEAD
git clean -dfx
git pull
echo "========>>Courseware_Framework更新成功<<========"

cd ../htsw-framework

oldversion=$(grep "FrameworkVersion" /Users/liuxiaomeng/Desktop/htsw_git/htsw-framework/src/config/BaseDefines.ts |awk -F ' = ' '{print $2}'|awk -F ';' '{print $1}')
newversion=$(grep "FrameworkVersion" /Users/liuxiaomeng/Desktop/htsw_git/htsw-framework/src/config/BaseDefines.ts |awk -F ' = ' '{print $2}'|awk -F ';' '{print $1}'|awk '{print $0+1}')
sed 's/'$oldversion'/'$newversion'/g' /Users/liuxiaomeng/Desktop/htsw_git/htsw-framework/src/config/BaseDefines.ts > /Users/liuxiaomeng/Desktop/htsw_git/htsw-framework/src/config/BaseDefines.out
mv /Users/liuxiaomeng/Desktop/htsw_git/htsw-framework/src/config/BaseDefines.out /Users/liuxiaomeng/Desktop/htsw_git/htsw-framework/src/config/BaseDefines.ts

egret build ./

rm -rf ../Courseware_Framework/libs/htsw_framework/htsw_framework.min.js
rm -rf ../Courseware_Framework/libs/htsw_framework/htsw_framework.js
rm -rf ../Courseware_Framework/libs/htsw_framework/htsw_framework.d.ts
cp bin/htsw_framework.min.js ../Courseware_Framework/libs/htsw_framework
cp bin/htsw_framework.js ../Courseware_Framework/libs/htsw_framework
cp bin/htsw_framework.d.ts ../Courseware_Framework/libs/htsw_framework
echo "========>>工程内项目更新成功<<========"

rm -rf ../CoursewareModule/libs/htsw_framework/htsw_framework.min.js
rm -rf ../CoursewareModule/libs/htsw_framework/htsw_framework.js
rm -rf ../CoursewareModule/libs/htsw_framework/htsw_framework.d.ts
cp bin/htsw_framework.min.js ../CoursewareModule/libs/htsw_framework
cp bin/htsw_framework.js ../CoursewareModule/libs/htsw_framework
cp bin/htsw_framework.d.ts ../CoursewareModule/libs/htsw_framework
echo "========>>模板内项目更新成功<<========"

cd ../CoursewareModule
git add .
git commit -am "htsw-framework上传更新包，版本号为:"$newversion
git push
echo "========>>CoursewareModule上传htsw-framework更新<<========"

cd ../Courseware_Framework
git add .
git commit -am "htsw-framework上传更新包，版本号为:"$newversion
git push
echo "========>>Courseware_Framework上传htsw-framework更新<<========"

cd ../htsw-framework
git add .
git commit -am "htsw-framework上传更新包，版本号为:"$newversion
git push
echo "========>>htsw-framework上传htsw-framework更新<<========"
