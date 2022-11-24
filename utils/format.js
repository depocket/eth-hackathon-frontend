export const getShortestAddress = function (address) {
    return address.replace(/(.{3})(.*)(.{2})/, "$1...$3")
}

export const classNames = function(...classes) {
    return classes.filter(Boolean).join(' ')
}