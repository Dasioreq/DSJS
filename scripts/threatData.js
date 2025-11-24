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
            effect: function() { dealDamage(1); /*Sent unit to infirmary*/},
            activity: [2, 4],
            imgPath: "../assets/threats/ships/Strike Bomber.png",
            qnt: 1,
            weight: 0,
            top: 42.85
        },
        {
            name: "Strike Bomber",
            health: 2,
            effect: function() { dealDamage(1); /*Sent unit to infirmary*/},
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

    let buff = []
    while(threats.length) {
        let index = Math.floor(Math.random() * threats.length);
        buff.push(threats[index]);
        threats.splice(index, 1);
    }
    threats = buff;
    $("div#threatDeck > p#threatCnt").html(threats.length);
}

function pullThreat() {
    let threat = threats.pop();
    activeThreats.push(threat);
    threat.deploy($("div#threats"));
    $("div#threatDeck > p#threatCnt").html(threats.length);
    activeThreats.sort(function(a, b){b.weight - a.weight})
}

$("document").ready(function() {
    setup();

    pullThreat();
    pullThreat();
})
