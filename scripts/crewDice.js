const CrewType = Object.freeze({
    ANY: Symbol("any"),
    COMMANDER: Symbol("Commander"),
    TACTICAL: Symbol("Tactical"),
    MEDICAL: Symbol("Medical"),
    SCIENCE: Symbol("Science"),
    ENGINEERING: Symbol("Engineering"),
    THREAT_D: Symbol("Threat Detected"),
})

function randomCrewType() {
    switch(Math.floor(Math.random() * 6)) {
        case 0:
            return CrewType.COMMANDER;
        break;
        case 1:
            return CrewType.TACTICAL;
        break;
        case 2:
            return CrewType.MEDICAL;
        break;
        case 3:
            return CrewType.SCIENCE;
        break;
        case 4:
            return CrewType.ENGINEERING;
        break;
        case 5:
            return CrewType.THREAT_D;
        break;
    }
}

var crewIdCache = 0;
var selectedId = -1;

async function moveElement𝐹𝒶𝒷𝓊𝓁𝑜𝓊𝓈𝓁𝓎(newEl, old, newParent) {
    return new Promise((resolve) => {
        newParent.append(newEl);

        if(old.length > 0) {
            newParent.children().last().css({visibility: "hidden"});

            let oldX = old.offset().left;
            let oldY = old.offset().top;

            old.prependTo($("body"));
            old.css({
                position: "absolute",
                top: oldY,
                left: oldX,
                zIndex: 999
            });

            let targetY = newParent.children().last().offset().top;
            let targetX = newParent.children().last().offset().left;
            old.animate({top: targetY, left: targetX}, 250, function() {
                newParent.children().css({visibility: "visible"});
                old.remove();
                resolve();
            });

        }
        else {
            newParent.css({visibility: "visible"})
            resolve();
        }
    })
}

class Crew {
    constructor() {
        this.type = randomCrewType();
        this.locked = false;
        this.assigned = false;
        this.id = crewIdCache;
        crewIdCache++;
        this.element = `img#${this.id}.crewDie`;
    }

    async render(element) {
        await moveElement𝐹𝒶𝒷𝓊𝓁𝑜𝓊𝓈𝓁𝓎(`
 <img src = "../assets/crew/${this.type.description}.png" id = "${this.id}" class = "crewDie">
        `, 
        $(this.element), element);

        let self = this;
        $(this.element).off("click");
        $(this.element).click(async function() {
            if(gameState == GameState.ASSIGN_CREW) {
                if(!self.assigned)
                {
                    for(let i = 0; i < rooms.length; i++) {
                        if(rooms[i].crewType == self.type) {
                            rooms[i].element.addClass("highlight");
                        }
                        else {
                            rooms[i].element.removeClass("highlight");
                        }
                    }
                    selectedId = self.id;
                }
            }
            else if(gameState == GameState.CHANGE_CREW && self.type != CrewType.THREAT_D) {
                await new OptionsMenu([
                    new Option("Commander", function() { self.type = CrewType.COMMANDER; }),
                    new Option("Tactical", function() { self.type = CrewType.TACTICAL; }),
                    new Option("Medical", function() { self.type = CrewType.MEDICAL; }),
                    new Option("Science", function() { self.type = CrewType.SCIENCE; }),
                    new Option("Engineering", function() { self.type = CrewType.ENGINEERING; }),
                ]).query($(this).offset().left, $(this).offset().top + $(this).height());
                $(self.element).attr("src", `../assets/crew/${self.type.description}.png`);

                for(let i = 0; i < crew.length; i++) {
                    if(!crew[i].assigned) {
                        gameState = GameState.ASSIGN_CREW;
                        return;
                    }
                }

                gameState = GameState.next(gameState);
            }
        });

        $(this.element).off("mouseenter");
        $(this.element).mouseenter(function(event) {
            if(!self.assigned) {
                $(this).css({filter: "brightness(150%)"});
                if(selectedId == -1) {
                    for(let i = 0; i < rooms.length; i++) {
                        if(rooms[i].crewType == self.type) {
                            rooms[i].element.addClass("highlight");
                        }
                        else {
                            rooms[i].element.removeClass("highlight");
                        }
                    }
                }
                
            }
        })

        $(this.element).off("mouseleave");
        $(this.element).mouseleave(function() {
            $(this).css({filter: "none"});
            if(selectedId == -1) {
                for(let i = 0; i < rooms.length; i++) {
                    rooms[i].element.removeClass("highlight");
                }
            }
        })
    }

    assign(lock) {
        this.assigned = true;
        for(let i = 0; i < rooms.length; i++) {
            rooms[i].element.removeClass("highlight");
        }
        this.locked = lock;
    }

    reroll() {
        this.type = randomCrewType();
    }
}

function openDiceMenu() {
    $("div#crewDice").animate({left: "0vw"});
}

function closeDiceMenu() {
    $("div#crewDice").animate({left: "-23.6076vw"});
}

var crew = [new Crew(), new Crew(), new Crew(), new Crew(), new Crew(), new Crew()]

function rollCrew() {
    for(let i = 0; i < 6; i++)
    {
        if(!crew[i].locked) {
            crew[i].reroll();
            crew[i].assigned = false;
            crew[i].render($("div#crewDice > div#dice"));
        }
    }

    for(let i = 0; i < rooms.length; i++) {
        if(!rooms[i].lock) {
            rooms[i].assignedCrew = [];
        }
        infirmary.assignedCrew = [];
    }
}

$("document").ready(function() {
    
})