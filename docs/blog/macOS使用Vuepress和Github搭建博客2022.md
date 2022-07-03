> Vuepress 1.x  Node.js 12.22.10  Git 2.15.0. MacOS 10.14.5
>

关于GitHub仓库的创建等操作可以参考Hexo那篇文章。

## 初始化

创建一个文件夹，例如 MyBlog ，然后在终端切到该目录，执行：

```bash
yarn create vuepress-site
```

跑完进度条后会问你几个问题，都可以不填，直接回车。

然后在 MyBlog 文件夹下，会生成 docs 文件夹

```bash
cd docs
# yarn方法安装，也可以参考官网使用npm安装
yarn install
# 本地预览
yarn dev
```

此时已经可以预览网页了，http://localhost:8080/ ，出现页面之后 Ctrl + c 断开。

## 安装主题

这里以 reco 主题为例，不需要切目录，还是在docs目录下执行：

```bash
yarn add vuepress-theme-reco
```

在 src/.vuepress/config.js 中修改主题为reco

```js
module.exports = {
  theme: 'reco'
}  
```

## 修改配置

Vuepress 对前端新手或者小白来说没有 Hexo 那么友好，网上的教程也不接地气。鄙人不才，琢磨了一天才搞明白，还遇到了ssh的大坑。

以上步骤做完之后，目录如下，根目录是 src。（我使用的 IDEA 管理项目，也可以用VSCode）

<img src="https://s2.loli.net/2022/05/18/YZ6TCN8gk2SDaQ4.png" alt="blog005" style="zoom:67%;" />

主页的一部分内容可以在 index.md 中修改，其他大部分的网站设置都在 .vuepress/config.js 中修改。

我的 [index.md](https://raw.githubusercontent.com/wechiwin/VuepressBlog/master/docs/src/index.md)

我的 [config.js](https://github.com/wechiwin/VuepressBlog/blob/master/docs/src/.vuepress/config.js)



## 部署

在根目录 src 下创建 deploy.sh

>如果你创建了其他名字的仓库，则在config.js下 `base` 需按如下格式填写，代码中`XXX` 为你的 Github 用户名，`XXXX`为仓库名。
>
>```
>base: https://XXX.github.io/XXXX/,
>```

```shell
# 确保脚本抛出遇到的错误
set -e

# 打包生成静态文件
npm run build

# 进入打包好的文件夹
cd src/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# 创建git的本地仓库，提交修改
git init
git add -A
git commit -m 'deploy'

# 覆盖式地将本地仓库发布至github，因为发布不需要保留历史记录
# 格式为：git push -f git@github.com:'用户名'/'仓库名'.git master
git push -f git@github.com:wechiwin/wechiwin.github.io.git master

# 如果发布到 https://XXX.github.io/XXXX
# git push -f git@github.com:XXX/XXXX.git master:gh-pages

# 回到docs目录
cd -
```

修改 src/package.json

```json
"scripts": {
    "dev": "vuepress dev src",
    "build": "vuepress build src",
    "deploy": "sh deploy.sh"
  },
```



## 遇到的问题

ssh_exchange_identification: Connection closed by remote host; ssh_exchange_identification: read: Connection reset by peer

解决办法：

在 ssh 文件夹下创建 config ，将 GitHub 的host等信息放进去。

```bash
vim ~/.ssh/config
```

粘贴如下内容：

```
Host github.com
 Hostname ssh.github.com
 Port 443
```

> 其他可能有用的方法：
>
> 重启路由器，确定自己设置ssh的路由器和现在使用的路由器是同一个，确定自己没有网线和路由器混用。
>
> 其他可能会有用的参考链接：
>
> https://www.v2ex.com/t/290545#reply17
>
> https://www.jianshu.com/p/59811ae18799
>
> https://discussions.apple.com/thread/1546914
>
> https://stackoverflow.com/questions/10127818/ssh-exchange-identification-connection-closed-by-remote-host-under-git-bash/60994276#60994276

Language does not exist: mysql

该报错是因为md文件中，代码块选择了mysql语言，将mysql语言换成sql语言即可。

## 修改主题

### 去掉主页 footer 的 reco-theme

找到 docs/node_modules/vuepress-theme-reco/components/Footer.vue

```js
<!-- 注释这几行 -->
<!--    <span>-->
<!--      <reco-icon icon="reco-theme" />-->
<!--      <a target="blank" href="https://vuepress-theme-reco.recoluan.com">{{`vuepress-theme-reco@${version}`}}</a>-->
<!--    </span>-->
```

### 宽度自适应

找到 docs/node_modules/vuepress-theme-reco/components/Page.vue ，将 maxwidth 修改为 100%

```js
.page-title
    //max-width: $contentWidth;
    max-width: 100%;
```

docs/node_modules/vuepress-theme-reco/styles/wrapper.styl

```js
$wrapper
  //max-width $contentWidth
  max-width 100%
```

### 修改正文字体大小

docs/node_modules/vuepress-theme-reco/styles/theme.styl

```js
body
  //font-size 15px
  font-size 18px
```







参考链接：

https://vuepress.vuejs.org/guide/getting-started.html

https://vuepress-theme-reco.recoluan.com/views/1.x/installUse.html

https://blog.csdn.net/u012967771/article/details/116055518

https://stackoverflow.com/questions/10127818/ssh-exchange-identification-connection-closed-by-remote-host-under-git-bash