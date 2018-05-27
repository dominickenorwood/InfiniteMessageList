import messageHead from './Head/Head';
import messageBody from './Body/Body';

const messageCollection = messages => {
    return messages.map(message => {
        return (
            `<article class="message" data-messageid="${ message.id }">
                ${ messageHead({ 
                name: message.author.name, 
                photoUrl: message.author.photoUrl, 
                updated: message.updated 
            }) }
                ${ messageBody(message.content) }
            </article>`
        )
    })
}

export default messageCollection;