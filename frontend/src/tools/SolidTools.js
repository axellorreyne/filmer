export function cleanWebId(id, loc) {
    id = id.split('/')
    return id[0] + '//' + id[2] + '/' + id[3] + '/' + loc
}

export function makeId(length) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}