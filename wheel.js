function wheel(wins,opts,run){
    this.init(wins,opts,run);
    this.getWindow();
    this.createDiv();
    this.createList();
    this.createLinks();
    this.autoRun();
    this.onclickRun();
}

wheel.prototype={
    init(wins,opts,run){
        this.opts=opts;
        this.run=this.run;
        var wins=document.querySelector(wins);
        if(!(wins&&wins.nodeType)){
        console.log("窗口元素 not find");
        return;
        }
    this.wins=wins;
    opts.imgs.push(opts.imgs[0]);
    opts.links.push(opts.links[0]);

    this.imgLength=opts.imgs.length+1;
    if(this.imgLength==0){
        console.log("没有传入轮播内容");
    }
    this.imgSize=opts.imgSize;
    if (!(this.imgSize instanceof Array)){
        console.error("请传入合法的尺寸类型");
    }
    if(this.imgSize.length==0){
        this.imgSize[0]=document.documentElement.clientWidth;//默认获取父元素的宽高
        this.imgSize[1]=document.documentElement.clientHeight;
    }
    if(this.imgSize.some(function(val){
        return val==0
    })){
        for(var i=0;i<this.imgSize.length;i++){
            if(this.imgSize[i]==0){
                this.imgSize[i]=500;
            }
        }
    }
    
    this. btnColor=opts.btnColor||"#fff";
    this. btnActive=opts.btnActive||"#ccc";
    this. btnPos=opts.btnPos||["center","20"];
    this. time=0;
    this. runStyle=run.runStyle;
    if(runStyle=="Tween.Quad.easeIn"){
        this.runStyle=Tween.Quad.easeIn;
    }else if(run.runStyle=="Tween.Quad.easeOut"){
        this.runStyle=Tween.Quad.easeOut;
    }else{
        this.runStyle=Tween.Linear;
    }
    if(this.run.time){
        this.time=run.time*1000;
    }else{
        this.time=3000;
    }
    this. eachTime=0;
    if(this.run.eachTime){
        this.eachTime=run.eachTime*1000;
    }else{
        this.eachTime=300;
    }
    },
    getWindow(){
        this.style.cssText="width:100%;height:"+this.imgSize[1]+"px;float:left;overflow:hidden;position:relative";
    },
    createDiv(){
        this.box=document.createElement("div");
        this.box.style.cssText="width:"+this.imgLength*100+"%;height:100%;border:1px solid red"
        this.wins.appendChild(box);
    },
    createList(){
        for(var i=0;i<this.imgLength;i++){

            var divList=document.createElement("div");
            divList.style.cssText=`float:left;width:${100/this.imgLength}%;height:100%;border:1px solid blue;background:${this.opts.imgColor[i]}`;
    
            var link=document.createElement("a");
            link.href=opts.links[i];
            link.style.cssText="width:"+this.imgSize[i]+"px;height:"+this.imgSize[1]+"px;display:block;margin:auto;background:url("+this.opts.imgs[2]+") no-repeat 0 0"
            divList.appendChild(link);
            this.box.appendChild(divList);
        }
    },
    createLinks(){
        var btnBox=document.createElement("div");
        this.btnBox.style.cssText="width:300px height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+this.btnPos[1]+"px;border:1px solid #ccc;"
        this.btns=[];
        for(var i=0;i<this.imgLength;i++){
            var btn=document.createElement("div");
            var backgroundcolor=i==0?btnActive:btnColor;
            btn.style.cssText="width:10px;height:10px;background:"+backgroundcolor+";border-radius:50%;margin:0 10px;cursor:pointer;float:left;";
            btnBox.appendChild(btn);
            this.btns.push(btn);
        }
    
        this.wins.appendChild(btnBox)
    },
    autoRun(){
        var winW=parseInt(getComputedStyle(this.wins,null).width);
        var num=0;
        //自动轮播
        var move=function(){
            num++;
            if(num>this.btns.length-1){
                animate(box,{marginLeft:-num*winW},500,runStyle,function(){box.style.marginLeft=0;});num=0;}else{
            animate(box,{marginLeft:-num*winW},500,runStyle)}
            for(var i=0;i<this.btns.length;i++){
                this.btns[i].style.background=btnColor;
            }
            this.btns[num].style.background=btnActive;
        }
        this.t=setInterval(move,time);
    },
    onclickRun(){
        for(let i=0;i< this.btns.length;i++){
            this.btns[i].onclick=function(){
                num=i;
                animate(box,{marginLeft:-num*winW},500,runStyle);
                for(var j=0;j< this.btns.length;j++){
                    this.btns[j].style.background=btnColor;
                }
                this.btns[num].style.background=btnActive
            }
        }


        //鼠标移入移出
        this.wins.onmouseover=function(){
            clearInterval(this.t);
        }
        this.wins.onmouseout=function(){
            setInterval(move,3000);
        }
    }
}






//无缝轮播
// function animate(obj, attr0bj, duration, fn, callback) {
//     // console.log(1)
//     // clearInterval(obj.t)
//     clearInterval(obj.t);
//     //参数初始化
//     if (obj.nodeType != 1) {
//         console.error("对象的类型不对");
//         return;
//     }
//     var start = {};
//     var change = {};
//     var time = 0;
//     var fn = fn || Tween.Linear;


//     //获取每个属性的初始值
//     for (var i in attr0bj) {
//         start[i] = parseInt(getComputedStyle(obj, null)[i]);

//         change[i] = attr0bj[i] - start[i];
//         // console.log(change[i])
//     }

//     obj.t = setInterval(function() {
//         time += 50;
//         for (var i in attr0bj) {
//             // obj.style[i] = (change[i] * time / duration + start[i]) + "px"
//             obj.style[i] = fn(time, start[i], change[i], duration) + "px"
//                 // obj.style[i] = + "px"
//             console.log(obj.style[i])
//         }
//         if (time >= duration) {
//             for (var i in attr0bj) {
//                 obj.style[i] = attr0bj[i] + "px"
//             }
//             clearInterval(obj.t);

//             if (callback) {
//                 callback();

//             }

//         }



//     }, 50)
// }



/*
    动画函数

    obj  动画的对象
    attrobj  动画的属性和最终值  object{}
    duration  动画的持续时间
    fn  动画函数  默认值 Tween.Linear
        callback  回调函数，本次动画执行完后运行的函数
    */

   function animate(obj, attrObj, duration, fn, callback) {
    // 参数初始化
    if (obj.nodeType !== 1) {
        console.error("类型不对");
        return;

    }
    var start = {};
    var change = {};
    var time = 0;
    var fn = fn || Tween.Linear;

    // 
    for (var i in attrObj) {
        start[i] = css(obj, i)
        change[i] = attrObj[i] - start[i]
    }

    obj.t = setInterval(function() {
        time += 50;
        for (var i in attrObj) {
            // obj.style[i] = fn(time, start[i], change[i], duration) + "px"
            css(obj, i, fn(time, start[i], change[i], duration))


        }
        if (time >= duration) {
            for (var i in attrObj) {
                css(obj, i, attrObj[i])
            }
            clearInterval(obj.t);
            if (callback) {
                callback();
            }
        }
    }, 50)


}


// css(div,"width",200)
function css(obj, attr, val) {
    if (arguments.length == 2) {
        switch (attr) {
            case "background":
            case "color":
            case "opacity":
                return getComputedStyle(obj, null)[attr];

                break;
            case "scrollTop":
                return obj[attr];
                break;
            default:
                return parseInt(getComputedStyle(obj, null)[attr]);

        }

    } else if (arguments.length == 3) {
        switch (attr) {
            case "background":
            case "color":
            case "opacity":
            case "border":
                obj.style[attr] = val;
                break;
            case "scrollTop":
                obj[attr] = val;
            default:
                obj.style[attr] = val + "px"

        }


    }
}













//动画算法
/*
		    Linear：无缓动效果(匀速运动)；
			Quad：二次方的缓动；
			Cubic：三次方的缓动
			Quartic：四次方的缓动；
			Quintic：五次方的缓动；
			Sinusoidal：正弦曲线的缓动；
			Exponential：指数曲线的缓动；
			Circular：圆形曲线的缓动；
			Elastic：指数衰减的正弦曲线缓动；
			Back：超过范围的三次方缓动）；
			Bounce：指数衰减的反弹缓动。
			

			每个效果都分三个缓动方式（方法），分别是：
			easeIn：从0开始加速的运动；
			easeOut：减速到0的运动；
			easeInOut：前半段从0开始加速，后半段减速到0的运动。
			


			函数的四个参数分别代表：

				t--- current time（当前时间）；0 +=60
				b--- beginning value（初始值）；
				c--- change in value（变化量）；end-start
				d---duration（持续时间）  5000
			Tween.Quad.easeInt()

	
             运算的结果就是当前的运动路程。
             
             ecmascsript 基本语法  flash   nodejs  
             flash 里面 取出来的算法
          */

Tween = {
    Linear: function(t, b, c, d) { return c * t / d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}

/*
    无缝轮播图
    wins String 要放入轮播图的窗口  //选择器
    opts json格式 实现轮播图的各种选项
        img  数组 包含轮播图图片的数组
        links  数组  图片链接地址
        imgColor 数组 图片的背景颜色  用于全屏显示
        imgSize 数组  第一个参数代表宽度，第二个参数代表高度 传入0 为默认值
        btnColor  String  按钮的颜色
        btnActive  String   获得焦点的按钮颜色
        btnPos  数组   第一个参数代表按钮X轴位置，第二个Y轴位置
*/ 
function wheel(wins,opts,run){

    /* 参数初始化 */ 
    var wins=document.querySelector(wins);
    if(!(wins&&wins.nodeType)){
        console.log("窗口元素 not find");
        return;
    }
    // 图片的地址添加
    opts.imgs.push(opts.imgs[0]);
    // 连接的地址添加
    opts.links.push(opts.links[0]);

    var imgLength=opts.imgs.length+1;
    if(imgLength==0){
        console.log("没有传入轮播内容");
    }
    var imgSize=opts.imgSize;
    if (!(imgSize instanceof Array)){
        console.error("请传入合法的尺寸类型");
    }
    if(imgSize.length==0){
        imgSize[0]=document.documentElement.clientWidth;//默认获取父元素的宽高
        imgSize[1]=document.documentElement.clientHeight;
    }
    if(imgSize.some(function(val){
        return val==0
    })){
        for(var i=0;i<imgSize.length;i++){
            if(imgSize[i]==0){
                imgSize[i]=500;
            }
        }
    }
    
    var btnColor=opts.btnColor||"#fff";
    var btnActive=opts.btnActive||"#ccc";
    var btnPos=opts.btnPos||["center","20"];
    var time=0;
    var runStyle=run.runStyle;
    if(runStyle=="Tween.Quad.easeIn"){
        runStyle=Tween.Quad.easeIn;
    }else if(run.runStyle=="Tween.Quad.easeOut"){
        runStyle=Tween.Quad.easeOut;
    }else{
        runStyle=Tween.Linear;
    }
    if(run.time){
        time=run.time*1000;
    }else{
        time=3000;
    }
    var eachTime=0;
    if(run.eachTime){
        eachTime=run.eachTime*1000;
    }else{
        eachTime=300;
    }
    /* 创建html结构样式 */
    //1.win样式
    wins.style.cssText="width:100%;height:"+imgSize[1]+"px;float:left;overflow:hidden;position:relative";
    var box=document.createElement("div");
    box.style.cssText="width:"+imgLength*100+"%;height:100%;border:1px solid red"
    wins.appendChild(box);

    //创建每一个轮播图

    for(var i=0;i<imgLength;i++){

        var divList=document.createElement("div");
        divList.style.cssText=`float:left;width:${100/imgLength}%;height:100%;border:1px solid blue;background:${opts.imgColor[i]}`;

        var link=document.createElement("a");
        link.href=opts.links[i];
        link.style.cssText="width:"+imgSize[i]+"px;height:"+imgSize[1]+"px;display:block;margin:auto;background:url("+opts.imgs[2]+") no-repeat 0 0"
        divList.appendChild(link);
        box.appendChild(divList);
    }


    //创建按钮
    var btnBox=document.createElement("div");
    btnBox.style.cssText="width:300px height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+btnPos[1]+"px;border:1px solid #ccc;"
    var btns=[];
    for(var i=0;i<imgLength;i++){
        var btn=document.createElement("div");
        var backgroundcolor=i==0?btnActive:btnColor;
        btn.style.cssText="width:10px;height:10px;background:"+backgroundcolor+";border-radius:50%;margin:0 10px;cursor:pointer;float:left;";
        btnBox.appendChild(btn);
        btns.push(btn);
    }

    wins.appendChild(btnBox)
}

        var wins=document.getElementsByClassName("window")[0];
        var box = document.getElementsByClassName("box")[0];
        var btns=document.querySelectorAll(".btns li");
        

        //如何获得窗口的大小
        //console.log(window.innerWidth);
        var winW=parseInt(getComputedStyle(wins,null).width);
        var num=0;
        //自动轮播
        var move=function(){
            num++;
            if(num>btns.length-1){
                animate(box,{marginLeft:-num*winW},500,runStyle,function(){box.style.marginLeft=0;});num=0;}else{
            animate(box,{marginLeft:-num*winW},500,runStyle)}
            for(var i=0;i<btns.length;i++){
                btns[i].style.background=btnColor;
            }
            btns[num].style.background=btnActive;
        }
        var t=setInterval(move,time);

        //手动
        for(let i=0;i<btns.length;i++){
            btns[i].onclick=function(){
                num=i;
                animate(box,{marginLeft:-num*winW},500,runStyle);
                for(var j=0;j<btns.length;j++){
                    btns[j].style.background=btnColor;
                }
                btns[num].style.background=btnActive
            }
        }


        //鼠标移入移出
        wins.onmouseover=function(){
            clearInterval(t);
        }
        wins.onmouseout=function(){
            setInterval(move,3000);
        }