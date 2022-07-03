> macOS 10.14.5 

## 1. 检查网络

尝试在浏览器中打开下面的网页。

https//raw.githubusercontent.com/Homebrew/install/master/install

如果能打开，说明网络没有问题。如果不能打开，说明网络有问题，需要使用VPN或者修改hosts文件。

> 修改hosts文件可以参考：[MAC OS-X homebrew安装报错：Failed to connect 443](https://zhuanlan.zhihu.com/p/137025155)

## 2. 检查环境

卸载 command line tools

```bash
sudo rm -rf /Library/Developer/CommandLineTools
```

安装 command line tools

```bash
sudo xcode-select --install
```

在跳出来的选项框中直接选择`install`即可。



重试安装homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

网上有很多安装成功的案例，但是我这里依旧报错443。

于是在网上搜索，解决办法如下：

打开[homebrew主页](https://brew.sh/)安装命令里的网址：https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh

右键另存为`install.sh`脚本文件，然后在终端输入

```bash
/bin/bash path-to/install.sh

# 例如
/bin/bash ~/Desktop/install.sh
```

然后输入开机密码，就开始安装了。



## 3. brew install

如果在安装软件中出现了443的情况，需要修改host文件

```bash
sudo vim /etc/hosts

#将下面这行粘贴进 host 文件中
199.232.4.133 raw.githubusercontent.com
```

```
185.199.108.154              github.githubassets.com
140.82.112.21                central.github.com
185.199.108.133              desktop.githubusercontent.com
185.199.108.153              assets-cdn.github.com
185.199.108.133              camo.githubusercontent.com
185.199.108.133              github.map.fastly.net
199.232.69.194               github.global.ssl.fastly.net
140.82.112.4                 gist.github.com
185.199.108.153              github.io
140.82.114.4                 github.com
140.82.113.5                 api.github.com
185.199.108.133              raw.githubusercontent.com
185.199.108.133              user-images.githubusercontent.com
185.199.108.133              favicons.githubusercontent.com
185.199.108.133              avatars5.githubusercontent.com
185.199.108.133              avatars4.githubusercontent.com
185.199.108.133              avatars3.githubusercontent.com
185.199.108.133              avatars2.githubusercontent.com
185.199.108.133              avatars1.githubusercontent.com
185.199.108.133              avatars0.githubusercontent.com
185.199.108.133              avatars.githubusercontent.com
140.82.113.9                 codeload.github.com
52.217.167.1                 github-cloud.s3.amazonaws.com
52.216.9.155                 github-com.s3.amazonaws.com
52.217.223.25                github-production-release-asset-2e65be.s3.amazonaws.com
52.217.163.105               github-production-user-asset-6210df.s3.amazonaws.com
52.216.176.139               github-production-repository-file-5c1aeb.s3.amazonaws.com
185.199.108.153              githubstatus.com
64.71.144.202                github.community
185.199.108.133              media.githubusercontent.com
```



## 参考教程：

[MAC OS-X homebrew安装报错：Failed to connect 443](https://zhuanlan.zhihu.com/p/137025155)

[latest command line tools available for macos mojave?](https://apple.stackexchange.com/questions/419621/latest-command-line-tools-available-for-macos-mojave)

[Mac平台 Brew 安装的坎坷之路 – 解决 port 443 错误](https://www.codenong.com/cs106599190/)

[Homebrew installation on Mac OS X Failed to connect to raw.githubusercontent.com port 443](https://stackoverflow.com/a/61284722/17952492)

https://segmentfault.com/a/1190000019492961

[解决安装homebrew时候的443错误](https://cloud.tencent.com/developer/article/1765050)