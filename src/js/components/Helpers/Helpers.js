// https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
export const getClosest = (elem, selector) => {

    // Get the closest matching element
    for( ; elem && elem !== document; elem = elem.parentNode){ 

        if(elem.matches( selector )) {
            return elem;
        }
    }
    return null;
}