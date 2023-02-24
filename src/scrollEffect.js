import createMap from "./createMap";

export default function makeScrollEffect() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }

    observeElem('.card.animate__animated', null, animateLeftRight);
    observeElem('h2.animate__animated', 'animate__lightSpeedInLeft');
    observeElem('form.animate__animated', 'animate__fadeInRight');
    observeElem('.video-box.animate__animated', 'animate__fadeInLeft'); 
    observeElem('.map.animate__animated', 'animate__fadeInRight'); 
    
    function observeElem(selector, animateClass, callback) {
        const observer = new IntersectionObserver((entries, observer) => {      
            entries.forEach((entry, index) => {         
                if (entry.isIntersecting) {       
                    if (callback) {
                        callback(entry.target, index)
                    } else {
                        entry.target.classList.add(animateClass)
                        if (entry.target.classList.contains('map')) {
                            createMap();
                        }
                    }          
                                    
                    observer.unobserve(entry.target)
                }
            })
        }, options)
    
        document.querySelectorAll(selector).forEach(elem => {
            observer.observe(elem)
        })    
    }

    function animateLeftRight(elem, index) {
        if((index + 1) % 2 === 0) {
            elem.classList.add('animate__fadeInRight')
        } else {
            elem.classList.add('animate__fadeInLeft')
        }   
    }
}