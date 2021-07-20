let button = document.querySelector('.menu-open');
let menu = document.querySelector('.menu');
let lil = document.getElementsByClassName('lil')
let toTop = document.getElementById('idTop')
let header = document.getElementById('top')
let bask = document.getElementsByClassName('all-bask')[0]

button.onclick = function() {
    menu.classList.toggle('show-menu');
    bask.classList.toggle('nab');
    for (let i = 0; i < lil.length; i++) {
        lil[i].classList.toggle('show-lil')
    }
}
// toTop.onclick = function() {
//     header.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//     })
// }
// q1.addEventListener('mouseenter',(e)=>{
//     let child = item[i].getElementsByClassName('order')[0];
//     child.style.display = 'block';
// })
//     <img id="id" src="http://javascript.ru/forum/images/reputation/reputation_plus.gif"
// onclick="ChangeURLPicture()">
//     <script>
// function ChangeURLPicture()
// {
//     abz = document.getElementById("id");
//     if ( abz.src == "http://javascript.ru/forum/images/reputation/reputation_minus.gif")
//     {abz.src = "http://javascript.ru/forum/images/reputation/reputation_plus.gif";}
// else { abz.src ="http://javascript.ru/forum/images/reputation/reputation_minus.gif";}
// }
//
