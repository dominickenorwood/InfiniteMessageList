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


