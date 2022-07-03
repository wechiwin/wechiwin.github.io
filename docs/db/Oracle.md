Oracle SQL

## 语法

### SELECT DISTINCT 语句

在表中，可能会包含重复值。这并不成问题，不过，有时您也许希望仅仅列出不同（distinct）的值。

关键词 DISTINCT 用于返回唯一不同的值。

```
SELECT DISTINCT 列名称 FROM 表名称
```

## 函数

### NVL

#### NVL(表达式1，表达式2)

如果表达式1为空值，NVL返回值为表达式2的值，否则返回表达式1的值。 该函数的目的是把一个空值（null）转换成一个实际的值。其表达式的值可以是数字型、字符型和日期型。但是表达式1和表达式2的数据类型必须为同一个类型。

对数字型 NVL(comm, 0);

对字符型 NVL(TO_CHAR(comm), 'No Commission')

对日期型 NVL(hiredate, '31-DEC-99')

#### NVL2(表达式1，表达式2，表达式3）

如果表达式1为空，返回值为表达式3的值。如果表达式1不为空，返回值为表达式2的值。

例如 NVL2（comm, 'sal+comm', sal)

如果comm为空，就返回sal 的值。如果 comm 不为空(null),就返回表达式 sal+comm的值。