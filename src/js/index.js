import InfiniteMessenger from './containers/InfiniteMessenger/InfiniteMessenger';
import * as keys from './components/API/Keys';

// Set up new infinite messenger with config
const messenger = new InfiniteMessenger({
    endpoint: keys.MESSAGES_ENDPOINT,
    limit: 20,
    root: document.getElementById('app-messenger')
});

// https://benmarshall.me/quit-attaching-javascript-handlers-to-scroll-events/
// https://johnresig.com/blog/learning-from-twitter/
// http://javascript.info/onscroll

// let scrolling = false;
// let windowRelativeBottom = 10000;
// let windowElementClientHeight = 0;


// window.addEventListener('scroll', () => {
//     scrolling = true;
// });

// setInterval(() => {
//     if( scrolling ) {
//         scrolling = false;
//         windowRelativeBottom = Math.floor(document.documentElement.getBoundingClientRect().bottom);
//         windowElementClientHeight = Math.floor(document.documentElement.clientHeight);

//         console.log('Window Bottom : ', windowRelativeBottom);
//         console.log('Window Client Height', windowElementClientHeight);

//         if(windowRelativeBottom / 2 > windowElementClientHeight) {
//             return;
//         };

//         console.log('[Message Check]');
//     }
// }, 250)