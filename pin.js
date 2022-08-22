var Allpin = [];
var pinn =0;
function pin(){
pinn=0;
document.getElementById('album').style.cursor = 'url("./img/pin.png"), auto';
    var Allpage = document.querySelectorAll('.turn-page-wrapper');
for (const x of Allpage) {
   if(x.innerHTML!= '' && x.children[0].children[0]!= null ){
    if(x.children[0].children[0].hasAttribute('class')){
        if(x.children[0].children[0].getAttribute('class').includes('turn-page')){
            x.children[0].children[0].onclick = ()=>{
                if(pinn==0){
                if(x.children[0].children[0].innerHTML.includes('pin.png')== false){
                    var a = x.children[0].children[0].getAttribute('class');
                    a = a[a.length-1]
                    x.children[0].children[0].innerHTML += `<img src='./img/pin.png' width='20' data='${a}' class='pin'>`  ;
                    Allpin.push(`<img src='./img/pin.png' width='20' data='${a}' class='pin'>`)
                    document.getElementById('album').style.cursor = '';
                    updatepin();
                    pinViewer();
                    deleteViewer();
                    pinn=1;
                } }
            }
        }
    }
}
}

}

function updatepin(){
    const request = window.indexedDB.open('Pinned');
    request.onupgradeneeded = (event) => {
        const db = event.target.result;  
        var objectStore = db.createObjectStore('TotalPins',{ autoIncrement: true});   
    }
    request.onsuccess = (e) =>{
        const db = e.target.result;
    if(db.objectStoreNames.length>0){
    db.transaction('TotalPins', 'readwrite').objectStore("TotalPins").put(Allpin,1)}
    }
    
}
  
function pinViewer(){
document.getElementById('allpinthumb').style.display = 'flex';
document.getElementById('allpinthumb').innerHTML =''
for (let i = 0; i < Allpin.length; i++) {
    document.getElementById('allpinthumb').innerHTML += `<span><img src="./img/delete.png"><img src="./img/thumb-book-pin.png" alt="" srcset="" onclick='gopage(event)'><text>${Allpin[i][42]}</text></span>`   
}
setTimeout(()=>{document.getElementById('allpinthumb').style.display = 'none';document.getElementById('album').style.cursor = '';pinn=1;},4000)
}  
  
function gopage(event){
    document.getElementById('page-number').value = parseInt(event.target.nextSibling.innerHTML);
    var a;
    if(event.target.nextSibling.innerHTML==='1'){a= '1st'}
    if(event.target.nextSibling.innerHTML==='2'){a= '2nd'}
    if(event.target.nextSibling.innerHTML==='3'){a= '3rd'}
    else{a = parseInt(event.target.nextSibling.innerHTML) + 'th'}
    document.getElementById('confirm').children[1].children[0].innerHTML= a
    document.getElementById('confirm').style.animation='';
    document.getElementById('confirm').style.display='block';
    document.getElementById('confirm').style.animation='fade 1200ms linear';
    }

document.getElementById('pin').children[0].onclick = ()=>{
 document.getElementById('album').style.cursor = 'url("./img/pin.png"), auto';
 pinViewer()
 pin();
 deleteViewer();
}

function deleteViewer(){
var deleteImg = document.getElementById('allpinthumb').querySelectorAll('img');
for (const x of deleteImg) {
    if(x.src.includes('delete.png')){
        x.onclick = (e) =>{
            var a = '<img src="./img/pin.png" width="20" data="' + e.target.parentNode.children[2].innerHTML + '" class="pin">';
            console.log(a)
            document.querySelector(`.turn-page.p${e.target.parentNode.children[2].innerHTML}`).innerHTML = document.querySelector(`.turn-page.p${e.target.parentNode.children[2].innerHTML}`).innerHTML.replace(a,'')
            e.target.parentNode.remove();
            for (let i = 0; i < Allpin.length; i++) {
              if( Allpin[i][42] == e.target.parentNode.children[2].innerHTML ){
                Allpin.splice(Allpin.indexOf(Allpin[i]), 1)
              } 
            } 
            updatepin();
        }
    }
}}
setTimeout(()=>{readAllPin();
},500)  
// ///////////////////////////////////////              getting pins from db                /////////////////////////////////////////////////////////////////
  const readAllPin = ()=>{
    const request = window.indexedDB.open('Pinned');
    request.onsuccess = (e) =>{
        const db = e.target.result;
 if(db.objectStoreNames.length>0){
    var objectStore = db.transaction("TotalPins").objectStore("TotalPins");
    objectStore.openCursor().onsuccess = function(event) {
     var cursor = event.target.result; 
     if (cursor) {
         var a = cursor.value
         a.forEach(element => {
             Allpin.push(element)
         });
         for (let i = 0; i < Allpin.length; i++) {
            document.querySelector(`.turn-page.p${Allpin[i][42]}`).innerHTML+= `<img src='./img/pin.png' width='20' data='${Allpin[i][42]}' class='pin'>`
          }
     } 
  }}};
}  

var pgchk =0;
document.body.onclick = ()=>{
    if(pgchk<1){
        var pagechk = setInterval(()=>{
            pgchk++;
            var allpage = document.querySelectorAll('.turn-page-wrapper');
            for (let i = 0; i < allpage.length; i++) {
                if(window.getComputedStyle(allpage[i]).getPropertyValue('z-index')==='5'){   
                 var className =  allpage[i].children[0].children[0].getAttribute('class')  ;
                 var num = parseInt(className[className.length-1]);
                 if(num==1){
                    document.getElementById('r').innerText = 1;
                    document.getElementById('l').innerText = 0;
                 }
                 else{
                    if(num % 2 == 0){
                        document.getElementById('l').innerText = num;
                     }else{
                        document.getElementById('r').innerText = num;
                     }
                 }
                }   
            }
        },900)
        setTimeout(()=>{clearInterval(pagechk);pgchk=0;document.getElementById('pin').children[0].children[0].style.filter = 'invert(1)';
        document.getElementById('pin').children[0].style.backgroundColor = '#021a2f';},4000)
    }else{return;}
    
}
// //////////////////////////  creating Pin store ///////////////////////////////////
// const createPinStore = () =>{
//     const requestP = window.indexedDB.open('Pinned');
//      requestP.onupgradeneeded = (event) => {
//      const db = event.target.result; 
//      var objectStorePin = db.createObjectStore('TotalPins',{ autoIncrement: true});
//      }
// } 
// ///////////////////////////////////////////         setting pin cursor        //////////////////////////////////////////////// 
// var allwrap = document.body.querySelectorAll('.turn-page-wrapper')
// var pin =0;
// const setPin = () =>{
//     if(document.getElementById('album').style.cursor === 'url("./img/pin.png"), auto'){
//         allwrap.forEach(e =>{
//             if(e.innerHTML != ''){
//             if(e.children[0].innerHTML != ''){
//             e.children[0].children[0].addEventListener('click',()=>{
//                 if(e.children[0].children[0].innerHTML.includes('pin.png')== false){
//                     if(pin>0){
//                         var a = e.children[0].children[0].getAttribute('class');
//                         a = a[a.length-1]
//                         e.children[0].children[0].innerHTML+=`<img src='./img/pin.png' width='20' data='${a}' class='pin'>`;
//                         document.getElementById('album').style.cursor = '';
//                         pin=0;
//                         updatePin();
//                         setTimeout(()=>{document.getElementById('allpinthumb').style.display = 'none';},1000)
//                         document.getElementById('allpinthumb').innerHTML = '';
//                         for (let i = 0; i < Allpin.length; i++) {
//                             document.getElementById('allpinthumb').innerHTML += `<span><img src="./img/delete.png" onclick='ClickDeleteForPin()' class='pindelete'><img src="./img/thumb-book-pin.png" alt="" srcset=""><text>${Allpin[i].page}</text></span>`
//                         }
//                         ClickDeleteForPin();
//                     }
//                     return;
//                 }
//                 else{
//                 document.getElementById('album').style.cursor = '';
//                 document.getElementById('allpinthumb').style.display = 'none';pin=0;
//                 return; 
//         }
//     })}}
// })
// }
// }
// setPin();
// 
// const updatePin = () =>{
//  Allpin = [];
//     const pins = document.body.querySelectorAll('.pin');
//     pins.forEach(e => {
//         var b = (e.getAttribute('data'))
//        var a = { page : b }
//        Allpin.push(a)
//     });
//    const request = window.indexedDB.open('Pinned');
//     request.onupgradeneeded = (event) => {
//     const db = event.target.result;  
//     var objectStore = db.createObjectStore('TotalPins',{ autoIncrement: true});   
// }
// request.onsuccess = (e) =>{
//     const db = e.target.result;
// if(db.objectStoreNames.length>0){
// db.transaction('TotalPins', 'readwrite').objectStore("TotalPins").put(Allpin,1)}
// }
// }
// /////////////////////////////                   pin create                  ///////////////////////////////////////   
// document.getElementById('pinImage').addEventListener('click',()=>{
//     if(pin>0){pin=0;
//         document.getElementById('album').style.cursor = '';
//         document.getElementById('allpinthumb').style.display = 'none'
//     }else{
//         document.getElementById('album').style.cursor = 'url(./img/pin.png), auto';
//     document.getElementById('allpinthumb').style.display = 'flex';
//     pin++;
//     setPin();
//     }
//     setTimeout(()=>{ClickCreateForPin();
//         ClickDeleteForPin();},600)
    
//  })
// //////////////// clicking pin image to go that page //////////////

// function ClickCreateForPin(){
// var a = document.getElementById('allpinthumb').children;
// for (let i = 0; i < a.length; i++) {
// a[i].children[1].addEventListener('click',(e)=>{
//     var c = parseInt(e.target.nextElementSibling.innerHTML)
//     $('#album').turn('page',c);
// })
// }
// ClickDeleteForPin();
// }
// //////////////// delete pin //////////////
// function ClickDeleteForPin(){
// var a = document.getElementById('allpinthumb').children;
// for (let i = 0; i < a.length; i++) {
//     a[i].children[0].addEventListener('click',(e)=>{
//         var c = parseInt(e.target.nextSibling.nextSibling.innerHTML)
//         console.log('deleteing')
//         document.body.querySelector(`.turn-page.p${c}`).innerHTML = document.body.querySelector(`.turn-page.p${c}`).innerHTML.replace(`<img src="./img/pin.png" width="20" data="${c}" class="pin">`,'')
//         updatePin();
//         e.target.parentNode.remove();
//         document.getElementById('allpinthumb').innerHTML ='';
//         for (let i = 0; i < Allpin.length; i++) {
//           document.getElementById('allpinthumb').innerHTML += `<span><img src="./img/delete.png" onclick='ClickDeleteForPin()' class='pindelete'><img src="./img/thumb-book-pin.png" alt="" srcset=""><text>${Allpin[i].page}</text></span>`
//          }
//     })
// }
// } 
//   ////////////// setting thumb image and pg no in span ///////////////////
//   document.getElementById('allpinthumb').innerHTML ='';
//   for (let i = 0; i < Allpin.length; i++) {
//     document.getElementById('allpinthumb').innerHTML += `<span><img src="./img/delete.png" onclick='ClickDeleteForPin()' class='pindelete'><img src="./img/thumb-book-pin.png" alt="" srcset=""><text>${Allpin[i].page}</text></span>`
//    }