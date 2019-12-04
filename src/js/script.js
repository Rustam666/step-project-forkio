let burgerMenu = document.querySelector('.burger__menu');
let burgerMenuClosed = document.querySelector('.burger__menu-closed');
let nav = document.querySelector('.navbar__nav');

    burgerMenu.onclick = () => {
        burgerMenu.classList.toggle('active');
        
        nav.classList.toggle('active');
}