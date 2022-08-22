var lightup = 0;


document.getElementById('pin1').children[0].children[0].onclick = (e) =>{
    light();
    pen=1;
    if(lightup==0){
        lightup = 1 ;
        document.getElementById('album').style.cursor = 'url(./img/spotlightc.png), auto';
        e.target.style.filter = 'none';
        e.target.parentElement.style.backgroundColor = '#e5e5e5';
     }else{
        lightup = 0 ;
        document.getElementById('album').style.cursor = '';
     }
}

var starthX;
var starthY;
var endhY;
var endhX;
function light(){
    var allpage = document.querySelectorAll('.turn-page-wrapper');
    for(const x of allpage){
        if(x.innerHTML!= '' && x.children[0].children[0]!= null ){
            if(x.children[0].children[0].hasAttribute('class')){
                if(x.children[0].children[0].getAttribute('class').includes('turn-page')){
                    x.children[0].children[0].addEventListener('mousedown',(e)=>{
                        if( e.button ==0 && document.getElementById('album').style.cursor === 'url("./img/spotlightc.png"), auto'){
                            console.log(starthX)
                        starthX = e.offsetX;
                        starthY = e.offsetY;
                        var prevh= document.getElementsByClassName('lightup');
                        if(prevh.length>0){
                            for (let i = 0; i < prevh.length; i++) {
                                prevh[i].remove();
                            }
                        }}
                    })
                    x.children[0].children[0].addEventListener('mouseup',(e)=>{
                        if(e.button ==0 && document.getElementById('album').style.cursor === 'url("./img/spotlightc.png"), auto'){
                        endhX = e.offsetX;
                        endhY = e.offsetY;
                        var w;
                        var h; 
                        if(endhY>starthY){ w = endhY-starthY}else{ w = endhY-starthY}
                        if(endhX>starthX){ h = endhX-starthX}else{ h = endhX-starthX}
                        x.children[0].children[0].innerHTML += `<span class='lightup' style='display:block;height:${w}px;width:${h}px;position:absolute;top:${starthY}px;left:${starthX}px;background-color:#83e7dc4d;box-shadow: 0px 0px 50px #060606;border-radius:50%;filter: brightness(2.2);'> </span>` ;
                        pen=0;
                        lightup = 0;
                        document.getElementById('album').style.cursor='';
                        document.getElementById('pin1').children[0].children[0].style.filter = 'invert(1)';
                        document.getElementById('pin1').children[0].style.backgroundColor = '#021a2f';
                        }
                    })
                }}}}
}