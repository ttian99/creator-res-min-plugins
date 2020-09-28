# creator-res-min-plugins
cocos-creator自动压缩图片资源插件, 项目构建完成后，自动去压缩对应发布平台的图片资源。

## 使用
### 1.使用前准备
第一次使用前需要安装项目依赖,在creator顶部选择: res-min-->安装依赖
### 2.自动压缩
在项目发布完成后，自动去压缩对应构建的平台的图片资源。
### 3.配置面板
在顶creator部选择：res-min-->打开配置面板
可以打开压缩配置面板，目前有4个参数可配置:
- 自动压缩：默认勾选，取消勾选则不会自动压缩了。
- 启用缓存：默认勾选，用于监控资源，勾选后只会压缩发生修改变化的资源文件。
- png格式图片品质: 设置png格式图片品质（1-100），数值越小，压缩比率越高；建议50
- jpg格式图片品质: 设置jpg格式图片品质（1-100），数值越小，压缩比率越高；建议70

## 4.下载和建议地址
- 插件地址： https://github.com/ttian99/creator-res-min-plugins
- issues地址：https://github.com/ttian99/creator-res-min-plugins/issues

## 问题
- 插件不断重启问题原因：1.使用了不规范的路径 2.fs、path等内置模块冲突改用大写Fs、Path