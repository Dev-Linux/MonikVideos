
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

var dataURL = function(video_, x, y, w, h, ext, quality) {

    ctx.width = canvas.width = w;
    ctx.height = canvas.height = h;
    ctx.drawImage(video_, x, y, w, h);
    return canvas.toDataURL('image/'+ ext, quality);
}

var image64 = function(video_, x, y, w, h, ext, quality) {

    ctx.width = canvas.width = w;
    ctx.height = canvas.height = h;
    ctx.drawImage(video_, x, y, w, h);
    return canvas.toDataURL('image/' + ext, quality).replace(/^data:image\/ext;base64,/, '');
}

module.exports.dataURL = dataURL;
module.exports.image64 = image64;