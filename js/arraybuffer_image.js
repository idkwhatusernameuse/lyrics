// Thank you kind stranger: https://gist.github.com/harun/825eb53168a3ed9ec4e51de3ecba0801
export function convertArrayBufferToImage(data) {
    var arrayBufferView = new Uint8Array(data)
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } )
    var urlCreator = window.URL || window.webkitURL
    var imageUrl = urlCreator.createObjectURL( blob )
    return imageUrl
}