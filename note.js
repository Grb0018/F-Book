


 /////////////////// Note Delete /////////////////////
 document.body.querySelector('note').children[1].addEventListener('click',(e)=>{
    console.log(e.target.parentNode.getAttribute('n'))
     var result = confirm("Want to delete this Note ?");
     if (result) {
        console.log(e.target.parentNode.getAttribute('n'))
       var a = document.body.getElementsByClassName(e.target.parentNode.getAttribute('n'))[0].children;
       for (let i = 0; i < a.length; i++) {
        if(a[i].getAttribute('class') ==='note'){
            a[i].remove();
        }
       }
        document.body.querySelector('note').style.display = 'none';
        NoteClickEvent();
        allNote();
        
}
 })
 /////////////////// Note Information Update /////////////////////

 document.body.querySelector('note').children[0].addEventListener('click',()=>{
    var allchild = document.getElementsByClassName(document.body.querySelector('note').getAttribute('n'))[0].children;
    for(const x of allchild){
        if(x.src != null){
        if(x.src.includes('note.png')){
            x.setAttribute('data',document.body.querySelector('note').children[2].value)
        }}
    }
        allNote();
   document.body.querySelector('note').style.animation = 'off 300ms linear';
   setTimeout(()=>{document.body.querySelector('note').style.display = 'none';document.body.querySelector('note').style.animation = '';},250) 
  })

///////// note update //////////
  function NoteClickEvent() {
        var allNotes = document.querySelectorAll('.note');
        for (let i = 0; i < allNotes.length; i++) {
            allNotes[i].addEventListener('click',(e)=>{
                document.body.querySelector('note').style.display = 'block';
                document.body.querySelector('note').setAttribute('n',e.target.parentNode.getAttribute('class'))
                document.body.querySelector('note').children[2].value = e.target.getAttribute('data')
                return;
            },false)
            
      }
 };



  var inNoteDiv = ``;

  var setnote= 0;
  var opennote='';
  document.getElementById('Notebtn').children[0].addEventListener('click',()=>{
    var allwrap = document.body.querySelectorAll('.turn-page-wrapper') 
    if(setnote== 1){
        setnote = 0;
        document.getElementById('album').style.cursor='';
        return;
    }
     setnote= 1;
     document.getElementById('album').style.cursor = 'url(./img/note.png), auto';
     var note= document.createElement('div');
     note.setAttribute('style',`position: absolute;height: 150px;left: 40px;width: 200px;background-color: #ffffffc4;backdrop-filter: blur(8px);`);
     note.innerHTML += inNoteDiv;
     allwrap.forEach(e =>{
        if(e.innerHTML!= '' && e.children[0].children[0]!= null ){
            if(e.children[0].children[0].hasAttribute('class')){
         e.children[0].children[0].addEventListener('click',()=>{
             if(setnote== 1){
                 setnote=0;
                
             e.children[0].children[0].innerHTML+=`<img src='./img/note.png' width='20' data='Demo Data' class='note'>`;
             document.getElementById('album').style.cursor = '';
             document.getElementById('Notebtn').children[0].style.filter = 'invert(1)';
             document.getElementById('Notebtn').style.backgroundColor = '#021a2f';
             allNote();
             NoteClickEvent();
             }
         })}
     }})
  })
 /////////////   Taking all note info //////////////////////
 var AllNotes = [];
 const allNote = ()=>{
     AllNotes=[];
     var notes = document.body.querySelectorAll('.note');
     notes.forEach(e => {
         var p = `${e.parentNode.getAttribute('class')}`
         var data = `${e.getAttribute('data')}`
         var a = {'parent' : p,'data' : data}
         AllNotes.push(a)
     });
     const request = window.indexedDB.open('Notes');
 request.onsuccess = (e) =>{
     const db = e.target.result;
 if(db.objectStoreNames.length>0){
 db.transaction('TotalNotes', 'readwrite').objectStore("TotalNotes").put(AllNotes,1)}
 }
 }
 var PutNotes = [];
 const readAll = () =>{
     const request = window.indexedDB.open('Notes');
     request.onsuccess = (e) =>{
         const db = e.target.result;
  if(db.objectStoreNames.length>0){
     //////// getting notes from db ////////////////
        var objectStore = db.transaction("TotalNotes").objectStore("TotalNotes");
        objectStore.openCursor().onsuccess = function(event) {
         var cursor = event.target.result; 
         if (cursor) {
             var a = cursor.value
             a.forEach(element => {
                 PutNotes.push(element)
             });
         } 
      };
  }
 
 else{allNote();}
     }
    }