function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

class Room {
    constructor(crewType, onAssign, lock, element) {
        this.crewType = crewType;
        this.assignedCrew = [];
        this.onAssign = onAssign;
        this.element = element;
        this.lock = lock

        let self = this;
        this.element.click(function() {
            if(self.crewType != CrewType.ANY) {
                self.assign(selectedId);
            }
        }) 
    }

    async assign(crewMemberId) 
    {
        for(let i = 0; i < crew.length; i++) 
        {
            if(crew[i].id == crewMemberId)
            {
                if(crew[i].type == this.crewType || this.crewType == CrewType.ANY) 
                {
                    if(gameState == GameState.ASSIGN_CREW)
                        selectedId = -1;

                    this.assignedCrew.push(crew[i]);
                    crew[i].assign(this.lock);
                    await crew[i].render(this.element);
                    await this.onAssign(this);

                    if(gameState == GameState.ASSIGN_CREW) {
                        for(let i = 0; i < crew.length; i++)
                        {
                            if(!crew[i].assigned)
                            {
                                return;
                            }
                        }
                        gameState = GameState.next(gameState);
                        closeDiceMenu();
                        update();
                    }
                }
            }
        }
    }
}

let rooms = [];
let infirmary;

function sendUnitToInfirmary() {
    while(true) {
        let index = Math.floor(Math.random() * rooms.length);
        console.log(index);
        if(rooms[index].assignedCrew.length && !rooms[index].lock) {
            infirmary.assign(rooms[index].assignedCrew.pop().id);
            console.log(infirmary.assignedCrew.length);
            return;
        }
    }
}

$(document).ready(function()
{
    infirmary = new Room(CrewType.ANY, function() {}, true, $("div#medic > div#infirmary"));

    rooms = [
        new Room(CrewType.COMMANDER, async function() { 
            for(let i = 0; i < crew.length; i++) {
                if(!crew[i].assigned && crew[i].type != CrewType.THREAT_D) {
                    gameState = GameState.CHANGE_CREW 
                    return;
                }
            }
        }, false, $("div#ship > div#crew")),
        new Room(CrewType.TACTICAL, async function() { 
            if(activeThreats.length) {
                openThreatMenu(); 
                gameState = GameState.ATTACK_THREAT
            } 
        }, false, $("div#ship > div#fire")),
        new Room(CrewType.MEDICAL, async function() { 
            let options = [];
            if(infirmary.assignedCrew.length) {
                options.push(new Option("Return all units from the Infirmary"), function() {
                    for(let i = 0; i < infirmary.assignedCrew.length;) {
                        let unit = infirmary.assignedCrew.pop();
                        unit.locked = false;
                        unit.render($("div#returned-div"));
                    }
                })
            }
            if(rooms[5].assignedCrew.length) {
                options.push(new Option("Decrease threat meter", function() {
                    let scanner = rooms[5].assignedCrew.pop();
                    scanner.locked = false;
                    scanner.render($("div#returned-div"));
                }))
            }
            await new OptionsMenu(options).query($("div#ship > div#infirmary").offset().left, $("div#ship > div#infirmary").offset().top);
        }, false, $("div#ship > div#infirmary")),
        new Room(CrewType.SCIENCE, async function(self) { 
            let options = [new Option("Recharge shields", function() { repairShields(1000) })];
            if(activeThreats.length) {
                options.push(new Option("Stasis beam", function() {
                    openThreatMenu();
                    gameState = GameState.STASIS_BEAM;
                }))
            }
            await new OptionsMenu(options).query($("div#ship > div#recharge").offset().left, $("div#ship > div#recharge").offset().top);
        }, false, $("div#ship > div#recharge")),
        new Room(CrewType.ENGINEERING, async function(self) { hull = clamp(hull + (self.assignedCrew.length > 1? 2 : 1), 0, 8); updateShieldAndHull(); }, false, $("div#ship > div#repair")),

        new Room(CrewType.THREAT_D, async function(self) { 
            if(self.assignedCrew.length >= 3) {
                $("div#scanner").children().css({position: "absolute"});
                $("div#scanner").children().animate({left: "-1000px"});
                for(let i = 0; i < 3; i++) {
                    self.assignedCrew[i].locked = false;
                }
                self.assignedCrew = [];
                pullThreat();
            } 
        }, true, $("div#scanner"))
    ];
})