let btn = document.getElementById('btn');
let inp = document.getElementById('inp');
let box = document.querySelectorAll('.box');
let drag = null;

// تحميل الأحداث المحفوظة من localStorage إذا كانت موجودة
let eventsLog = localStorage.getItem('eventsLog') ? JSON.parse(localStorage.getItem('eventsLog')) : [];

btn.onclick = function(){
    if(inp.value != '' ){
        box[0].innerHTML += `
        <p class="item">${inp.value}<p/>
        `
        inp.value ='';
        // تسجيل حدث إضافة عنصر جديد
        logEvent('New item added');
    }
    drags();
}

function drags(){
    let item = document.querySelectorAll('.item');
    item.forEach(item=>{
        item.addEventListener('touchstart', function(e){
            drag = item;
            e.preventDefault(); // منع السلوك الافتراضي للمتصفح
        })
        item.addEventListener('touchend', function(e){
            drag = null;
        })
        box.forEach(box=>{
            box.addEventListener('touchmove', function(e){
                e.preventDefault(); // منع السلوك الافتراضي للمتصفح
                if (drag) {
                    this.style.background = '#090';
                    this.style.color = '#fff';
                    this.append(drag);
                    // تسجيل حدث إسقاط عنصر
                    logEvent('Item dropped');
                }
            })
            box.addEventListener('touchend', function(){
                this.style.background = '#fff';
                this.style.color = 'black';
            })
        })
    })
}

// إضافة حدث إلى سجل الأحداث
function logEvent(event) {
    eventsLog.push(event);
    localStorage.setItem('eventsLog', JSON.stringify(eventsLog));
}
