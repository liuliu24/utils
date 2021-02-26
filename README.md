
<h1 align="center"> Javascript常用工具包</h1>

持续更新中。。。

### 字符串操作string

- 去除两边空格

  utils.string.trim(str);

- 判断是否为空

  utils.string.isEmpty(str);

- 判断两个字符串是否相同

  utils.string.isEquals(str);

- 判断是否是数字

  utils.string.isNum(str);

- 判断是否是中文

  utils.string.isChine(str);

- 过滤html代码(把<>转换)

  utils.string.filterTag(str);

- 过滤&lt;script&gt;&lt;/script&gt;转换

  utils.string.filterScript(str);

- 清除&lt;script&gt;&lt;/script&gt;内容

  utils.string.stripscript(str);

- 统计字符串长度，中文按2个字符

  utils.string.strLen(str);

- 截取长度，中文按2个字符

  utils.string.cutStr(str);

### 数字操作number

- 数字按千分位逗号分开

  utils.number.formatNum(str);

- 身份证判断

  utils.number.identityCodeValid(str);

- 数字转中文

  utils.number.numberToChinese(str);

### 数组操作array

- 数组排序

  utils.array.orderBy(arr,sortFlag);

- 求两个集合的并集

  utils.array.union(arr1,arr2);

- 求两个集合的补集

  utils.array.complement(arr1,arr2);

- 求两个集合的交集

  utils.array.intersect(arr1,arr2);

- 求两个集合的差集

  utils.array.minus(arr1,arr2);

- 数组的去重

  utils.array.unique(arr);

- 获取数组下标

  utils.array.indexOf(arr);

- 判断一个元素是否在一个数组中

  utils.array.contains(arr,val);

- 数组中删除一个元素

  utils.array.remove(arr,ele);

- 求数组中最大值

  utils.array.arrMax(arr);

- 求数组中最小值

  utils.array.arrMin(arr);

- 数组求和

  utils.array.arySum(arr);

- 数组随机排列

  utils.array.shuffle(arr);

- 判断是否是数组

  utils.array.isArray(arr);

- 随机返回数组中一个元素

  utils.array.randomItem(arr);

- 判断数组中是否包含某一项,*flag 如果为true，则判断字符串  false则判断字符*

  utils.array.arrContains(arr, str, flag);

- 判断数组是否有重复的项

  utils.arry.isRepeat(arr);

### 日期操作date

- 格式化日期的方法

  utils.date.formatDate(date, fmt);

- 时间戳

  utils.data.timeStamp();

### 页面请求操作request

- 获取url里面的参数

  utils.request.getQueryString(name);

- 获取域名

  utils.request.getHostName();

- 获取端口

  utils.request.getPort();

- 获取域名+端口

  utils.request.getHost();

- 获取协议

  utils.request.getProtocol();

- 获取url

  utils.request.getUrl();

- 获取url路径部分

  utils.request.getPathName();

- 获取查询部分

  utils.request.getSearch();

- 判断是否是IE11以下版本

  utils.request.ltIe11();

- 判断是否是ie9以下版本

  utils.request.ltIe9();

### 文件操作file

- 文件大小转换为MB GB KB格式

  utils.file.countFileSize(size);

- 获取带.后缀名

  utils.file.getExt(fileName);

- 获取还带.后缀名

  utils.file.getExtension(fileName);

- 获取文件名称

  utils.file.getFileName(fileName);

- 验证是否为图片

  utils.file.checkImage(fileName);

- 验证是否为视频

  utils.file.checkVideo(fileName);

- 验证是否为文档

  utils.file.checkDocument(fileName);
