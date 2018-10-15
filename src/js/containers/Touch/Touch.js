import { getClosest } from '../../helpers/Helpers';
import { isPresent } from '../../handlers/errors/ErrorHandlers';

class Touch {
    constructor(config = {}) {
        isPresent([
            { name: '[Config Object]', property: Object.keys(config).length },
            { name: '[Touch Container Node]', property: config.hasOwnProperty('root') },
            { name: '[Touch Element Identifier]', property: config.hasOwnProperty('selector') }
        ]);

        this.config = config;
        this.state = {
            touchStart: 0,
            targetElement: null
        }

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.removeTarget = this.removeTarget.bind(this);

        this.render();
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    start(event) {
        this.setState({ targetElement : getClosest(event.target, this.config.selector) });
        
        if(this.state.targetElement) {
            
            this.setState({ touchStart:  Math.floor(event.touches[0].pageX) });
            this.state.targetElement.classList.add('u-touched');
        }
    }

    move(event) {
        if(this.state.targetElement) {
            const slide = Math.floor(event.touches[0].pageX) - this.state.touchStart;
            this.state.targetElement.style.transform = `translate3d( ${slide + 10 }px,0,0)`;
        }
    }

    end() {
        if(this.state.targetElement) {
            const elementLeft = Math.floor(this.state.targetElement.getBoundingClientRect().left);
            const elementRight = Math.floor(this.state.targetElement.getBoundingClientRect().right)
            this.state.targetElement.classList.remove('u-touched');

            if(elementLeft > Math.floor(elementRight / 4)) {
                this.state.targetElement.style.transform = `translate3d(100vw,0,0)`;
                this.state.targetElement.style.height = `${ this.state.targetElement.offsetHeight }px`
                this.state.targetElement.addEventListener('transitionend', this.removeTarget);
            } else {
                this.state.targetElement.style.transform = `translate3d(0,0,0)`;
            }
        }

    }
    
    removeTarget(event) {
        if(event.propertyName === 'transform'){
            this.state.targetElement.style.height = '0';
            this.state.targetElement.style.margin = '0';
            this.state.targetElement.style.padding = '0';
        }

        if(event.propertyName === 'height') {
            this.state.targetElement.remove();
        }
    }

    render() {
        this.config.root.addEventListener('touchstart', this.start);
        this.config.root.addEventListener('touchmove', this.move);
        this.config.root.addEventListener('touchend', this.end);
    }
}

export default Touch;