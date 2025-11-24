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
        let el = $(`
<div class = "threat-ship" id = "${this.id}">
    <img id = "ship" src = "${this.imgPath}">                       
    <p id = "hp">${this.health}</p></div>
        `);

        for(let i = 1; i <= 6; i++) {
            if(this.activity.includes(i)) {
                $(el).append(`<img class = "activity" src = "../assets/threats/ships/activity1.svg" style = "left: ${40 + 4 * (i - 1)}%; top: ${this.top}%">`);
            }
            else {
                $(el).append(`<img class = "activity" src = "../assets/threats/ships/activity0.svg" style = "left: ${40 + 4 * (i - 1)}%; top: ${this.top}%">`);
            }
        }

        let self = this;
        $(el).click(async function() {
            if(gameState == GameState.ATTACK_THREAT) {
                self.dealDamage((rooms[1].assignedCrew.length > 1)? 2 : 1);
                await new Promise(r => setTimeout(r, 1000));
                closeThreatMenu();
                for(let i = 0; i < 6; i++) {
                    if(!crew[i].assigned) {
                        gameState = GameState.ASSIGN_CREW;
                        return;
                    }
                }
                gameState = GameState.ACTIVATE_THREATS;
                update();
            }
        })

        moveElement𝐹𝒶𝒷𝓊𝓁𝑜𝓊𝓈𝓁𝓎(el, $(`div#${this.id}.threat-ship`), element);

        this.deployed = true;
    }

    activate(activity) {
        return new Promise((resolve) => {
            if(this.activity.includes(activity)) {
                const fun = () => {
                    this.effect();
                    threatsActivated = true;
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

    async dealDamage(damage) {
        stopAnimation($("div.threat-ship"), "shake");
        playAnimation($(`div#${this.id}.threat-ship`), "shake", "true");

        if(this.health - damage <= 0) {
            this.health = 0;
            $(`div#${this.id}.threat-ship > p`).html(this.health);
            await new Promise(r => setTimeout(r, 1000));
            $(`div#${this.id}.threat-ship`).remove();
            this.deployed = false;
        }
        else {
            this.health -= damage;
        }

        $(`div#${this.id}.threat-ship > p`).html(this.health);
    }
}

var threats = []
var activeThreats = []

async function activateThreats() {
    return new Promise(async (resolve) => {
        let activity = Math.floor(Math.random() * 6 + 1);
        console.log(activity);
        console.log(`div#threats > div#activity-monitor > img#${activity}`, $(`div#threats > div#activity-monitor > img#${activity}`).length);
        $(`div#threats > div#activity-monitor > img`).attr("src", "../assets/threats/ships/activity0.svg");
        $(`div#threats > div#activity-monitor > img#a${activity}`).attr("src", "../assets/threats/ships/activity1.svg");
        stopAnimation($(`div#threats > div#activity-monitor > img`), "blinking");
        playAnimation($(`div#threats > div#activity-monitor > img#a${activity}`), "blinking");
        await new Promise(r => setTimeout(r, 1000));
        for(let i = 0; i < activeThreats.length; i++)
        {
            await activeThreats[i].activate(activity);
        }
        await new Promise(r => setTimeout(r, 1000));
        stopAnimation($(`div#threats > div#activity-monitor > img`), "blinking");
        resolve();
    })
    
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
    
})