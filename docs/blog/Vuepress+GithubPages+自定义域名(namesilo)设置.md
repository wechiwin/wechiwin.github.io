## Vuepress

参考[官网](https://vuepress.vuejs.org/guide/deploy.html#github-pages)，在 deploy.sh 中加入

```shell
echo '你的网址' > CNAME
```

运行 deploy.sh



## Namesilo

> 购买的时候注意用1刀的 promo code，网上搜索就有了。

打开 namesilo 的 domain manager，点击蓝色小球，进入 manage dns 页面

![blog006](https://s2.loli.net/2022/05/18/R4miX8yBOIzPQbj.png)

往下翻，下面有很多 dns template，找到 GitHub，点击 apply template，然后点击 accept。

![blog011](https://s2.loli.net/2022/05/18/MxumQqsvkX6onZE.png)

删除自带的 CNAME 和 TXT，点击新增 CNAME，hostname 输入 www，target hostname 输入 GitHub 博客的网址，ttl 不用改，点击 submit 。

![blog007](https://s2.loli.net/2022/05/18/huJi9Ynywtc8a6q.png)

配置完成后如下

![blog013](https://s2.loli.net/2022/05/18/xCTLHUWovDGrIdz.png)

【注意】配置完成后，需要等待 30 分钟以上以保证解析生效并同步到全球 DNS 服务器上，不要马上去 GitHub Pages 验证解析是否生效。



## Github Pages

打开博客仓库

![blog012](https://s2.loli.net/2022/05/18/BRQodCHKgsmkc9N.png)



## 参考教程

[How To Add a Custom Domain To a GitHub Pages Site](https://nitratine.net/blog/post/how-to-add-a-custom-domain-to-a-github-pages-site/)

[续篇：GitHub Pages 自定义域名](https://www.menfre.info/2020/04/09/custome-domain-for-github-pages/)
