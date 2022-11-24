export const getShortestAddress = function (address) {
    return address.replace(/(.{3})(.*)(.{2})/, "$1...$3")
}