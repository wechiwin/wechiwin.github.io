---
title: Streams
date: 2022-06-22 04:54:52
categories: [java]
permalink: /java-streams
---

# 1. 编程范式

主要的编程范式有三种：命令式编程，声明式编程和函数式编程。

## 1.1 命令式编程 Imperative Programming

命令式编程的主要思想是关注计算机执行的步骤，即一步一步告诉计算机先做什么再做什么。

比如：如果你想在一个数字集合 collection(变量名) 中筛选大于 5 的数字，你需要这样告诉计算机：

第一步，创建一个存储结果的集合变量 results；
第二步，遍历这个数字集合 collection；
第三步：一个一个地判断每个数字是不是大于 5，如果是就将这个数字添加到结果集合变量 results 中。
代码实现如下：

```
List<int> results = new List<int>();
foreach(var num in collection)
{
    if (num > 5)
          results.Add(num);
}
```

很明显，这个样子的代码是很常见的一种，不管你用的是 C, C++还是C#, Java, Javascript, BASIC, Python, Ruby等等，你都可以以这个方式写。



## 1.2 声明式编程 Declarative Programming

声明式编程是以数据结构的形式来表达程序执行的逻辑。它的主要思想是告诉计算机应该做什么，但不指定具体要怎么做。

SQL 语句就是最明显的一种声明式编程的例子，例如：

```sql
SELECT * FROM collection WHERE num > 5
```

除了SQL，网页编程中用到的HTML 和CSS 也都属于声明式编程。

通过观察声明式编程的代码我们可以发现它有一个特点是它不需要创建变量用来存储数据。另一个特点是它不包含循环控制的代码如for， while。



## 1.3 函数式编程 Functional Programming

函数式编程和声明式编程是有所关联的，因为他们思想是一致的：即只关注做什么而不是怎么做。但函数式编程不仅仅局限于声明式编程。

函数式编程最重要的特点是“函数第一位”，即函数可以出现在任何地方，比如你可以把函数作为参数传递给另一个函数，不仅如此你还可以将函数作为返回值。大部分常见的编程语言一半都已经提供了对这种编程方式的支持，比如 JavaScript，再有 C#中的LINQ和 Java 中的Lambda和闭包的概念。

Java 8最大的一个对函数式编程支持的更新就是 Stream API，感兴趣的可以了解下，官方文档地址：https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html

相比于以前的命令式编程，在 Java 中我个人现在更倾向于函数式编程的方法，它可以让代码的逻辑更清晰更优雅，比如同样的逻辑用Java 8 的Stream方式写就是：

```java
List<Number> results = collection.stream()
                                 .filter(n -> n > 5)
                                 .collect(Collectors.toList());
```

# 2. 创建一个流

## 2.1 使用集合

```java
Collection<Integer> x = ……;
Stream<Integer> stream = x.stream();

List<String> list = new ArrayList();
Stream<String> stream = list.stream();
```

## 2.2 使用数组

```java
int[] numbers = {2, 3, 4};
IntStream stream = Arrays.stream(numbers);
```

## 2.3 使用一组数字

```java
Stream<Integer> integerStream = Stream.of(1, 2, 3);

Stream<Double> infiniteStream = Stream.generate(() -> Math.random()); // lazy evaluation 这个流在没有被调用时，不会生成随机数
infiniteStream.forEach(System.out::println); // 会输出无限的随机数

infiniteStream
  .limit(3) // 使用limit方法，只输出三个数字
  .forEach(System.out::println); 
```

## 2.4 使用无限/有限的流

```java
// public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f)
Stream<Integer> infiniteStream = Stream.iterate(1, n -> n + 1);
```

# 3. Intermediate Methods

- map() / flatMap()
- filter()
- limit() / skip()
- sorted()
- distinct()
- peek()

## 3.1 Mapping Elements

### 3.1.1 map()

```java
public class CreatingStreamsDemo {
    public static void main(String[] args) {
        List<Movie> movieList = Arrays.asList(
                new Movie("a", 10),
                new Movie("b", 20),
                new Movie("c", 30)
        );
        // 返回电影的标题
        movieList.stream()
                .map(Movie::getTitle)
                .forEach(System.out::println);
        // 返回电影的喜欢数量
        movieList.stream()
                .mapToInt(Movie::getLikes)
                .forEach(System.out::println);
    }
}

class Movie {
    private String title;
    private Integer likes;
    
    public Movie(String title, Integer likes) {
        this.title = title;
        this.likes = likes;
    }
    
    public Movie() {
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public Integer getLikes() {
        return likes;
    }
    
    public void setLikes(Integer likes) {
        this.likes = likes;
    }
    
}
```

### 3.1.2 flatMap()

```java
Stream<List<Integer>> listStream = Stream.of(Arrays.asList(1, 2, 3), Arrays.asList(7, 8, 9));
// listStream.forEach(System.out::println);
/*
得到的是两个数组
[1, 2, 3]
[7, 8, 9]
*/

listStream
  .flatMap(list -> list.stream())
  .forEach(System.out::println);
/*
得到的是数组里的数字
1
2
3
7
8
9
*/
```

## 3.2 Filtering Elements

```java
movieList.stream()
  .filter(movie -> movie.getLikes() > 10)
  .forEach(System.out::println);

// extract the predicate
Predicate<Movie> isPopular = movie -> movie.getLikes() > 10;
movieList.stream()
        .filter(isPopular)
        .forEach(System.out::println);
```



## 3.3 Slicing Streams

### 3.3.1 limit(n)

```java
movieList.stream()
  .limit(2) // 将前两个数据返回为 stream
  .forEach(movie -> System.out.println(movie.getTitle()));
/*
a
b
*/
```

### 3.3.2 skip(n)

```java
movieList.stream()
  .skip(2) // 跳过前两个数据，返回为stream
  .forEach(movie -> System.out.println(movie.getTitle()));
/*
c
*/
```

### 3.3.3 takeWhile(predicate)

Java 9 新方法，如果不满足给定的条件时，返回此条件之前的数据。

和filter方法的区别，filter方法是遍历了所有的数据，takeWhile不满足时立即返回数据的流。

```java
movieList.stream()
        .takeWhile(m -> m.getLikes() < 30) // 当不满足条件时，返回此前数据的流
        .forEach(movie -> System.out.println(movie.getTitle()));
/*
a
b
*/
```

### 3.3.4 dropWhile(predicate)

Java 9 新方法，如果不满足给定的条件时，返回此条件之前的数据。

```java
movieList.stream()
        .dropWhile(m -> m.getLikes() < 20) // 当不满足条件时，返回此后数据的流
        .forEach(movie -> System.out.println(movie.getTitle()));
/*
b
c
*/
```

## 3.4 Sorting Streams

```java
movieList.stream()
        // .sorted((a,b) -> a.getTitle().compareTo(b.getTitle()))
        .sorted(Comparator.comparing(Movie::getTitle).reversed())
        .forEach(movie -> System.out.println(movie.getTitle()));
/*
c
b
a
*/
```

## 3.5 Getting Unique Elements

```java
movieList.stream()
        .map(Movie::getLikes)
        .distinct() // 去重
        .forEach(System.out::println);
```

## 3.6 Peeking Elements

use peek() for troubleshooting problem

```java
movieList.stream()
        .filter(movie -> movie.getLikes() > 10)
        .peek(movie -> System.out.println("filtered: " + movie.getTitle()))
        .map(Movie::getTitle)
        .peek(t -> System.out.println("mapped: " + t))
        .forEach(System.out::println);
/*
filtered:b
mapped:b
b
filtered:c
mapped:c
c
*/
```



# 4. Terminal Methods

## 4.1 count()

返回个数

```java
long count = movieList.stream().count();
```

## 4.2 anyMatch(predicate)

是否有一个满足条件

```java
boolean result = movieList.stream().anyMatch(movie -> movie.getLikes() > 20);
System.out.println("result = " + result);
// result = true
```

## 4.3 allMatch(predicate)

是否所有满足条件

```java
boolean result = movieList.stream().allMatch(movie -> movie.getLikes() > 20);
System.out.println("result = " + result);
// result = false
```

## 4.4 noneMatch(predicate)

是否全部不满足条件

```java
boolean result = movieList.stream().noneMatch(movie -> movie.getLikes() > 20);
System.out.println("result = " + result);
// result = false
```

## 4.5 findFirst()

```java
Optional<Movie> first = movieList.stream().findFirst();
System.out.println("first = " + first);
// first = Optional[Movie{title='a', likes=10}]
```

## 4.6 findAny()

```java
Movie movie = movieList.stream().findAny().get();
System.out.println("movie = " + movie);
// movie = Movie{title='a', likes=10}
```

## 4.7 max(comparator)

```java
Movie movie = movieList.stream()
  .max(Comparator.comparing(Movie::getLikes))
  .get();
System.out.println("movie = " + movie);
// movie = Movie{title='c', likes=30}
```

## 4.8 min(comparator)

```java
Movie movie = movieList.stream()
  .min(Comparator.comparing(Movie::getLikes))
  .get();
System.out.println("movie = " + movie);
// movie = Movie{title='a', likes=10}
```

## 4.9 reduce

```java
Optional<Integer> sum = movieList.stream()
        .map(Movie::getLikes)
        /*
        Optional<T> reduce(BinaryOperator<T> accumulator);
        [10, 20, 30]
        [30, 30] 将前面两个相加，10+20
        [60] 30+30
         */
        .reduce((a, b) -> a + b);
// sum有可能为空，使用orElse方法给sum设置一个默认值0
System.out.println(sum.orElse(0));
```

```java
Integer sum = movieList.stream()
        .map(Movie::getLikes)
        // identity 就是sum的默认值
        // T reduce(T identity, BinaryOperator<T> accumulator);
        .reduce(0, Integer::sum);
System.out.println("sum = " + sum);
```

## 4.10 collect(Collectors.xxXxx)

### 4.10.1 toMap

```java
Map<String, Integer> map = movieList.stream()
        .filter(m -> m.getLikes() > 10)
        // .collect(Collectors.toList()) // 将数据转换成list集合
        // .collect(Collectors.toSet()) // 将数据转换成set集合
        // Function<? super T, ? extends K> keyMapper,  【 getTitle 是map的 key 】
        // Function<? super T, ? extends U> valueMapper 【 getLikes 是map的 value 】
        .collect(Collectors.toMap(Movie::getTitle, Movie::getLikes));// 将数据转换成 hashMap
System.out.println(map);
// {b=20, c=30}
```

```java
Map<String, Movie> collect = movieList.stream()
        .filter(m -> m.getLikes() > 10)
        // .collect(Collectors.toMap(Movie::getTitle, m -> m));
        // Function.identity() 输出接收的数据
        .collect(Collectors.toMap(Movie::getTitle, Function.identity()));
System.out.println(collect);
// {b=Movie{title='b', likes=20}, c=Movie{title='c', likes=30}}
```

### 4.10.2 summingInt

```java
Integer collect = movieList.stream()
        .filter(m -> m.getLikes() > 10)
        .collect(Collectors.summingInt(Movie::getLikes));
System.out.println(collect); // 50
```

### 4.10.3 summarizingInt

```java
IntSummaryStatistics collect = movieList.stream()
        .filter(m -> m.getLikes() > 10)
        .collect(Collectors.summarizingInt(Movie::getLikes));
System.out.println(collect);
// IntSummaryStatistics{count=2, sum=50, min=20, average=25.000000, max=30}
// 统计输入的数据
```

### 4.10.4 joining()

```java
String collect = movieList.stream()
        .filter(m -> m.getLikes() > 10)
        .map(Movie::getTitle)
        .collect(Collectors.joining(", "));
System.out.println(collect); // b, c
```

### 4.10.5 groupingBy()

```java
Map<Genre, List<Movie>> collect = movieList.stream()
        .collect(Collectors.groupingBy(Movie::getGenre)); 
/* 
这个方法的源码
groupingBy(Function<? super T, ? extends K> classifier) {
        return groupingBy(classifier, toList());
    }
*/
System.out.println(collect);
// {ACTION=[Movie{title='a', likes=10}, Movie{title='c', likes=30}], COMEDY=[Movie{title='b', likes=20}]}
```

```java
Map<Genre, Set<Movie>> collect = movieList.stream()
        .collect(Collectors.groupingBy(Movie::getGenre, Collectors.toSet())); // 注意这里的toSet是在groupingBy方法里面的
System.out.println(collect);
```

```java
Map<Genre, Long> collect = movieList.stream()
        .collect(Collectors.groupingBy(Movie::getGenre, Collectors.counting()));
System.out.println(collect);
// {ACTION=2, COMEDY=1}
```

```java
Map<Genre, String> collect = movieList.stream()
        .collect(Collectors.groupingBy(
                Movie::getGenre,
                Collectors.mapping(Movie::getTitle, Collectors.joining(", "))
        ));
System.out.println(collect);
// {ACTION=a, c, COMEDY=b}
```

### 4.10.1 partitioningBy()

```java
Map<Boolean, List<Movie>> collect = movieList.stream()
        .collect(Collectors.partitioningBy(m -> m.getLikes() > 10));
System.out.println(collect);
// {false=[Movie{title='a', likes=10}], true=[Movie{title='b', likes=20}, Movie{title='c', likes=30}]}
```

```java
Map<Boolean, String> collect = movieList.stream()
        .collect(Collectors.partitioningBy(
                m -> m.getLikes() > 10,
                Collectors.mapping(Movie::getTitle,
                        Collectors.joining(","))
        ));
System.out.println(collect);
// {false=a, true=b,c}
```

# 5. Primitive Type Streams

## 5.1 IntStream

```java
IntStream.range(1,5).forEach(System.out::println);
System.out.println("=================");
IntStream.rangeClosed(1,5).forEach(System.out::println);
/*
range [x, y)
1
2
3
4
=================
rangeClosed [x, y]
1
2
3
4
5
*/
```

## 5.2 LongStream

## 5.3 DoubleStream

<br/>

<br/>

<br/>

<br/>

**参考链接**

[编程范式：命令式编程(Imperative)、声明式编程(Declarative)和函数式编程(Functional)](https://blog.51cto.com/u_15274944/2924188)