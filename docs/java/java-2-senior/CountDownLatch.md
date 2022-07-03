---
title: CountDownLatch
date: 2021-12-20 17:27:52
categories: [java, concurrence]
permalink: /java-concurrence-countdownlatch

---



CountDownLatch 提供了一些方法：

|方法|说明|
|----|----|
|await()|	使当前线程进入同步队列进行等待，直到latch的值被减到0或者当前线程被中断，当前线程就会被唤醒。|
|await(long timeout, TimeUnit unit)|	带超时时间的await()。|
|countDown()|	使latch的值减1，如果减到了0，则会唤醒所有等待在这个latch上的线程。|
|getCount()	|获得latch的数值。|





```java
package com.exam.service.impl;

import com.exam.dao.Excam1Mapper;
import com.exam.dto.Exam2DTO;
import com.exam.service.IExam2Service;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

@Service
public class Exam2Service implements IExam2Service {

    @Autowired
    Excam1Mapper excam1Mapper;

    /**
     * 两个线程计算
     * t1 t2 各对 exam2DTO的num+1操作。结果恒等2
     */
    private Exam2DTO doCalc() {
        Exam2DTO temp = new Exam2DTO();
        // ########## 自由发挥 开始 ##########
        // 计算exam2DTO的num
        Exam2DTO exam2DTO = new Exam2DTO();
    
      	// 构造器传入参数：可以等待的操作的次数
        CountDownLatch countDownLatch = new CountDownLatch(2);
        
        Thread t1 = new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                synchronized (exam2DTO) {
                    if (exam2DTO.getNum() < 2) {
                        exam2DTO.setNum(exam2DTO.getNum() + 1);
                      	// 操作完一次 减1
                        countDownLatch.countDown();
                    }
                }
            }
        });
        t1.start();
        
        Thread t2 = new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                synchronized (exam2DTO) {
                    if (exam2DTO.getNum() < 2) {
                        exam2DTO.setNum(exam2DTO.getNum() + 1);
                    	  // 操作完一次 减1
                        countDownLatch.countDown();
                    }
                }
            }
        });
        t2.start();
        
        try {
          	// 如果 latch 的值不为0，后面的线程需要等待
            countDownLatch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // ########## 自由发挥 结束 ##########
        if (exam2DTO.getNum() != 2) {
            // 结果错误 返回页面打印
            // 由于地址引用问题，主线程没结束,子线程可以修改的bug
            temp.setNum(exam2DTO.getNum());
            return temp;
        } else {
            // 结果正确 不返回
            return null;
        }

    }

    /**
     * 多线程计算
     *
     * @return
     */
    @Override
    public List<Exam2DTO> getData() {
        return getResult();
    }


    /**
     * 验证所线程计算结果
     * 不能改
     *
     * @return
     */
    private List<Exam2DTO> getResult() {
        List<Exam2DTO> result = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            Exam2DTO exam2DTO = doCalc();
            if (exam2DTO == null) {
                continue;
            }
            result.add(exam2DTO);
        }
        return result;
    }


}
```



参考链接

[多线程并发之CountDownLatch(闭锁)使用详解](https://janus.blog.csdn.net/article/details/82721827?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2-82721827-blog-109655995.pc_relevant_multi_platform_whitelistv1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2-82721827-blog-109655995.pc_relevant_multi_platform_whitelistv1&utm_relevant_index=5)

[CountDownLatch详解](https://blog.csdn.net/hbtj_1216/article/details/109655995)