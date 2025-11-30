const data = {
    "ships": [
        {
            name: "Fighter",
            health: 1,
            effect: function() { dealDamage(1);},
            activity: [2, 4],
            imgPath: "../assets/threats/ships/Fighter.png",
            qnt: 2,
            weight: 0,
            top: 46.85
        },
        {
            name: "Destroyer",
            health: 2,
            effect: function() { dealDamage(3);},
            activity: [1, 3],
            imgPath: "../assets/threats/ships/Destroyer.png",
            qnt: 1,
            weight: 0,
            top: 48.28
        },
        {
            name: "Space Pirates",
            health: 2,
            effect: function() { dealDamage(2);},
            activity: [1, 3],
            imgPath: "../assets/threats/ships/Space Pirates.png",
            qnt: 1,
            weight: 0,
            top: 49.71
        },
        {
            name: "Space Pirates",
            health: 2,
            effect: function() { dealDamage(2);},
            activity: [3, 6],
            imgPath: "../assets/threats/ships/Space Pirates.png",
            qnt: 1,
            weight: 0,
            top: 49.71
        },
        {
            name: "Corsair",
            health: 2,
            effect: function() { dealDamage(2);},
            activity: [4, 5, 6],
            imgPath: "../assets/threats/ships/Corsair.png",
            qnt: 2,
            weight: 0,
            top: 45.42
        },
        {
            name: "Raiders",
            health: 2,
            effect: function() { dealDamage(1, true);},
            activity: [4, 6],
            imgPath: "../assets/threats/ships/Raiders.png",
            qnt: 1,
            weight: 0,
            top: 47.42
        },
        {
            name: "Raiders",
            health: 2,
            effect: function() { dealDamage(1, true);},
            activity: [1, 4],
            imgPath: "../assets/threats/ships/Raiders.png",
            qnt: 1,
            weight: 0,
            top: 47.42
        },
        {
            name: "Strike Bomber",
            health: 2,
            effect: function() { dealDamage(1); sendUnitToInfirmary()},
            activity: [2, 4],
            imgPath: "../assets/threats/ships/Strike Bomber.png",
            qnt: 1,
            weight: 0,
            top: 42.85
        },
        {
            name: "Strike Bomber",
            health: 2,
            effect: function() { dealDamage(1); sendUnitToInfirmary()},
            activity: [3, 4],
            imgPath: "../assets/threats/ships/Strike Bomber.png",
            qnt: 1,
            weight: 0,
            top: 42.85
        },
        {
            name: "Mercenary",
            health: 3,
            effect: function() { if(!threatsActivated) dealDamage(2) },
            activity: [1, 2, 3, 4, 5, 6],
            imgPath: "../assets/threats/ships/Mercenary.png",
            qnt: 1,
            weight: 1,
            top: 110
        },
        {
            name: "Interceptor",
            health: 3,
            effect: function() { dealDamage(1) },
            activity: [1, 2, 3, 4, 5],
            imgPath: "../assets/threats/ships/Interceptor.png",
            qnt: 2,
            weight: 0,
            top: 50
        }
    ],
    "internal": [
        {
            name: "Time warp",
            crewRequired: 2,
            crewType: CrewType.SCIENCE,
            effect: function() {
                for(let i = 0; i < activeThreats.length; i++) {
                    if(activeThreats[i].health) {
                        activeThreats[i].health = Math.min(activeThreats[i].maxHealth, activeThreats[i].health + 1);
                    }
                }
            },
            activity: [2],
            imgPath: "../assets/threats/internal/Time_warp.png",
            qnt: 1,
            weight: 0,
            top: 46.85
        },
        {
            name: "Invaders",
            crewRequired: 2,
            crewType: CrewType.TACTICAL,
            effect: function() { sendUnitToInfirmary() },
            activity: [2, 4],
            imgPath: "../assets/threats/internal/Invaders.png",
            qnt: 1,
            weight: 0,
            top: 46.85
        },
        {
            name: "Pandemic",
            crewRequired: 1,
            crewType: CrewType.MEDICAL,
            effect: function() { sendUnitToInfirmary() },
            activity: [1],
            imgPath: "../assets/threats/internal/Pandemic.png",
            qnt: 1,
            weight: 0,
            top: 46.85
        },
        {
            name: "Robot uprising",
            crewRequired: 1,
            crewType: CrewType.ENGINEERING,
            effect: function() { sendUnitToInfirmary() },
            activity: [1, 2, 3],
            imgPath: "../assets/threats/internal/Robot_uprising.png",
            qnt: 1,
            weight: 0,
            top: 46.85
        },
        {
            name: "Acid burn",
            crewRequired: 1,
            crewType: CrewType.MEDICAL,
            effect: function() { dealDamage(1) },
            activity: [1, 2, 3, 4, 5],
            imgPath: "../assets/threats/internal/Acid_burn.png",
            qnt: 2,
            weight: 0,
            top: 46.85
        },
    ]
}

function setup() {
    for(let i = 0; i < data["ships"].length; i++) {
        let shipData = data["ships"][i];
        for(let j = 0; j < shipData["qnt"]; j++) {
            threats.push(new Threat(
                shipData["name"],
                shipData["health"],
                shipData["effect"],
                shipData["activity"],
                shipData["weight"],
                shipData["imgPath"],
                shipData["top"]
            ));
        }
    }

    for(let i = 0; i < data["internal"].length; i++) {
        let shipData = data["internal"][i];
        for(let j = 0; j < shipData["qnt"]; j++) {
            threats.push(new ExternalThreat(
                shipData["name"],
                shipData["crewRequired"],
                shipData["crewType"],
                shipData["effect"],
                shipData["activity"],
                shipData["imgPath"],
                shipData["top"]
            ));
        }
    }

    let buff = []
    while(threats.length) {
        let index = Math.floor(Math.random() * threats.length);
        buff.push(threats[index]);
        threats.splice(index, 1);
    }
    threats = buff;
    // threats.push(new ExternalThreat("Test", 2, CrewType.SCIENCE, function() {
    //     for(let i = 0; i < activeThreats.length; i++) {
    //         if(activeThreats[i].health) {
    //             activeThreats[i].health = Math.min(activeThreats[i].maxHealth, activeThreats[i].health + 1);
    //         }
    //     }
    // }, [2], "../assets/threats/internal/Time_warp.png", 46.85));
    $("div#threatDeck > p#threatCnt").html(threats.length);
}

function pullThreat() {
    if(!threats.length) {
        return;
    }
    let threat = threats.pop();
    activeThreats.push(threat);
    threat.deploy($("div#threats"));
    $("div#threatDeck > p#threatCnt").html(threats.length);
    
    for(let i = 0; i < activeThreats.length - 1; i++) {
        for(let j = i; j < activeThreats.length - 1; j++) {
            if(activeThreats[j].weight > activeThreats[j + 1].weight) {
                let buffer = activeThreats[j];
                activeThreats[j] = activeThreats[j + 1];
                activeThreats[j + 1] = buffer;
            }
        }
    }
}

$("document").ready(function() {
    setup();
})
