const CrewType = Object.freeze({
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

function moveElement𝐹𝒶𝒷𝓊𝓁𝑜𝓊𝓈𝓁𝓎(newEl, old, newParent) {
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
            newParent.children().last().css({visibility: "visible"});
            old.remove();
        });

    }
    else {
        console.log("b");
        newParent.css({visibility: "visible"})
    }
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

    render(element) {
//         let old = $(this.element);

//         let el = `
// <img src = "../assets/crew/${this.type.description}.png" id = "${this.id}" class = "crewDie">
//         `;

//         element.append(el);


//         if(old.length > 0) {
//             element.children().last().css({visibility: "hidden"});

//             let oldX = old.offset().left;
//             let oldY = old.offset().top;

//             old.prependTo($("body"));
//             old.css({
//                 position: "absolute",
//                 top: oldY,
//                 left: oldX,
//                 zIndex: 999
//             });

//             let targetY = element.children().last().offset().top;
//             let targetX = element.children().last().offset().left;
//             old.animate({top: targetY, left: targetX}, 250, function() {
//                 element.children().last().css({visibility: "visible"});
//                 old.remove();
//             });

//         }
//         else {
//             element.css({visibility: "visible"})
//         }
        moveElement𝐹𝒶𝒷𝓊𝓁𝑜𝓊𝓈𝓁𝓎(`
 <img src = "../assets/crew/${this.type.description}.png" id = "${this.id}" class = "crewDie">
        `, 
            $(this.element), element);

        let self = this;
        $(`img#${this.id}.crewDie`).click(function() {
            if(gameState == GameState.COMMANDER) {

            }
            else if(gameState == GameState.ASSIGN_CREW) {
                if(!self.assigned)
                {
                    selectedId = self.id;
                }
            }
        });

        $(`img#${this.id}.crewDie`).mouseenter(function(event) {
            if(!self.assigned) {
                $(this).css({filter: "brightness(150%)"});
            }
        })

        $(`img#${this.id}.crewDie`).mouseleave(function() {
            $(this).css({filter: "none"});
        })
    }

    removeElement() {
        $(`img#${this.id}.crewDie`).remove()
    }

    assign(lock) {
        this.assigned = true;
        if(lock === Boolean) {
            this.locked = lock;
        }
    }

    return(element) {
        if(!this.locked) {
            $(`img#${this.id}.crewDie`).detach().appendTo(element);
            this.assigned = false;
        }
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

var crew = []

function rollCrew() {
    for(let i = 0; i < 6; i++)
    {
        crew.push(new Crew());
        crew[i].render($("div#crewDice > div#dice"));
    }
}

$("document").ready(function() {
    
})