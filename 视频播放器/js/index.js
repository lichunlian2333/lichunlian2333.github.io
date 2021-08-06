function Player() {
        // 当前函数作用域的 this 
        // 添加数据
        this.video = document.querySelector(".wrapper-video video");
        this.playButton = document.querySelector(".btn-play");
        this.pauseButton = document.querySelector(".btn-pause");
        this.ul = document.querySelector(".top ul");
        this.line = document.querySelector(".top ul li");
        this.bar = document.querySelector(".top ul li .bar"); 
        this.spans = document.querySelectorAll('.time span');
        this.tap = document.querySelector(".title");
        this.list = document.querySelector(".select");
        this.curTime = 0;
        this.totTime = 0;
        this.flag = false;

    }
    // 在构造函数的原型添加
    // 添加初始化方法
    Player.prototype.init = function(){
        // 调用原型的方法
        this.addClickEvent();
        this.addVideoEvent();
        this.addMouseEvent();
        this.addSpeed();
    }
    // 处理点击事件
    Player.prototype.addClickEvent = function() {
        // 当前函数作用域 this 1.0
        var _this = this;
        _this.playButton.onclick = function() {
            // 当前函数作用域 this 2.0 
            // 播放
            _this.video.play();
            // 设置类名
            _this.pauseButton.classList.add("active");//添加类名
            this.classList.remove("active");//移除类名
        }
        _this.pauseButton.onclick = function(){
            // 暂停
            _this.video.pause();
            // 设置类名
            _this.playButton.classList.add("active");
            this.classList.remove("active");
        }
    }
    // 处理视频事件
    Player.prototype.addVideoEvent = function(){
        // 当前函数作用域 this 1.0
        var _this = this;
        // 获取视频总时长
        _this.video.oncanplay = function(){
            // 视频总时长
            _this.totTime = _this.video.duration;
            // 格式化总时长
            _this.spans[1].innerHTML = _this.formatTime(_this.totTime);
        }
        // 监听视频的播放
        _this.video.ontimeupdate = function(){
            // 视频当前播放的时间
            _this.curTime = _this.video.currentTime;
            // 设置进度条
            _this.drawProgress(_this.curTime,_this.totTime);
            // 格式化当前
            _this.spans[0].innerHTML = _this.formatTime(_this.curTime);
        
        }
        // 监听视频是否播放结束
        _this.video.addEventListener('ended',function(){
            // 弹窗
            // alert("视频播放结束！");
            // 播放视频
            _this.video.play();
        })
    }
    // 处理绘制进度条
    Player.prototype.drawProgress = function(curTime,totTime){
        // 记录ul和bar标签的宽度
        var width = this.ul.offsetWidth;
        var w = this.bar.offsetWidth;
        // 记录进度
        var x = (width - w) * (curTime / totTime);
        // 设置line标签的宽度
        this.line.style['width'] = x +"px";
        // 设置bar标签的位置
        this.bar.style['left'] = x+ "px";
    }
    // 格式化时间的方法
    Player.prototype.formatTime = function(seconds) {
        // 判断秒数是否小于 0
        if(seconds < 0){
            return ;
        }
        // 格式化时间
        var h , m , s ;
        // 处理时间
        h = Math.floor(seconds / 3600);
        m = Math.floor((seconds % 3600) / 60);
        s = Math.floor(seconds % 60) ;
        // 区别两位数字符
        h = h < 10 ? '0'+h : h ;
        m = m < 10 ? '0'+m : m ;
        s = s < 10 ? '0'+s : s ;
        // 返回时分秒
        return h+":"+m+":"+s;
    }
    // 处理鼠标事件
    Player.prototype.addMouseEvent = function(){
        // 当前函数作用域 this 1.0
        var _this = this; 
        // 进度条控件
        progress(
            this.ul,
            this.line,
            this.bar,
            function() {//鼠标按下执行的回调函数
                _this.video.pause();
                _this.flag = true;
            },
            function(cur,total){//鼠标滑动执行的回调函数
                var demo = cur / total; //计算比例
                _this.video.currentTime = demo * _this.totTime;//计算视频文件当前播放时长
            },
            function(){//鼠标松开执行的回调函数
                if(_this.flag){
                    _this.video.play();
                    _this.flag = false;
                    // 设置类名
                    _this.pauseButton.classList.add("active");//添加类名
                    _this.playButton.classList.remove("active");//移除类名
                }
            }
        )
    }
    // 处理倍数的方法
    Player.prototype.addSpeed = function(){
        // 当前函数作用域 this 1.0
        var _this = this; 
        // 下拉菜单 控制倍速
        dropDwonMenu(
            this.tap,
            this.list,
            function(v1) {
                // 设置视频播放速度
                _this.video.playbackRate = v1;
            }
        )  

    }
    // 创建构造函数的实例 并调用init方法
    new Player().init()




    // 问题： 
    // this 都有哪些指向? 
    // 如何判断this指向?
    // 什么事函数作用域?
    // 事件的调用者?
    // 什么时候使用 this ? 
    // 什么使用下划线的 _this ? 
    // 强调：
        // this 是指针变量
        // _this 不是指针变量（普通变量）


    






