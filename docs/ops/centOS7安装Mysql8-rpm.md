## 1. 下载rpm安装包

去[官网](https://downloads.mysql.com/archives/community/)下载rpm安装包，共四个。

mysql-community-libs-8.0.18-1.el7.x86_64.rpm

## 2. 将安装包上传到Linux的/opt



## 3. 卸载系统预装 mariadb

```shell
rpm -e --nodeps mariadb-libs-1:5.5.56-2.el7.x86_64
```

## 3.按照以下顺序安装

```shell
rpm -ivh /opt/mysql-community-common-8.0.18-1.el7.x86_64.rpm

rpm -ivh /opt/mysql-community-libs-8.0.18-1.el7.x86_64.rpm

rpm -ivh /opt/mysql-community-client-8.0.18-1.el7.x86_64.rpm

rpm -ivh /opt/mysql-community-server-8.0.18-1.el7.x86_64.rpm
```

> 如果已经打开了opt文件夹，安装时可以省略文件夹，例如
>
> rpm -ivh mysql-community-common-8.0.18-1.el7.x86_64.rpm

## 4. 查看mysql是否安装成功

```shell
id mysql
# uid=27(mysql) gid=27(mysql) groups=27(mysql)
```

## 5. 初始化 mysql

```BASH
# 创建数据文件目录和mysql系统数据库 产生随机root密码
mysqld --initialize 
```

## 6. 目录权限授权

```bash
chown mysql:mysql /var/lib/mysql -R;
```

## 7. 启动 mysql 服务

```bash
# 启动
systemctl start mysqld.service

# 查看mysql服务是否启动
systemctl status mysqld.service

ps -ef | grep mysql | grep -v grep
# mysql      4921      1  4 23:27 ?        00:00:01 /usr/sbin/mysqld
```

## 8. 查看初始化随机生成的 root 密码

```bash
cat /var/log/mysqld.log | grep password

# 2022-01-14T15:19:09.444302Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: RI6<px3asiqw
# RI6<px3asiqw 就是初始密码
```

## 9. 登录并修改密码

```bash
mysql -uroot -p
# 粘贴初始密码

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '自己想要设置的密码';

# 例如
# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
```

## 10. 远程访问授权

```bash
create user 'root'@'%' identified with mysql_native_password by 'mysql登录密码';
# 例如
# create user 'root'@'%' identified with mysql_native_password by '123456';

grant all privileges on *.* to 'root'@'%' with grant option;

flush privileges;
```

## 11. 在Mac上的软件上登录mysql



## 12. 设置/停止开机自启

需退出mysql设置

```bash
# 开启
systemctl enable mysqld.service

# 关闭
systemctl disable mysqld.service
```
