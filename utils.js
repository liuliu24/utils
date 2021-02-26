/**
 * @author:liuyu
 * @timer:2021-02-25
 * @email:4654081@qq.com
 * @version:1.0
 * @title:封装一个自己常用的工具类js
 * @note:
 */

window.utils = {
    /*****************************  字符串类操作开始 *****************************/
    string:{
        // 去除两边空格
        trim: function(str) {
            String.prototype.trim = function() {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
        },
        // 判断字符串是否为空
        isEmpty:function(str){
            if(str != null && str.length > 0){
                return true;
            }else{
                return false;
            }
        },
        // 判断两个字符串是否相同 
        isEquals:function(str1,str2){
            if(str1==str2){
                return true;
            }else{
                return false;
            }
        },
        // 忽略大小写判断字符串是否相同
       isEqualsIgnorecase:function(str1,str2){
           if(str1.toUpperCase() == str2.toUpperCase()){
               return true;
           }else{
               return false;
           }
       },
        // 判断是否是数字
        isNum:function (value){
            if( value != null && value.length>0 && isNaN(value) == false){
                return true;
            }else{
                return false;
            }
        },
        // 判断是否是中文
        isChine:function(str){
            var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
            if(reg.test(str)){
                return false;
            }
            return true;
        },
        // 过滤html代码(把<>转换)
        filterTag: function(str) {
            str = str.replace(/&/ig, "&amp;");
            str = str.replace(/</ig, "&lt;");
            str = str.replace(/>/ig, "&gt;");
            str = str.replace(" ", "&nbsp;");
            return str;
        },
        // 过滤<script></script>转换
        filterScript: function(str) {
            return str.replace(/(<script)/ig, "&lt;script").replace(/(<script>)/ig, "&lt;script&gt;").replace(/(<\/script>)/ig, "&lt;/script&gt;");
        },
        //清除<script></script>内容
        stripscript: function(s) {
            return s.replace(/<script.*?>.*?<\/script>/ig, '');
        },
        /**
         * 本函数用于统计字符串的长度，有两种模式切换。
         * “En”英文主计算模式，将每个中文算作1个字符；“Ch”中文主计算模式，将每个中文算作2个字符长度
         */
        strLen: (function() {
            var trim = function(chars) {
                return(chars || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
            }

            return function(_str, _model) {
                _str = trim(_str),
                    _model = _model || "Ch"; //默认是中文
                var _strLen = _str.length; //获取字符长度
                if(_strLen == 0) { //如果字符为0直接返回
                    return 0;
                } else {
                    var chinese = _str.match(/[\u4e00-\u9fa5]/g); //匹配中文
                    //判断是什么模式
                    return _strLen + (chinese && _model == "Ch" ? chinese.length : 0);
                }
            };
        })(),
        //截取长度，中文按2个字符
        cutStr:function(str, len) {
            var newLength = 0; 
            var newStr = ""; 
            var chineseRegex = /[^\x00-\xff]/g; 
            var singleChar = ""; 
            var strLength = str.replace(chineseRegex,"**").length; 
            for(var i = 0;i < strLength;i++) 
            { 
                singleChar = str.charAt(i).toString(); 
                if(singleChar.match(chineseRegex) != null) 
                { 
                    newLength += 2; 
                }     
                else 
                { 
                    newLength++; 
                } 
                if(newLength > len) 
                { 
                    break; 
                } 
                newStr += singleChar; 
            } 
        
            if(strLength > len) 
            { 
                newStr += "..."; 
            } 
            return newStr; 
        }

    },
    /***************************** 字符串类操作结束 *****************************/

    /***************************** 数字操作开始 *****************************/
    number:{
        // 数字按千分位逗号分开
        formatNum: function(str) {
            var newStr = "";
            var count = 0;

            if(str.indexOf(".") == -1) {
                for(var i = str.length - 1; i >= 0; i--) {
                    if(count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    } else {
                        newStr = str.charAt(i) + newStr;
                    }
                    count++;
                }
                str = newStr + ".00"; //自动补小数点后两位
                return str;
            } else {
                for(var i = str.indexOf(".") - 1; i >= 0; i--) {
                    if(count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
                    } else {
                        newStr = str.charAt(i) + newStr; //逐个字符相接起来
                    }
                    count++;
                }
                str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
                return str;
            }
        },
        //身份证判断
        identityCodeValid: function(code) {
            var alert_tip = ""; // 用于提示
            var city = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江 ",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南", 42: "湖北 ",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏 ",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门",91: "国外"};
            var pass = true;
            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
                alert_tip = "身份证号格式错误";
                pass = false;
            } else if(!city[code.substr(0, 2)]) {
                alert_tip = "地址编码错误";
                pass = false;
            } else {
                //18位身份证需要验证最后一位校验位
                if(code.length == 18) {
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    //校验位
                    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for(var i = 0; i < 17; i++) {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]) {
                        alert_tip = "校验位错误(X需大写)";
                        pass = false;
                    }
                }
            }
            if(!pass) {
                //alert(alert_tip);
            }
            return pass;
        },
        // 数字转中文
        numberToChinese: function(num) {
            var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
            var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
            var a = ("" + num).replace(/(^0*)/g, "").split("."),
                k = 0,
                re = "";
            for(var i = a[0].length - 1; i >= 0; i--) {
                switch(k) {
                    case 0:
                        re = BB[7] + re;
                        break;
                    case 4:
                        if(!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                            .test(a[0]))
                            re = BB[4] + re;
                        break;
                    case 8:
                        re = BB[5] + re;
                        BB[7] = BB[5];
                        k = 0;
                        break;
                }
                if(k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
                    re = AA[0] + re;
                if(a[0].charAt(i) != 0)
                    re = AA[a[0].charAt(i)] + BB[k % 4] + re;
                k++;
            }

            if(a.length > 1) // 加上小数部分(如果有小数部分)
            {
                re += BB[6];
                for(var i = 0; i < a[1].length; i++)
                    re += AA[a[1].charAt(i)];
            }
            if(re == '一十')
                re = "十";
            if(re.match(/^一/) && re.length == 3)
                re = re.replace("一", "");
            return re;
        }

    },
    /***************************** 数字操作结束 *****************************/

    /***************************** 关于数组操作开始 *****************************/
    array: {
        // 数组排序
        orderBy: function(array, sortFlag) {
            var $arr = array;
            if(sortFlag == 'asc') {
                $arr.sort(this._numAscSort);
            } else if(sortFlag == 'desc') {
                $arr.sort(this._numDescSort);
            } else {
                $arr.sort(this._numAscSort);
            }
            return $arr;
        },
        // 求两个集合的并集
        union: function(a, b) {
            var newArr = a.concat(b);
            return this.unique2(newArr);
        },
        // 求两个集合的补集
        complement: function(a, b) {
            return this.minus(this.union(a, b), this.intersect(a, b));
        },
        // 求两个集合的交集
        intersect: function(a, b) {
            a = this.unique(a);
            return this.each(a, function(o) {
                return b.contains(o) ? o : null;
            });
        },
        //求两个集合的差集
        minus: function(a, b) {
            a = this.unique(a);
            return this.each(a, function(o) {
                return b.contains(o) ? null : o;
            });
        },
        // 数组的去重
        unique: function(arr) {
            var ra = new Array();
            for(var i = 0; i < arr.length; i++) {
                if(!ra.contains(arr[i])) {
                    //if(this.contains(ra,arr[i])){
                    ra.push(arr[i]);
                }
            }
            return ra;
        },
        // 数组的去重2
        unique2: function(arr) {
            for(var i = 0; i < arr.length; i++) {
                for(var j = i + 1; j < arr.length;) {
                    if(arr[j] == arr[i]) {
                        arr.splice(j, 1);
                    } else {
                        j++;
                    }
                }
            }
            return arr;
        },
        // 数组去除重复的(根据对象来)
        unique3: function(ary) {
            var result = [],
                hash = {};
            for(var i = 0, elem;
                (elem = arr[i]) != null; i++) {
                if(!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            }
            return result;
        },
        // 获取数组下标
        indexOf: function(arr, val) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] == val) {
                    return i;
                }
            }
            return -1;
        },
        // 判断一个元素是否在一个数组中
        contains: function(arr, val) {
            return this.indexOf(arr, val) != -1 ? true : false;
        },
        // 数组中删除一个元素
        remove: function(arr, indexs) {
            var index = this.indexOf(arr, indexs);
            if(index > -1) {
                arr.splice(index, 1);
            }
            return arr;
        },
        removeObject: function(arr, item) {
            for(var i = 0; i < arr.length; i++) {
                var jsonData = arr[i];
                for(var key in jsonData) {
                    if(jsonData[key] == item) {
                        arr.splice(i, 1);
                    }
                }
            }
            return arr;
        },
        /**
         * 求数组中最大值
         * @param arr
         * @returns {number|Number}
         */
        arrMax: function(arr) {
            return Math.max.apply(null, arr);
        },
        /**
         * 求数组中最小值
         * @param arr
         * @returns {number|Number}
         */
        arrMin: function(arr) {
            return Math.min.apply(null, arr);
        },
        /**
         * 删除数组元素的方法
         */
        removeAry: function(ary, ele) {
            ary.splice(ary.indexOf(ele), 1);
        },
        /**
         * 将类数组转换为数组的方法
         * @param ary
         * @returns {Array}
         */
        formArray: function(ary) {
            var arr = [];
            if(Array.isArray(ary)) {
                arr = ary;
            } else {
                arr = Array.prototype.slice.call(ary);
            };
            return arr;
        },
        /**
         * 定义一个数组排序的方法
         * 默认为升序排序asc,
         * 如果传递是参数是一个的话，那么就是是升序，如果传递的参数是两个的话，如果第一个参数不能转换为数组的话，也直接退出
         * 参数:acs:表示升序
         * 参数:desc:表示降序
         * @returns {*}
         */
        arrySort: function() {
            var arg = arguments;
            var len = arg.length;
            var ary = this.arryList(arg[0]);
            //如果没传递参数，或者传递的不能转换为数组的话就直接返回
            if(!len || Array.isArray(ary) == false) {
                return false;
            };
            if(len == 1) {
                return ary.sort(function(a, b) {
                    return a - b;
                });
            } else {
                return ary.sort(function(a, b) {
                    if(arg[1] == "desc") {
                        return b - a;
                    } else if(arg[1] == "asc") {
                        return a - b;
                    } else {
                        return a - b;
                    };
                });
            };
        },
        /**
         * 求和函数
         * @param arr
         * @returns {number}
         */
        arySum: function(arr) {
            var ary = [];
            var result = 0;
            if(arr instanceof Array) {
                ary = arr;
            } else {
                ary = this.formArray(arr);
            };
            for(var i = 0; i < ary.length; i++) {
                result += parseFloat(ary[i]);
            };
            return result;
        },

        /**
         * 数组随机排列
         * @param {Object} ary
         */
        shuffle: function(ary) {
            var input = this;
            for(var i = input.length - 1; i >= 0; i--) {
                var randomIndex = Math.floor(Math.random() * (i + 1));
                var itemAtIndex = input[randomIndex];
                input[randomIndex] = input[i];
                input[i] = itemAtIndex;
            }
            return input;
        },
        /**
         * 数组随机排序
         * @param {Object} target
         */
        shuffle1: function(target) {
            function randomsort(a, b) {
                return Math.random() > .5 ? -1 : 1;
                //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
            }

            return target.sort(randomsort);
        },
        /**
         * 判断是不是数组
         * @param {Object} ary
         */
        isArray: function(ary) {
            var objectToStringFn = Object.prototype.toString;
            var arrayToStringResult = objectToStringFn.call([]);
            return function(subject) {
                return objectToStringFn.call(subject) === arrayToStringResult;
            };
        },
        /**
         * 随机返回数组中一个元素
         * @param {Object} ary
         */
        randomItem: function(ary) {
            return ary[Math.ceil(Math.random() * ary.length)];
        },
        /**
         * 判断数组中是否包含某一项
         * @param arr
         * @returns {number|Number}
         * 调用方法：var max = utils.arrContains([],"",false)  flag 如果为true，则判断字符串    false则判断字符
         */
        arrContains: function(arr, str, flag) {
            if(flag) {
                if(arr.length > 0 && this.isNotEmpty(str)) {
                    for(var i = 0; i < arr.length; i++) {
                        if(arr[i] == str) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            } else {
                for(var i = 0; i < arr.length; i++) {
                    for(var j = 0; j < arr[i].length; j++) {
                        if(arr[i].charAt(j) == str) {
                            return true;
                        } else {
                            false;
                        }
                    }
                }
            }
        },
        /**
         * 判断数组是否有重复的项
         * @param {Object} arr
         */
        isRepeat: function(arr) { //arr是否有重复元素
            var hash = {};
            for(var i in arr) {
                if(hash[arr[i]]) return true;
                hash[arr[i]] = true;
            }
            return false;
        },

        _numAscSort: function(a, b) {
            return a - b;
        },
        _numDescSort: function(a, b) {
            return b - a;
        },
        _sortAsc: function(x, y) {
            if(x > y) {
                return 1;
            } else {
                return -1;
            }
        },
        _sortDesc: function(x, y) {
            if(x > y) {
                return -1;
            } else {
                return 1;
            }
        }
    },
    /***************************** 关于数组操作结束 *****************************/

    /***************************** 日期类操作开始 *****************************/
    date:{
        // 格式化日期的方法
        formatDate:function(date, fmt) { 
            fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
            var o = {
                "M+": date.getMonth() + 1,
                //月份 
                "d+": date.getDate(),
                //日 
                "h+": date.getHours(),
                //小时 
                "m+": date.getMinutes(),
                //分 
                "s+": date.getSeconds(),
                //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3),
                //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        // 时间戳 
        timeStamp: function() {
            return new Date().getTime();
        }

    },
    /***************************** 日期类操作结束 *****************************/

    /***************************** 请求类操作开始 *****************************/
    request:{
        // 获取url里面的参数
         getQueryString:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) return unescape(r[2]);
            return null;

        },
        // 获取域名
        getHostName:function(){
            var hostname = location.hostname;
            return hostname;
        },
        // 获取端口
        getPort:function(){
            var port = location.port;
            return port;
        },
        // 获取域名+端口
        getHost:function(){
            var host = location.host;
            return host;
        },
        // 获取协议
        getProtocol:function(){
            var protocol =location.protocol ;
            return protocol;
        },
        // 获取url
        getUrl:function(){
            var url =window.location.href ;
            return url;
        },       
        // 获取url路径部分
        getPathName:function(){
            var pathname = location.pathname;
            return pathname;
        },
        // 获取查询部分
        getSearch:function(){
            var search=location.search;
            return search;
        },
        //判断是否是IE11以下版本
        ltIe11:function(){

            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            
            var browser = {
                versions: function () {
                    var u = navigator.userAgent;
                    return {
                        trident: u.indexOf('Trident') > -1 //IE内核
                    }
                }()
            }
            if (browser.versions.trident && !isIE11) {
                return true;

            }else{
                return false;
            }
        },
        //判断是否是ie9以下版本
        ltIe9:function(){
            var browser = navigator.appName;
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            if (version.length > 1) {
                var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
                if (trim_Version < 9) {
                    return true;
                }
            }
            return false;
        }
    },
    /***************************** 请求类操作结束 *****************************/

    /***************************** 关于文件及字符操作开始 *****************************/
    file:{
        // 文件大小转换为MB GB KB格式
        countFileSize: function(size) {
            var fsize = parseFloat(size, 2);
            var fileSizeString;
            if(fsize < 1024) {
                fileSizeString = fsize.toFixed(2) + "B";
            } else if(fsize < 1048576) {
                fileSizeString = (fsize / 1024).toFixed(2) + "KB";
            } else if(fsize < 1073741824) {
                fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
            } else if(fsize < 1024 * 1024 * 1024) {
                fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
            } else {
                fileSizeString = "0B";
            }
            return fileSizeString;
        },
        // 获取带.后缀名
        getExt: function(fileName) {
            if(fileName.lastIndexOf(".") == -1)
                return fileName;
            var pos = fileName.lastIndexOf(".") + 1;
            return fileName.substring(pos, fileName.length).toLowerCase();
        },
        // 只获取后缀名
        getExtension:function (name) {
            return name.substring(name.lastIndexOf(".")+1)
        },
        // 获取文件名称
        getFileName: function(fileName) {
            var pos = fileName.lastIndexOf(".");
            if(pos == -1) {
                return fileName;
            } else {
                return fileName.substring(0,pos);
            }
        },
        // 验证是否为图片
        checkImage: function(fileName) {
            return /(gif|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(fileName);
        },

        // 验证是否为视频
        checkVideo: function(fileName) {
            return /(mp4|mp3|flv|wav)$/ig.test(fileName);
        },

        // 验证是否为文档
        checkDocument: function(fileName) {
            return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx|rar|zip|html|jsp|sql|htm|shtml|xml)$/ig.test(fileName);
        },

        /*验证是否为文档*/
        tmCheckOffice: function(fileName) {
            return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx)$/ig.test(fileName);
        }
    }

    /***************************** 关于文件及字符操作结束 *****************************/

}
