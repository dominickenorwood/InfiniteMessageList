export const isPresent = (array) => {
    array.forEach(index => {
        if(!index.property){
            throw(`${index.name} is not present.`)
        }
    });
}