![](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015120901.png)

Workspace：工作区

Index / Stage：暂存区

Repository：仓库区（或本地仓库）

Remote：远程仓库

# Git 本地库

| 命令名称                             | 命令作用                 |
| ------------------------------------ | ------------------------ |
| git init                             | 初始化本地库             |
| git config                           | git配置                  |
| git config --global user.name 用户名 | 设置用户签名的用户名部分 |
| git config --global user.email 邮箱  | 设置用户签名的邮箱部分   |
| git status                           | 查看本地库状态           |
| git add <文件名>                     | 添加到暂存区             |
| git commit -m "日志信息" 文件名      | 提交到本地库             |
| git reflog                           | 查看历史记录             |
| git reset --hard 版本号              | 版本穿梭                 |



## git init

```bash
# 在当前目录新建一个Git代码库
git init

# 新建一个目录，将其初始化为Git代码库
git init [project-name]
```



## git config

```bash
# 设置提交代码时的用户信息
git config user.name "zhangsanatguigu"
git config user.email "dev111@163.com"

# 显示当前的Git配置
git config --list

# 编辑Git配置文件 []表示可选
git config -e [--global]
```



## git status

- On branch master ：表示主分支
- Untracked files：表示未跟踪状态

Git工作目录下的文件状态信息：
- Untracked 未跟踪（未被纳入版本控制）
- Tracked 已跟踪（被纳入版本控制）
- Unmodified 未修改状态
- Modified 已修改状态
- Staged 已暂存状态

这些文件的状态会随着我们执行Git的命令发生变化
- 红色表示新建文件或者新修改的文件,都在工作区.
- 绿色表示文件在暂存区 
- 新建的文件在工作区，需要添加到暂存区并提交到仓库区

也可以使用git status –s 使输出信息更加简洁
- ?? : 表示未跟踪状态



## git add <文件名>

只是增加到栈空间（index文件）中，还没有添加到本地库中。初始化时没有这个index文件。这还是一个新文件，需要将栈空间文件提交到本地仓库。

```bash
# 添加项目中所有文件
git add

# 添加指定的文件，若文件不存在会报错：fatal: pathspec 'hello.txt' did not match any files
git add hello.txt
```



4. 撤销暂存区的文件

- 命令：
  - git reset <文件名称>
    - 撤销后，查看文件状态（git status）文件由绿色变为红色



## git commit -m "日志信息" 文件名

将暂存区文件提交到本地库 

- git commit
  - 执行命令时需要填写提交日志，进入编辑模式

- git commit –m “注释内容”  
  - 直接用-m参数指定日志内容，推荐
  - commit 会生成一条版本记录，add只是添加暂存区，不会生成版本记录，建议多次add后，一次性commit，避免每次add都commit产生版本信息爆炸。

- git commit -am "注释内容"
- 代码编辑完成后即可进行 add 和 commit 操作
- 提示：添加和提交合并命令，不能指定文件



## 4.3 实战(查看日志)

命令：

- git log
- git log a.txt
  - 查看文件日志(查看所有日志或某个文件日志)
  - q退出

- git log --pretty=oneline
  - 如果日志很多,可以在一行显示

- git reflog
  - 查看历史操作



## git reset --hard 版本号

### 版本回退

-  git reset --hard HEAD^
  - 一次回退一个版本，一个^代表一个版本数量

- git reset --hard HEAD~n
  -  回退n次操作 

### 版本穿梭

- git reflog a.txt
  - 查看历史操作

- git reset --hard 版本号
  - 回到最新的版本

### 版本撤销：

- 未add，未commit

  - vim修改文件，没有add和commit，进行撤销

  - 命令：
    - git checkout -- a.txt
      - 撤销修改(还原原来的文件)

- 已add，未commit
  -  vim修改文件，添加add，但没提交commit，进行撤销
  -  命令：
    - git add a.txt
    - git reset
      - 软回退：
      - 查看文件内容：cat a.txt
      - 查看日志：git reflog a.txt



## 4.6 实战(分支)

几乎所有的版本控制系统都以某种形式支持分支。使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。Git 的master分支并不是一个特殊分支。它跟其它分支没有区别。之所以几乎每一个仓库都有 master 分支，是因为git init 命令默认创建它，并且大多数人都懒得去改动它。

### 1.  实际开发流程

<img src="image/img008.png" style="zoom:67%;" />

### 2.  分支概念

在使用版本控制工具开发的过程中，同时推进多个任务

<img src="image/img009.png" style="zoom:67%;" />

### 3.  分支的好处

同时并行推进多个功能开发，提高开发效率

各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。 



## 4.7 实战(版本冲突)

### 1.  冲突产生的表现

![](image/img015.png)

```
Git使用“<<<<<<<、=========、>>>>>>>>>>”符号帮我们标记出来，现在产生冲突的内容(绿色区域)。

<<<<<<< HEAD  Hello Git!I am very happy!  &&&&&&&&&&&&  Hello Git!I am very happy!  =======  表示HEAD指针指向的位置在冲突中的内容  

=======  Hello Git!I am very happy!  Hello Git!I am very happy!  ************  >>>>>>> hotfix  表示hotfix指针指向的位置在冲突中的内容  
```

### 2.  冲突产生的原因

合并分支时，两个分支在同一个文件的同一个位置有两套完全不同的修改。Git无法替我们决定使用哪一个。必须人为决定新代码内容。

### 3.  冲突的解决

①编辑有冲突的文件，删除特殊符号，决定要使用的内容

```
vim hello.txt
```

![](image/img016.png)

使用 dd 删除不需要的行，留下需要的内容

![](image/img017.png)

②添加到暂存区

 ```
 git add hello.txt 
 ```

③执行提交（注意：此时，使用git commit命令不能带文件名）

 ```
 git commit -m "fix conflict"
 
 [master 3055b30] fix conflict
 ```



### 4.  避免冲突

- 容易冲突的操作方式
  - 多个人同时操作了同一个文件
  - 一个人一直写不提交
  - 修改之前不更新最新代码
  - 提交之前不更新最新代码
  - 擅自修改同事代码

- 减少冲突的操作方式
  - 养成良好的操作习惯，先`pull`在修改,修改完立即`commit`和`push`
  - 一定要确保自己正在修改的文件是最新版本的
  - 各自开发各自的模块
  - 如果要修改公共文件，一定要先确认有没有人正在修改
  - 下班前一定要提交代码,上班第一件事拉取最新代码
  - 一定不要擅自修改同事的代码



# Git 分支

| 命令名称             | 作用                         |
| -------------------- | ---------------------------- |
| git branch 分支名    | 创建分支                     |
| git branch -v        | 查看分支                     |
| git checkout 分支名  | 切换分支                     |
| git merge 分支名     | 把指定的分支合并到当前分支上 |
| git branch -d 分支名 | 删除指定分支                 |



## 查看分支

```bash
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a
```



## 新建分支

```bash
# 新建一个分支，但依然停留在当前分支
git branch 分支名

# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 新建一个分支，指向指定commit
git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch]

```



## 删除分支

```bash
# 删除本地分支 注意：删除时不能位于这个分支
git branch -d 分支名

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```



# Git 远程库



### 2.  提交代码到本地库

$ touch love.txt

$ vim love.txt

$ git add love.txt

$ git commit -m "love form zhangsanatguigu" love.txt

### 3.  登录账号到github,创建远程仓库.

①登录后没有任何项目情况下,会显示如下页面

②创建新的仓库

③填写创建新仓库信息

④创建后出现仓库地址，注意：点一下HTTPS，换下地址。

### 4.  本地项目推送到远程库

增加远程地址

git remote add <远端代号> <远端地址>

<远端代号> 是指远程连接的代号,一般直接用origin作为代号,也可以自定义.

<远端地址> 默认远程连接的url

例如：

git remote add origin https://github.com/zhangsanatguigu/zhangsanatguigu_project.git

 

git push <远端代号> <本地分支名称>

<远端代号> 是指远程链接的代号

<本地分支> 是指要提交的分支名字,比如master

例如：git push origin master

 

### 5.  从GitHub上克隆一个别人的项目

在选好的目录下执行命令下载远端项目

git clone  <远端地址>  <新项目目录名>。

-  <远端地址> 是指远程链接的地址。

-  <项目目录名> 是指为克隆的项目在本地新建的目录名称，可以不填，默认是GitHub的项目名。

- 命令执行完后，会自动为这个远端地址建一个名为origin的代号。

例如 

git clone https://github.com/zhangsanatguigu/zhangsanatguigu_project.git  hello_world

 

### 6.  使用自己的账户提交修改其他项目的内容.

配置账号和邮箱

 

### 7.  修改提交到本地库

 

### 8.  本地库提交到远程库，权限不够

 

\1. 注: 

· clone会自动关联远端地址为origin默认名称,所以不需要git remote …

· lisiatguigu账户提交修改内容,访问被拒绝.权限不够.

· 以上对项目的操作方式，必须是项目的创建者或者合作伙伴。

· 合作伙伴添加方式如下图: 在项目中点击settings页签，然后点击Collaborators,然后在文本框中搜索合作伙伴的邮箱或者账号。点击添加。

· 添加后GitHub会给合作伙伴对应的邮箱发一封，邀请邮件。

\2. [zhangsanatguigu]设置权限

· Settings -> Collaborators -> [zhangsanatguigu]添加合作伙伴[lisiatguigu]

 

·    [zhangsanatguigu]邀请函已经发送到[lisiatguigu]邮箱

·    [lisiatguigu]登录邮箱，打开链接

 

·    [lisiatguigu]接受邀请,则合伙伙伴正式加入项目，获得直接提交代码的权限

 

\3. [lisiatguigu]重新提交,OK

 

### 9.  被提交commit，更新本地文件

更新前查看

 

更新

 

更新后查看

 

 

## 5.6 解决重复输入密码问题

### 1.  两种模式：https VS ssh

ssh模式比https模式的一个重要好处就是，每次push，pull，fetch等操作时不用重复填写用户名密码。

前提是你必须是这个项目的拥有者或合作者，且配好了ssh key 

### 2.  如何配置ssh key

①步骤1：检查电脑家目录下是否已经生成了SSH key，如果有.ssh目录删除即可

②步骤2：创建SSH Key : ssh-keygen -t rsa -C lisiatguigu

成功的话(执行命令不需要输入任何内容)，会在~/下生成.ssh文件夹，查看生成两个文件

id_rsa

id_rsa.pub

打开id_rsa.pub，复制里面的内容，到github上

③步骤3：登录[lisiatguigu]账户

打开用户设置

点击[SSH and GPG keys] 填写Title和Key，点击[Add SSH key]

 

### 3.  重新测试：提交不再需要输入密码

①[lisiatguigu]复制SSH的url连接

②[lisiatguigu]重新建立github连接,如果之前配置过则删除，重新配置

命令：

git remote add originssh git@github.com:zhangsanatguigu/zhangsanatguigu_project.git

git push originssh master

修改文件，重新提交,不需要再输入用户名和密码了

### 4.  注意问题:

一个账户只能设置一个默认密码.

如果有多个账号存在的话，只能选择设置其中某一个



## 5.7 配置Git忽略文件

### 1.  哪些文件要忽略？

#### 1)   Eclipse特定文件

<img src="image/img019.png" style="zoom:50%;" />

#### 2)   IDEA特定文件

<img src="image/img020.png" style="zoom: 50%;" />

#### 3)   Maven工程的target目录

<img src="image/img021.png" style="zoom:50%;" />

### 2.  为什么要忽略它们？

与项目的实际功能无关，不参与服务器上部署运行。把它们忽略掉能够屏蔽IDE工具之间的差异。

### 3.  怎么忽略？

#### 1)   创建忽略规则文件（git.ignore）

##### macOS 创建

```bash
# 在终端打开家目录
touch .gitignore
vim .gitignore
# 将需要忽略的的文件输入 然后保存退出
```

##### 忽略规则文件

这个文件的存放位置原则上在哪里都可以，为了便于让~/.gitconfig文件引用，建议也放在用户家目录下

```
# Compiled class file
*.class
 
# Log file
*.log
 
# BlueJ files
*.ctxt
 
# Mobile Tools for Java (J2ME)
.mtj.tmp/
 
# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar
 
# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
 
.classpath
.project
.settings
target
.idea
*.iml

```



#### 2)   在.gitconfig文件中引用忽略规则文件

```
[user]
name = peter
email = peter@atguigu.com
[core]
excludesfile = C:/Users/Lenovo/git.ignore

```



注意：这里要使用“正斜线（/）”，不要使用“反斜线（\）”

# Git工作流

简单来说就是，一个项目的成员们在工作中统一使用Git的工作方式。

Gitflow工作流通过为功能开发、发布准备和维护设立了独立的分支，让发布迭代过程更流畅。严格的分支模型也为大型项目提供了一些非常必要的结构。

- **简单的分支**

<img src="image/img042.png"  />

**复杂分支案例演示：**

<img src="image/img043.png"  />

## 8.2 分支种类

- 主干分支 master

主要负责管理正在运行的生产环境代码。永远保持与正在运行的生产环境完全一致。

- 开发分支  develop

主要负责管理正在开发过程中的代码。一般情况下应该是最新的代码。 

- bug修理分支 hotfix

要负责管理生产环境下出现的紧急修复的代码。 从主干分支分出，修理完毕并测试上线后，并回主干分支。并回后，视情况可以删除该分支。

- 发布版本分支 release

较大的版本上线前，会从开发分支中分出发布版本分支，进行最后阶段的集成测试。该版本上线后，会合并到主干分支。生产环境运行一段阶段较稳定后可以视情况删除。

- 功能分支  feature

为了不影响较短周期的开发工作，一般把中长期开发模块，会从开发分支中独立出来。 开发完成后会合并到开发分支。

# 连接Github与本地

首先右键打开git bash，然后输入下面命令：

```bash
git config --global user.name "wechiwin"
git config --global user.email "halocooper@outlook.com"
```

用户名和邮箱根据你注册github的信息自行修改。

然后生成密钥SSH key：

```bash
ssh-keygen -t rsa -C "halocooper@outlook.com"
```

打开[github](https://link.zhihu.com/?target=http%3A//github.com/)，在头像下面点击`settings`，再点击`SSH and GPG keys`，新建一个SSH，名字随便。

git bash中输入

```bash
cat ~/.ssh/id_rsa.pub
```

将输出的内容复制到框中，点击确定保存。

输入`ssh -T git@github.com`，如果如下图所示，出现你的用户名，那就成功了。

# 代理

https://zhuanlan.zhihu.com/p/481574024

```
ProxyCommand "C:\Program/ Files\Git\mingw64\bin\connect.exe" -S 127.0.0.1:10808 -a none %h %p


```

