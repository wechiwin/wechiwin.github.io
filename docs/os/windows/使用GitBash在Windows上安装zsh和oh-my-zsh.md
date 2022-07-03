> cmd简直太丑了...

## 1. 安装Windows Terminal

https://github.com/microsoft/terminal

下载，安装即可。注意：现在已经自带右键在终端中打开了，不需要重复设置 。

## 2. 安装Git

https://gitforwindows.org/

如果之前安装过也要重新安装，需要在安装的时候选择： **add a Git Bash profile to Windows Terminal** 。

同时，记一下安装目录，之后需要用到。

## 3. 下载zsh

https://packages.msys2.org/package/zsh?repo=msys&variant=x86_64

点击 File 后面的链接即可下载，我下载的时候是 .zst 后缀，旧版本的 Bandzip 6.2x 没办法打开，需要下载另外的解压缩软件。

https://github.com/mcmilk/7-Zip-zstd/releases

下载最新版安装，右键就可以用此软件解压缩。

解压缩里面依旧是压缩包，继续双击就可以得到zsh的安装文件。

将zsh安装文件复制到Git安装文件夹。

## 4. 配置zsh

打开Git Bash，输入zsh，然后按照命令行的提示选择。

> 懒得重现了，把其他人的直接copy过来...

- To configure the history, press `1`, change the values if you like by pressing `1-3`, and then press `0`.
- To configure the completion, press `2` to “Use the new completion system”, and then press `0`.
- Press `0` to save the settings.

如果没有出现任何提示选择 或者想重新设置，那么就按照以下顺序输入代码：

```bash
autoload -U zsh-newuser-install
zsh-newuser-install -f
```

## 5. 将zsh设置为Git Bash的默认终端

编辑 `~/.bashrc`，没有的话也可以设置 `Git安装目录下的bash.bashrc，例如：C:\Program Files\Git\etc\bash.bashrc`，在最后加入下面的代码。

```bash
# Launch Zsh
if [ -t 1 ]; then
exec zsh
fi
```

重启 Git Bash 就能默认以 zsh 启动。

## 6. 安装oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# 或者
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

当然，又又又又被 443 了，依旧用老方法。直接复制https链接到浏览器，右键将sh文件保存在本地，然后在sh所在文件夹内的空白处右键，选择Git Bash here。

```bash
sh ./install.sh
```

安装完成后会提示这个版本已经被淘汰，不用管。

## 7. 安装插件

> 记录一下踩的坑：参考自己之前mac的教程，git clone git://github.com/zsh-users/zsh-autosuggestions，命令行报错 ：
>
> fatal: unable to connect to github.com:github.com[0: 140.82.112.4]: errno=Unknown error
>
> 解决方案，clone时不要使用git开头的链接，使用https链接就行了。

```bash
# 任意位置运行即可
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

修改 `C:\Users\Administrator\.zshrc`

```bash
# zsh-syntax-highlighting 必须在最后一行
plugins=(
git
zsh-autosuggestions
zsh-syntax-highlighting
)
```

## 8. 设置默认和右键

**将 Git Bash 设置为 Windows Terminal 默认终端**

打开 Windows Terminal，点击加号旁边向下的箭头，点击设置。

点击启动，在默认配置文件中选择 Git Bash。

![image-windowsTerminal-001](https://s2.loli.net/2022/05/18/WzpjM84YDVnSmfB.png)

<br/>

> 关于主题：暂时使用了默认的主题，spaceship主题会报错。

<br/>

<br/>

<br/>

## 参考链接

[oh-my-zsh和iTerm2美化及配置](https://wechiwin.com/oh-my-zsh-iterm2/)

[一文搞定 Windows Terminal 设置与 zsh 安装【非WSL】](https://zhuanlan.zhihu.com/p/455925403)

[Install Terminal + git-bash + zsh + oh-my-zsh on Windows 10](https://miaotony.xyz/2020/12/13/Server_Terminal_gitbash_zsh/)

[Installing Zsh (and oh-my-zsh) in Windows Git Bash](https://dominikrys.com/posts/zsh-in-git-bash-on-windows/)

[Git bash 安装 pacman & Windows 解压 zst 文件](http://i.lckiss.com/?p=7654)