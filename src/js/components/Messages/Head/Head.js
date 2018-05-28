import * as keys from '../../API/Keys';

const messageHead = author => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemer', 'December'];
    const date = new Date(author.updated);
    const updated = `${months[date.getMonth() - 1]}, ${date.getMonth()} ${date.getFullYear()}`;

    return (
        `<header class="message__header">
            <figure class="message__author-avatar">
                <img src="${keys.MESSAGES_ORIGIN}${author.photoUrl}" class="message__image">
            </figure>
            <div class="message__author">
                <h3 class="message__author-name">${ author.name }</h3>
                <time class="message__post-time">${ updated }</time>
            </div>
        </header>`
    )
}

export default messageHead;