> macOS 10.14      VMware Pro 11.5.6     CentOS-7-x86_64-DVD-1804.iso

## 一、安装

下载完 CentOS，装好 VMware 后就可以开始安装了。

![Linux-installation-001.png](https://s2.loli.net/2022/05/18/dkMWtV9h75YHZel.png)

点击蓝色框

![Linux-installation-002.png](https://s2.loli.net/2022/05/18/lSk3T1hzstvDdyL.png)

将下载好的 iso 文件拖进框内

![Linux-installation-003.png](https://s2.loli.net/2022/05/18/aQqrhEPsw7FIJ4G.png)

![Linux-installation-004.png](https://s2.loli.net/2022/05/18/Y5roxBqCLuDjObQ.png)

取消 Use Easy Install

![Linux-installation-005.png](https://s2.loli.net/2022/05/18/W7fwEFJd41xOsIZ.png)

![](https://s2.loli.net/2022/05/18/qUDzuA4YekIvXMV.png)

这些配置后续都可以修改，这里直接完成即可。

![Linux-installation-006.png](https://s2.loli.net/2022/05/18/qUDzuA4YekIvXMV.png)

![Linux-installation-008.png](https://s2.loli.net/2022/05/18/rLvD8A1BbVOQTaw.png)

按键盘上下键控制，选择 Install CentOS 7，回车

![Linux-installation-009.png](https://s2.loli.net/2022/05/18/asufRTkKt4hpZ1z.png)

安装中

![Linux-installation-010.png](https://s2.loli.net/2022/05/18/EgdFRearTiKG46b.png)

## 二、初始化

### 语言

![Linux-installation-011.png](https://s2.loli.net/2022/05/18/ZyMQAkJYwVPRglc.png)

### 操作方式

![Linux-installation-012.png](https://s2.loli.net/2022/05/18/JgExZKz9ahdjVUo.png)

初学者，所以选择了 GNOME Desktop。

![Linux-installation-013.png](https://s2.loli.net/2022/05/18/MFokDOETCJUdsN3.png)

### 分区

>swap 2048mib
>
>/boot 200mib ext4
>
>其余都分给/ ext4

![Linux-installation-014.png](https://s2.loli.net/2022/05/18/SzKxsfRrliYge7j.png)

![Linux-installation-015.png](https://s2.loli.net/2022/05/18/8DF64jhkSslNHa5.png)

将 LVM 改成 Standard Partition，然后点击加号

![Linux-installation-016.png](https://s2.loli.net/2022/05/18/r6TlCeQgPSVX12L.png)

注意这里是 mib

![Linux-installation-017.png](https://s2.loli.net/2022/05/18/8RkbixyOG2oJt1I.png)

将File System 修改为 ext4

![Linux-installation-018.png](https://s2.loli.net/2022/05/18/UoJHM2pEQxXieaf.png)

继续点加号，不需要修改

![Linux-installation-019.png](https://s2.loli.net/2022/05/18/hnswTWy7ecZrISm.png)

继续点加号

![Linux-installation-020.png](https://s2.loli.net/2022/05/18/oLgM4K3jCfcqeaU.png)

将File System 修改为 ext4

![Linux-installation-021.png](https://s2.loli.net/2022/05/18/pLKs2hcVjiHQUra.png)

![Linux-installation-022.png](https://s2.loli.net/2022/05/18/KTEXhzJA5lnrc8w.png)

### kdump

![Linux-installation-023.png](https://s2.loli.net/2022/05/18/yQHpuBklKFbUoAv.png)

取消 Enable kdump，暂时用不到

![Linux-installation-024.png](https://s2.loli.net/2022/05/18/zaWDo3xNBue6FhZ.png)

### 网络设置 

选择 NAT 连接方式

![Linux-installation-026.png](https://s2.loli.net/2022/05/18/1GwpD6bvuV5WAQt.png)

接着点击 NETWORK & HOST NAME

![Linux-installation-025.png](https://s2.loli.net/2022/05/18/uPsvrcDApHVftYF.png)

打开 Mac 的 Terminal，输入

```bash
ifconfig
```

终端会出现很多网络信息。其中vmnet1是host-only，vmnet8是nat模式。

#### 一个虚拟机

![ifconfig.png](https://s2.loli.net/2022/05/18/Y37aKxbOGPW96HU.png)

Address: x.x.x.100

Netmask: 255.255.255.0

Gateway& DNS: x.x.x.2

![Linux-installation-027.png](https://s2.loli.net/2022/05/18/judJ8wvqgMYsTtx.png)

注意这里右上角要切成 ON

![Linux-installation-028.png](https://s2.loli.net/2022/05/18/FuhoenDz91ZICy2.png)

#### 多个虚拟机

需要自己配置网卡。打开vmware preference，选择network，解锁。

点击左下角的加号，会生成一个`vmnet+数字`的网卡，取消dhcp，点击apply。

![Linux-installation-039.png](https://s2.loli.net/2022/05/18/FvzWSol6eduhHf7.png)

打开Mac terminal

```bash
vim /Library/Preferences/VMware\ Fusion/networking
```

系统已经自动生成网卡的配置信息

![Linux-installation-040.png](https://s2.loli.net/2022/05/18/6GvNoe2RCxAdzmr.png)

此时回来看vmware preference，ip地址和mask掩码已经更新。

![Linux-installation-041.png](https://s2.loli.net/2022/05/18/2sEveB3Vxu9pmCt.png)

同样，按照一个虚拟机的方式，配置网络

![Linux-installation-042.png](https://s2.loli.net/2022/05/18/m6Ds9PN2UjdKe8q.png)

进入网络设置

![Linux-installation-043.png](https://s2.loli.net/2022/05/18/KCTZ2i1PsDILY9f.png)

选择刚刚创建的网卡

![Linux-installation-044.png](https://s2.loli.net/2022/05/18/hy8VWUXIjk756as.png)

其他步骤和`一个虚拟机`一样。



### 开始安装

点击 begin installation

### 设置root账户

在安装时会出现如下界面，点击root password，设置 root 账号和密码

![Linux-installation-029.png](https://s2.loli.net/2022/05/18/KNIRXW7BcU9tVgb.png)

### 完成安装

点击重启

![Linux-installation-030](https://s2.loli.net/2022/05/18/AtDCJaU8SzVlvLK.png)

点进去接受协议，然后点右下角 

![Linux-installation-031](https://s2.loli.net/2022/05/18/KVuigEHWNDaFsbG.png)

### 偏好设置

需要创建一个普通用户，地区选择上海即可。完成后进入桌面，关闭演示。

![Linux-installation-032](https://s2.loli.net/2022/05/18/vymYG3IJxzABVEe.png)

![Linux-installation-033](https://s2.loli.net/2022/05/18/whPUT7EVBz96W3Y.png)

![Linux-installation-034](https://s2.loli.net/2022/05/18/Jx68FkOM2WVTZcQ.png)

![Linux-installation-035](https://s2.loli.net/2022/05/18/iJMs4DIyC86e9Zw.png)



### 切换 root 用户

点击右上角的关机键，退出普通用户。

![Linux-installation-036](https://s2.loli.net/2022/05/18/sYgS5omO6KnPDRJ.png)

点击 Not listed，然后输入用户名 root 和之前设置的 root 密码。

![Linux-installation-038](https://s2.loli.net/2022/05/18/wSQpj6V425voYnr.png)

## 三、测试网络

```bash
curl www.baidu.com
#出现百度首页的html代码就是网络连接正常
```



## 四、minimal 安装

### 1. 网卡配置

```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens33

# =============================================
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
# static 静态ip
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=c29bd505-0f53-4cbc-a105-06b9104d1318
DEVICE=ens33
# 开启网卡自动连接
ONBOOT=yes
IPADDR=192.168.57.100
PREFIX=24
GATEWAY=192.168.57.2
DNS1=192.168.57.2
NETMASK=255.255.255.0
IPV6_PRIVACY=no
ZONE=
# =============================================

# 重启网络
service network restart
```



### 2. 缺少相关命令

可以使用 yum install 安装软件

```bash
# ipconfig
yum install net-tools

# vim
yum -y install vim*
```



### 3. 中文字符乱码

查看系统是否安装中文语言包 （列出所有可用的公共语言环境的名称，包含有zh_CN）

```bash
locale -a | grep "zh_CN"
```

没有输出，说明没有安装，输入下面的命令安装：

```bash
yum groupinstall "fonts" -y
```

安装完成，查看安了哪些中文语言包

```bash
locale -a |grep "zh_CN"
zh_CN
zh_CN.gb18030
zh_CN.gb2312
zh_CN.gbk
zh_CN.utf8
```

安装完成，测试此时curl百度是否显示乱码。

若还是乱码，

```bash
vi /etc/locale.conf

# 修改为中文环境
LANG="zh_CN.UTF-8"
# LANG="en_US.UTF-8"

source /etc/locale.conf
```

如果还是显示乱码，建议通过其他ssh终端测试，如果其他软件没问题就别折腾 vmware 了。



## 五、克隆后的配置

```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens33

# 更改uuid，任意修改一处即可，数字改数字，字母改字母
UUID=c29bd505-0f53-4cbc-a105-06b9104d1318
# 更改ip
IPADDR=192.168.57.100
# 更改网关
GATEWAY=192.168.57.2
# 更改dns
DNS1=192.168.57.2
```

注意：需要修改vmware此虚拟机的网络配置为对应的vmnet网卡！

<br/>

<br/>

<br/>

参考教程：

[MacOS下VMware Fusion Ubuntu虚拟机配置Nat静态IP](https://blog.csdn.net/weixin_42945209/article/details/106732350)

[MAC VMware fusion设置多个虚拟机上网](https://blog.csdn.net/u011323949/article/details/104038825)

[mac 虚拟机VMware fusion设置nat模式](https://blog.csdn.net/Jacquelin_1/article/details/89600215)

[Mac OS Fusion Linux虚拟机网络设置](https://juejin.cn/post/6844903985652957198)

[Mac安装VMware fusion 11安装Linux CentOS 7](https://blog.csdn.net/AthlenaA/article/details/99699502)

[CentOS 7 minimal安装与使用](https://blog.csdn.net/wsp_1138886114/article/details/105175575)

[centos7 中文乱码解决方法](https://www.cnblogs.com/sisimi/p/7693226.html)

[VMWare Fusion中CentOS命令行中文显示方块](https://www.javatang.com/archives/2021/11/23/06273441.html)

[CentOS 下 安装配置 Vim编辑器](https://blog.csdn.net/zwk1066448989/article/details/110818786?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=2)

[Linux修改网卡配置](https://www.jianshu.com/p/d396dc550a35)
