import { getPayload } from '../../api/Payload';
import { isPresent } from '../../handlers/errors/ErrorHandlers';
import messageCollection from '../../components/Messages/Messages';
import watchWindowBottom from '../../handlers/events/EventScroll';
import Touch from '../Touch/Touch';

class InfiniteMessenger {
    constructor(config = {}) {
        isPresent([
            { name: '[Config Object]', property: Object.keys(config).length },
            { name: '[API Endpoint]', property: config.hasOwnProperty('endpoint') },
            { name: '[Payload Limit]', property: config.hasOwnProperty('limit') },
            { name: '[Bootstrap Root Node]', property: config.hasOwnProperty('root') },
            { name: '[Loading Node]', property: config.hasOwnProperty('loader') }
        ]);

        this.config = config;
        this.state = {
            messages: [],
            messagesUI: [],
            pageToken: null,
            loading: true
        }

        getPayload(`${this.config.endpoint}?limit=${this.config.limit}`)
            .then(response => {
                this.setMessages(response);
                this.setState({ loading : false });
                this.showOrHideLoader();
            })
            .then(this.render.bind(this));

        this.addNewPage = this.addNewPage.bind(this);
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    setMessages(data) {
        this.setState({ 
            messages: [...data.messages],
            pageToken: data.pageToken
        })
    }

    async getNextPage(token) {
        try {
            const payload = await getPayload(`${this.config.endpoint}?limit=${this.config.limit}&pageToken="${token}"`)
            this.setMessages(payload);

            return this.state.messages;
        } catch(error) {
            console.log('getNextPage() Error: ', error);
            return [];
        }
    }

    addNewPage(){
        if(!this.state.loading){
            this.setState({ loading : true });
            this.showOrHideLoader();
            
            this.getNextPage(this.state.pageToken)
                .then(response => {
                    this.config.root.append(this.addMessageBlock(response));
                    this.setState({ loading : false });
                    this.showOrHideLoader();
                });
        }
    }

    buildMessageUI(messages) {
        this.setState({ messagesUI : [...messageCollection(messages)] })
        return this.state.messagesUI.join('');
    }

    addMessageBlock(messages) {
        const section = document.createElement('section');
        section.setAttribute('class', 'app-messenger__block');
        section.innerHTML = this.buildMessageUI(messages);

        return section;
    }

    showOrHideLoader() {
        if(!this.state.loading){
            this.config.loader.classList.add('u-disappear')
        } else {
            this.config.loader.classList.remove('u-disappear')
        }
    }

    render() {
        /*
        Config Requirements:
            root: Element that will listen to touch events,
            selector: Class of elements that will slide when touched
        */
        const touch = new Touch({ // eslint-disable-line no-unused-vars
            root: this.config.root,
            selector: '.message'
        });
        
        this.config.root.append(this.addMessageBlock(this.state.messages));
        watchWindowBottom(this.addNewPage);
    }
}

export default InfiniteMessenger;