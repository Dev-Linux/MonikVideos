
var elements = function(obj) {

    this.element = utils(obj);

    this.fn = {

        'icone_custom': function(w, h, opc) {

            var width_ = w / 3;
            var height_ = h / 3;
            var difference = w / 25;
            var icone = this.element.style;

            icone.fontSize = width_ + 'px';
            icone.width = width_ + 'px';
            icone.height = height_  + 'px';
            icone.marginTop = (height_ / 2)  + 'px';
            icone.marginLeft = (width_ + difference)  + 'px';
            icone.marginRight = (width_ - difference) + 'px';
            icone.opacity = opc;
        },

        'element': this.element,

        'change': function(obj) {
            this.element.className = "fa " + obj + " btn-player";
        },

        'content_custom': function(w, h) {

            var area = this.element.style;

            area.width = w + 'px';
            area.top = 0 + "px";
            area.left = 0 + "px";
            area.heigth = h + 'px';
        },

        'area_custom': function(w, h) {

            var width_ = w;
            var height_ = h / 3;
            var difference = height_ / 3;
            var area = this.element.style;

            area.width = width_ + 'px';
            area.top = (height_ + height_ + difference) + "px";
            area.left = 0 + "px";
            area.height = (height_ - difference) + 'px';


        }
    }

    return this.fn;
}

module.exports = elements;