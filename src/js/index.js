import InfiniteMessenger from './containers/InfiniteMessenger/InfiniteMessenger';
import * as keys from './components/API/Keys';

// Set up new infinite messenger with config
const messenger = new InfiniteMessenger({
    endpoint: keys.MESSAGES_ENDPOINT,
    limit: 20
});
