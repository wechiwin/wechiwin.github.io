## 1. 概述

MySQL数据库最初是由瑞典MySQL AB公司开发，2008年1月16号被Sun公司收购。2009年，SUN又被Oracle收购。MySQL是目前IT行业最流行的开放源代码的数据库管理系统，同时它也是一个支持多线程高并发多用户的关系型数据库管理系统。MySQL之所以受到业界人士的青睐，主要是因为其具有以下几方面优点： 

### 1.1. 开放源代码

MySQL最强大的优势之一在于它是一个开放源代码的数据库管理系统。开源的特点是给予了用户根据自己需要修改DBMS的自由。MySQL采用了General Public License，这意味着授予用户阅读、修改和优化源代码的权利，这样即使是免费版的MySQL的功能也足够强大，这也是为什么MySQL越来越受欢迎的主要原因。 

###  1.2. 跨平台

MySQL可以在不同的操作系统下运行，简单地说，MySQL可以支持Windows系统、UNIX系统、Linux系统等多种操作系统平台。这意味着在一个操作系统中实现的应用程序可以很方便地移植到其他的操作系统下。 

### 1.3. 轻量级

MySQL的核心程序完全采用多线程编程，这些线程都是轻量级的进程，它在灵活地为用户提供服务的同时，又不会占用过多的系统资源。因此MySQL能够更快速、高效的处理数据。 

### 1.4. 成本低

MySQL分为社区版和企业版，社区版是完全免费的，而企业版是收费的。即使在开发中需要用到一些付费的附加功能，价格相对于昂贵的Oracle、DB2等也是有很大优势的。其实免费的社区版也支持多种数据类型和正规的SQL查询语言，能够对数据进行各种查询、增加、删除、修改等操作，所以一般情况下社区版就可以满足开发需求了，而对数据库可靠性要求比较高的企业可以选择企业版。 



## 2. 常见命令

登陆mysql：

1. mysql -u用户名 -p密码 
2. mysql -u用户名 -p

连接远程的mysql：mysql -h主机地址 -P 端口号 -u用户名  -p密码

当前DBMS中，有哪些DB: show databases;

新建数据库：create database 名字;

新建数据库并指定编码方式：create database 数据库名 charset 编码名;

打开数据库：

删除数据库：drop database 名字;

创建表：create table 表名(字段名 数据类型);

删除表：drop table 表名;

展示当前库中所有的表：show tables;

添加一条数据：insert into 表名 values(字段的值);

查看表中的数据：select * from 表名;

数据库里没有char类型，只有字符串，quotes and double quotes都可以用。

```sql
insert into student values(23,"Rose");
insert into student values(23,'Mary');
```

查看当前mysql的编码方式：show variables like 'character%';

## 3. 数据类型

### 3.1 整数类型

| Integer Type | Byte | Signed Number | Unsigned Number |
| ------------ | ---- | ------------- | --------------- |
| TINYINT      | 1    | [-128, 127]   | [0, 255]        |
| SAMLLINT     | 2    | [-32k, 32K]   | [0, 65K]        |
| MEDIUMINT    | 3    | [-8M, 8M]     | [0, 16M]        |
| INT或INTEGER | 4    | [-2B, 2B]     | [0, 4B]         |
| BIGINT       | 8    |               |                 |

```sql
create table inttest(
id int,
age int(4) unsigned zerofill
);
```

age int(4) unsigned zerofill

此字段必须存入无符号的数字，且输入值不满足4位数的时候，会自动用0填充。

age int(4)

没有unsigned zerofill，不会自动填充。

### 3.2 浮点型

| Floating-point Type | Byte                                       | Signed Number | Unsigned Number |
| ------------------- | ------------------------------------------ | ------------- | --------------- |
| FLOAT               | 4                                          |               |                 |
| DOUBLE              | 8                                          |               |                 |
| DECIMAL             | 对DECIMAL(M,D) ，如果M>D，为M+2；否则为D+2 |               |                 |

DOUBLE(5, 3);	

代表此字段有三位小数，5-3=2位整数，超过就会四舍五入。

若不加(M,D)，则【小数点后】可以存入最大宽度的值是：最大到16位，超过16位就会四舍五入。

DECIMAL(M,D)

M最大为65,D最大为30.

如果不加(M,D)，那么只会储存整数位，超过就会四舍五入。

### 3.3 日期时间类型

| 类型      | 大小 ( bytes) | 范围                                                         | 格式                | 用途                     |
| :-------- | :------------ | :----------------------------------------------------------- | :------------------ | :----------------------- |
| DATE      | 3             | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME      | 3             | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1             | 1901/2155                                                    | YYYY                | 年份值                   |
| DATETIME  | 8             | 1000-01-01 00:00:00/9999-12-31 23:59:59                      | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP | 4             | 1970-01-01 00:00:00/2038结束时间是第 **2147483647** 秒，北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |

```sql
create table datatest(
    -> date1 datetime,
    -> date2 timestamp)
    -> ;

insert into datatest values(now(),now());

select * from datatest;
+---------------------+---------------------+
| date1               | date2               |
+---------------------+---------------------+
| 2021-11-18 18:23:20 | 2021-11-18 18:23:20 |
+---------------------+---------------------+
```

>  now()是mysql的函数，用于获取当前的时间。

timestamp和datetime的区别：

- timestamp范围比较小
- timestamp和时区有关
  - show variables like 'time_zone';
  - set time_zone = '+9:00';
- 表中的第一个非空的timestamp字段如果插入和更新为NULL则会自动设置为系统时间(????? 我自己试了就是空啊。)

### 3.4 字符串类型

| 类型         | 大小                    | 用途                 |
| :----------- | :------------|:------------------------------------------ |
| CHAR(M)      | 0-255 bytes,不指定默认char(1) | 定长字符串(假设指定长度为10，哪怕字段值的长度是5，也还是占用10个字节) |
| VARCHAR(M)   | 0-65535 bytes,必须指定M  | 变长字符串(在指定范围内，用了多少占多少字节) |
| BINARY(M)    | 0-255 bytes |                                 |
| VARBINARY(M) | 0-65535 bytes |                                 |
| TINYBLOB     | 0-255 bytes               | 不超过 255 个字符的二进制字符串 |
| TINYTEXT     | 0-255 bytes               | 短文本字符串                    |
| BLOB         | 0-65 535 bytes            | 二进制形式的长文本数据          |
| TEXT         | 0-65 535 bytes            | 长文本数据                      |
| MEDIUMBLOB   | 0-16 777 215 bytes        | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT   | 0-16 777 215 bytes        | 中等长度文本数据                |
| LONGBLOB     | 0-4 294 967 295 bytes     | 二进制形式的极大文本数据        |
| LONGTEXT     | 0-4 294 967 295 bytes     | 极大文本数据                    |

- 字符串类型char,varchar(M)

> char如果没有指定宽度，默认为1个字符
>
> varchar(M)，必须指定宽度

- BINARY 和 VARBINARY 类似于 CHAR 和 VARCHAR，不同的是它们包含二进制字符串而不要非二进制字符串。也就是说，它们包含字节字符串而不是字符字符串。这说明它们没有字符集，并且排序和比较基于列值字节的数值值。
- 一般在保存少量字符串的时候，我们会选择char和varchar；而在保存较大文本时，通常会选择使用text或blob系列。blob和text值会引起一些性能问题，特别是在执行了大量的删除操作时，会在数据表中留下很大的“空洞”，为了提高性能，建议定期时候用optimize table功能对这类表进行碎片整理。可以使用合成的(Synthetic)索引来提高大文本字段的查询性能，如果需要对大文本字段进行模糊查询，MySql提供了前缀索引。但是仍然要在不必要的时候避免检索大型的blob或text值。

#### enum枚举类型

它的值范围需要在创建表时通过枚举方式显式指定，对于1~255个成员的枚举需要1个字节存储；对于255`65535个成员需要2个字节存储。例如：gender enum('男','女')。一次只能从枚举值中选择一个。

```sql
create table enumtest(
    -> sex enum("男","女"),
    -> name varchar(20)
    -> );
    
insert into enumtest values("男","Jack");
-- Query OK, 1 row affected (0.00 sec)

insert into enumtest values("公","金毛");
-- ERROR 1265 (01000): Data truncated for column 'sex' at row 1
```

#### set集合类型

最多存放0~64个成员。一次可以从集合中选择多个成员。

如果选择了1-8个成员的集合，则依次占1个，2个，3个。。8个字节。？？？？

```sql
create table settest(
    -> name varchar(20),
               --  1=2^0  2=2^1  4      8           二进制
    -> hobby set("sleep","eat","swim","exercise")
    -> );
    
insert into settest values("Judy","sleep");
-- Query OK, 1 row affected (0.00 sec)

insert into settest values("V","sleep,eat");
-- Query OK, 1 row affected (0.00 sec)

insert into settest values("Jack","sleep,eat1");
-- ERROR 1265 (01000): Data truncated for column 'hobby' at row 1

insert into settest values("Panam",3);
-- Query OK, 1 row affected (0.00 sec)

+-------+-----------+
| name  | hobby     |
+-------+-----------+
| Judy  | sleep     |
| V     | sleep,eat |
| Panam | sleep,eat |    --  3 = 1 + 2
+-------+-----------+
```



## 4. 语法要求

### 不区分大小写

关键字和表名（函数名）不区分大小写。但是数据值是否区分大小写，与charset和其校对规则有关。

```sql
-- 显示mysql的校对规则
-- _ci 大小写不敏感
-- _cs 大小写敏感
show variables like 'coll%';
+----------------------+--------------------+
| Variable_name        | Value              |
+----------------------+--------------------+
| collation_connection | utf8mb4_0900_ai_ci |
| collation_database   | utf8mb4_0900_ai_ci |
| collation_server     | utf8mb4_0900_ai_ci |
+----------------------+--------------------+
```



### 命名规则

1. 尽量使用26个英文字母、数字0-9、下划线和美元符号，不要使用其他符号。

2. 建议不要使用mysql的关键字等来作为表名、字段名等。如果需要使用，用`（飘号）将表名/字段名引起来。

   ```sql
   create table `create`(id int);
   -- Query OK, 0 rows affected (0.06 sec)
   ```

3. 数据库和表名、字段名等对象名中间不要包含空格。

4. 同一个mysql软件中，数据库不能同名；同一个库中，表不能重名；同一个表中，字段不能重名。



### 书写规则

#### 标点符号

1. 必须成对
2. 必须英文状态下半角输入方式
3. 字符串和日期类型可以使用单引号''
4. 列的别名可以使用双引号""，给表名取别名不要使用双引号。取别名时as可以省略
5. 如果列的别名没有包含空格，可以省略双引号，如果有空格双引号不能省略。

#### 注释

1. 单行注释：#注释内容
2. 单行注释：-- 注释内容    其中--后面的空格必须有
3. 多行注释：/* 注释内容 */



## 5. 语言分类

### 5.1 DDL

Data Definition Language，数据定义语言，定义库，表结构等，包括create,drop,alter等。

#### DB

查看所有数据库

```sql
show databases;
```

新建数据库：

```sql
create database 数据库名;

create database 数据库名 charset 编码名;
-- utf8, 在mysql中字符集名称不要使用utf-8
```

指定使用某个数据库

```sql
use 数据库名;
```

删除数据库：

```sql
drop database 数据库名;
```



#### Table

创建表

```sql
create table 表名(
  字段名 数据类型
);
```

展示当前库中所有的表

```sql
show tables;
```

删除表

```sql
drop table 表名;
```



#### Column

查看某个表结构

```sql
describe 表名;
desc 表名;
```

增加表的字段

```sql
-- 新增字段到最后
alter table 表名 add 新增字段名 新增字段数据类型;

-- 新增字段到最前面
alter table 表名 add 新增字段名 新增字段数据类型 first;

-- 新增字段到指定字段的后面
alter table 表名称 add 新增字段名 新增字段数据类型 after 表中字段名;
```

修改data type

```sql
alter table 表名称 modify 字段名 新数据类型;
```

修改column_definition and data type

```sql
-- 修改字段，然后移动到最后
alter table 表名 change 旧字段名 新字段名 新字段数据类型;

-- 修改字段，然后移动到最前
alter table 表名 change 旧字段名 新字段名 新字段数据类型 first;

-- 修改字段，然后移动到指定字段后
alter table 表名 change 旧字段名 新字段名 新字段数据类型 after 表中字段名;

alter table 表名 modify 新字段名 新数据类型;
```

删除column

```sql
alter table 表名 drop 字段名;
```

修改column的位置

```sql
-- 移动到最前
alter table 表名 modify 字段名 数据类型 first;

-- 移动到某字段后面
alter table 表名 modify 字段名 数据类型 after 表中字段名;
```

修改表名称

```sql
alter table 旧表名 rename 新表名;
rename table 旧表名 to 新表名;
```



### 5.2 DML 

Data Manipulation Language，数据操作语言，增删改查数据，包括insert, delete, update, select等.

#### 添加数据

##### 全部赋值

```sql
# 要求值列表的顺序，个数，类型，要与表中字段对应。
insert into 表名 values (值列表);
```

##### 部分赋值

```sql
# 要求值列表的顺序，个数，类型，与部分字段列表对应。
insert into 表名(部分字段列表) values (部分字段对应的值列表);

# 下面这个用的比较多
insert into 表名 set 字段名=字段值, 字段名=字段值…;
```

##### 批量添加

```sql
insert into 表名 values (值列表1),(值列表2),(值列表3)…;
```



#### 查询数据

```sql
select * from 表名称; #查询整张表的所有数据

select 字段列表 from 表名称;  #查询部分列表

select * from 表名称 [where 条件];

select 字段列表 from 表名称 [where 条件];
```

> distinct对查询结果去重，放在select后面使用

#### 修改数据

```sql
update 表名称 set 字段名1 = 新字段值1,字段名2 = 新字段值2...[where 条件];
```

> 如果没有加where条件，表示修改所有行，这个字段的值

#### 删除数据

```sql
# 如果没有where条件，则删除整张表的数据。
delete from 表名 [where 条件];
```



```sql
truncate 表名;
```

用delete删除整张表和用truncate删除整张表的数据的区别？

（1）truncate速度快

（2）truncate无法回滚

truncate因为底层是把表drop掉，然后新建了一张空表。

delete因为底层是一行一行删数据，效率较慢。

#### 对表中字段起别名

```sql
-- 起别名时，as都可以省略
select 字段名1 [as] 别名, 字段名2 [as] 别名 from 表名; 

-- 如果字段别名中没有空格或关键字，那么可以省略quotes""
```



### 5.3 DQL

Data Query Language，数据查询语言 select。

### 5.4 DCL

Data Control Language，数据控制语言，权限，事务等管理。



登陆mysql：

1. mysql -u用户名 -p密码 
2. mysql -u用户名 -p

连接远程的mysql：mysql -h主机地址 -P 端口号 -u用户名  -p密码

当前DBMS中，有哪些DB: show databases;



打开数据库：





添加一条数据：insert into 表名 values(字段的值);

查看表中的数据：select * from 表名;

数据库里没有char类型，只有字符串，quotes and double quotes都可以用。

```sql
insert into student values(23,"Rose");
insert into student values(23,'Mary');
```

查看当前mysql的编码方式：show variables like 'character%';

## 6. 导入与导出

### 导出

```sql
-- 先退出才能导出
mysqldump -u root -p 数据库名 > 文件路径:/文件名.sql
-- 输入mysql的密码就会自动导出
```

### 导入外部的数据

```sql
-- 需要登陆
-- 先选择一个想要导入的数据库，然后再导入
source 存储数据的路径;
```



## 7. 运算符

### 7.1 算术运算符

+：加
-：减
*：乘
/：除 可以保留小数部分
div：除  如果整数与整数相除只保留整数部分
%：求余数
mod：求余数

```sql
select 1+1;
select 1/2; #0.5
select 1 div 2; #0
```



### 7.2 比较运算符

：大于
<：小于
=：等于  注意区别，Java中是==,mysql中是=
=：大于等于
<=：小于等于
!=：不等于
<>：不等于
<=>：安全等于  用于判断null值的比较运算符
	null值的判断，习惯上我们用is null 和is not null

```sql
#查询薪资大于20000元的员工
select * from t_employee where salary > 20000;

#查询所有男员工
select * from t_employee where gender = '男';
select * from t_employee where gender != '女';
select * from t_employee where gender <> '女';

#查询奖金比例commision_pct是null的员工
select  * from t_employee where commission_pct <=> null;
select  * from t_employee where commission_pct is null;
```



### 7.3 逻辑运算符

建议用单词，可读性来说

逻辑与：&& 或 and
逻辑或：|| 或 or
逻辑非：! 或 not
逻辑异或： xor ^ 相同为false（1），不同为true（0）

```sql
-- 注意逻辑运算符的位置

#查询薪资大于20000元的女员工	
select * from t_employee where salary > 20000 && gender = '女';
select * from t_employee where salary > 20000 and gender = '女';

#查询男员工
select * from t_employee where not gender = '女';
select * from t_employee where !(gender = '女');

#查询薪资大于10000  异或 性别是男的，即它俩只能满足一个
#即查询薪资大于10000的女的或薪资低于10000的男的
select * from t_employee where salary>10000 ^ gender ='男';
select * from t_employee where salary>10000 xor gender ='男';
```



## 8. 范围

### 8.1 区间范围

​	在[a,b]之间，between a and b
​	不在[a,b]之间，not between a and b

```sql
#查询薪资在[15000,20000]之间的员工
select * from t_employee where salary between 15000 and 20000;
select * from t_employee where salary >= 15000 and salary <=20000;

#查询薪资不在[15000,20000]之间的员工
--  not的位置两个都可。
select * from t_employee where salary not between 15000 and 20000;
select * from t_employee where not salary between 15000 and 20000;
```

### 8.2 集合范围

​	in(...)
​	not in(...)

```sql
#查询薪资在9000,10000,12000
select * from t_employee where salary in(9000,10000,12000);
select * from t_employee where salary =9000 || salary =10000 || salary =12000;
```



### 8.3 模糊查询和正则匹配

只针对字符串类型，日期类型

%代表任意多个字符

x代表确定的字符

_表示确定的1个字符

```sql
#查询，名字ename中包含“冰”这个字的员工
select * from t_employee where ename like '%冰%';

#查询，名字ename是张xx，三个字
select * from t_employee where ename like '张__';

#查询，名字ename是第二个字是'冰'
select * from t_employee where ename like '_冰%';
```



### 8.4 位运算符

（很少使用）

左移：<<
右移：>>
按位与：&
按位或：|
按位异或：^
按位取反：~



### 8.5 特殊的null值处理

xx is null
xx is not null
xx <=> null

```sql
-- 筛选出是null值的
select * from 表名 where 字段名 <=> null;
select * from 表名 where 字段名 is null;

-- 筛选出不是null值的
-- 判断不为null的时候，需要把not放在要判断的字段名前面。
select * from 表名 where not 字段名 <=> null;
select * from 表名 where 字段名 is not null;
```



## 9. 约束与索引

### 9.1 约束与索引的概念

约束是用来对数据业务规则和数据完整性进行实施、维护。约束的作用范围仅限在当前数据库，约束可以被当做**数据库对象**来处理，它们具有名称和关联模式，是逻辑约束，不会因为设置约束而额外占用空间。



1、数据完整性（Data Integrity）是指数据的精确性（Accuracy）和可靠性（Reliability）。它是应防止数据库中存在不符合语义规定的数据和防止因错误信息的输入输出造成无效操作或错误信息而提出的。

数据的完整性要从以下四个方面考虑：

* 实体完整性（Entity Integrity）：例如，同一个表中，不能存在两条完全相同无法区分的记录
* 域完整性（Domain Integrity）：例如：年龄范围0-120，性别范围“男/女”
* 引用完整性（Referential Integrity）：例如：员工所在部门，在部门表中要能找到这个部门
* 用户自定义完整性（User-defined Integrity）：例如：用户名唯一、密码不能为空等，本部门经理的工资不得高于本部门职工的平均工资的5倍。

2、根据约束的特点，分为几种：

* 键约束：主键约束（用来解决实体完整性）、外键约束（用来解决引用完整性）、唯一键约束（用来解决用户自定义完整性）。
* Not NULL约束：非空约束。
* Check约束：检查约束(5.7版本不支持)
* Default约束：默认值约束
* 自增约束：（自动增长约束，一般都是用在主键约束上）。

3、约束（CONSTRAINTS）与索引（INDEX）

**索引**是一个单独、物理的存储在数据页上的数据库结构，它是表中**一列或若干列值的集合**和相应的指向表中数据值的物理标识数据页的**逻辑指针清单**（类似于新华字典的目录索引页）。索引的存在会增加数据库的存储空间，也会使插入、修改数据的时间开销变多(因为插入和修改数据时，索引也要随之变动），但是可以大大提高查询速度。因此应该在键列、或其他经常要查询、排序、按范围查找的列上建立索引，而对于在查询中很少使用和参考的列、修改非常频繁的列，值很少的列（例如性别只有男和女）等列上不应该创建索引。

>Mysql会在主键、唯一键、外键列上自动创建索引，其他列需要建立索引的话，需要手动创建。
>
>其中主键删除，对应的索引也会删除
>
>删除唯一键的方式是通过删除对应的索引来实现的
>
>删除外键，外键列上的索引还在，如果需要删除，需要单独删除索引



### 9.2 DDL(v2.0)

#### 查看某个表的约束

```sql
-- 没有where条件的话，会查找所有表的约束
SELECT * FROM information_schema.table_constraints [WHERE table_name = '表名称'];

-- 或

SHOW CREATE TABLE 表名;
```



#### 查看某个表的索引

```sql
SHOW INDEX FROM 表名称;
```



#### 主键约束 primary key

主键分为单列主键和复合主键：

特点

1. 唯一、非空、不能重复
2. 创建主键会自动创建对应的索引，删除主键时会自动删除对应的索引，但是非空约束没有被删除。

##### 建表时 指定主键约束

```sql
-- 直接写在字段后面
CREATE TABLE stu(
id INT PRIMARY KEY,
sname VARCHAR(20)
);

-- 写完字段，再设定主键
CREATE TABLE stu(
id INT,
sname VARCHAR(20),
PRIMARY KEY(id)
);
```

##### 建表后 指定主键

如果想要设置为主键的字段已经有null值，则无法设置成功，需要处理完null值后才能设置。

```sql
alter table 表名 add primary key (主键字段列表);
```

##### 删除主键

```sql
alter table 表名 drop primary key;
```



#### 非空约束 not null

规定某个字段不能为空

##### 建表时 指定非空

```sql
-- 只有这一种方式
CREATE TABLE stu(
id INT PRIMARY KEY,
sname VARCHAR(20) NOT NULL
);
```

##### 建表后 指定非空

```sql
ALTER TABLE 表名 MODIFY 字段名 数据类型 NOT NULL [default 默认值];
#如果该字段原来设置了默认值约束，要跟着一起再写一遍，否则默认值约束会丢失
```

##### 取消非空约束

```sql
ALTER TABLE 表名 MODIFY 字段名 数据类型 [default 默认值];
#如果该字段原来设置了默认值约束，要跟着一起再写一遍，否则默认值约束会丢失
```



#### 唯一约束 unique key

特点：

1. 保证此值在整张表中是唯一的。
2. 创建完唯一约束，会在表内创建一个索引。
3. 删除索引，就相当于删除了唯一约束。
4. 唯一键约束列允许为null。
5. 同一个表可以有多个唯一约束。
6. 唯一约束可以是某一个列的值唯一，也可以多个列组合值的唯一。

##### 建表时 指定唯一约束

```sql
-- 直接写在字段后面
CREATE TABLE stu(
id INT PRIMARY KEY,
sname VARCHAR(20) NOT NULL,
email VARCHAR(20) UNIQUE KEY
);

-- 写完字段后再指定
CREATE TABLE stu(
id INT PRIMARY KEY,
sname VARCHAR(20) NOT NULL,
email VARCHAR(20),
  -- 下面这行不是sname和email分别是唯一约束，而是sname+email是唯一约束
UNIQUE KEY(sname,email)
);
```

##### 建表后增加唯一约束

```sql
alter table 表名 add [constraint 约束名] unique [key] (字段名列表);
#如果没有指定约束名，(字段名列表)中只有一个字段的，默认是该字段名，如果是多个字段的默认是字段名列表的第1个字段名。也可以通过show index from 表名;来查看
```

##### 删除唯一键约束

```sql
ALTER TABLE 表名 DROP INDEX 唯一约束字段名;
```



#### 默认值约束 default

1. 如果没有给某个字段赋值，则会采用默认值。
2. 默认值约束修饰的字段可以接受null值。
3. 

##### 建表时 指定默认约束

```sql
CREATE TABLE stu(
id INT PRIMARY KEY,
sname VARCHAR(20),
buybook enum('TRUE','FALSE') DEFAULT 'TRUE'
);

create table 表名(
	字段名1 数据类型  primary key ,
	字段名2 数据类型 【unique key】 【not null】 【default 默认值】,
	....,
    foreign key (从表字段) references 主表名(主表字段) 【on update 外键约束等级】【on delete 外键约束等级【
    #外键只能在所有字段列表后面单独指定
);

create table 【数据名.】表名(
    字段名1 数据类型 【not null】 【default 默认值】,
    字段名2 数据类型 【not null】 【default 默认值】,
	....,
    primary key(复合主键字段列表),#如果是复合主键，那么就需要在所有字段列表后面使用这种形式指定，不能在字段后面直接加primary key
    unique key(复合唯一字段列表),#如果是复合唯一键，那么就需要在所有字段列表后面使用这种形式指定，不能在字段后面直接加unique key
    foreign key (从表字段) references 主表名(主表字段) 【on update 外键约束等级】【on delete 外键约束等级【
    #外键只能在所有字段列表后面单独指定
);
```

##### 建表后 指定默认值约束

```sql
ALTER TABLE 表名 MODIFY 字段名 数据类型 DEFAULT 默认值;

ALTER TABLE stu MODIFY buybook enum('TRUE','FALSE') DEFAULT 'TRUE';
```

##### 取消默认值约束

```sql
ALTER TABLE 表名 MODIFY 字段名 数据类型;
-- 举例：
ALTER TABLE stu MODIFY buybook enum('TRUE','FALSE');
```



#### 检查约束：check 

检查约束，mysql5.7不支持

```sql
create table stu(
	sid int primary key,
	sname varchar(20),
	gender char check ('男'or'女')
);
insert into stu values(1,'张三','男');
insert into stu values(2,'李四','妖');

使用枚举类型解决如上问题：
create table stu(
	sid int primary key,
	sname varchar(20),
	gender enum ('男','女')
);
```



#### 自增约束 auto_increment

* 一个表最多只能有一个自增长列
* 自增长列必须是键列（主键列，唯一键列，外键列），并且要求非空。
* 自增列必须是整数类型
* InnoDB表的自动增长列可以手动插入，但是插入的值如果是空或者0，则实际插入的将是自动增长后的值。

##### 建表时 指定自增约束

```sql
CREATE TABLE stu(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(20)
);

-- 或

CREATE TABLE stu(
id INT PRIMARY KEY,
age INT UNIQUE KEY NOT NULL AUTO_INCREMENT,
name VARCHAR(20)
);
```

##### 建表后 指定自增约束

```sql
alter table 表名 modify 自增字段名 数据类型 auto_increment;
```

##### 删除自增约束

```sql
alter table 表名 modify 自增字段名 数据类型;
```



#### 外键约束 foreign key

外键约束是用来实现数据库表的参照完整性的。外键约束可以使两张表紧密的结合起来，特别是针对修改或者删除的级联操作时，会保证数据的完整性。

外键是指表中某个字段的值依赖于另一张表中某个字段的值，而**被依赖的字段必须具有主键约束或者唯一约束**。被依赖的表我们通常称之为父表或者主表，设置外键约束的表称为子表或者从表。

##### 外键特点

* 外键约束是保证一个或两个表之间的参照完整性,外键是构建于一个表的两个字段或是两个表的两个字段之间的参照关系。

* 在创建外键约束时，如果不给外键约束名称，默认名不是列名，而是自动产生一个外键名（例如 student_ibfk_1;），也可以指定外键约束名。

* 当创建外键约束时，系统默认会在所在的列上建立对应的普通索引。但是索引名是列名，不是外键的约束名。

* 删除外键时，关于外键列上的普通索引需要单独删除。


##### 要求

* 在从表上建立外键，而且主表要先存在。

* 一个表可以建立多个外键约束

* 从表的外键列，在主表中引用的只能是键列（主键，唯一键，外键），推荐引用主表的主键。

* 从表的外键列与主表被参照的列名字可以不相同，但是数据类型必须一样

##### 约束关系：约束是针对双方的

* 添加了外键约束后，主表的修改和删除数据受约束

* 添加了外键约束后，从表的添加和修改数据受约束
* 在从表上建立外键，要求主表必须存在
* 删除主表时，要求从表先删除，或将从表中外键引用该主表的关系先删除

##### 5个约束等级

* Cascade方式（级联）：在父表上update/delete记录时，同步update/delete掉子表的匹配记录。

* Set null方式：在父表上update/delete记录时，将子表上匹配记录的列设为null，但是要注意子表的外键列不能为not null 。

* No action方式：如果子表中有匹配的记录，则不允许对父表对应候选键进行update/delete操作。

* Restrict方式：同no action，都是立即检查外键约束。（默认为此等级）

* Set default方式（在可视化工具SQLyog中可能显示空白）：父表有变更时,子表将外键列设置成一个默认的值，但Innodb不能识别。

默认：如果没有指定等级，就相当于Restrict方式。



##### 建表时 指定外键约束

```sql
CREATE TABLE classroom(
    cid int PRIMARY KEY,
    cname VARCHAR(20)
);

CREATE TABLE stu(
sid INT PRIMARY KEY,
sname VARCHAR(20),
room INT,
FOREIGN KEY (room) REFERENCES classroom(cid)
);

create table 从表名(
	字段名1 数据类型  primary key ,
	字段名2 数据类型 [unique key],
	....,
    [constraint 外键约束名] foreign key (从表字段) references 主表名(主表字段) [on update 外键约束等级] [on delete 外键约束等级]
    #外键只能在所有字段列表后面单独指定
    #如果要自己命名外键约束名，建议命名规则为【主表名_从表名_关联字段名_fk】
  	-- fk为foreign key的缩写
);

create table 表名(
    字段名1 数据类型,
    字段名2 数据类型,
	....,
    primary key(复合主键字段列表),#如果是复合主键，那么就需要在所有字段列表后面使用这种形式指定，不能在字段后面直接加primary key
    unique key(复合唯一字段列表),#如果是复合唯一键，那么就需要在所有字段列表后面使用这种形式指定，不能在字段后面直接加unique key
    foreign key (从表字段) references 主表名(主表字段) [on update 外键约束等级] [on delete 外键约束等级]
    #外键只能在所有字段列表后面单独指定
);
```

##### 建表后 指定外键约束

```sql
alter table 从表名称 add [constraint 外键约束名] foreign key (从表字段名) references 主表名(主表被参照字段名) [on update xx] [on delete xx];
```

##### 删除外键约束

```sql
-- 注意删除后，用 【DESC 表名】还是能看到外建约束的存在，但实际上已经
ALTER TABLE 表名称 DROP FOREIGN KEY 外键约束名;
#查看约束名 SELECT * FROM information_schema.table_constraints WHERE table_name = '表名称';
#删除外键约束不会删除对应的索引，如果需要删除索引，需要用ALTER TABLE 表名称 DROP INDEX 索引名;
#查看索引名 show index from 表名称;
```



### 9.3 DML(v2.0)

1、如果某列有自增约束，怎么添加该字段的值

添加数据时，对于自增列

```sql
insert into 【数据库名.]表名称 values(值列表)；#在值列表中，对应自增列可以赋值为null和0

insert into 【数据库名.]表名称(部分字段列表) values(值列表)；#自增列在(部分字段列表)中不写就可以
```

2、如果某列有默认值约束，怎么添加、修改该字段的值

添加数据时，对于有默认值列

```sql
insert into 【数据库名.]表名称 values(值列表)；#在值列表中，对应默认值列，如果想用默认值，用default

insert into 【数据库名.]表名称(部分字段列表) values(值列表)；#对应默认值列，如果想用默认值，在(部分字段列表)中不写就可以
```

修改数据

```sql
update 【数据库名.]表名称 set 字段名1 = 值1, 字段名2 = 值2 。。。 【where 条件】; #对应默认值列，如果想用默认值，写字段名 = default就可以
```



## 10. 函数 function

单行函数 和 多行函数

### 10.1 单行函数 Single line function

> https://www.fatalerrors.org/a/detailed-explanation-of-mysql-single-line-function.html

* **只对一行进行变换，每行返回一个结果**
* 可以嵌套
* 参数可以是一字段或一个表达式或一个值

#### 字符串函数

##### CONCAT(S1,S2,......,Sn)

连接S1,S2,......,Sn为一个字符串

```sql
SELECT concat('hello','world') FROM dual;
-- helloworld
```

##### CONCAT_WS(s, S1,S2,......,Sn)

同CONCAT(s1,s2,...)函数，但是每个字符串之间要加上s

```sql
SELECT concat_ws('666','hello','world');
-- hello666world
```

##### CHAR_LENGTH(s)

返回字符串s的字符数

```sql
SELECT ename, char_length(ename) FROM t_employee;
-- 孙红雷,3
```

##### LENGTH(s)

返回字符串s的字节数，和字符集有关.

```sql
SELECT ename, length(ename) FROM t_employee;
-- 孙红雷,9
```

##### UPPER(s) 或 UCASE(s)

将字符串s的所有字母转成大写字母

```sql
SELECT email, upper(email) FROM t_employee;
-- shl@atguigu.com,SHL@ATGUIGU.COM
```

##### LEFT(s,n)

返回字符串s最左边的n个字符

```sql
SELECT ename, left(ename,2) FROM t_employee;
-- 孙红雷,孙红
```

##### TRIM( BOTH s1 FROM s)

去掉字符串s 开始 与 结尾的s1

```sql
SELECT trim(BOTH '%' FROM '%%%%hello%%%%world%%%');
-- hello%%%%world
```

##### TRIM( LEADING s1 FROM s)

去掉字符串s开始处的s1

```sql
SELECT trim(LEADING '%' FROM '%%%%hello%%%%world%%%');
-- hello%%%%world%%%
```

##### TRIM( TRAILING s1 FROM s)

去掉字符串s结尾处的s1

```sql
SELECT trim(TRAILING '%' FROM '%%%%hello%%%%world%%%');
-- %%%%hello%%%%world
```

##### SUBSTRING(s,index,len)

返回从字符串s的index位置其len个字符

注意：mysql的index，即下标，是从1开始的。

```sql
SELECT email, substring(email,2,3) FROM t_employee;
-- shl@atguigu.com, hl@
```





| 函数                            | 用法                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| INSERT(str, index , len, instr) | 将字符串str从第index位置开始，len个字符长的子串替换为字符串instr |
| LOWER(s)  或LCASE(s)            | 将字符串s的所有字母转成小写字母                              |
| RIGHT(s,n)                      | 返回字符串s最右边的n个字符                                   |
| LPAD(str, len, pad)             | 用字符串pad对str最左边进行填充，直到str的长度为len个字符     |
| RPAD(str ,len, pad)             | 用字符串pad对str最右边进行填充，直到str的长度为len个字符     |
| LTRIM(s)                        | 去掉字符串s左侧的空格                                        |
| RTRIM(s)                        | 去掉字符串s右侧的空格                                        |
| TRIM(s)                         | 去掉字符串s开始与结尾的空格                                  |
| REPEAT(str, n)                  | 返回str重复n次的结果                                         |
| REPLACE（str, a, b）            | 用字符串b替换字符串str中所有出现的字符串a                    |
| STRCMP(s1,s2)                   | 比较字符串s1,s2                                              |



#### 数值函数/数学函数

##### ABS(x)

返回x的绝对值

```sql
SELECT abs(-1),abs(1);
--         1       1 
```

##### CEIL(x)

向上取整，返回大于x的最小整数值

```sql
SELECT ceil(2.3);
				 --  3
```

##### FLOOR(x)

向下取整，返回小于x的最大整数值

```sql
SELECT floor(2.3);
			  		-- 2
```

##### ROUND(x,y)

返回参数x的四舍五入的有y位的小数的值

```sql
SELECT round(5.6);
						-- 6
									  		
SELECT round(5.456,2);
					  	-- 5.46
```

##### TRUNCATE(x,y)

返回数字x截断为y位小数的结果，不会四舍五入

```sql
SELECT truncate(5.456,2);
							-- 5.45
```

| 函数     | 用法            |
| -------- | --------------- |
| MOD(x,y) | 返回x/y的模     |
| RAND()   | 返回0~1的随机值 |
| SQRT(x)  | 返回x的平方根   |
| POW(x,y) | 返回x的y次方    |



#### 日期函数

##### NOW() / SYSDATE() / CURRENT_TIMESTAMP() / LOCALTIME() / LOCALTIMESTAMP()

返回当前系统日期时间

```sql
SELECT now(),sysdate(),localtime(),localtimestamp(),sleep(5),
       now(),sysdate(),localtime(),localtimestamp();
/*
2021-11-22 12:00:51,
2021-11-22 12:00:51,
2021-11-22 12:00:51,
2021-11-22 12:00:51,
0,
2021-11-22 12:00:51,	now() 
2021-11-22 12:00:56,	sysdate() 返回的是函数被执行时的时间
2021-11-22 12:00:51,	localtime()
2021-11-22 12:00:51		localtimestamp()  
*/
```

##### YEAR(date) / MONTH(date) / DAY(date) / HOUR(time) / MINUTE(time) / SECOND(time)

返回具体的时间值

```sql
SELECT year(now()),month(now()),day(now()),
       hour(now()),minute(now()),second(now());
       
       -- 2021,11,22,11,58,3
```

##### DAYNAME(date)

返回星期几：MONDAY,TUESDAY.....SUNDAY

```sql
SELECT dayname(now());
-- Monday
```

##### DATE_ADD(datetime, INTERVAL  expr type)

返回与给定日期时间相差INTERVAL时间段的日期时间

```sql
SELECT date_add(now(),INTERVAL 3 YEAR );
-- 2024-11-22 12:06:05

SELECT date_add(now(),INTERVAL -3 YEAR )
-- 2018-11-22 12:06:30

SELECT date_add(now(),INTERVAL -3 MONTH );
-- 2021-08-22 12:06:55

SELECT date_add(now(),INTERVAL -3 DAY );
-- 2021-11-19 12:07:14
```



| 函数                                           | 用法                                                      |
| ---------------------------------------------- | --------------------------------------------------------- |
| **CURDATE()** 或 CURRENT_DATE()                | 返回当前日期                                              |
| **CURTIME()** 或 CURRENT_TIME()                | 返回当前时间                                              |
| WEEK(date) / WEEKOFYEAR(date)                  | 返回一年中的第几周                                        |
| DAYOFWEEK()                                    | 返回周几，注意：周日是1，周一是2，。。。周六是7           |
| WEEKDAY(date)                                  | 返回周几，注意，周1是0，周2是1，。。。周日是6             |
| MONTHNAME(date)                                | 返回月份：January，。。。。。                             |
| DATEDIFF(date1,date2) / TIMEDIFF(time1, time2) | 返回date1 - date2的日期间隔 / 返回time1 - time2的时间间隔 |
| DATE_FORMAT(datetime ,fmt)                     | 按照字符串fmt格式化日期datetime值                         |
| STR_TO_DATE(str, fmt)                          | 按照字符串fmt对str进行解析，解析为一个日期                |



```sql
-- 找出员工中入职时间超过5年的老员工
SELECT *
FROM t_employee
WHERE hiredate < DATE_ADD(NOW(), INTERVAL -5 YEAR);
```

其中：

**（1）DATE_ADD(datetime,INTERVAL  expr type)**

表达式类型：

| 参数类型 | 参数类型      |
| -------- | ------------- |
| YEAR     | YEAR_MONTH    |
| MONTH    | DAY_HOUR      |
| DAY      | DAY_MINUTE    |
| HOUR     | DAY_SECOND    |
| MINUTE   | HOUR_MINUTE   |
| SECOND   | HOUR_SECOND   |
|          | MINUTE_SECOND |

举例：

```sql
SELECT DATE_ADD(NOW(), INTERVAL 1 YEAR);
SELECT DATE_ADD(NOW(), INTERVAL -1 YEAR);   #可以是负数
SELECT DATE_ADD(NOW(), INTERVAL '1_1' YEAR_MONTH);   #需要单引号

```

**（2）DATE_FORMAT(datetime,fmt) 和 STR_TO_DATE(str, fmt)**

| 格式符 | 说明                                                        | 格式符 | 说明                                                        |
| ------ | ----------------------------------------------------------- | ------ | ----------------------------------------------------------- |
| %Y     | 4位数字表示年份                                             | %y     | 表示两位数字表示年份                                        |
| %M     | 月名表示月份（January,....）                                | %m     | 两位数字表示月份（01,02,03。。。）                          |
| %b     | 缩写的月名（Jan.，Feb.，....）                              | %c     | 数字表示月份（1,2,3,...）                                   |
| %D     | 英文后缀表示月中的天数（1st,2nd,3rd,...）                   | %d     | 两位数字表示月中的天数(01,02...)                            |
| %e     | 数字形式表示月中的天数（1,2,3,4,5.....）                    |        |                                                             |
| %H     | 两位数字表示小数，24小时制（01,02..）                       | %h和%I | 两位数字表示小时，12小时制（01,02..）                       |
| %k     | 数字形式的小时，24小时制(1,2,3)                             | %l     | 数字形式表示小时，12小时制（1,2,3,4....）                   |
| %i     | 两位数字表示分钟（00,01,02）                                | %S和%s | 两位数字表示秒(00,01,02...)                                 |
| %W     | 一周中的星期名称（Sunday...）                               | %a     | 一周中的星期缩写（Sun.，Mon.,Tues.，..）                    |
| %w     | 以数字表示周中的天数(0=Sunday,1=Monday....)                 |        |                                                             |
| %j     | 以3位数字表示年中的天数(001,002...)                         | %U     | 以数字表示年中的第几周，（1,2,3。。）其中Sunday为周中第一天 |
| %u     | 以数字表示年中的第几周，（1,2,3。。）其中Monday为周中第一天 |        |                                                             |
| %T     | 24小时制                                                    | %r     | 12小时制                                                    |
| %p     | AM或PM                                                      | %%     | 表示%                                                       |

```sql
select date_format(now(),'%Y %m %D %H %i %s')
                         2020 09 8th 13 56 51
```

```sql
select str_to_date('2020-9-9', "%Y-%m-%D")
2020-09-09
```



#### 流程函数

##### IF(value,t ,f)

如果value是真，返回t，否则返回f

```sql
-- 类似Java中的三目运算符
-- 对于工资大于等于15000，输出高工资；小于15000的，输出一般工资
SELECT ename,salary,if(salary>=15000,'高工资','一般工资') FROM t_employee;
```

##### IFNULL(value1, value2)

如果value1不为空，返回value1，否则返回value2

```sql
-- 求年薪 年薪=月薪资*12*(1+年终奖比例)
-- 但是年终奖比例用为空的情况。
SELECT ename, salary, IF(salary >= 15000, '高工资', '一般工资') 年薪
FROM t_employee;
```

##### CASE WHEN 条件1 THEN result1 WHEN 条件2 THEN result2 .... [ELSE resultn] END

相当于Java的 if...else if...else...

```sql
/*
根据薪水判断等级
>=20000 A
>=15000 B
>=10000 C
<10000 D
*/

SELECT ename,
       salary,
       CASE
           WHEN salary >= 20000 THEN 'A'
           WHEN salary >= 15000 THEN 'B'
           WHEN salary >= 10000 THEN 'C'
           ELSE 'D' END '薪水等级'
FROM t_employee;
```

##### CASE  expr WHEN 常量值1 THEN 值1 WHEN 常量值1 THEN 值1 .... [ELSE 值n] END

相当于Java的switch...case...

```sql
/*
job_id 为
1 教学总监
2 运营总监
3 财务总监
4 前台
5 打酱油的
*/

SELECT ename,
       job_id,
       CASE job_id
           WHEN 1 THEN '教学总监'
           WHEN 2 THEN '运营总监'
           WHEN 3 THEN '财务总监'
           WHEN 4 THEN '前台'
           ELSE '打酱油的' END 'title'
FROM t_employee;
```



#### 其他函数

md5(string)

```sql
SELECT md5('badpwd');
-- 7ad4cdc775b013941114aaf0022a194b
```



### 10.2 多行/分组函数 group function

多行函数：对一组数据进行运算，针对一组数据（多行记录）只返回一个结果，也称分组函数。

- 多行函数可以写在一起。
- 多行函数会自动忽略null值。
- 多行函数不能嵌套多行函数，单行函数可以和多行函数互相嵌套。

#### AVG()

对数值型数据求平均数

```sql
SELECT avg(salary) FROM t_employee;
```

#### SUM()

对数值型数据求和

```sql
SELECT sum(salary) FROM t_employee;
```

#### MAX()

对任意数据类型的数据求最大值

```sql
SELECT max(salary) FROM t_employee;
```

#### MIN() 

对任意数据类型的数据求最小值

```sql
SELECT min(salary) FROM t_employee;
```

#### COUNT()

对任意数据类型的数据计数

```sql
SELECT count(salary) FROM t_employee;

-- 统计employee表有多少行数据
SELECT count(*) FROM t_employee;
/*
1.count(1)与count(*)得到的结果一致，包含null值。
2.count(字段)不计算null值
3.count(null)结果恒为0
> https://blog.csdn.net/lwei_998/article/details/6112810
*/
```



单行函数 嵌套多行函数

```sql
SELECT avg(salary), round(avg(salary),2),truncate(avg(salary),2) FROM t_employee;
```

多行函数 嵌套单行函数

```sql
SELECT truncate(avg(truncate(salary,0)),0) FROM t_employee;
```



## 11. 关联查询

又称为：联合查询，多表联查。

> https://baike.baidu.com/item/%E7%AC%9B%E5%8D%A1%E5%B0%94%E4%B9%98%E7%A7%AF/6323173
>
> 笛卡尔积：
>
> 案例，给出三个域：
>
> D1=SUPERVISOR = { 张清玫，刘逸 }
>
> D2=SPECIALITY= {计算机专业，信息专业}
>
> D3=POSTGRADUATE = {李勇，刘晨，王敏}
>
> 则D1，D2，D3的笛卡尔积为D：
>
> D=D1×D2×D3 ={(张清玫, 计算机专业, 李勇), (张清玫, 计算机专业, 刘晨),
>
> (张清玫, 计算机专业, 王敏), (张清玫, 信息专业, 李勇),
>
> (张清玫, 信息专业, 刘晨), (张清玫, 信息专业, 王敏),
>
> (刘逸, 计算机专业, 李勇), (刘逸, 计算机专业, 刘晨),
>
> (刘逸, 计算机专业, 王敏), (刘逸, 信息专业, 李勇),
>
> (刘逸, 信息专业, 刘晨), (刘逸, 信息专业, 王敏)}
>
> 这样就把D1,D2,D3这三个集合中的每个元素加以对应组合，形成庞大的集合群。
>
> 本个例子中的D中就会有2X2X3个元素，如果一个集合有1000个元素，有这样3个集合，他们的笛卡尔积所组成的新集合会达到十亿个元素。假若某个集合是[无限集](https://baike.baidu.com/item/无限集)，那么新的集合就将是有无限个元素 [2] 。
>
> ```sql
> # 实现笛卡尔积
> 
> SELECT * FROM t_department;
> -- 5 rows
> SELECT * FROM t_employee;
> -- 25 rows
> SELECT * FROM t_employee, t_department;
> -- 125=5*25 rows
> ```

### 11.1 关联查询的7种结果

> sql joins
>
> https://www.runoob.com/sql/sql-join.html

![sql-join](https://s2.loli.net/2022/05/25/DImrBXTJdAUQesK.png)

（1）A∩B

（2）A

（3）A -  A∩B

（4）B

（5）B - A∩B

（6）A ∪ B

（7）A∪B- A∩B    或者   (A -  A∩B) ∪ （B - A∩B）



### 11.2 内连接 Inner join

实现A∩B

```sql
-- e 和 d 都是表的别名
SELECT e.ename, e.salary, e.did, d.did, d.dname
FROM t_employee e
INNER JOIN t_department d;

/*
根据笛卡尔积，出现了1*5条结果，但是只有一条是正确的，即e.did=d.did
孙红雷,8000.46,1,5,后勤部
孙红雷,8000.46,1,2,咨询部
孙红雷,8000.46,1,1,教学部
孙红雷,8000.46,1,4,财务部
孙红雷,8000.46,1,3,运营部
*/

-- 所以正确的代码应该是
SELECT e.ename, e.salary, e.did, d.did, d.dname
FROM t_employee e
INNER JOIN t_department d ON e.did = d.did;
```



```sql
-- sql99: 将关联条件和筛选条件分开
select 字段列表
from A表 inner join B表
on 关联条件
where 筛选条件;

或

-- sql192: 将关联条件和筛选条件使用and连接
select 字段列表
from A表 , B表
where 关联条件 and 筛选条件;
```



### 11.3 外连接 Outer Join

#### 左外连接 Left Join

```sql
#实现查询结果是A
select 字段列表
from A表 left join B表
on 关联条件
where 等其他子句;

SELECT e.ename, e.gender,e.did,d.dname
from t_employee e
LEFT JOIN t_department d ON e.did = d.did;
```



```sql
#实现A -  A∩B
select 字段列表
from A表 left join B表
on 关联条件
where 从表关联字段 is null and 等其他子句;

SELECT e.ename, e.gender,e.did,d.dname
from t_employee e
LEFT JOIN t_department d ON e.did = d.did
WHERE d.did IS NULL;
```



#### 右外连接 Right join

```sql
#实现查询结果是B
select 字段列表
from A表 right join B表
on 关联条件
where 等其他子句;

SELECT e.ename, e.gender, e.did, d.dname
FROM t_employee e
RIGHT JOIN t_department d ON e.did = d.did;
```



```sql
#实现B -  A∩B
select 字段列表
from A表 right join B表
on 关联条件
where 从表关联字段 is null and 等其他子句;

SELECT e.ename, e.gender, e.did, d.dname
FROM t_employee e
RIGHT JOIN t_department d ON e.did = d.did
WHERE e.did IS NULL; -- 这里要用e.did
```



#### 全外连接 Full Outer Join

mysql使用union代替全外连接

```sql
#实现查询结果是A∪B
#左外的A union 右外的B

-- 实现A
select 字段列表
from A表 left join B表
on 关联条件
where 等其他子句

union -- 实现A∪B

-- 实现B
select 字段列表
from A表 right join B表
on 关联条件
where 等其他子句;

#查询所有员工，所有部门，包括没有员工的部门，和没有部门的员工
SELECT e.ename,e.did,d.dname
from t_employee e
LEFT JOIN t_department d on e.did=d.did

UNION

SELECT e.ename ,e.did,d.dname
from t_employee e
RIGHT JOIN t_department d ON e.did = d.did;
```



```sql
#实现A∪B -  A∩B  或   (A -  A∩B) ∪ （B - A∩B）
#使用左外的 (A -  A∩B)  union 右外的（B - A∩B）
select 字段列表
from A表 left join B表
on 关联条件
where 从表关联字段 is null and 等其他子句

union

select 字段列表
from A表 right join B表
on 关联条件
where 从表关联字段 is null and 等其他子句

#查询那些没有部门的员工和所有没有员工的部门
SELECT e.ename,e.did,d.dname
from t_employee e
LEFT JOIN t_department d on e.did=d.did
WHERE e.did IS NULL

UNION

SELECT e.ename ,e.did,d.dname
from t_employee e
RIGHT JOIN t_department d ON e.did = d.did
WHERE e.did IS NULL;
```



### 11.4 自连接

两个关联查询的表是同一张表，通过取别名的方式来虚拟成两张表

```sql
select 字段列表
from 表名 别名1 inner/left/right join 表名 别名2
on 别名1.关联字段 = 别名2的关联字段
where 其他条件

#查询员工的编号，姓名，薪资和他领导的编号，姓名，薪资
#这些数据全部在员工表中
#把t_employee表，即当做员工表，又当做领导表
#领导表是虚拟的概念，我们可以通过取别名的方式虚拟
SELECT e1.eid 'employee id', e1.ename 'employee name', e2.eid 'manage id', e2.ename 'manage name'
FROM t_employee e1
         INNER JOIN t_employee e2
                    ON e1.mid = e2.eid;
```



### 11.5 练习

三张表查询

```sql
# 查看员工的姓名，员工的id，职位编号，职位名称，部门编号，部门名称

SELECT e.ename, e.eid, e.job_id, j.job_name, e.did, d.dname
FROM t_employee e
         JOIN t_job j
              ON e.job_id = j.job_id
         JOIN t_department d
              ON e.did = d.did;
```



## 12. select语句的7大子句

### 7大子句书写顺序

（1）from：从哪些表中筛选，已经拿到了表中的所有数据

（2）on：关联多表查询时，去除笛卡尔积

（3）where：从表中筛选的条件

（4）group by：分组依据

（5）having：在统计结果中再次筛选

（6）order by：排序

（7）limit：分页

必须按照（1）-（7）的顺序【编写】子句（编写顺序而不是执行顺序）。



### group by与分组函数

可以使用GROUP BY子句将表中的数据分成若干组

```sql
-- 根据部门编号分组，找出每个组的最高薪酬额（从多个数据中挑选出一个）
SELECT did,max(salary)
from t_employee
GROUP BY did; -- 使用group by时，select后面至少需要一个分组函数。
```



```sql
SELECT column, group_function(column)
FROM table
[WHERE condition]
[GROUP BY	group_by_expression];

SELECT did, avg(salary)
FROM t_employee
WHERE did is NOT NULL
GROUP BY did;
```

> **明确：WHERE语句 一定放在FROM后面 GROUP BY 前面**

在SELECT列表中所有未包含在分组函数中的列都应该包含在 GROUP BY子句中

```sql
SELECT   department_id, AVG(salary)
FROM     employees
GROUP BY department_id ;
```

包含在 GROUP BY 子句中的列不必包含在SELECT 列表中

```sql
SELECT   AVG(salary)
FROM     employees
GROUP BY department_id ;
```

##### 使用多个列分组

```sql
SELECT   department_id dept_id, job_id, SUM(salary)
FROM     employees
GROUP BY department_id, job_id ;
```



### having与分组函数

如果对分组后的结果再次筛选，需要使用having

```sql
SELECT e.did,avg(salary)
from t_employee e
WHERE e.did is not NULL
GROUP BY e.did
HAVING avg(salary)>12000; -- having 后面可以跟group function
```



### having与where的区别？

（1）where是从表中筛选的条件，而having是分组（统计）结果中再次筛选

（2）where后面不能加“分组/聚合函数”，而having后面可以跟分组函数

```sql
##统计部门平均工资高于8000的部门和平均工资
SELECT   department_id, AVG(salary)
FROM     employees
WHERE    AVG(salary) > 8000 # 此行报错：group function is not allowed here
GROUP BY department_id;
```

```sql
#统计每一个部门，薪资高于10000元的女员工的数量，显示人数超过1人
SELECT did,COUNT(*)
FROM t_employee
WHERE gender ='女' AND salary>10000
GROUP BY did
HAVING COUNT(*) > 1;
```



### order by

order by：

降序：desc

升序：要么默认，要么加asc

```sql
SELECT e.did,d.dname,avg(salary)
FROM t_employee e
INNER JOIN t_department d ON e.did =d.did
GROUP BY e.did
ORDER BY e.did ASC ;
```



### limit

limit (pageNumber - 1) * pageSize, pageSize

pageNumber: 页数

pageSize: 每页显示数量

代码示例：

```sql
/*
每页显示2条 展示第三页
*/
select * from emp limit 4,2;
```



```sql
# 求员工的姓名，薪水，部门编号，部门名称，工作编号，工作名称，按照薪水排序，每页显示3条显示第4页
SELECT e.ename, e.salary, e.did, d.dname, e.job_id, j.job_name
FROM t_employee e
         INNER JOIN t_department d ON e.did = d.did
         JOIN t_job j ON e.job_id = j.job_id
ORDER BY e.salary
LIMIT 9,3;
```



## 13. 子查询

嵌套在另一个查询中的查询，根据位置不同，分为：where型，from型，exists型。注意：不管子查询在哪里，子查询必须使用()括起来。

### where型

①子查询是单值结果，那么可以对其使用（=，>等比较运算符）

```sql
SELECT MIN(salary) FROM t_employee;
SELECT * FROM t_employee WHERE salary = 7000.67;
-- 将上面两句合并为一句
SELECT * FROM t_employee
WHERE salary = (SELECT MIN(salary) FROM t_employee);
```

②子查询是多值结果，那么可对其使用（【not】in(子查询结果)，或 >all(子查询结果)，或>=all(子查询结果)，<all(子查询结果)，<=all（子查询结果)，或 >any(子查询结果)，或>=any(子查询结果)，<any(子查询结果)，<=any（子查询结果)）

```sql
查询全公司最高工资的员工信息
select * from 员工表 where 薪资 = (select max(薪资) from 员工表);

select * from 员工表 where 薪资 > all(select salary from 员工表  where 员工编号 in(...));
```

```sql
-- 查询比孙红雷、黄晓明、迪丽热巴工资都高的员工。
-- 这三个人的工资为
SELECT salary FROM t_employee WHERE ename IN ('孙红雷','黄晓明','迪丽热巴');

-- 方式一 使用max函数
SELECT *
FROM t_employee
WHERE salary > (SELECT MAX(salary) FROM t_employee WHERE ename IN ('孙红雷', '黄晓明', '迪丽热巴'));

-- 方式二 不使用max函数，使用all关键字
-- all 包含所有结果 > all 比所有结果都大
SELECT *
FROM t_employee
WHERE salary > ALL (SELECT salary FROM t_employee WHERE ename IN ('孙红雷', '黄晓明', '迪丽热巴'));

-- 查询比 孙红雷 或 黄晓明 或 迪丽热巴 工资高的员工。
-- any 任意一个 > any 比最小的值大即可
SELECT *
FROM t_employee
WHERE salary > ANY (SELECT salary FROM t_employee WHERE ename IN ('孙红雷', '黄晓明', '迪丽热巴'));
```









### from型

子查询的结果是多行多列的结果，类似于一张表格。

必须给子查询取别名，即临时表名，表的别名不要加“”和空格。

```sql
查询每个部门的编号，名称，平均工资
select 部门编号, 部门名称， 平均工资
from 部门表 inner join (select 部门编号，avg(薪资) from 员工表  group by 部门编号) temp
on 部门表.部门编号 = temp.部门编号
```

```sql
# 求每一个部门的平均薪水 和 部门名称
-- 部门id和平均薪水
SELECT e.did, AVG(salary)
FROM t_employee e
WHERE e.did IS NOT NULL
GROUP BY e.did;
-- 将上面的查询结果作为一张子表使用,和部门表一起得到想要的数据
SELECT d.did, d.dname, temp.average_salary
FROM t_department d
         JOIN (
    SELECT e.did, AVG(salary) average_salary
    FROM t_employee e
    WHERE e.did IS NOT NULL
    GROUP BY e.did
) temp
              ON d.did = temp.did
GROUP BY d.did;
```



### exists型

```sql
查询那些有员工的部门
select 部门编号, 部门名称 from 部门表
where exists (select * from 员工表  where 部门表.部门编号 = 员工表.部门编号);

SELECT * FROM t_department d
-- 当员工表引用部门表的did时，说明这个部门有员工的。
WHERE exists(SELECT * FROM t_employee e WHERE e.did = d.did);
```

## 14. Transaction 事务

### 概述

#### 事务处理（事务操作）

保证所有事务都作为一个工作单元来执行，即使出现了故障，都不能改变这种执行方式。当在一个事务中执行多个操作时，要么所有的事务都被提交(commit)，那么这些修改就永久地保存下来；要么数据库管理系统将放弃所作的所有修改，整个事务回滚(rollback)到最初状态。

> 例如转账操作：
>
> A账户要转账给B账户，那么A账户上减少的钱数和B账户上增加的钱数必须一致，也就是说A账户的转出操作和B账户的转入操作要么全部执行，要么全不执行；
>
> 如果其中一个操作出现异常而没有执行的话，就会导致账户A和账户B的转入转出金额不一致的情况。而事实上这种情况是不允许发生的，所以为了防止这种情况的发生，需要使用事务处理。



#### 事务的ACID属性

1. 原子性（Atomicity）：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
2. 一致性（Consistency）:在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
3. 隔离性（Isolation）:数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
4. 持久性（Durability）:事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

### 开启和结束事务

1、用 BEGIN, ROLLBACK, COMMIT来实现

- START TRANSACTION 或 BEGIN 开始一个事务
- ROLLBACK 事务回滚
- COMMIT 事务确认

2、直接用 SET 来改变 MySQL 的自动提交模式:

- SET AUTOCOMMIT=0/FALSE 禁止自动提交，开启事务
- SET AUTOCOMMIT=1/TRUE 开启自动提交，关闭事务

3、注意：

事务的回滚只对DML语句（数据的增删改查）有效，对于DDL语句无效。

4、mysql默认是自动提交，执行一句就提交一句。

即默认情况下，每一条sql都是一个独立的sql。



### 事务隔离级别

#### 1、事务并发问题

对于同时运行的多个事务, 当这些事务访问数据库中相同的数据时, 如果没有采取必要的隔离机制, 就会导致各种并发问题:

* **脏读**: 对于两个事务 T1, T2, T1 读取了已经被 T2 更新但还**没有被提交**的字段。 之后, 若 T2 回滚, T1读取的内容就是临时且无效的。

![1599461151424](/Users/raywei/Desktop/尚硅谷/源码与笔记/2.数据库关键技术/2.数据库关键技术/day024mysql01/笔记/imgs\1599461151424.png)

* **不可重复读**: 对于两个事务T1, T2, T1 读取了一个字段, 然后 T2 **更新/修改**了该字段。 之后, T1再次读取同一个字段, 值就不同了。

![1599461170319](/Users/raywei/Desktop/尚硅谷/源码与笔记/2.数据库关键技术/2.数据库关键技术/day024mysql01/笔记/imgs\1599461170319.png)

* **幻读**: 对于两个事务T1, T2, T1 从一个表中读取了一个字段, 然后 T2 在该表中**插入/删除**了一些新的行。 之后, 如果 T1 再次读取同一个表, 就会多/少几行。

![1599461184631](/Users/raywei/Desktop/尚硅谷/源码与笔记/2.数据库关键技术/2.数据库关键技术/day024mysql01/笔记/imgs\1599461184631.png)

***不可重复度和幻读区别：*** 

不可重复读的重点是修改，幻读的重点在于新增或者删除。 

***解决不可重复读的问题只需锁住满足条件的行，解决幻读需要锁表*** 

例1（同样的条件, 你读取过的数据, 再次读取出来发现值不一样了 ）：事务1中的A先生读取自己的工资为 1000的操作还没完成，事务2中的B先生就修改了A的工资为2000，导致A再读自己的工资时工资变为 2000；这就是不可重复读。 

例2（同样的条件, 第1次和第2次读出来的记录数不一样 ）：假某工资单表中工资大于3000的有4人，事务1读取了所有工资大于3000的人，共查到4条记录，这时事务2 又插入了一条工资大于3000的记录，事务1再次读取时查到的记录就变为了5条，这样就导致了幻读 



#### 2、事务隔离级别

**数据库事务的隔离性**：数据库系统必须具有隔离并发运行各个事务的能力, 使它们不会相互影响, 避免各种并发问题。**一个事务与其他事务隔离的程度称为隔离级别。**数据库规定了多种事务隔离级别, 不同隔离级别对应不同的干扰程度, 隔离级别越高, 数据一致性就越好, 但并发性越弱。

**数据库提供的 4 种事务隔离级别：**

| 隔离级别         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| read-uncommitted | 允许A事务读取其他事务未提交和已提交的数据。会出现***脏读、不可重复读、幻读***问题 |
| read-committed   | 只允许A事务读取其他事务已提交的数据。可以避免脏读，但仍然会出现***不可重复读、幻读***问题 |
| repeatable-read  | 确保事务可以多次从一个字段中读取相同的值。在这个事务持续期间，禁止其他事务对这个字段进行更新。可以避免脏读和不可重复读。但是幻读问题仍然存在。<br />mysql中，此项已经解决幻读。 |
| serializable     | 确保事务可以从一个表中读取相同的行，相同的记录。在这个事务持续期间，禁止其他事务对该表执行插入、更新、删除操作。所有并发问题都可以避免，但性能十分低下。 |

* Oracle 支持的 2 种事务隔离级别：**READ-COMMITED**, SERIALIZABLE。 Oracle 默认的事务隔离级别为: READ COMMITED 。
* Mysql 支持 4 种事务隔离级别。 Mysql 默认的事务隔离级别为: **REPEATABLE-READ**。在mysql中REPEATABLE READ的隔离级别也可以避免幻读了。

#### 3、设置和查看隔离级别

每启动一个 mysql 程序, 就会获得一个单独的数据库连接。每个数据库连接都有一个变量 @@tx_isolation, 表示当前连接的事务隔离级别。mysql服务也有一个全局变量@@global.tx_isolation，表示所有连接的默认事务隔离级别。

查看当前mysql连接的隔离级别: 

```sql
# version 8.0.18
SELECT @@transaction_isolation;
-- 或
SHOW VARIABLES LIKE '%iso%';

# version 5.7
select @@tx_isolation;
```

查看全局的隔离级别：

```sql
# version 8.0.18
SELECT @@global.transaction_isolation;

# version 5.7
select @@global.tx_isolation;
```

设置当前 mysql连接的隔离级别:  

```sql
# version 8.0.18
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

# version 5.7
set tx_isolation ='repeatable-read';
```

设置数据库系统的全局的隔离级别（下次会话生效）:

```sql
# version 8.0.18
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;

# version 5.7
set global tx_isolation ='read-committed';
```

> 注意：这里的隔离级别中间是减号，不是下划线。

## 15. 用户与权限

用户

公司职员（根据岗位分配角色）

角色：权限的集合 （mysql8才有）

经理，财务，人事。

权限

查看数据、修改数据等

### 身份认证

（1）IP+用户名作为身份验证

​	例如：

​        root@localhost：只允许在本机使用root用户登录

​		root@%：运行在任意机器上使用root用户登录

​		root@192.168.11.56：只运行在192.168.11.56这个ip的主机上使用root用户登录

​		gjz@%：运行在任意机器上使用gjz用户登录

> 建立用户时，用于身份验证的IP地址，是连接你的服务的客户端的IP地址
>
> 例如：root@192.168.11.56，表示客户端在192.168.11.56的机器上可以访问你的mysql服务
>
> 而这个客户端，要连接你的服务时，-h后面的主机的IP地址是，服务器所在的机器的IP地址。
>
> 例如：mysql服务在192.168.11.11机器上，客户端在192.168.11.56上，那么客户端可以用root@192.168.11.56或root@%，连接时填写mysql -h192.168.11.11 -u root -p密码

（2）密码

### 分配权限

#### 1、用户权限有4个权限级别

（1）全局

（2）数据库

（3）表

（4）字段

依次校验权限，如果前面通过了，后面就不校验了：

全局 > 数据库 > 表 > 字段

> 注意：root@localhost，这个用户始终保留所有的全局权限。



#### 2、查看账户权限

```
show grants for '用户名'@'主机IP地址';
```

 

#### 3、新建用户和删除用户

![1561009788685](/Users/raywei/Desktop/尚硅谷/源码与笔记/2.数据库关键技术/2.数据库关键技术/day024mysql01/笔记/imgs/1561009788685.png)

![1561009769163](/Users/raywei/Desktop/尚硅谷/源码与笔记/2.数据库关键技术/2.数据库关键技术/day024mysql01/笔记/imgs/1561009769163.png)

对应的语句：

```
CREATE USER '用户名'@'主机IP地址' IDENTIFIED BY '123456';
```

> 如果主机IP地址写：
>
> （1）192.168.29.53，就仅限于在该IP登录
>
> （2）%，就表示可以从任意IP登录

```
drop user '用户名'@'主机IP地址';
```



#### 4、授予和收回权限

![1561009821823](/Users/raywei/Desktop/尚硅谷/源码与笔记/2.数据库关键技术/2.数据库关键技术/day024mysql01/笔记/imgs/1561009821823.png)

对应语句：

```sql
GRANT 权限列表 ON *.* TO '用户名'@'主机IP地址';  #全局
GRANT 权限列表 ON 数据库名.* TO '用户名'@'主机IP地址'; #某个库
GRANT 权限列表 ON 数据库名.表格 TO '用户名'@'主机IP地址'; #某个库的某个表
GRANT 权限列表 ON 表名.* TO '用户名'@'主机IP地址';  #某个表的字段
```

例如：

```sql
GRANT SELECT ON *.* TO 'gao'@'192.168.29.53';
GRANT SELECT ON `test`.* TO 'gao'@'192.168.29.53';
GRANT UPDATE ON `test`.`t_department` TO 'gao'@'192.168.29.53';
GRANT UPDATE ON `t_department`.* TO 'gao'@'192.168.29.53';
GRANT SELECT (tid), INSERT (tid), UPDATE (tid), REFERENCES (tid) ON `1101db`.`course` TO 'gao'@'192.168.29.30';
```

收回权限：

```sql
revoke 权限列表 ON *.* from '用户名'@'主机IP地址';
revoke 权限列表 ON 数据库名.* from '用户名'@'主机IP地址';
revoke 权限列表 ON 数据库名.表格 from '用户名'@'主机IP地址';
revoke 权限列表 ON 表名.* from '用户名'@'主机IP地址';
```

