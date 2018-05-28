import '../sass/index.scss';

import InfiniteMessenger from './containers/InfiniteMessenger/InfiniteMessenger';
import * as keys from './components/API/Keys';

// Set up new infinite messenger with config
const messenger = new InfiniteMessenger({
    endpoint: keys.MESSAGES_ENDPOINT,
    limit: 20,
    root: document.getElementById('app-messenger')
});

console.log(messenger);

const dock = document.createElement('div');
dock.setAttribute('id', 'dock');
const body = document.getElementsByTagName('body');
body[0].appendChild(dock);

// https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
const getClosest = (elem, selector) => {

    // Get the closest matching element
    for( ; elem && elem !== document; elem = elem.parentNode){ 

        if(elem.matches( selector )) {
            return elem;
        }
    }
    return null;
}

const root = document.getElementById('app-messenger');
root.addEventListener('touchstart', (event) => {
    const article = getClosest(event.target, '.message');

    if(article){
        article.classList.add('u-touched');
        console.log('[Touch Start]', article);
        dock.innerHTML =  `Start At: ${Math.floor(event.touches[0].pageX)}`;
    }
})

root.addEventListener('touchend', (event) => {
    const article = getClosest(event.target, '.message');
    if(article) {
        article.classList.remove('u-touched');
        console.log('[Touch End]', article);
        dock.innerHTML =  `End At: ${Math.floor(event.changedTouches[0].pageX)}`;
    }
})

root.addEventListener('touchmove', (event) => {
    const article = getClosest(event.target, '.message');
    if(article) {
        //console.log('[Touch Move Event]', event)
        console.log('[Touch Move]', article);
        dock.innerHTML =  `Move: ${Math.floor(event.touches[0].pageX)}`;
    }
})


console.log(root);