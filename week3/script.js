let Arr=[
    "./src/compositor.png",
    "./src/nissanz2023-1673297639.jpeg",
    "src/pcna22-0942-fine-1661449198.jpg",
    "./src/rolls_royce_phantom_top_10.webp",
]

let leftbutton=document.getElementById('leftButton');
let rightbutton=document.getElementById('rightButton');
let Image=document.querySelector('img');


let index=0;
leftbutton.style.visibility="hidden";
// let next=document.getElementById('next');
// next.innerHTML=.0



leftbutton.addEventListener('click', function(){
    index--;
    if(index<=0){
        //index=Arr.length-1;
        leftbutton.style.visibility="hidden";
    }
    if(index<Arr.length-1){
        rightbutton.style.visibility="visible";
    }
    Image.src=Arr[index];
});

rightbutton.addEventListener('click', function(){
    index++;
    if(index>0){
        leftbutton.style.visibility="visible";
    }
    if(index>=Arr.length-1){
        rightbutton.style.visibility="hidden";
    }
    Image.src=Arr[index];
});

// document.querySelector('body').querySelector('img')
// document.querySelector('img').addEventListener('click', function(){
//     console.log('clicked');
// })