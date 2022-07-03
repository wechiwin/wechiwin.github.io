## 1. 下载redis安装包并解压

打开Terminal，连接Linux，

```bash
cd /opt

wget https://download.redis.io/releases/redis-6.2.6.tar.gz
# 若没有 wget ，可以输入 yum install wget 安装

tar -zxvf redis-6.2.6.tar.gz 
```

## 2. 安装C语言编译环境

建议先拍快照

```bash
# 安装
yum install -y gcc-c++

# 查看安装是否成功
gcc -v
# 出现版本号就是成功了
# gcc version 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC) 
```

## 3. 修改安装位置

```bash
cd redis-6.2.6
cat Makefile
# Top level makefile, the real shit is at src/Makefile
# 可以得出真正的安装配置文件在 src/Makefile

cd src/
# 备份文件
cp Makefile Makefile.backup

vim Makefile
# 键入 /PREFIX 搜索
# 将 PREFIX?=/usr/local 修改为 PREFIX?=/usr/local/redis
# 键入 :wq 保存退出
```

## 4. 编译安装

建议先拍快照

```bash
# 编译
make
# 安装
make install
```

## 5. 修改redis配置文件

```bash
cp /opt/redis-6.2.6/redis.conf /usr/local/redis/

mkdir /var/logs

cd /usr/local/redis/

vim redis.conf
```

| 配置项名称 | 作用                                  | 取值                  |
| ---------- | ------------------------------------- | --------------------- |
| daemonize  | 控制是否以守护进程形式运行Redis服务器 | yes                   |
| logfile    | 指定日志文件位置                      | "/var/logs/redis.log" |
| dir        | Redis工作目录                         | /usr/local/redis      |

## 6. 启动redis

``` bash
# redis-server文件路径 redis.conf文件路径
/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf
```

查看redis是否启动

```bash
# 查看进程
ps -ef | grep redis | grep -v grep
# root      12889      1  0 10:48 ?        00:00:00 /usr/local/redis/bin/redis-server 127.0.0.1:6379

# 查看日志
less /var/logs/redis.log
# Configuration loaded
# Ready to accept connections
# 键入 q 退出
```

## 7. 客户端登录

```bash
/usr/local/redis/bin/redis-cli
# 此时应出现 127.0.0.1:6379> 
ping
# 如果出现 PONG，说明已经成功
```

## 8. 退出客户端

```bash
exit
```

## 9. 关闭redis

```bash
/usr/local/redis/bin/redis-cli shutdown
```

## 10. 无法连接到redis-cli

```shell
Could not connect to Redis at 127.0.0.1:6379: Connection refused
```

登录时需要带上-h和主机地址

```shell
/usr/local/redis/bin/redis-cli -h 172.16.139.100
```

