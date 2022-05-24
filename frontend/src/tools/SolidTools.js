export function cleanWebId(id, loc) {
    id = id.split('/')
    return id[0] + '//' + id[2] + '/' + id[3] + '/' + loc
}