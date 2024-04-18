/* 공통 js */

function toggleMenu() { /* 햄버거 토글기능 넣기 */
    let menu = document.querySelector('.hamburgerMenu');
    menu.classList.toggle('active');

    let dark = document.querySelector('.darkBackground');
    dark.classList.toggle('active');
}



