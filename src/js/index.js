import '../sass/index.scss';

import InfiniteMessenger from './containers/InfiniteMessenger/InfiniteMessenger';
import * as keys from './api/Keys';

/*
Config Requirements:
    endpoint: URL of the message feed,
    limit: Number of messages to be fetched (max 100),
    root: DOM element the app will bootstrap to,
    loader: DOM element that acts as app loading message
*/
const messenger = new InfiniteMessenger({ // eslint-disable-line no-unused-vars
    endpoint: keys.MESSAGES_ENDPOINT,
    limit: 20,
    root: document.getElementById('app-messenger'),
    loader: document.getElementById('app-footer')
});



