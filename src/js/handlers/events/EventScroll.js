const watchWindowBottom = dispatch => {
    let scrolling = false;
    let windowRelativeBottom = 10000;
    let windowElementClientHeight = 1000;

    window.addEventListener('scroll', () => {
        scrolling = true;
    });

    setInterval(() => {
        if( scrolling ) {
            scrolling = false;
            windowRelativeBottom = Math.floor(document.documentElement.getBoundingClientRect().bottom); // Document Height
            windowElementClientHeight = Math.floor(document.documentElement.clientHeight); // Viewport Height
            
            if(windowRelativeBottom / 2 > windowElementClientHeight) {
                return;
            }

            return dispatch();
        }
    }, 250)
}

export default watchWindowBottom;