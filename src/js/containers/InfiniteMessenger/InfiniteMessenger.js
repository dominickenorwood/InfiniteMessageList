import { getPayload } from '../../components/API/Payload';
import { isPresent } from '../../components/ErrorHandlers/ErrorHandlers';
import messageCollection from '../../components/Messages/Messages';
import watchWindowBottom from '../../components/EventScroll/EventScroll';
import Touch from '../Touch/Touch';

class InfiniteMessenger {
    constructor(config) {
        this.config = config;

        this.state = {
            messages: [],
            messagesUI: [],
            pageToken: null,
            loading: true
        }

        isPresent([
            { name: '[Config Endpoint]', property: this.config.endpoint },
            { name: '[Config Limit]', property: this.config.limit },
            { name: '[Config Root]', property: this.config.root },
            { name: '[Config Loader]', property: this.config.loader }
        ])

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
        //console.log('[New State]', this.state);
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
                    this.config.root.appendChild(this.addMessageBlock(response));
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
        const touch = new Touch({
            root: this.config.root,
            selector: '.message'
        });
        
        this.config.root.appendChild(this.addMessageBlock(this.state.messages));
        watchWindowBottom(this.addNewPage);
    }
}

export default InfiniteMessenger;