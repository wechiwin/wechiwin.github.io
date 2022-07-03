## Mac 安装

### Homebrew

```bash
brew install nvm
```



## 解决 Failed to connect port 443

在浏览器中打开

https://github.com/nvm-sh/nvm/blob/v0.39.1/install.sh

然后复制代码，保存

打开终端

```bash
# /bin/bash install.sh的路径
/bin/bash ~/Documents/nvminstall/install.sh
```

顺利安装

```
=> Downloading nvm from git to '/Users/raywei/.nvm'
=> Cloning into '/Users/raywei/.nvm'...
remote: Enumerating objects: 354, done.
remote: Counting objects: 100% (354/354), done.
remote: Compressing objects: 100% (302/302), done.
remote: Total 354 (delta 40), reused 157 (delta 27), pack-reused 0
Receiving objects: 100% (354/354), 207.03 KiB | 9.86 MiB/s, done.
Resolving deltas: 100% (40/40), done.
* (HEAD detached at FETCH_HEAD)
  master
=> Compressing and cleaning up git repository

=> Appending nvm source string to /Users/raywei/.bash_profile
=> Appending bash_completion source string to /Users/raywei/.bash_profile
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```



## 卸载

```bash
cd ~

rm -rf .nvm
```

移除掉~/.profile, ~/.bash_profile, ~/.zshrc, ~/.bashrc文件中关于nvm的配置，比如：(以.bash_profile为例)

- vim .bash_profile -> 打开Path配置
- 将export NVM_DIR 那段语句删除
- 按ESC，: 后键入wq，回车 -> 保存修改
- source .bash_profile -> 让配置文件里面生效

命令行输入nvm、npm，分别提示command not found，删除成功

目录中一些与npm相关的文件夹也可以直接删除

```bash
cd /usr/local/bin 

sudo rm -rf /usr/local/bin/npm 

sudo rm -rf /usr/local/bin/node 

sudo rm -rf /usr/local/share/man/man1/node.1 

sudo rm -rf /usr/local/lib/dtrace/node.d 

sudo rm -rf ~/.npm

sudo npm uninstall npm -g

sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules

sudo rm -rf /usr/local/include/node /Users/$USER/.npm
```







## 参考链接

[如何在mac上卸载nvm并重新安装](https://zhuanlan.zhihu.com/p/93516955)



https://segmentfault.com/a/1190000018110318

https://qizhanming.com/blog/2020/07/29/how-to-install-node-using-nvm-on-macos-with-brew