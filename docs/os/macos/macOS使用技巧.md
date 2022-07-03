## Finder

### 查看隐藏文件

方法一：

打开finder，键入`Cmd + Shift + .`

再按一次可以恢复隐藏。

方法二：

Terminal：

```bash
defaults write com.apple.finder AppleShowAllFiles TRUE
killall Finder
```

### 一次性关闭所有finder窗口

option + command + w

## Application

### 查找安装的软件的位置

```bash
#以git为例
which －a git
```

### 删除软件

```bash
#以git为例
sudo rm -rf /usr/local/bin/git /usr/bin/git
```

### 删除 Office AutoUpdate

从MacOS的Finder中，下拉“Go”菜单并选择“Go To Folder”（或按Command + Shift + G）并输入以下路径：
```
/Library/Application Support/Microsoft/
```

打开名为“MAU”或“MAU2.0”的文件夹，将“Microsoft AutoUpdate.app”删除。

## Typing

### 快捷输入emoji

「 ⌃ + ⌘ + ␣ 」（control + command + space） 

### 快捷输入符号

option + shift + b

## SSH

### 在Mac上远程登录Linux

因为Mac有ssh，所以直接打开Terminal，输入

```bash
# x.x.x.x 为Linux的IP地址
ssh root@x.x.x.x
```



### Mac与Linux文件传输[Terminal]

网上有客户端可以使用，这里介绍一下使用命令行传输

**Mac 上传文件到 Linux 服务器**

语法：

scp 文件的绝对路径 `Linux用户名`@`Linux服务器ip`:`Linux目标绝对路径`

```bash
scp /Users/***/Downloads/mysql-community-server-8.0.18-1.el7.x86_64.rpm root@172.16.139.100:/opt
```



**Mac 上传文件夹到 Linux 服务器**

> 语法：
>
> scp -r 文件夹目录 用户名@服务器ip:目标路径



**Linux 服务器下载文件到 Mac**

> 语法：
>
> scp 用户名@服务器ip:文件路径 目标路径



**Linux 服务器下载文件夹到 Mac**

> 语法：
>
> scp -r 用户名@服务器ip:文件路径 目标路径

