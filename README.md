# uni-app-vu3-tailwindcss-typescript-cli-template

#### 运行到浏览器教程
1. npm install
2. npm run dev:h5
---------

#### 运行到安卓基座教程
1. npm run dev:app
2. 打开HBuilderX，将项目完整拖入
3. 【运行】>【运行到手机或模拟器】>【运行到Android App基座】
---------

#### uni-app更新打包程序教程
###### 目前来说只能手动，官方提供的npx @dcloudio/uvm命令，无效！<br/>找到 [@dcloudio/uni-app](https://www.npmjs.com/package/@dcloudio/uni-app) 库的最新版本替换本地的[@dcloudio/uni-app]版本对应的所有库。

---------

#### 安卓生成凭证教程
1.  windows下安装docker客户端
2.  docker pull openjdk
3.  docker run -it --name java openjdk
4.  docker exec -it java
5.  cd /opt
6.  输入：``` keytool -genkey -alias testalias -keyalg RSA -sigalg SHA1WithRSA -validity 36500 -keysize 1024 -keystore test.keystore -v  ``` 
<br/> 命令参见：[https://blog.csdn.net/boss666666/article/details/10284623](https://blog.csdn.net/boss666666/article/details/10284623)
<br/>回车后DOS内容参见[https://ask.dcloud.net.cn/article/35777](https://ask.dcloud.net.cn/article/35777)，切记2次密码要相同

7.  输入：``` keytool -importkeystore -srckeystore ./test.keystore -destkeystore ./test.keystore -deststoretype JKS ```, 成功后/opt目录会有2个凭证
<br/>上述6-7若有疑问，参见[https://zhuanlan.zhihu.com/p/499813377](https://zhuanlan.zhihu.com/p/499813377)
8.  docker cp java:/opt D:/ 复制凭证到本地，至此结束。
---------

#### 项目目录说明

build/: 存放打包相关的文件，比如：CMD命令打包配置文件、安卓凭证、系统图标等资源。<br/>
dist/ unpackage/：启动或打包项目，会自动生成。<br/>
src/：代码资源文件夹。 <br/>
* components/ 公共组件
* constants/ 常量
* fetch/ 接口配置和请求
* pages/ 页面
* static/ 页面相关的静态资源
* store/ pinia状态共享库，TODO: 做持久化
* style/ 小程序基础组件样式库+tailwind原子化css定制的系统样式库
* tool/ 工具库
---------

#### 项目依赖介绍

* Vue^3
* Pinia^2
* vue-i18n^9 多语言不做考虑
* eslint
* sass node-sass
* postcss-rem-to-responsive-pixel/weapp-tailwindcss-webpack-plugin 为后续小程序做准备

