// let left=document.querySelector(".button-left")
// let right=document.querySelector(".button-right")
// let images=document.querySelector(".images")
// let m =document.querySelectorAll(".m")

// let index=0
// let time 

// function  position() {
//     images.style.left=(index*-100)+"%"
// }
// function add(){
//     if(index>=min.length-1){
//         index=0
//     }else{
//         index++
//     }
// }
// function desc(){
//     if(index <1){
//         index=min.length-1
//     }
//     else{
//         index--
//     }
// }
// function timer(){
//     time=setInterval(()=>{
//         index++
//         desc()
//         add()
//         position()
//     },3000)
// }
// left.addEventListener("click",()=>{
//     desc()
//     position()
//     clearInterval(time)
//     timer()
// })
// right.addEventListener("click",()=>{
//     desc()
//     position()
//     clearInterval(time)
//     timer()
// })
// for(let i=0; i<m.length; i++){
//     m[i].addEventListener("click", ()=>{
//         index=1;
//         position();
//         clearInterval(time)
//         timer()
//     })
// }

const menu = document.querySelector('#mobile-menu')
const menulinks =document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menulinksclassList.toggle('active')
});

timer()
