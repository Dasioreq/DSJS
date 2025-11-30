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
                for(let j = 0; j < crew.length; j++) {
                    if(!crew[j].assigned) {
                        gameState = GameState.ASSIGN_CREW;
                        resolve();
                        return;
                    }
                }
                gameState = GameState.next(gameState);
                update();
                resolve();
                return;
            }
            if(this.options.length == 1) {
                this.options[0].callback();
                for(let j = 0; j < crew.length; j++) {
                    if(!crew[j].assigned) {
                        gameState = GameState.ASSIGN_CREW;
                        resolve();
                        return;
                    }
                }
                gameState = GameState.next(gameState);
                update();
                resolve();
                return;
            }
            else {
                gameState = GameState.CHOOSE_OPTION;
                let el = $(`<div class = "options-menu"></div>`).hide();
                for(let i = 0; i < this.options.length; i++) {
                    let self = this;
                    console.log(this.options[i]);
                    $(el).append(this.options[i].element().click(function() { 
                        $(el).slideUp(400, function() { $(el).remove() }); 
                        for(let j = 0; j < crew.length; j++) {
                            if(!crew[j].assigned) {
                                gameState = GameState.ASSIGN_CREW;
                                self.options[i].callback();
                                resolve();
                                return;
                            }
                        }
                        gameState = GameState.next(gameState);
                        update();
                        self.options[i].callback();
                        resolve();
                    }));
                }
                $(el).css({position: "absolute", left: x, top: y});
                $("body").append(el);
                $(el).slideDown();
            }
            
        })
    }
}