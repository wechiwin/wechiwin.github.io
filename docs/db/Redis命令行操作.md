中文官网http://www.redis.cn

英文官网http://redis.io

Redis命令参考文档网址：http://redisdoc.com

http://doc.redisfans.com/

## 1. Redis命令的小套路

- NX：not exist
- EX：expire
- M：multi

## 2.基本操作

### ①切换数据库

Redis默认有16个数据库。

```bash
# 使用select切换数据库
# 数据库索引从0开始
127.0.0.1:6379> select 2
OK
127.0.0.1:6379[2]> select 0
OK
```

### ②查看数据库长度

数据库长度就是这个数据库中存储了多少条数据

``` bash
127.0.0.1:6379> set hello hello
OK
127.0.0.1:6379> set happy happy-value
OK
127.0.0.1:6379> set good good-value
OK

127.0.0.1:6379> dbsize
(integer) 3
```

### ③清空全库

```html
127.0.0.1:6379> flushall
```

## 3. KEY操作

在实际操作中对于Key的定义大家注意下面几点：

- Key不要太长，超过1024字节将消耗过多内存，降低查询效率。尽管Redis支持的Key最大长度为512MB。
- Key仍然要做到见名知意。
- 在同一个项目中遵循同一个命名规范，习惯上多个单词用“:”分开。例如：“user:token:session:id”
- Redis命令不区分大小写，Key区分大小写

### KEYS PATTERN

把匹配PATTERN的key返回

```bash
# PATTERN中可以使用“*”匹配多个字符，使用“?”匹配单个字符

# 返回数据库中所有的key
127.0.0.1:6379> keys *
1) "hello"
2) "happy"
3) "good"

# 返回数据库中以h开头的key
127.0.0.1:6379> keys h*
1) "hello"
2) "happy"

# 返回数据库中有字母o的key
127.0.0.1:6379> keys *o*
1) "hello"
2) "good"
```

### TYPE KEY

返回KEY对应的值的类型

```bash
127.0.0.1:6379> type hello
string
```

### MOVE KEY DB

把一组键值对数据移动到另一个数据库中

```bash
127.0.0.1:6379> move good 2
(integer) 1
```

### DEL KEY [KEY ...]

根据KEY进行删除，至少要指定一个KEY

```bash
127.0.0.1:6379> del happy
(integer) 1
```

### EXISTS KEY [KEY ...]

检查指定的KEY是否存在。指定一个KEY时，存在返回1，不存在返回0。可以指定多个，返回存在的KEY的数量。

```bash
127.0.0.1:6379> exists good
(integer) 0
127.0.0.1:6379> exists fruit-list
(integer) 1
```

### RENAME KEY NEWKEY

重命名一个KEY，NEWKEY不管是否是已经存在的都会执行，如果NEWKEY已经存在则会被覆盖。

```bash
127.0.0.1:6379> keys *
1) "fruit-list"
2) "bbb"
3) "aaa"

127.0.0.1:6379> rename aaa 333
OK

127.0.0.1:6379> keys *
1) "fruit-list"
2) "bbb"
3) "333"
```

### RENAMENX KEY NEWKEY

只有在NEWKEY不存在时能够执行成功，否则失败

```bash
127.0.0.1:6379> keys *
1) "fruit-list"
2) "bbb"
3) "aaa:444"

127.0.0.1:6379> renamenx bbb aaa:444
(integer) 0
```

### EXPIRE KEY SECONDS

给一个KEY设置在SECONDS秒后过期，过期会被Redis移除。

```bash
127.0.0.1:6379> expire bbb 100
(integer) 1
```

### TTL KEY

以秒为单位查看KEY还能存在多长时间
正数：剩余的存活时间（单位：秒）
-1：永不过期
-2：不存在的Key

```bash
127.0.0.1:6379> ttl bbb
(integer) 96
```

### PERSIST KEY

移除过期时间，变成永久key

``` bash
127.0.0.1:6379> persist bbb
(integer) 1

127.0.0.1:6379> ttl bbb
(integer) -1
```



## 4. string操作

### GET KEY

根据key得到值，只能用于string类型。

```bash
127.0.0.1:6379> get ccc
"111"
```

### SET KEY VALUE [EX SECONDS | PX MILLISECONDS] [NX|XX]

给KEY设置一个string类型的值。

- EX参数用于设置存活的秒数。
- PX参数用于设置存活的毫秒数。
- NX参数表示当前命令中指定的KEY不存在才行。
- XX参数表示当前命令中指定的KEY存在才行。

```bash
127.0.0.1:6379> set ccc 222 xx
OK

127.0.0.1:6379> set abc 222 xx
(nil)

127.0.0.1:6379> get ccc
"222"
```

### APPEND KEY VALUE

把指定的value追加到KEY对应的原来的值后面，返回值是`追加后的字符串长度`

```bash
127.0.0.1:6379> get bbb
"333"

127.0.0.1:6379> append bbb 123456
(integer) 9

127.0.0.1:6379> get bbb
"333123456"
```

### STRLEN KEY

直接返回字符串长度

```bash
127.0.0.1:6379> strlen bbb
(integer) 9
```

### INCR KEY

自增1（要求：参与运算的数据必须是整数且不能超过整数Integer范围）

```bash
127.0.0.1:6379> incr bbb
(integer) 333123457
```

### DECR KEY

自减1（要求：参与运算的数据必须是整数且不能超过整数Integer范围）

```bash
127.0.0.1:6379> decr bbb
(integer) 333123456
```

### INCRBY KEY INCREMENT

原值+INCREMENT（要求：参与运算的数据必须是整数且不能超过整数Integer范围）

```bash
127.0.0.1:6379> INCRBY bbb 333654321
(integer) 666777777
```

### DECRBY KEY DECREMENT

原值-DECREMENT（要求：参与运算的数据必须是整数且不能超过整数Integer范围）

```bash
127.0.0.1:6379> DECRBY bbb 666777776
(integer) 1
```

### GETRANGE KEY START END

从字符串中取指定的一段，索引从0开始。START是开始取值的索引
，END是结束取值的索引。

```bash
127.0.0.1:6379> set bbb 123456789
OK

127.0.0.1:6379> get bbb
"123456789"

127.0.0.1:6379> GETRANGE bbb 3 6
"4567"
```

### SETRANGE KEY OFFSET VALUE

从offset（从0开始的索引）开始使用VALUE进行替换，包含offset位置。

```bash
127.0.0.1:6379> SETRANGE bbb 0 9876 
(integer) 9

127.0.0.1:6379> get bbb
"987656789"
```

### SETEX KEY SECONDS VALUE

设置KEY,VALUE时指定存在秒数

```bash
127.0.0.1:6379> setex eee 100 eee-value
OK

127.0.0.1:6379> ttl eee
(integer) 96
```

### SETNX KEY VALUE

新建字符串类型的键值对，且要求key必须是新建的

```bash
127.0.0.1:6379> setnx ggg ggg-value
(integer) 1

127.0.0.1:6379> setnx ggg ggg-value2
(integer) 0

127.0.0.1:6379> get ggg
"ggg-value"
```

### MSET KEY VALUE [KEY VALUE ...]

一次性设置一组多个键值对

```bash
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3
OK
```

### MGET KEY [KEY ...]

一次性指定多个KEY，返回它们对应的值，没有值的KEY返回值是(nil)

```bash
127.0.0.1:6379> mget k1 k2 k3 k4
1) "v1"
2) "v2"
3) "v3"
4) (nil)
```

### MSETNX KEY VALUE [KEY VALUE ...]

一次性新建多个值，key必须是新建

```bash
127.0.0.1:6379> MSETNX k3 v33 k4 v44
(integer) 0
127.0.0.1:6379> mget k3 k4
1) "v3"
2) (nil
```

### GETSET KEY VALUE

设置新值，同时能够将旧值返回

``` bash
127.0.0.1:6379> getset k3 v33
"v3"

127.0.0.1:6379> get k3
"v33"
```



## 5.list操作

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。它的底层是双向链表，所以它操作时头尾效率高，中间效率低（额外花费查找插入位置的时间）。

在Redis中list类型是按照插入顺序排序的字符串链表。和数据结构中的普通链表一样，我们可以在其头部(left)和尾部(right)添加新的元素。在插入时，如果该键并不存在，Redis将为该键创建一个新的链表。与此相反，如果链表中所有的元素均被移除，那么该键也将会被从数据库中删除。List中可以包含的最大元素数量是2^32-1个。

list是一个有序可以重复的数据类型。

![](https://gitee.com/rayywei/blog-image/raw/master/redis-list.png)

### LPUSH key value [value ...]

针对key指定的list，从左边放入元素

```bash
127.0.0.1:6379[3]> lpush fruit-list apple banana cherry
(integer) 3
```

### RPUSH key value [value ...]

针对key指定的list，从右边放入元素

```bash
127.0.0.1:6379[3]> rpush fruit-list orange peach
(integer) 5
```

### LRANGE key start stop

根据list集合的索引打印元素数据

- 正着数：0,1,2,3,...
- 倒着数：-1,-2,-3,...

```bash
127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "cherry"
2) "banana"
3) "apple"
4) "orange"
5) "peach"
```

### LLEN key

​	返回list集合的长度

```bash
127.0.0.1:6379[3]> llen fruit-list
(integer) 5
```

### LPOP key

​	从左边弹出一个元素。
​	弹出=返回+删除。

```bash
127.0.0.1:6379[3]> lpop fruit-list
"cherry"
```

### RPOP key

​	从右边弹出一个元素。

```bash
127.0.0.1:6379[3]> rpop fruit-list
"peach"
```

### RPOPLPUSH source destination

从source中RPOP一个元素，LPUSH到destination中

```bash
127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "banana"
2) "apple"
3) "orange"

127.0.0.1:6379[3]> rpoplpush fruit-list target-list
"orange"

127.0.0.1:6379[3]> lrange target-list 0 -1
1) "orange"

127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "banana"
2) "apple"
```

### LINDEX key index

根据索引从集合中取值

```bash
127.0.0.1:6379[3]> lindex fruit-list 0
"banana"

127.0.0.1:6379[3]> lindex fruit-list 1
"apple"

127.0.0.1:6379[3]> lindex fruit-list 2
(nil)
```

### LINSERT key BEFORE|AFTER pivot value

在pivot指定的值前面或后面插入value，如果pivot值有重复的，那么就从左往右数，以第一个遇到的pivot为基准。BEFORE表示放在pivot前面，AFTER表示放在pivot后面。

```bash
127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "apple"
2) "cherry"
3) "banana"
4) "apple"

127.0.0.1:6379[3]> linsert fruit-list before apple @@@
(integer) 5

127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "@@@"
2) "apple"
3) "cherry"
4) "banana"
5) "apple"

127.0.0.1:6379[3]> linsert fruit-list after apple ###
(integer) 6

127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "@@@"
2) "apple"
3) "###"
4) "cherry"
5) "banana"
6) "apple"
```

### LPUSHX key value

只能针对存在的list执行LPUSH

```bash
127.0.0.1:6379[3]> lpushx uuu xxx
(integer) 0

127.0.0.1:6379[3]> lpushx fruit-list new-value
(integer) 7

127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "new-value"
2) "@@@"
3) "apple"
4) "###"
5) "cherry"
6) "banana"
7) "apple"
```

### LREM key count value

根据count指定的数量从key对应的list中删除value
具体执行时从左往右删除，遇到一个删一个，删完为止

```bash
127.0.0.1:6379[3]> lrem fruit-list 2 apple
(integer) 2

127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "new-value"
2) "@@@"
3) "###"
4) "cherry"
5) "banana"
```

### LSET key index value

把指定索引位置的元素替换为另一个值

```bash
127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "new-value"
2) "@@@"
3) "###"
4) "cherry"
5) "banana"

127.0.0.1:6379[3]> lset fruit-list 3 apple
OK

127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "new-value"
2) "@@@"
3) "###"
4) "apple"
5) "banana"
```

### LTRIM key start stop

仅保留指定区间的数据，两边的数据被删除

``` bash
127.0.0.1:6379[3]> ltrim fruit-list 1 2
OK

127.0.0.1:6379[3]> lrange fruit-list 0 -1
1) "@@@"
2) "###"
```



## 6. set操作

### SADD key member [member ...]

给key指定的set集合中存入数据，set会自动去重

```bash
127.0.0.1:6379[4]> sadd animal:set tiger cat pig cat tiger dog snake fish bear
(integer) 7
```

### SMEMBERS key

返回可以指定的set集合中所有的元素

```bash
127.0.0.1:6379[4]> smembers animal:set
1) "pig"
2) "cat"
3) "tiger"
4) "dog"
5) "bear"
6) "fish"
7) "snake"
```

### SCARD key

返回set集合中元素的数量

```bash
127.0.0.1:6379[4]> scard animal:set
(integer) 7
```

### SISMEMBER key member

检查当前指定member是否是set集合中的元素

- 返回1：是
- 返回0：不是

```bash
127.0.0.1:6379[4]> sismember animal:set cat
(integer) 1
127.0.0.1:6379[4]> sismember animal:set cat888
(integer) 0
```

### SREM key member [member ...]

从set集合中删除元素

```bash
127.0.0.1:6379[4]> srem animal:set aa bb cc snake pig
(integer) 2

127.0.0.1:6379[4]> smembers animal:set
1) "tiger"
2) "dog"
3) "bear"
4) "fish"
5) "cat"
```

### SINTER key [key ...]

将指定的set集合进行“交集”操作
集合A：a,b,c
集合B：b,c,d
交集：b,c

```bash
127.0.0.1:6379[4]> sadd a:set 11 22 33 44 55
(integer) 5

127.0.0.1:6379[4]> sadd b:set 11 33 55 77 99
(integer) 5

127.0.0.1:6379[4]> sinter a:set b:set
1) "11"
2) "33"
3) "55"
```

### SINTERSTORE destination key [key ...]

取交集后存入destination

```bash
127.0.0.1:6379[4]> SINTERSTORE c:set a:set b:set
(integer) 3

127.0.0.1:6379[4]> SMEMBERS c:set
1) "11"
2) "33"
3) "55"
```

### SDIFF key [key ...]

将指定的集合执行“差集”操作，结果和运算顺序有关。
	集合A：a,b,c
	集合B：b,c,d
	A对B执行diff：a
	相当于：A-交集部分

```bash
# a-交集
127.0.0.1:6379[4]> SDIFF a:set b:set
1) "22"
2) "44"

# b-交集
127.0.0.1:6379[4]> SDIFF b:set a:set
1) "77"
2) "99"
```

### SDIFFSTORE destination key [key ...]

```bash
127.0.0.1:6379[4]> SDIFFSTORE d:set a:set b:set
(integer) 2

127.0.0.1:6379[4]> SMEMBERS d:set
1) "22"
2) "44"
```

### SUNION key [key ...]

将指定的集合执行“并集”操作
	集合A：a,b,c
	集合B：b,c,d
	并集：a,b,c,d

```bash
127.0.0.1:6379[4]> SUNION a:set b:set
1) "11"
2) "22"
3) "33"
4) "44"
5) "55"
6) "77"
7) "99"
```

### SUNIONSTORE destination key [key ...]

```bash
127.0.0.1:6379[4]> SMEMBERS e:set
1) "11"
2) "22"
3) "33"
4) "44"
5) "55"
6) "77"
7) "99"
```

### SMOVE source destination member

把member从source移动到destination

```bash
127.0.0.1:6379[4]> SMOVE animal:set a:set cat
(integer) 1

127.0.0.1:6379[4]> SMEMBERS a:set
1) "22"
2) "44"
3) "55"
4) "cat"
5) "33"
6) "11"
```

### SSCAN key cursor [MATCH pattern] [COUNT count]

基于游标的遍历。cursor是游标值，第一次显示第一块内容时，游标取值为0；根据后续返回的新的游标值获取下一块数据。直到游标值变成0，说明数据遍历完成。

```bash
127.0.0.1:6379[4]> SADD testset a b c d e f g h i j k l m n o p q r s t u v w x y z aa bb cc dd ee ff gg hh ii jj kk ll mm nn oo pp qq rr ss tt uu vv ww xx yy zz
(integer) 52

127.0.0.1:6379[4]> sscan testset 0
1) "36"
2)  1) "yy"
    2) "s"
    3) "i"
    4) "aa"
    5) "ff"
    6) "b"
    7) "bb"
    8) "h"
    9) "gg"
   10) "f"
   
127.0.0.1:6379[4]> sscan testset 36
1) "2"
2)  1) "r"
    2) "j"
    3) "v"
    4) "kk"
    5) "q"
    6) "t"
    7) "w"
    8) "z"
    9) "dd"
   10) "u"
   11) "ll"
   
127.0.0.1:6379[4]> sscan testset 2
1) "25"
2)  1) "cc"
    2) "pp"
    3) "zz"
    4) "c"
    5) "x"
    6) "tt"
    7) "l"
    8) "ii"
    9) "oo"
   10) "ww"
   
127.0.0.1:6379[4]> sscan testset 25
1) "29"
2)  1) "qq"
    2) "mm"
    3) "a"
    4) "ee"
    5) "vv"
    6) "n"
    7) "p"
    8) "nn"
    9) "g"
   10) "k"
   
127.0.0.1:6379[4]> sscan testset 29
1) "63"
2)  1) "jj"
    2) "y"
    3) "ss"
    4) "m"
    5) "d"
    6) "xx"
    7) "uu"
    8) "e"
    9) "rr"
   10) "o"
   
127.0.0.1:6379[4]> sscan testset 63
1) "0"
2) 1) "hh"
```

### SRANDMEMBER key [count]

从集合中随机返回count个数量的元素，count不指定就返回1个（数据有可能重复出现）

```bash
127.0.0.1:6379[4]> SRANDMEMBER testset
"y"

127.0.0.1:6379[4]> SRANDMEMBER testset 10
 1) "pp"
 2) "cc"
 3) "d"
 4) "f"
 5) "r"
 6) "ee"
 7) "rr"
 8) "ll"
 9) "t"
10) "g"
```

### SPOP key [count]

从set集合中随机弹出count个数量的元素，count不指定就弹出1个（保证不会有重复数据出现），因为弹出后就会从set集合中删除

```bash
127.0.0.1:6379[4]> spop testset
"aa"

127.0.0.1:6379[4]> spop testset 10
 1) "l"
 2) "r"
 3) "rr"
 4) "b"
 5) "zz"
 6) "pp"
 7) "z"
 8) "x"
 9) "v"
10) "ll"
```



## 7.hash操作

本身就是一个键值对集合。可以当做Java中的Map<String,String>对待。每一个hash可以存储2^32-1个键值对。

![](https://gitee.com/rayywei/blog-image/raw/master/hash.png)

### HSET key field value

插入新数据返回1，修改旧数据返回0。

```bash
127.0.0.1:6379[4]> HSET teacher:hash id 001
(integer) 1

127.0.0.1:6379[4]> HSET teacher:hash id 002
(integer) 0
```

### HGETALL key

返回某个key的所有的key和value

```bash
127.0.0.1:6379[4]> HSET teacher:hash name kangkang
(integer) 1

127.0.0.1:6379[4]> HGETALL teacher:hash
1) "id"
2) "002"
3) "name"
4) "kangkang"
```

### HGET key field

返回指定的key的value中的某个key的value

```bash
127.0.0.1:6379[4]> HGET teacher:hash id
"002"
```

### HMSET key field value [field value ...]

```bash
127.0.0.1:6379[4]> HMSET teacher:hash age 30 subject math salary 7000
OK
```

### HMGET key field [field ...]

```bash
127.0.0.1:6379[4]> HMGET teacher:hash id name age subject salary
1) "002"
2) "kangkang"
3) "30"
4) "math"
5) "7000"
```

### HLEN key

返回value的长度

```bash
127.0.0.1:6379[4]> HLEN teacher:hash
(integer) 5
```

### HKEYS key

返回key的value中的所有的key

```bash
127.0.0.1:6379[4]> HKEYS teacher:hash
1) "id"
2) "name"
3) "age"
4) "subject"
5) "salary"
```

### HVALS key

返回key的value中的所有的value

```bash
127.0.0.1:6379[4]> HVALS teacher:hash
1) "002"
2) "kangkang"
3) "30"
4) "math"
5) "7000"
```

### HEXISTS key field

是否存在某个key，返回1表示存在，返回0表示不存在。

```bash
127.0.0.1:6379[4]> HEXISTS teacher:hash name
(integer) 1

127.0.0.1:6379[4]> HEXISTS teacher:hash birthday
(integer) 0
```

### HDEL key field [field ...]

删除某个key，返回1表示删除成功，返回0表示删除失败

```bash
127.0.0.1:6379[4]> HDEL teacher:hash subject
(integer) 1

127.0.0.1:6379[4]> HDEL teacher:hash birthday
(integer) 0
```

### HINCRBY key field increment

给filed的值增加指定的数量 hash\<key, value=(filed\<key, value\>)\>

```bash
127.0.0.1:6379[4]> HINCRBY teacher:hash salary 1000
(integer) 8000
```

### HSETNX key field value

要求field是新建的

```bash
127.0.0.1:6379[4]> HSETNX teacher:hash name amy
(integer) 0

127.0.0.1:6379[4]> HGET teacher:hash name
"kangkang"
```



## 8.zset操作

Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。zset的成员是唯一的,但分数(score)却可以重复。

Sorted set. 

zset\<key, member\<name, score\>

![](https://gitee.com/rayywei/blog-image/raw/master/zset.png)

### ZADD key [NX|XX] [CH] [INCR] score member [score member ...]

添加数据

```bash
127.0.0.1:6379[5]> ZADD exam:score 93 amy 83 tom 73 anna 63 mary 53 tony 43 sam
(integer) 6
```

### ZRANGE key start stop [WITHSCORES]

升序，遍历数据

```bash
127.0.0.1:6379[5]> ZRANGE exam:score 0 -1
1) "sam"
2) "tony"
3) "mary"
4) "anna"
5) "tom"
6) "amy"

127.0.0.1:6379[5]> ZRANGE exam:score 0 -1 withscores
 1) "sam"
 2) "43"
 3) "tony"
 4) "53"
 5) "mary"
 6) "63"
 7) "anna"
 8) "73"
 9) "tom"
10) "83"
11) "amy"
12) "93"
```

### ZCARD key

返回长度

```bash
127.0.0.1:6379[5]> ZCARD exam:score
(integer) 6
```

### ZSCORE key member

返回某个member的score

```bash
127.0.0.1:6379[5]> ZSCORE exam:score sam
"43"
```

### ZINCRBY key increment member

给某个member的score增加指定的分数

```bash
127.0.0.1:6379[5]> ZINCRBY exam:score 5 sam
"48"
```

### ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]

​	在分数的指定区间内返回数据
​	min参数可以通过 -inf 表示负无穷
​	max参数可以通过 +inf 表示正无穷

默认是闭区间
可以通过 (min (max 形式指定开区间，例如：(50 (80

```bash
127.0.0.1:6379[5]> ZRANGEBYSCORE exam:score -inf +inf WITHSCORES
 1) "sam"
 2) "43"
 3) "tony"
 4) "53"
 5) "mary"
 6) "63"
 7) "anna"
 8) "73"
 9) "tom"
10) "83"
11) "amy"
12) "93"
```

### ZRANK key member

先对分数进行升序排序，返回member的排名。排名从0开始

```bash
# 升序
127.0.0.1:6379[5]> ZRANGE exam:score 0 -1 withscores
 1) "sam"
 2) "48"
 3) "tony"
 4) "53"
 5) "mary"
 6) "63"
 7) "anna"
 8) "73"
 9) "tom"
10) "83"
11) "amy"
12) "93"

127.0.0.1:6379[5]> ZRANK exam:score sam
(integer) 0

```

### ZREM key member [member ...]

delete member(s)

``` bash
127.0.0.1:6379[5]> ZREM exam:score amy
(integer) 1
127.0.0.1:6379[5]> ZRANGE exam:score 0 -1 withscores
 1) "sam"
 2) "48"
 3) "tony"
 4) "53"
 5) "mary"
 6) "63"
 7) "anna"
 8) "73"
 9) "tom"
10) "83"
```

### ZRANGE key start stop [WITHSCORES]

降序排序，返回所有的members

```bash
127.0.0.1:6379[5]> ZREVRANGE exam:score 0 -1 WITHSCORES
 1) "tom"
 2) "83"
 3) "anna"
 4) "73"
 5) "mary"
 6) "63"
 7) "tony"
 8) "53"
 9) "sam"
10) "48"
```

### ZREVRANK key member

先对分数进行降序排序，返回member的排名。排名从0开始

```bash
127.0.0.1:6379[5]> ZREVRANK exam:score sam
(integer) 4
```



## 9. Geospatial

查询经纬度数据：http://www.jsons.cn/lngcode

### ①添加地理位置

```
GEOADD key longitude latitude member [longitude latitude member ...]
```

> 规则：
>
> 1.两极无法直接添加，一般会下载城市数据，直接通过 Java 程序一次性导入。
>
> 2.取值范围
>
> ​	有效的经度从 -180 度到 180 度。
>
> ​	有效的纬度从 -85.05112878 度到 85.05112878 度。
>
> ​	当坐标位置超出指定范围时，该命令将会返回一个错误。
>
> 3.已经添加的数据，是无法再次往里面添加的。

```html
192.168.109.100:6379> GEOADD "china:city" 114.085947 22.547 shenzhen
(integer) 1
192.168.109.100:6379> GEOADD "china:city" 113.280637 23.125178 guangzhou
(integer) 1
```



### ②查询已添加的地理位置

Geo类型在Redis内部其实是使用zset类型存储的，所以可以使用zset的命令进行常规操作。

```
192.168.109.100:6379> ZRANGE china:city 0 -1 
1) "shenzhen"
2) "guangzhou"
192.168.109.100:6379> ZRANGE china:city 0 -1 WITHSCORES
1) "shenzhen"
2) "4046433733682118"
3) "guangzhou"
4) "4046533764066819"
```



### ③删除已添加的地理位置

```
192.168.109.100:6379> ZREM china:city guangzhou
(integer) 1
```



### ④获取指定地区的坐标值

```
192.168.109.100:6379> GEOPOS china:city shenzhen
1) 1) "114.08594459295272827"
   2) "22.54699993773966327"
```



### ⑤计算两地之间的直线距离

```
192.168.109.100:6379> GEODIST china:city guangzhou shenzhen km
"104.6426"
```

> 单位：
>
> m 表示单位为米[默认值]。
>
> km 表示单位为千米。
>
> mi 表示单位为英里。
>
> ft 表示单位为英尺。
>
> 如果用户没有显式地指定单位参数， 那么 GEODIST 默认使用米作为单位。



### ⑥以给定坐标为中心，在指定半径内查找元素

```
192.168.109.100:6379> GEORADIUS china:city 110 20 1000 km WITHCOORD WITHDIST
1) 1) "shenzhen"
   2) "509.4622"
   3) 1) "114.08594459295272827"
      2) "22.54699993773966327"
2) 1) "guangzhou"
   2) "485.7406"
   3) 1) "113.28063815832138062"
      2) "23.12517743834835215"
```

WITHCOORD表示显示经纬度<br/>

WITHDIST表示显示到中心的距离



### ⑦在指定元素周围查找其他元素

```
192.168.109.100:6379> GEORADIUSBYMEMBER china:city shenzhen 300 km WITHCOORD WITHDIST
1) 1) "shenzhen"
   2) "0.0000"
   3) 1) "114.08594459295272827"
      2) "22.54699993773966327"
2) 1) "guangzhou"
   2) "104.6426"
   3) 1) "113.28063815832138062"
      2) "23.12517743834835215"
```



## 10. hyperloglogs

### ①基数概念

一个集合中不重复元素的个数。例如：集合{1,2,5,1,7,2,5}中元素个数是7，但是基数是4。而hyperloglogs的主要功能就是进行基数统计。

### ②hyperloglogs命令

#### [1]添加

```
192.168.109.100:6379> PFADD user:access:1 tom jerry andy jim andy jerry tom
(integer) 1
192.168.109.100:6379> PFADD user:access:2 andy jerry tom bob kate
(integer) 1
192.168.109.100:6379> PFADD user:access:3 mary harry tom jerry
(integer) 1
```

#### [2]统计

```
192.168.109.100:6379> PFCOUNT user:access:1 user:access:2 user:access:3
(integer) 8
```

#### [3]合并

```
192.168.109.100:6379> PFMERGE user:access:merge user:access:1 user:access:2 user:access:3
OK
192.168.109.100:6379> PFCOUNT user:access:merge
(integer) 8
```

## 11.bitmap位图

直接对数据的二进制位进行操作

```
192.168.109.100:6379[5]> set a hello
OK
192.168.109.100:6379[5]> GETBIT a 0
(integer) 0
192.168.109.100:6379[5]> GETBIT a 1
(integer) 1
192.168.109.100:6379[5]> GETBIT a 2
(integer) 1
192.168.109.100:6379[5]> GETBIT a 3
(integer) 0
192.168.109.100:6379[5]> GETBIT a 4
(integer) 1
192.168.109.100:6379[5]> GETBIT a 5
(integer) 0
192.168.109.100:6379[5]> SETBIT a 5 1
(integer) 0
192.168.109.100:6379[5]> get a
"lello"
192.168.109.100:6379[5]> BITCOUNT a
(integer) 22
```

setbit设置指定比特位<br/>
getbit获取指定比特位<br/>
bitcount统计所有比特位中1的数量



## 常用数据类型应用场景

| 数据类型     | 应用场景                                                     |
| ------------ | ------------------------------------------------------------ |
| string       | 分布式Session存储<br />分布式数据库ID<br />计数器：统计网站访问量 |
| hash         | 存储对象信息（购物车中的商品信息）<br />存储表的信息         |
| list         | 实现队列、栈操作<br />汇总日志<br />粉丝列表<br />关注的人列表 |
| set          | 签到<br />打卡<br />点赞                                     |
| zset         | 排行榜<br />百度热点搜索                                     |
| geospatial   | 获取地理位置信息<br />两地之间的距离                         |
| hyperloglogs | 基数统计                                                     |
| bitmaps      | 统计用户访问次数                                             |
