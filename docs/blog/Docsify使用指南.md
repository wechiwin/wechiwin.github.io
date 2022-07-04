> 前提：需要安装node和npm。基础知识请浏览docsify的官方教程。

安装 Docsify

```bash
npm i docsify-cli -g
```

创建项目文件夹（名字注意和repository的名字一致），在项目文件夹内，初始化docsify

```bash
docsify init ./docs
```

这时会在文件夹下生成一些文件

本地预览

```bash
# 在docs文件夹里面可以直接用 docsify serve
docsify serve docs
```

修改生成文件的 index.html，添加侧边栏

```js
window.$docsify = {
  loadSidebar: true,
  name: '',
  repo: ''
}
```

自动生成侧边栏导航文件

```bash
# 在docs文件夹里面可以直接用 docsify generate
docsify generate docs
```

> 使用这个命令生成的md文件，并没有严格按照我的目录路径生成，需要自己手动修改一下。这个方式也只适用于第一次将博客搬运过来，就不需要手写很多侧边栏的导航。之后的话，还是需要手写侧边栏。

开启全文搜索

```javascript
<script>
  window.$docsify = {
  loadSidebar: true,
  name: 'Ray Wei\'s Wiki',
  repo: '',
  search: 'auto', // 开启全文搜索(需要搭配下面的js代码)
  auto2top: true // 开启页面跳转自动回到页面顶部
}
</script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>

```

更换主题

目前的第三方主题，选择不是特别多。

```html
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css"> -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/buuing/docsify-theme-blue/index.css" />
</head>
```

做完以上步骤，项目目录的基本结构如下

```
.
├── README.md
├── docs
│   ├── README.md
│   ├── _sidebar.md
│   ├── index.html
│   ├── .nojekyll
│   ├── .vuepress
```

再用本地预览看下，没有问题就开始上传到github。

上传代码到github

```bash
# 在项目文件夹下
git init
# 提交
git add
# git push git@github.com:你的githubID/项目名称 master
git push git@github.com:wechiwin/wechiwin.github.io.git master
```

进入github网页，找到刚刚上传的repository，打开setting，打开侧边栏中的pages。确保source中的branch是刚刚使用的master，文件夹要从`/`选择成`/docs`。

如果有自己的域名，需要在下面的Custom domain中输入自己的域名，点击save。关于自己域名的dns设置，请参考vuepress那篇文章，已经很清晰了。

更新1.1

增加了toc，但是此插件无法兼容第三方主题，所以还是用回默认的主题了。

https://github.com/justintien/docsify-plugin-toc

更新1.2

增加了更新时间的插件，同时加了一些代码语言高亮的插件

https://github.com/pfeak/docsify-updated

更新1.3

发现更新的内容没有及时更新，猜测是因为没有更新部署，尝试一下使用vercel。

https://vercel.com/

注册什么的都很简单，这里详细说一下域名解析的事情，因为之前使用github pages绑定域名。

将项目引入vercel后，在setting中的domain里输入自己的域名，vercel会生成两条解析指引。

![image-20220704195559930](https://s2.loli.net/2022/07/04/TJax8H9o4tvmC5O.png)

![image-20220704195839268](https://s2.loli.net/2022/07/04/U2Z5VGRbs9F3kQ7.png)

进入namesilo的域名管理，将之前的解析全部删除，然后根据vercel给的重新添加。

等待大概半个小时之后，再回到vercel，域名的解析已经更新完毕了，重新部署一次就可以了。	

https://aaron-ai.com/docs/accelerate_github_pages_by_vercel/

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <!-- head -->
  <link rel="stylesheet" href="https://unpkg.com/docsify-plugin-toc@1.3.1/dist/light.css">
  <!-- Also insert you custom css -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/buuing/docsify-theme-blue/index.css" /> -->
</head>

<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: 'Ray Wei\'s Wiki',
      repo: '',
      search: 'auto', // 开启全文搜索(需要搭配下面的js代码)
      auto2top: true,
      loadSidebar: true,
      routerMode: 'history', // 默认是hash，history可以去掉链接中的#
      toc: {
        tocMaxLevel: 5,
        target: 'h1, h2, h3, h4, h5'
      },
      timeUpdater: {
        text: "<div align='left' width='200px' style='color:gray;font-size:16px'>Posted @ {docsify-updated}</div>",
        formatUpdated: "{YYYY}-{MM}-{DD} {HH}:{mm}",
      },
    }
  </script>
  <!-- Docsify v4 -->
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
  <!-- plugin begin -->
  <!-- toc -->
  <script src="https://unpkg.com/docsify-plugin-toc@1.3.1/dist/docsify-plugin-toc.min.js"></script>
  <!-- search -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
  <!-- copy code -->
  <script src="//cdn.jsdelivr.net/npm/docsify-copy-code"></script>
  <!-- sidebar collapse -->
  <script src="//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/docsify-sidebar-collapse.min.js"></script>
  <!-- update time -->
  <script src="https://cdn.jsdelivr.net/npm/docsify-updated/src/time-updater.min.js"></script>
  <!-- for code -->
  <script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-bash.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-java.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-sql.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-json.min.js"></script>
  <!-- plugin end -->
</body>

</html>
```

其他可以引入的插件

```html
<script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
<!-- 代码拷贝 -->
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-themeable/dist/js/docsify-themeable.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-tabs/dist/docsify-tabs.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/external-script.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-bash.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-java.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-go.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-c.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-cpp.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-latex.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-sql.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-json.min.js"></script>
```



