import { getClosest } from '../../components/Helpers/Helpers';
import { isPresent } from '../../components/ErrorHandlers/ErrorHandlers';

class Touch {
    constructor(config) {
        this.config = config;

        this.state = {
            move : 0,
            elementX: 0,
            touchStart: 0
        }

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);

        this.render();
    }

    // Sets state of container
    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log('[New State]', this.state);
    }

    start(event) {
        const targetElement = getClosest(event.target, this.config.selector);
        if(targetElement) {
            this.setState({ 
                move: 0, 
                elementX: targetElement.getBoundingClientRect().left,
                touchStart:  Math.floor(event.touches[0].pageX)
            });
            targetElement.classList.add('u-touched');
        }
    }

    move(event) {
        const targetElement = getClosest(event.target, this.config.selector);
        if(targetElement) {
            if(Math.floor(event.touches[0].pageX) > this.state.touchStart){
                this.setState({ move: this.state.move += 10 });
            } else {
                this.setState({ move: this.state.move -= 10 });
            }
            targetElement.style.transform = `translate3d(${this.state.elementX + this.state.move}px,0,0)`;
        }
    }

    end(event) {
        const targetElement = getClosest(event.target, this.config.selector);
        if(targetElement) {
            let removeElement = false;
            targetElement.classList.remove('u-touched');

            if(Math.floor(targetElement.getBoundingClientRect().left) > 80) {
                if(!removeElement){
                    removeElement = true;
                    targetElement.style.transform = `translate3d(100vw,0,0)`;
                    targetElement.style.height = `${targetElement.offsetHeight}px`
                    targetElement.addEventListener('transitionend', (event) => {
                        if(event.propertyName === 'transform'){
                            targetElement.style.height = '0';
                            targetElement.style.margin = '0';
                            targetElement.style.padding = '0';
                        }
                    });
                }
            } else {
                targetElement.style.transform = `translate3d(0,0,0)`;
            }
        }
    }

    render() {
        this.config.root.addEventListener('touchstart', this.start);
        this.config.root.addEventListener('touchmove', this.move);
        this.config.root.addEventListener('touchend', this.end);
    }
}


// let move = 0;
// let articleX = 0;
// let touchStart = 0;

// const root = document.getElementById('app-messenger');
// root.addEventListener('touchstart', (event) => {
//     const article = getClosest(event.target, '.message');

//     if(article){
//         move = 0;
//         touchStart = Math.floor(event.touches[0].pageX);
//         articleX = article.getBoundingClientRect().left;
//         article.classList.add('u-touched');
//         //console.log('[Touch Start]', articleX);
//         //dock.innerHTML =  `Start At: ${Math.floor(event.touches[0].pageX)}`;
//     }
// })


// root.addEventListener('touchmove', (event) => {
//     const article = getClosest(event.target, '.message');
//     if(article) {
//         if(Math.floor(event.touches[0].pageX) > touchStart){
//             move += 5;
//         } else {
//             move -= 5;
//         }   
//         //console.log('[Touch Move Event]', event)
//         article.style.transform = `translate3d(${articleX + move}px,0,0)`;
//         //console.log('[Touch Move]', article);
//         //dock.innerHTML =  `Move: ${Math.floor(event.touches[0].pageX)}, count: ${move}`;
//     }
// })

// root.addEventListener('touchend', (event) => {
//     const article = getClosest(event.target, '.message');
//     if(article) {
//         let deleteArticle = false;
//         article.classList.remove('u-touched');
//         //console.log('[Touch End]', article);
//         //dock.innerHTML =  `End At: ${Math.floor(event.changedTouches[0].pageX)}`;
//         if(Math.floor(article.getBoundingClientRect().left) > 50) {
//             if(!deleteArticle){
//                 deleteArticle = true;
//                 article.style.transform = `translate3d(100vw,0,0)`;
//                 article.style.height = `${article.offsetHeight}px`
//                 article.addEventListener('transitionend', (event) => {
//                     if(event.propertyName === 'transform'){
//                         article.style.height = '0';
//                         article.style.margin = '0';
//                         article.style.padding = '0';
//                     }
//                 });
//             }
//         } else {
//             article.style.transform = `translate3d(0,0,0)`;
//         }
//     }
// })

export default Touch;