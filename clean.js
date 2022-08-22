var cleanH = 0;
var allH = [];

document.getElementById('clean').onclick =()=> {
    cleaning()
 if(cleanH==0){
    cleanH = 1 ;
    document.getElementById('album').style.cursor = 'url(./img/archeology.png), auto';
 }else{
    cleanH = 0 ;
    document.getElementById('album').style.cursor = '';
 }
}

function cleaning(){
    console.log('cleaning')
var cleanpages = document.querySelectorAll('.turn-page-wrapper')
for(const x of cleanpages){
    if(x.innerHTML!= '' && x.children[0].children[0]!= null ){
        if(x.children[0].children[0].hasAttribute('class')){
            if(x.children[0].children[0].getAttribute('class').includes('turn-page')){
                x.children[0].children[0].addEventListener('click',(e)=>{
                    if(document.getElementById('album').style.cursor === 'url("./img/archeology.png"), auto' && cleanH==1){
                        var allh;
                        if(e.target.tagName === 'IMG'){
                            allh=e.target.parentElement.querySelectorAll('.heighLight')
                        }
                        else{allh=e.target.querySelectorAll('.heighLight')}
                        for (let i = 0; i < allh.length; i++) {
                            allh[i].remove();
                        }
                        allh = document.getElementsByClassName('heighLight');
                        for (let i = 0; i < allh.length; i++) {
                        var p =   allh[i].parentElement.getAttribute('class')[allh[i].parentElement.getAttribute('class').length-1]
                        var item = {parent: p, data: `<span class='heighLight' style='${allh[i].getAttribute('style')}'> </span>`}
                        allH.push(item)  
                        }
                        cleanH=0;
                         AllHeighLight = allH 
                         updateHeightlightToDb();
                        document.getElementById('album').style.cursor = '';
                        document.getElementById('clean').children[0].children[0].style.filter = 'invert(1)';
                        document.getElementById('clean').children[0].style.backgroundColor = '#021a2f';
                    }
                })
            }}}

}
}