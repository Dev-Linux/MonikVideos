
// variables toggle
var start = true;
var fullscreen = true;

function shortcuteClick(player, obj, icone) {

    obj.addEventListener('click', function() {

        if (start) {

            icone.change('fa-play-circle-o');
            var icon_ = icone.element.style;
            icon_.transition = "1s";
            icon_.opacity = opacity;
            player.pause();
            start = false;

            function thread(icon_) {
                var icon = icon_;
                setTimeout(function() {
                    icon.transition = "1.5s";
                    icon.opacity = "0.0";
                }, 1000);
            }

            thread(icon_);

        } else {

            icone.change('fa-pause-circle-o');
            var icon_ = icone.element.style;
            icon_.transition = "1s";
            icon_.opacity = opacity;
            player.play();
            start = true;

            function thread(icon_) {
                var icon = icon_;
                setTimeout(function() {
                    icon.transition = "1.5s";
                    icon.opacity = "0.0";
                }, 1000);
            }

            thread(icon_);
        }

    }, false);
}


function shortcutedbClick(obj, icone) {

    obj.addEventListener('dblclick', function() {

        if (fullscreen) {

            body.webkitRequestFullScreen();
            fullscreen = false;

        } else {

            document.webkitCancelFullScreen();
            fullscreen = true;
        }

    }, false);
}


function fn(obj) {

    var el = document.querySelector(obj);

    el.changeToggles = true;

    function toggles(event, callback, callback_) {

        el.addEventListener(event, function(e) {

            if (el.changeToggles) {
                callback(e, el ,this);
                el.changeToggles = false;

            } else {
                callback_(e, el, this);
                el.changeToggles = true;
            }
        });
    }

    return new function(){
        el.toggles = toggles;
        return el;
    }
}


function shortTitle(title_) {

    var size = title_.length;

    if (size <= 80) {

        return title_;

    } else {

        title_ = "..." + title_.substring(size - 80, size);
        return title_;
    }

}

String.prototype.replaceAll = function(old, novo) {

    var str_ = this;

    while (str_.search(/#/) != -1) {

        if (str_.search(/#/) != -1) {

            str_ = str_.replace(old, novo);

        } else {
            break;
        }
    }

    return str_;
}


module.exports = fn;
module.exports.shortTitle = shortTitle;
module.exports.shortcuteClick = shortcuteClick;
module.exports.shortcutedbClick = shortcutedbClick;