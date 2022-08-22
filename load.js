
document.getElementById('body').onload = () =>{
    document.getElementById('pre').style.display='none'
} 

setTimeout(()=>{
    const requestP = window.indexedDB.open('Pinned');
    requestP.onupgradeneeded = (event) => {
        const db = event.target.result;  
        var objectStore = db.createObjectStore('TotalPins',{ autoIncrement: true});   
    }
    const request = window.indexedDB.open('HeighLight');
    request.onupgradeneeded = (event) => {
        const db = event.target.result;  
        var objectStore = db.createObjectStore('AllHeighLight',{ autoIncrement: true});   
    }
    const requestN = window.indexedDB.open('Notes');
    requestN.onupgradeneeded = (eventN) => {
    const db = eventN.target.result;  
    var objectStore = db.createObjectStore('TotalNotes',{ autoIncrement: true});
    }
    readAll();
    PutNotes=[];
    /////////  putting notes ///////
    setTimeout(()=>{
        for (let i = 0; i < PutNotes.length; i++) {
            document.getElementsByClassName(PutNotes[i].parent)[0].innerHTML += `<img src="./img/note.png" width="20" data="${PutNotes[i].data}" class="note"></img>`
        }
       setTimeout(()=>{NoteClickEvent()},500) ;
    },1000)
})
var btns = ['Notebtn','pin','pen','erase','clean'];
for (let i = 0; i < btns.length; i++) {
   if( document.getElementById(btns[i]).children[0].tagName ==='SPAN'  ){
    document.getElementById(btns[i]).onclick = (e) =>{
        if(window.getComputedStyle(e.target).getPropertyValue('filter') === 'none'){
            e.target.style.filter = 'invert(1)';
            e.target.parentElement.style.backgroundColor = '#021a2f';
            return;
         }
        if(window.getComputedStyle(e.target).getPropertyValue('filter') === 'invert(1)'){
            console.log(window.getComputedStyle(e.target).getPropertyValue('filter') === 'invert(1)')
            e.target.style.filter = 'none';
            e.target.parentElement.style.backgroundColor = '#e5e5e5';
            return;
         }
    }
   }else{
    document.getElementById(btns[i]).onclick = (e) =>{
        if(e.target.style.filter === 'invert(1)'){
            e.target.style.filter = 'none';
            e.target.parentElement.style.backgroundColor = '#e5e5e5';
         }else{
            e.target.style.filter = 'invert(1)';
            e.target.parentElement.style.backgroundColor = '#021a2f'
         }
    }
   }  
}
