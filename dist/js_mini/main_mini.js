let burgerMenu=document.querySelector(".burger__menu"),burgerMenuClosed=document.querySelector(".burger__menu-closed"),nav=document.querySelector(".navbar__nav");burgerMenu.onclick=(()=>{burgerMenu.classList.toggle("active"),nav.classList.toggle("active")});