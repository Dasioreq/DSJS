var idCache = 0;

class Threat {
    constructor(name, health, effect, activity, imgPath, element) {
        this.id = idCache;
        idCache++;
        this.name = name;
        this.health = health;
        this.effect = effect;
        this.activity = activity;
        
        let el = `
<div class = "threat-ship" id = "${this.id}">
    <img id = "ship" src = "${imgPath}">
    <p id = "hp">${health}</p>
        `;

        for(let i = 1; i <= 6; i++) {
            if(activity.includes(i)) {
                el += `<img class = "activity" src = "../assets/threats/ships/activity1.svg" style = "left: ${40 + 4 * (i - 1)}%">`;
            }
            else {
                el += `<img class = "activity" src = "../assets/threats/ships/activity0.svg" style = "left: ${40 + 4 * (i - 1)}%">`;
            }
        }

        el += "</div>";
        element.append(el);
    }

    activate(activity) {
        console.log(activity);
        if(this.activity.includes(activity)) {
            this.effect();
        }
    }

    dealDamage(damage) {
        if(this.health - damage <= 0) {
            this.health = 0;
            $(`div.threat-ship#${this.id}`).remove();

        }
        else {
            this.health -= damage;
        }

        $(`div.threat-ship#${this.id} > p#hp`).html(this.health);
        playAnimation($(`div.threat-ship#${this.id}`), "shake", "true");
    }
}

$("document").ready(function() { 
    fg1 = new Threat("Fighter", "4", function(){ dealDamage(1); }, [2, 4], "../assets/threats/ships/Fighter.png", $("div#threats"));

    // $("body").click(function() {
    //     let activity = Math.floor(Math.random() * 6 + 1);
    //     $(`div#threats > div#activity-monitor > img`).attr("src", "../assets/threats/ships/activity0.svg");
    //     $(`div#threats > div#activity-monitor > img#${activity}`).attr("src", "../assets/threats/ships/activity1.svg");
    //     fg1.activate(activity);
    // })

    $(`div.threat-ship#0`).click(function() {
        fg1.dealDamage(1);
    }) 

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