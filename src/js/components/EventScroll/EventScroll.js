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
            windowRelativeBottom = Math.floor(document.documentElement.getBoundingClientRect().bottom);
            windowElementClientHeight = Math.floor(document.documentElement.clientHeight);
            
            // Check the distance of the HTML node relative to the bottom of the window
            if(windowRelativeBottom / 2 > windowElementClientHeight) {
                return;
            }
            return dispatch();
        }
    }, 250)
}

export default watchWindowBottom;