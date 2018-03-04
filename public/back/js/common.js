/**
 * Created by Admin on 2018/3/2.
 */
;(function(){
    var lis=$('.nav>ul>li');
    lis.forEach(function(v,i){
        lis[i].onclick=function(){
            alert('haha');
        }
    })
})();