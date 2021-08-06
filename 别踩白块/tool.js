// 获取指定对象的指定CSS属性值的方法
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

// 根据css选择器获取DOM对象的方法
function $(cssSelector) {
    var res = document.querySelectorAll(cssSelector);
    if (res.length == 1) {
        return res[0];
    } else {
        return res;
    }
}

// 封装一个获取随机整数的函数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}