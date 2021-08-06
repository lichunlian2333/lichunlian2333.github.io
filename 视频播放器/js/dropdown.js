// 下拉菜单
function dropDwonMenu(tap,list,callback){
   
    if(tap==undefined || list == undefined){ 
        return ;
    }
    tap.onclick = function(){
        list.style['display']="block";
    }
    list.onmouseleave = function(){
        list.style['display']="none";
    }
    var items = list.querySelectorAll("li");
    var arr = [0.5 ,1 , 1.5 ,2];
    for(var i = 0 ; i < items.length ; i ++){
        items[i].speed = arr[i];
        items[i].onclick = function(){
            list.style['display']="none";
            if(typeof callback == 'function'){
                callback(this.speed);
            }
        }
    }
    
}