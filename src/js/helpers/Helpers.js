export const getClosest = (elem, selector) => {

    for( ; elem && elem !== document; elem = elem.parentNode){ 

        if(elem.matches( selector )) {
            return elem;
        }
    }
    return null;
}

export const formatTime = timestamp => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemer', 'December'];
    const now = new Date(Date.parse(timestamp));
    const date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    const time = [now.getHours(), now.getMinutes()];
    const suffix = ( time[0] < 12 ) ? "AM" : "PM";

    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

    time[0] = time[0] || 12;

    if(time[1] < 10){
        time[1] = `0${time[1]}`;
    }

    return {
        month: months[date[0] - 1],
        day: date[1],
        year: date[2],
        time: `${time.join(':')}${suffix}`
    }

}