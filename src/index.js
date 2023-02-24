import "./style.scss"
import { Collapse, ScrollSpy } from "bootstrap"
import makeScrollEffect from "./scrollEffect";


navbarShrink(null)
window.addEventListener('load', () => setTimeout(init, 100))


function init() {
    const navbarState = {
        shown: false
    }
    
    window.scrollTo(0,0)
   
    document.body.classList.remove('overflow-hidden')
    document.getElementById('content').classList.remove('opacity-0')
    document.getElementById('content').classList.remove('no-transition')

    makeScrollEffect();


    const scrollSpy = new ScrollSpy(document.body, {
        target: '#navbar',
        rootMargin: '0px 0px -60%',
        smoothScroll: true               
    })

    const bsCollapse = new Collapse(document.getElementById('navbarCollapse'), {
        toggle: false
    })

    document.getElementById('navbarCollapse').addEventListener('pointerdown', event => {
        if (event.target.tagName != 'A') return;
        setTimeout(() => bsCollapse.hide(), 200)
    })  
    
    document.getElementById('navbarCollapse').addEventListener('show.bs.collapse', event => {
        document.querySelector('.navbar-toggler').classList.toggle('navbar-toggler_active')    
        document.getElementById('navbar').classList.add('navbar_shadow')
        document.getElementById('navbar').classList.add('navbar_dark')
        navbarState.shown = true
    })

    document.getElementById('navbarCollapse').addEventListener('hide.bs.collapse', event => {
        document.querySelector('.navbar-toggler').classList.toggle('navbar-toggler_active')    
        if (window.pageYOffset === 0) {
            document.getElementById('navbar').classList.remove('navbar_shadow')            
        }
        navbarState.shown = false        
    })

    document.getElementById('navbarCollapse').addEventListener('hidden.bs.collapse', event => {
        if (window.pageYOffset === 0) {
            document.getElementById('navbar').classList.remove('navbar_dark')
        }        
    })    

    document.addEventListener('scroll', () => navbarShrink(navbarState));   
}

function navbarShrink(navbarState) {    
    if (navbarState) {
        if (window.pageYOffset !== 0) {
            document.getElementById('navbar').classList.add('navbar_shadow')
            document.getElementById('navbar').classList.add('navbar_dark')
            document.getElementById('navbar').classList.add('navbar_shrink')       
        } else if (window.pageYOffset === 0 && !navbarState.shown) {
            document.getElementById('navbar').classList.remove('navbar_shadow')
            document.getElementById('navbar').classList.remove('navbar_dark')
            document.getElementById('navbar').classList.remove('navbar_shrink')
        }
    } else {
        if (window.pageYOffset !== 0) {
            document.getElementById('navbar').classList.add('navbar_shadow')
            document.getElementById('navbar').classList.add('navbar_dark')
            document.getElementById('navbar').classList.add('navbar_shrink')       
        } else {
            document.getElementById('navbar').classList.remove('navbar_shadow')
            document.getElementById('navbar').classList.remove('navbar_dark')
            document.getElementById('navbar').classList.remove('navbar_shrink')
        }
    }
}