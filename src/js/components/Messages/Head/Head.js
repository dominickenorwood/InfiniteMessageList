import * as keys from '../../../api/Keys';
import { formatTime } from '../../../helpers/Helpers';

const messageHead = author => {
    const formattedDate = formatTime(author.updated)

    return (
        `<header class="message__header">
            <figure class="message__author-avatar">
                <img src="${keys.MESSAGES_ORIGIN}${author.photoUrl}" class="message__image">
            </figure>
            <div class="message__author">
                <h3 class="message__author-name">${ author.name }</h3>
                <time class="message__post-time">${ formattedDate.month } ${ formattedDate.day}, ${formattedDate.year} ~ ${formattedDate.time}</time>
            </div>
        </header>`
    )
}

export default messageHead;