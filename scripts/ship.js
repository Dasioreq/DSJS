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

    assign(crewMemberId, lock = false) {
        for(let i = 0; i < crew.length; i++) {
            if(crew[i].id == crewMemberId) {
                if(crew[i].type == this.crewType) {
                    crew[i].assign(lock);
                    this.assignedCrew.push(crew[i]);
                    crew[i].render(this.element);
                    this.onAssign(this.assignedCrew);
                    selectedId = -1;
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
        new Room(CrewType.ENGINEERING, function(assignedCrew) { hull = clamp(hull + (assignedCrew.length > 1? 2 : 1), 0, 8); updateShieldAndHull(); }, false, $("div#ship > div#repair")),
    ]

    $("body").mousemove(function(event)
    {
        xDistance = event.pageX - ($("div#ship").offset().left + $("div#ship").width() * 0.5);
        yDistance = event.pageY - ($("div#ship").offset().top + $("div#ship").height() * 0.5);
        $("div#ship").css({"transform": `translate(${-xDistance / $(window).width() * 5 + 50}%, ${-yDistance / $(window).height() * 5 - 50}%`});
    })

    $("div#ship > div#crew").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipCrew.png")
    })
    $("div#ship > div#crew").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#fire").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipFire.png")
    })
    $("div#ship > div#fire").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#infirmary").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipInfirmary.png")
    })
    $("div#ship > div#infirmary").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#recharge").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipRecharge.png")
    })
    $("div#ship > div#recharge").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#repair").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipRepair.png")
    })
    $("div#ship > div#repair").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })
})