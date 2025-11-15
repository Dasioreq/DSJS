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
        playAnimation($(`div.threat-ship#${this.id}`), "fire");
        if(this.activity.includes(activity)) {
            this.effect();
        }
    }

    dealDamage(damage) {
        if(this.health - damage <= 0) {
            this.health = 0;
            $(`div.threat-ship#${this.id}`).remove();
            this.deployed = false;
        }
        else {
            this.health -= damage;
        }

        $(`div.threat-ship#${this.id} > p#hp`).html(this.health);
        playAnimation($(`div.threat-ship#${this.id}`), "shake", "true");
    }
}

var threats = []
var activeThreats = []

$("document").ready(function() { 
    $("div#threats").mouseleave(function(){
        $("div#threats-tab").animate({right: '0'}, 200);
        $(this).animate({width: '0vw'}, 200);
    })

    $("div#threats-tab").mouseenter(function(){
        if(!$(this).is(":animated"))
        {
            $("div#threats").animate({width: '15vw'}, 200);
            $(this).animate({right: '15vw'}, 200);
        }
    })
})