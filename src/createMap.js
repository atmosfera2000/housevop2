let createMap = function() {
    const iframe = document.createElement('iframe')
    iframe.src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A82d7a4f3f9ef8fb43c45373fb4e83e7b446bb1b38079564af9ec76ed97338126&amp;source=constructor'
    iframe.style = 'position: absolute; width:100%; height: 100%; border: none; opacity: 0'
    document.querySelector('.map').append(iframe);    
    iframe.onload = function () {
        setTimeout(() => {           
            document.querySelector('.map-loader').classList.add('d-none');
            iframe.style = 'position: absolute; width:100%; height: 100%; border: none; opacity: 1'
        }, 250);
    }
}

export default createMap;