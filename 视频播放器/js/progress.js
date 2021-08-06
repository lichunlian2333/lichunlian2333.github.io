function progress(ul,line,bar,statr,move,end) {
    var ul = ul;
    var line = line;
    var bar = bar;
    var startX = 0;
    var isMouseDown = false;
    var resultX = 0;
    var currentX = 0;
    bar.addEventListener('mousedown',function(event){
        startX = event.pageX || event.clientX;
        isMouseDown = true;
        if(typeof statr =='function') statr();
    }) 
    document.addEventListener('mousemove',function(event){
        if(isMouseDown){
            var moveX =  event.pageX || event.clientX;
            var space = bar.offsetWidth;
            resultX = moveX - startX  + currentX;
            var minV = 0;
            var maxV = ul.offsetWidth - space ;
            if(resultX < 0 ){
                resultX = 0;
            }
            if(resultX > maxV){
                resultX = maxV;
            }
            line.style['width'] = resultX +"px";
            bar.style['left'] = resultX +"px";
            // console.log({resultX,maxV});
            if(typeof move =='function') move(resultX,maxV);
        }
    })
    document.addEventListener('mouseup',function(){
        isMouseDown = false;
        currentX = resultX;
        if(typeof end =='function') end();
    })
}
