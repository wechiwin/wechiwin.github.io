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



