> Kindle Paperwhite3
>
> 固件版本 5.12.2
>
> 序列号 G090 G105 8044 00LP

## 越狱步骤

### 安装kindlebreak

下载 kindle-jb-kindlebreak-1.0-r18327.tar.xz：[百度网盘](https://pan.baidu.com/s/1JqG1HExhwL51ifIPxIBZGg)〈提取码 : `5va7`〉

提示：解压 .xz 文件，Windows 系统推荐用 7-Zip，macOS 推荐用 Keka，Linux 系统推荐用 tar 命令。

解压后，得到下列四个文件，把它们全部拷贝到 Kindle 根目录。

- kindlebreak.jxr
- kindlebreak.html
- jb.sh
- jb

弹出Kindle，点击 Kindle 右上角的菜单按钮，进入“**体验版网页浏览器**（Experimental Browser）”。

请务必确保“浏览器设置”中的图片设置处于启用状态，也就是显示“禁用图片（Disable Images）”字样。如显示的是“启用图片（Enable Images）”字样，你需要点击启用，以确保浏览器能够正常解析图片。

最后输入如下所示的文件地址（注意 `file:///` 是一个冒号三个斜杠）：

```
file:///mnt/us/kindlebreak.html
```

如果一切正常，Kindle 会在数秒至数分钟后自动重启（时长取决于不同设备）。重启完毕越狱便告成功。之前放进去的文件会被自动清理，你会在  Kindle 根目录看到一个日志文件 kindlebreak_log.txt。建议在安装 Hotfix  之前保留此文件以备不时之需，万一遇到问题，它能为你提供必要的调试信息。

### 安装热修复补丁

下载 JailBreak Hotfix：[官方页面](https://www.mobileread.com/forums/showthread.php?t=225030) ｜ [本地下载](https://down.bookfere.com/s/e919Wt1zT0QNbkl) ｜ [百度网盘](https://pan.baidu.com/s/1gM6gRES4sdEHuRAJXx8HSg)〈提取码：`9rs4`〉

Jailbreak Hotfix 的具体安装步骤如下：

1. 用 USB 数据线把 Kindle 连接到电脑，直到出现 Kindle 盘符；
2. 解压缩下载到的 ZIP 压缩包 **JailBreak-x.xx.N-FW-5.x-hotfix.zip**，得到一个名为 **Update_jailbreak_hotfix_x.xx.N_install.bin** 的文件；
3. 将此 bin 文件拷贝到 Kindle 磁盘根目录，然后从电脑弹出 Kindle；
4. 依次在 Kindle 中点击【菜单 → 设置 → 菜单 → **更新您的 Kindle**】，等待重启；
5. 重启完毕，就可以放心的将你的 Kindle 升级到最新固件了。

\* 提示：如果你已经安装了 [MRPI](https://bookfere.com/post/311.html#p_2)，也可以像安装插件那样安装 Hotfix，即先将 .bin 文件拷贝到 mrpackages 文件夹中，然后在 Kindle 搜索栏中输入 `;log mrpi` 命令并回车即可。

安装好 JailBreak Hotfix 之后，可前往“[固件大全](https://bookfere.com/update)”下载和你的 Kindle 型号相对应的最新固件文件（或者其它你想保持的固件版本），[手动升级 Kindle](https://bookfere.com/post/4.html#update_step) 即可。升级到最新固件后越狱仍然有效。

## 安装越狱插件

### MobileRead Package Installer (MRPI) — 插件安装器

- 下载 MRPI：[官方页面](http://www.mobileread.com/forums/showthread.php?t=225030) ｜ [本地下载](https://down.bookfere.com/s/87dWBnJuNRYWUps) ｜ [百度网盘](https://pan.baidu.com/s/1H3Df7hh9yptXgtS28uzv1Q)〈提取码 : `xwbg`〉
- 官方指南：[KUAL: Kindle Unified Application Launcher (v 2.6)](http://www.mobileread.com/forums/showthread.php?t=251143)

**安装步骤：**

1. 用 USB 数据线将 Kindle 连接到电脑上，直到出现 Kindle 磁盘；
2. 解压缩下载到的 kual-mrinstaller-1.7.N-xxx.tar.xz 得到一个文件夹；
3. 把文件夹内的 **extensions** 和 **mrpackages** 拷贝到 Kindle 的根目录。

注意，如果根目录已有 extensions 这个文件夹，可以只把解压得到的 extensions 文件夹中的内容拷贝到 Kindle 根目录原有的 extensions 文件夹内，以避免原文件夹内的其它文件被删除。

另外，值得一提的是，如果你需要安装多个插件（比如本文之后所介绍的那些插件），不必重复每一款插件的安装步骤，只需要将所有 bin 文件拷贝到 mrpackage 目录，然后通过 `;log mrpi` 命令一次性安装它们。这样，每当需要重新安装插件时，可以节省大量时间。

**特别提示**：如果你在安装完 MRPI 后使用命令 `;log mrpi`  安装其它插件时看到“MRPI is not installed”的提示，极有可能是因为某些解压缩软件（如 WinZip）解压 .xz 格式的  MRPI 插件压缩包时破坏了 MRPI 相关文件导致的。为避免此问题，如果你使用的是 Windows 系统，请使用 [7-zip](https://www.7-zip.org/download.html) 解压，如果你使用的是 macOS 系统，请使用 [Keka](https://www.keka.io/en/) 解压（或命令行工具 tar 解压）。详见[小伙伴“就爱茄子”的留言及相关讨论](https://bookfere.com/post/892.html/comment-page-2#comment-26106)。

### KUAL — 插件程序启动器

Kindle 7、KPW 1/2/3、KV 按照以下步骤安装 KUAL：

- 下载 KUAL：[官方页面](http://www.mobileread.com/forums/showthread.php?t=225030) ｜ [本地下载](https://down.bookfere.com/s/0EU4Xg59gd6taUk) ｜ [百度网盘](https://pan.baidu.com/s/1DadoxnlX7u3pjVjrntt_Yw)〈提取码 : `4kb1`〉
- 官方指南：[KUAL: Kindle Unified Application Launcher (v 2.6)](http://www.mobileread.com/forums/showthread.php?t=203326)

**★ 固件版本大于 5.8.x 的安装步骤：**

1. 用 USB 数据线将 Kindle 连接到电脑上，直到出现 Kindle 磁盘；
2. 先按照[第一部分提供的方法](https://bookfere.com/post/311.html#p_2)安装 MobileRead Package Installer (MRPI)；
3. 然后解压缩下载到的 KUAL-v2.x.xx-xxxxxxxx-20xxxxxx.tar.xz 得到一个文件夹；
4. 在文件夹中找到 Update_KUALBooklet_v2.x.xx_install.bin 文件，拷贝到 Kindle 根目录下的 **mrpackages** 文件夹，然后在 Kindle 搜索框中输入 `**;log mrpi**` 点击回车；
5. 这时会调用 mrpi 安装 KUAL，安装完成并等待 Kindle 重启完毕后即可使用 KUAL。

成功安装 KUAL 后，我的图书馆中会出现一个名为 KUAL 的个人文档图标，正常情况下，点开此图标应显示菜单。

### Koreader pdf和DJVU重排阅读器

- 下载 Koreader：[官方页面](https://github.com/koreader/koreader/releases) ｜ [本地下载](https://down.bookfere.com/s/OdjPV4CR6Kk9GGq) ｜ [百度网盘](https://pan.baidu.com/s/1BCoXNV2M1bKEAg88cPx7zQ)〈提取码 : `8ehi`〉
- 官方指南：[在Kindle上安装和运行KOReader](https://github.com/koreader/koreader/wiki/在Kindle上安装和运行KOReader)

注意，Koreader 提供了三种版本，对应不同的 Kindle 设备型号，请按需选择：

- **Legacy**：K2、DX、K3（及其它差异化版本）
- **Kindle**：K4、K5、KPW1
- **PW2**：KPW2 后的所有版本（如 Kindle 7/8/10、KPW 2/3/4/5、KO 1/2/3、KV）

**★ 安装步骤：**

1. 首先确保安装了 [MRPI](https://bookfere.com/post/311.html#p_1) 和 [KUAL](https://bookfere.com/post/311.html#p_2)；
2. 用 USB 数据线将 Kindle 连接到电脑上，直到出现 Kindle 磁盘；
3. 解压缩下载到的 Koreader 压缩包，可得到 **extensions** 和 **koreader** 两个文件夹；
4. 先把文件夹 extensions 中的内容拷贝到 Kindle 根目录下的 **extensions** 文件夹中；
5. 然后把文件夹内的 **koreader** 文件夹拷贝到 kindle 根目录下；
6. 通过 KUAL 菜单中启动 Koreader 并用它的文件浏览器打开并阅读电子书。

\* 提示1：汉化 Koreader 菜单可下载 [menu.json](https://pan.baidu.com/s/1slF4Y5Z)，替换根目录的 `\extensions\koreader\menu.json`。
 \* 提示2：Koreader 的使用方法请参考《[Koreader —— Kindle 的 PDF 文档重排插件](https://bookfere.com/post/39.html)》这篇文章。

另外，作为可选步骤，你还可以安装 KPVBooklet，其用途是在 Kindle 中直接显示原生系统不支持的 EPUB  等格式，并将其打开方式自动关联到 Koreader（还可通过 KUAL 菜单关联更多格式）。注意，由于 KPVBooklet  已很久未更新，可能不兼容新版本固件中（即 2017-10-27 之后发布的固件）。

### KPVBooklet

其用途是在 Kindle 中直接显示原生系统不支持的 EPUB 等格式，并将其打开方式自动关联到 KOReader（还可通过 KUAL 菜单关联更多格式）。

- 下载 KPVBooklet：[官方页面](https://github.com/koreader/kpvbooklet/releases) ｜ [本地下载](https://down.bookfere.com/s/tv24c7jAThYdjy3) ｜ [百度网盘](https://pan.baidu.com/s/1j9iCmipIaF2SH91koNce1g)〈提取码 : `ts46`〉

**★ 安装步骤：**

1. 解压缩下载到的 kpvbooklet 压缩包，得到一个文件夹；
2. 把文件夹内的 update_kpvbooklet_xxx_install.bin 拷贝到 Kindle 里 mrpackages 文件夹中；
3. 弹出 Kindle 磁盘，进入 Kindle 界面，打开 KUAL，依次点击菜单【**Helper** → **Install MR Packages**】（或在搜索栏输入 `;log mrpi` 并回车）；
4. 耐心等待 kpvbooklet 安装，直到安装完成后 Kindle 重启完毕。

如果因升级到最新版本固件或未知原因导致此插件不能使用的，重新操作以上安装步骤即可恢复。

### ScreenSavers Hack – 更换 Kindle 屏保

除非开启“广告”或开启封面屏保功能，Kindle 的默认屏保总是一成不变的。你可以通过安装这款插件实现自定义屏保，让 Kindle 在息屏休眠时，显示你精心挑选的图片。

- 下载 linkss：[官方页面](http://www.mobileread.com/forums/showthread.php?t=225030) ｜ [本地下载](https://down.bookfere.com/s/ZQHynMgGTZXDYmd) ｜ [百度网盘](https://pan.baidu.com/s/1oBSmbJvpGdg2rww6YuNv_g)〈提取码 : `b2vk`〉
- 官方指南：[Kindle Touch/PaperWhite ScreenSavers Hack](http://www.mobileread.com/forums/showthread.php?t=195474)

**★ 安装步骤：**

1. 首先确保关闭了广告特惠，并且安装了 [MRPI](https://bookfere.com/post/311.html#p_1) 和 [KUAL](https://bookfere.com/post/311.html#p_2)；
2. 用 USB 数据线将 Kindle 连接到电脑上，直到出现 Kindle 磁盘；
3. 解压缩下载到的 kindle-linkss-0.25.N-rxxx.tar.xz，得到一个文件夹；
4. 把文件夹内的 Update_linkss_0.25.N_install_pw2_kt2_kv_pw3.bin 拷贝到 Kindle 里 **mrpackages** 文件夹中（如果是 KPW1 或 Touch 请选择另外那个 bin 文件）；
5. 弹出 Kindle 磁盘，进入 Kindle 界面，打开 KUAL，依次点击菜单【**Helper** → **Install MR Packages**】（或在搜索栏输入 `;log mrpi` 并回车）；
6. 耐心等待 linkss 安装，直到安装完成后 Kindle 重启完毕；
7. 再次用 USB 数据线将 Kindle 连接到电脑上，直到出现 Kindle 磁盘；
8. 在 Kindle 根目录下会出现一个名为 **linkss** 的文件夹，把你想要设为屏保的图片放到该文件夹下的 screensavers 文件夹中即可。需要注意的是，屏保图片应按照如 **bg_ss00.png、bg_ss01.png … bg_ss19.png …** 这样的序列方式命名。屏保图片的规格请参照下面所列参数。

**★ 屏保规格：**

为达到更好的视觉效果，建议屏保图片按照下面不同设备相对应的图片尺寸制作：

- Kindle 2/3/4/5/7/8/10：PNG 格式，宽高 **600\*800** 像素
- KPW 1/2：PNG 格式，宽高 **758\*1024** 像素
- KO1、KV、KPW 3/4：PNG 格式，宽高 **1072\*1448** 像素
- KO 2/3：PNG 格式，宽高 **1680\*1264** 像素
- KPW5：PNG 格式，宽高 **1236\*1648** 像素

你可以参考《[制作 Kindle 屏保图片三步走：打开、调整和保存](https://bookfere.com/post/470.html)》这篇文章制作屏保图片。也可以前往“[Kindle 屏保图册](https://bookfere.com/gallery/pictures/kindle-screensaver)”下载 Kindle 伴侣为你制作好的屏保图片。

如果制作的 png 图片无法正常使用，请尝试将屏保图片处理成 8 位深度的灰度图。需要注意的是，请不要把一个 jpg 图片通过更改后缀名的方式更改成 png，这样得到的仍然是无法使用的 jpg 图片。

如果因升级到最新版本固件或未知原因导致此插件不能使用的，请备份一自定义屏保图片，然后重新操作上面的第 1~7  步骤，重启后重新把屏保图片拷贝到 screensavers 文件夹中即可恢复。另外，在测试时发现安装 usbnet 这款插件后会影响到  linkss 屏保插件，同样重复第 1~7 步骤即可恢复。

\* Kindle 原生壁纸路径：**/usr/share/blanket/screensaver/**

## 将Kindle里的书导出为mobi

最稳妥的方案是直接从亚马逊云端（http://z.cn/myk）下载电子书文件（通常是 AZW3 格式），而不是直接采用从 Kindle 设备中拷贝的 KFX 文件。因为相比 KFX 格式，AZW3 有更成熟的去除 DRM 保护的解决方案（如 [DeDRM](https://github.com/apprenticeharper/DeDRM_tools/releases)），通过网站下载的 AZW3 格式文件，其内容也比同步到设备中的完整，更适合作为格式转换的“源格式”。

登录亚马逊之后，打开 http://z.cn/myk 链接，然后选择书的三点个，通过电脑下载USB传输，下载到本地即可。

calibre下载地址

https://calibre-ebook.com/download

下载calibre的插件，注意下载的版本，calibre5.x版本的下载7.x的插件。

https://github.com/apprenticeharper/DeDRM_tools/releases

解压插件得到 DeDRM_plugin.zip

打开calibre的首选项(工具栏最右边），然后按照下面路径操作：首选项->高级选项->插件->从文件加载插件->勾选仅显示用户自己安装的插件，选择"从文件加载插件"，选择对应的插件(上述）。安装完毕在插件里的文件类型中选择该插件，双击点开，选择 elnk Kindle Ebooks，输入自己Kindle的序列号。

重启 calibre，把刚刚下载到本地的书拖进calibre，转换成mobi即可。

## 参考链接

[Kindle 越狱插件资源下载及详细安装步骤](https://bookfere.com/post/311.html)

[Kindle 通用越狱教程：适用固件版本 5.10.3~5.13.3](https://bookfere.com/post/892.html)

[如何把 KFX 格式转换成 MOBI 等其它电子书格式](https://bookfere.com/post/663.html)

