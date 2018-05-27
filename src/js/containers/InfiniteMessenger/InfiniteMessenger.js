import { getPayload } from '../../components/API/Payload';
import { isPresent } from '../../components/ErrorHandlers/ErrorHandlers';
import messageCollection from '../../components/Messages/Messages';
import watchWindowBottom from '../../components/EventScroll/EventScroll';

class InfiniteMessenger {
    constructor(config){
        // Set config values
        this.config = config;

        // Set initial state
        this.state = {
            messages: [],
            messagesUI: [],
            pageToken: null,
            loading: false
        }

        // Check if config is set up properly
        isPresent([
            { name: '[Config Endpoint]', property: this.config.endpoint },
            { name: '[Config Limit]', property: this.config.limit },
            { name: '[Config Root]', property: this.config.root }
        ])

        // Get, set and render first page of messages
        getPayload(`${this.config.endpoint}?limit=${this.config.limit}`)
            .then(this.setMessages.bind(this))
            .then(this.render.bind(this));

        this.addNewPage = this.addNewPage.bind(this);
    }

    // Sets state of container
    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log('[New State]', this.state);
    }

    // Set state messages
    setMessages(data) {
        this.setState({ 
            messages: [...data.messages],
            pageToken: data.pageToken
        })
    }

    // Get next page of messages and set state
    async getNextPage(token) {
        try {
            const payload = await getPayload(`${this.config.endpoint}?limit=${this.config.limit}&pageToken="${token}"`)
            this.setMessages(payload);

            return this.state.messages;
        } catch(error) {
            return error;
        }
    }

    addNewPage(){
        if(!this.state.loading){
            this.setState({ loading : true });
            
            this.getNextPage(this.state.pageToken)
                .then(response => {
                    this.config.root.appendChild(this.addMessageBlock(response));
                    this.setState({ loading : false });
                });
        }
    }

    // Set state for messages UI
    buildMessageUI(messages) {
        this.setState({ messagesUI : [...messageCollection(messages)] })
        return this.state.messagesUI.join('');
    }

    // Render block in viewport
    addMessageBlock(messages) {
        const section = document.createElement('section');
        section.setAttribute('class', 'app-messenger__block');
        section.innerHTML = this.buildMessageUI(messages);

        return section;
    }

    render() {
        
        this.config.root.appendChild(this.addMessageBlock(this.state.messages));
        watchWindowBottom(this.addNewPage);
    }
}

export default InfiniteMessenger;