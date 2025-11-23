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
            self.assign(selectedId, lock);
        }) 
    }

    async assign(crewMemberId) 
    {
        for(let i = 0; i < crew.length; i++) 
        {
            if(crew[i].id == crewMemberId)
            {
                if(crew[i].type == this.crewType) 
                {
                    crew[i].assign(this.lock);
                    this.assignedCrew.push(crew[i]);
                    await crew[i].render(this.element);
                    this.onAssign(this);
                    selectedId = -1;
                    for(let i = 0; i < crew.length; i++)
                    {
                        if(!crew[i].assigned)
                        {
                            return;
                        }
                    }
                    gameState = GameState.ACTIVATE_THREATS;
                    closeDiceMenu();
                    update();
                }
            }
        }
    }
}

let rooms = [];

$(document).ready(function()
{
    rooms = [
        new Room(CrewType.COMMANDER, function() { console.log("Commander"); }, false, $("div#ship > div#crew")),
        new Room(CrewType.TACTICAL, function() { console.log("Tactical"); }, false, $("div#ship > div#fire")),
        new Room(CrewType.MEDICAL, function() { console.log("Medical"); }, false, $("div#ship > div#infirmary")),
        new Room(CrewType.SCIENCE, function() { console.log("Science"); }, false, $("div#ship > div#recharge")),
        new Room(CrewType.ENGINEERING, function(self) { hull = clamp(hull + (self.assignedCrew.length > 1? 2 : 1), 0, 8); updateShieldAndHull(); }, false, $("div#ship > div#repair")),

        new Room(CrewType.THREAT_D, function(self) { 
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