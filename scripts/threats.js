var idCache = 0;

class Threat {
    constructor(name, health, effect, activity, weight, imgPath, top) {
        this.id = idCache;
        idCache++;
        this.name = name;
        this.health = health;
        this.effect = effect;
        this.activity = activity;
        this.weight = weight;
        this.imgPath = imgPath;
        this.deployed = false;
        this.top = top;
    }

    deploy(element) {
        let el = `
<div class = "threat-ship" id = "${this.id}">
    <img id = "ship" src = "${this.imgPath}">
    <p id = "hp">${this.health}</p>
        `;

        for(let i = 1; i <= 6; i++) {
            if(this.activity.includes(i)) {
                el += `<img class = "activity" src = "../assets/threats/ships/activity1.svg" style = "left: ${40 + 4 * (i - 1)}%; top: ${this.top}%">`;
            }
            else {
                el += `<img class = "activity" src = "../assets/threats/ships/activity0.svg" style = "left: ${40 + 4 * (i - 1)}%; top: ${this.top}%">`;
            }
        }

        el += "</div>";
        element.append(el);

        this.deployed = true;
    }

    activate(activity) {
        return new Promise((resolve) => {
            if(this.activity.includes(activity)) {
                const fun = () => {
                    this.effect();
                    stopAnimation($(`div#${this.id}.threat-ship`), "fire");
                    resolve();
                }
                playAnimation($(`div#${this.id}.threat-ship`), "fire");
                $(`div#${this.id}.threat-ship`).one("animationend", fun);
            }
            else {
                resolve();
            }
        })
        
    }

    dealDamage(damage) {
        if(this.health - damage <= 0) {
            this.health = 0;
            $(`div#${this.id}.threat-ship`).remove();
            this.deployed = false;
        }
        else {
            this.health -= damage;
        }

        $(`div#${this.id}.threat-ship > p#hp`).html(this.health);
        playAnimation($(`div#${this.id}.threat-ship`), "shake", "true");
    }
}

var threats = []
var activeThreats = []

async function activateThreats() {
    let activity = Math.floor(Math.random() * 6 + 1);
    $(`div#threats > div#activity-monitor > img`).attr("src", "../assets/threats/ships/activity0.svg");
    $(`div#threats > div#activity-monitor > img#${activity}`).attr("src", "../assets/threats/ships/activity1.svg");
    stopAnimation($(`div#threats > div#activity-monitor > img`), "blinking");
    playAnimation($(`div#threats > div#activity-monitor > img#${activity}`), "blinking");
    for(let i = 0; i < activeThreats.length; i++)
    {
        await activeThreats[i].activate(activity);
    }
    stopAnimation($(`div#threats > div#activity-monitor > img`), "blinking");
    // $(`div#threats > div#activity-monitor > img`).attr("src", "../assets/threats/ships/activity0.svg");
}

function closeThreatMenu() {
    $("div#threats-tab").animate({right: '0'}, 200);
    $("div#threats").animate({width: '0vw'}, 200);
}

function openThreatMenu() {
    if(!$("div#threats-tab").is(":animated"))
    {
        $("div#threats").animate({width: '15vw'}, 200);
        $("div#threats-tab").animate({right: '15vw'}, 200);
    }
}

$("document").ready(function() { 
    $("div#threats").mouseleave(function(){
        if(gameState != GameState.ACTIVATE_THREATS)
            openThreatMenu();
    })

    $("div#threats-tab").mouseenter(function(){
        if(gameState != GameState.ACTIVATE_THREATS)
            closeThreatMenu();
    })
})