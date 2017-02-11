
function getPointerX(obj, e) {

    var tam = obj.offsetWidth;
    var difference = obj.offsetLeft;
    var realPoint = e.clientX - difference;

    return realPoint;
}

function getPorcentage(inicial, total) {

    var x = total / 100;
    x =  inicial / x;

    return x;
}

function setPorcentage(inicial, total) {

    var x = total * inicial;
    x = x / 100;

    return x;
}

function gettime(time_) {

    var minutes = parseInt(time_ / 60);
    var hour = parseInt(minutes / 60);
    minutes = minutes % 60;
    var segunds = parseInt(time_ % 60);

    if (segunds.toString().length == 1) {
        segunds = "0" + segunds;
    }

    if (minutes.toString().length == 1) {
        minutes = "0" + minutes;
    }

    if (hour.toString().length == 1) {
        hour = "0" + hour;
    }

    return  hour + ":" + minutes + ":" + segunds;
}


module.exports.getPointerX = getPointerX;
module.exports.getPorcentage = getPorcentage;
module.exports.setPorcentage = setPorcentage;
module.exports.gettime = gettime;