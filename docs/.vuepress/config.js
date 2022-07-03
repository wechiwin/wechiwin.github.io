const {description} = require('../../package')

module.exports = {
  theme: 'reco',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Ray Wei\'s Blog',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', {name: 'theme-color', content: '#3eaf7c'}],
    ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: 'Last Updated',
    subSidebar: 'auto',
    sidebarDepth: 0,
    author: 'Ray Wei',
    startYear: '2021',
    noFoundPageByTencent: false,
    // 简体中文
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
    nav: [
      {
        text: 'Java 自学',
        items: [
          {text: '初级', link: '/java-1-junior/0.初级'},
          {text: '高级', link: '/java-2-senior/0.高级'},
          {text: '大师级', link: '/java-3-master/0.大师级'},
          {text: 'Git', link: '/Git相关命令'},
        ]
      },
      {
        text: '数据库',
        link: '/db/DBMS'
      },
      {
        text: '运维',
        link: '/ops/0.index'
      },
      {
        text: 'OS',
        items: [
          {text: 'macOS', link: '/os/macos/macOS使用技巧'},
          {text: 'Windows', link: '/os/windows/使用Git Bash在Windows上安装zsh和oh-my-zsh'},
          {text: 'Linux', link: '/os/linux/Linux的须知与使用'}
        ]
      },
      {
        text: 'blog',
        items: [
          {text: 'Vuepress', link: '/blog/macOS使用Vuepress和Github搭建博客2022'},
          {text: 'Hexo', link: '/blog/macOS使用Hexo和Github搭建博客2021'},
        ]
      },
      {
        text: '书摘',
        link: '/excerpt/艺术家们'
      }
    ],
    sidebar: {
      '/java-1-junior/': [
        {
          title: 'Java初级',
          collapsable: false,
          children: [
            '1.基本数据类型',
            '2.操作符',
            '3.流程控制语句',
            '4.包',
            '5.main方法详解',
            '6.数组',
            '7.注释',
            '8.字符串',
          ]
        }
      ],
      '/java-2-senior/': [
        {
          title: 'Java高级',
          collapsable: false,
          children: [
            '1.面向对象',
            '2.常用工具类',
            '3.集合框架',
            '4.反射机制',
            '5.异常处理',
            '6.注解',
            '7.IO流',
            '8.序列化',
            '9.泛型',
            '10.单元测试',
            '11.编码方式',
            '12.并发编程',
            '13.Java8新特性',
            '14.源码阅读',
          ]
        }
      ],
      '/java-3-master/': [
        {
          title: 'Java大师级',
          collapsable: false,
          children: [
            '1.JVM',
            '2.性能优化',
            '3.设计模式',
            '4.数据结构和算法',
            '5.操作系统',
            '6.网络安全',
            '7.数据库',
            '8.大数据',
            '9.服务器',
            '10.框架',
            '11.消息队列',
            '12.容器',
          ]
        }
      ],
      '/db/': [
        {
          title: 'index',
          collapsable: false,
          children: [
            'DBMS',
            '数据库设计的三大范式',
            'MySQL',
            'Redis命令行操作',
          ]
        }
      ],
      '/ops/': [
        {
          title: 'index',
          collapsable: false,
          children: [
            'macOS在虚拟机Linux-CentOS7-64上安装Mysql8[rpm]',
            'macOS在虚拟机Linux-CentOS7-64上安装redis8[yum install]',
          ]
        }
      ],
      '/os/macos/': [
        {
          title: 'index',
          collapsable: false,
          children: [
            'macOS使用技巧',
            'Homebrew官方安装 解决Failed to connect 443',
            'iTerm2美化及配置',
            'NVM安装报错 Failed to connect port 443',
            'macOS使用VMware虚拟机安装Linux系统CentOS7-64',
          ]
        }
      ],
      '/os/windows/': [
        {
          title: 'index',
          collapsable: false,
          children: [
            '使用Git Bash在Windows上安装zsh和oh-my-zsh'
          ]
        }
      ],
      '/os/linux/': [
        {
          title: 'index',
          collapsable: false,
          children: [
            'Linux的须知与使用',
          ]
        }
      ],
      '/blog/': [
        {
          title: 'index',
          collapsable: false,
          children: [
            'macOS使用Vuepress和Github搭建博客2022',
            'Vuepress+GithubPages+自定义域名(namesilo)设置',
            'Vuepress踩坑记录',
            'macOS使用Hexo和Github搭建博客2021',
          ]
        }
      ],
      '/excerpt/': [
        {
          title: 'index',
          collapsable: false,
          children: [
            '丁香医生人体调查组',
            '艺术家们',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
