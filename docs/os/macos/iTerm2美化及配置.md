> macOS 10.14.5

Terminal 的白底黑字，找个东西真的让人瞅瞎......

最后的效果图如下：

![vim-color-setting-002](https://s2.loli.net/2022/05/18/rMbp8vyLoRVTz3f.png)

# 安装

## iTerm2安装

直接官网下安装包就好：https://iterm2.com/downloads.html

## 更新zsh

```bash
brew install zsh
```

## 切换 shell

```bash
# 其实也不用专门切换，安装 oh-my-zsh 会提示你切换
chsh -s /bin/zsh
# 需要切换回 bash 可以用下面的命令
# chsh -s /bin/bash
```

## 安装 oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# 或者
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

又被 443 了 所以还是用老方法

```bash
/bin/bash /path/to/install.sh
```

## 安装字体 PowerFonts

必须安装这个字体

```bash
# clone
git clone https://github.com/powerline/fonts.git --depth=1

# install
cd fonts
./install.sh

# clean-up a bit
cd ..
rm -rf fonts
```

在 iTerm2 --> preference --> Profiles--> text 中应用字体，搜索 powerline 即可

## 安装插件

网上推荐比较多的两个。

插件集合：https://asmcn.icopy.site/awesome/awesome-zsh-plugins/

```bash
cd ~/.oh-my-zsh/plugins

git clone git://github.com/zsh-users/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
```

## 修改配置

```bash
vim ~/.zshrc

# zsh-syntax-highlighting 必须在最后一行
plugins=(
git
zsh-autosuggestions
zsh-syntax-highlighting
)
```

# 主题

## 安装主题

还有很多主题：https://iterm2colorschemes.com/ ，这里使用了少数派文章中推荐的 spaceship。

```bash
cd ~/.oh-my-zsh/themes

git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1

ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

## 修改配置

```bash
vim ~/.zshrc

# 修改为如下配置
# ZSH_THEME="spaceship"

source ~/.zshrc
```

更多配置请参考spaceship主题官方文档：https://spaceship-prompt.sh/options/

# 设置 vim 配色

参考了网上挺多帖子，发现支持 vim 配色的好像只有 solarized（也可能是我没发现其他的吧）。照着捣鼓了一下，觉得效果并不好。

如果和我一样，对配色没有那么强迫症的可以参考下面的设置。

```bash
vim ~/.vimrc

# 添加如下语句
syntax enable
```

效果如图，其实大部分都能区分开了。

<img src="https://s2.loli.net/2022/05/18/lsBeTbNS5n8IcyP.png" alt="vim-color-setting-001" style="zoom:80%;" />

# 快捷指令

## 自动补全

iterm2 能记住上次输入的类似的指令，并给以提示

<img src="https://gitee.com/rayywei/blog-image/raw/master/vim-color-setting-003.png" style="zoom:80%;" />

按向右箭头，iterm2会自动帮忙补全

## 其他

```
command + enter 进入与返回全屏模式
command + t 新建标签
command + w 关闭标签
command + 数字 command + 左右方向键    切换标签
command + enter 切换全屏
command + f 查找
command + d 水平分屏
command + shift + d 垂直分屏
command + option + 方向键 command + [ 或 command + ]    切换屏幕
command + ; 查看历史命令
command + shift + h 查看剪贴板历史
ctrl + u    清除当前行
ctrl + l    清屏
ctrl + a    到行首
ctrl + e    到行尾
ctrl + f/b  前进后退
ctrl + p    上一条命令
ctrl + r    搜索命令历史
```

# 问题

## zsh: command not found: hexo

切回bash，并重启terminal

```bash
npm root -g
# 获取node_modules地址
# /Users/raywei/.nvm/versions/node/v12.22.10/lib/node_modules
```

修改 path

```bash
vim .bash_profile

# 添加 PATH
export PATH="$PATH:/Users/raywei/.nvm/versions/node/v12.22.10/lib/node_modules/hexo-cli/bin"

source .bash_profile
```

> 也可以去修改 `~/.zshrc` 或者 `~/.bashrc`，在里面添加上述命令，然后 source ~/.zshrc

切回 zsh，没解决，还是不行。

```bash
vim .zshrc

# 添加 PATH
export PATH="$PATH:/Users/raywei/.nvm/versions/node/v12.22.10/lib/node_modules/hexo-cli/bin"

source .zshrc
```

解决。

> 参考教程：[Mac Hexo安装后 command not found: hexo的解决方法](https://juejin.cn/post/6952783421034725412)

**疑问**：怎么将 bash_profile 的内容实时更新到 zshrc

<br/>

<br/>

<br/>

参考教程

[iTerm2 配置](https://learnku.com/articles/46614)

[iTerm2 配置和美化](https://sspai.com/post/63241)

待参考教程

https://juejin.cn/post/6986536361679388680

https://moyand.gitee.io/2020/01/15/%E6%95%99%E7%A8%8B/Mac-Iterm2%E7%A5%9E%E5%99%A8/

