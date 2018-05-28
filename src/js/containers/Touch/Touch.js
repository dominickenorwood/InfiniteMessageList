import { getClosest } from '../../components/Helpers/Helpers';
import { isPresent } from '../../components/ErrorHandlers/ErrorHandlers';

class Touch {
    constructor(config) {
        this.config = config;

        this.state = {
            move : 0,
            elementX: 0,
            touchStart: 0,
            targetElement: null
        }

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.removeTarget = this.removeTarget.bind(this);

        this.render();
    }

    // Sets state of container
    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log('[New State]', this.state);
    }

    start(event) {
        this.setState({ targetElement : getClosest(event.target, this.config.selector) });

        if(this.state.targetElement) {
            this.setState({ 
                move: 0, 
                elementX: this.state.targetElement.getBoundingClientRect().left,
                touchStart:  Math.floor(event.touches[0].pageX)
            });
            this.state.targetElement.classList.add('u-touched');
        }
    }

    move(event) {
        if(this.state.targetElement) {
            if(Math.floor(event.touches[0].pageX) > this.state.touchStart){
                this.setState({ move: this.state.move += 10 });
            } else {
                this.setState({ move: this.state.move -= 10 });
            }
            this.state.targetElement.style.transform = `translate3d(${this.state.elementX + this.state.move}px,0,0)`;
        }
    }

    end(event) {
        if(this.state.targetElement) {
            let removeElement = false;
            this.state.targetElement.classList.remove('u-touched');

            if(Math.floor(this.state.targetElement.getBoundingClientRect().left) > 80) {
                if(!removeElement){
                    removeElement = true;
                    this.state.targetElement.style.transform = `translate3d(100vw,0,0)`;
                    this.state.targetElement.style.height = `${this.state.targetElement.offsetHeight}px`
                    this.state.targetElement.addEventListener('transitionend', this.removeTarget);
                }
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