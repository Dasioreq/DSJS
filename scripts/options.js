class Option {
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }

    element() {
        let el = $(`
<div class = "option">
    <p>${this.name}</p>
</div>
        `).click(this.callback);

        return el
    }
}

class OptionsMenu {
    constructor(options) {
        this.options = options;
    }

    async query(x, y) {
        return new Promise((resolve) => {
            if(this.options.length <= 0) {
                resolve();
                return;
            }
            if(this.options.length == 1) {
                this.options[0].callback();
                resolve();
                return;
            }
            else {
                let el = $(`<div class = "options-menu"></div>`).hide();
                for(let i = 0; i < this.options.length; i++) {
                    $(el).append(this.options[i].element().click(function() { $(el).slideUp(400, function() { $(el).remove() }); resolve() }));
                }
                $(el).css({position: "absolute", left: x, top: y});
                $("body").append(el);
                $(el).slideDown();
            }
            
        })
    }
}