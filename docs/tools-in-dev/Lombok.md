---
title: Lombok使用
date: 2022-06-28 21:34:52
categories: [java]
permalink: /lombok
---

## Accessors

```java
@Target({ElementType.TYPE, ElementType.FIELD})
@Retention(RetentionPolicy.SOURCE)
public @interface Accessors {

   boolean chain() default false;
  
   boolean fluent() default false;
   
   String[] prefix() default {};
}
```

### chain

链式访问，该注解设置chain=true，生成setter方法返回this（也就是返回的是对象），代替了默认的返回void。

### fluent

与chain=true类似，区别在于生成的getter和setter不带set和get前缀。

### prefix

生成的getter和setter方法的字段名会忽视指定前缀（遵守驼峰命名）。



## Data

组合注解，包括@ToString、@EqualsAndHashCode、@Getter、@Setter和@RequiredArgsConstructor。



## EqualsAndHashCode

```java
package lombok;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.SOURCE)
public @interface EqualsAndHashCode {
   
   String[] exclude() default {};
   
   String[] of() default {};
   
   boolean callSuper() default false;
   
   boolean doNotUseGetters() default false;
   
   AnyAnnotation[] onParam() default {};
   
   boolean onlyExplicitlyIncluded() default false;
   
   @Target(ElementType.FIELD)
   @Retention(RetentionPolicy.SOURCE)
   public @interface Exclude {}
   
   @Target({ElementType.FIELD, ElementType.METHOD})
   @Retention(RetentionPolicy.SOURCE)
   public @interface Include {
      String replaces() default "";
   }
}
```

### callSuper

- 当一个类没有继承超类时，使用默认配置即可，此时callSuper=false。
- 当一个类继承了超类，且需要对比超类中的属性，可以设置callSuper=true。
- 注意@Data包含了@EqualsAndHashCode注解且使用了默认配置。



https://www.macrozheng.com/mall/reference/lombok_start.html#cleanup