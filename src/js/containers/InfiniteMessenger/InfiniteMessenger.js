import { getPayload } from '../../components/API/Payload';
import { isPresent } from '../../components/ErrorHandlers/ErrorHandlers';

class InfiniteMessenger {
    constructor(config){
        // Set config values
        this.config = config;

        // Set initial state
        this.state = {
            messages: [],
            archive: [],
            nextToken: null
        }

        // Check if config is set up properly
        isPresent([
            { name: '[Config Endpoint]', property: this.config.endpoint },
            { name: '[Config Limit]', property: this.config.limit }
        ])

        // Get, set and render first page of messages
        getPayload(`${this.config.endpoint}?limit=${this.config.limit}`)
            .then(response => {
                this.setMessages(response);
                this.setNextToken(response);            
            })
            .then(this.render.bind(this));

    }

    // Sets state of container
    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log('[New State]', this.state);
    }

    // Set state messages
    setMessages(data) {
        this.setState({ 
            messages: [...this.state.messages, ...data.messages]
        })
    }

    // Set next token so we can retrieve a new page of messages
    setNextToken(data) {
        this.setState({ nextToken: data.pageToken })
    }

    // Get next page of messages and set state
    getNextPage(token) {
        getPayload(`${this.config.endpoint}?limit=${this.config.limit}&pageToken="${token}"`)
            .then(this.setMessages.bind(this));
    }

    render() {
        console.log('[Render]');
        const button = document.getElementById('get-more');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            this.getNextPage(this.state.nextToken);
        })
    }
}

export default InfiniteMessenger;