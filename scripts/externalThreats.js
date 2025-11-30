class ExternalThreat {
    constructor(name, crewRequired, crewType, effect, activity, imgPath, top = 50) {
        this.id = idCache;
        idCache++;
        this.name = name;
        this.crewRequired = crewRequired;
        this.effect = effect;
        this.activity = activity;
        this.imgPath = imgPath;
        this.deployed = false;
        this.top = top;

        this.element = $(`
<div class = "threat-external" id = "${this.id}">
    <img id = "ship" src = "${this.imgPath}">                       
</div>
        `);

        for(let i = 1; i <= 6; i++) {
            if(this.activity.includes(i)) {
                $(this.element).append(`<img class = "activity" src = "../assets/threats/ships/activity1.svg" style = "left: ${40 + 4 * (i - 1)}%; top: ${this.top}%">`);
            }
            else {
                $(this.element).append(`<img class = "activity" src = "../assets/threats/ships/activity0.svg" style = "left: ${40 + 4 * (i - 1)}%; top: ${this.top}%">`);
            }
        }

        let self = this;

        this.room = new Room(crewType, function(me) {
            if(me.assignedCrew.length >= self.crewRequired) {
                for(let i = 0; i < me.assignedCrew.length; i = 0) {
                    infirmary.assign(me.assignedCrew.pop().id);
                }
                for(let i = 0; i < activeThreats.length; i++) {
                    if(activeThreats[i].id == self.id) {
                        activeThreats.splice(i, 1);
                    }
                }
                self.element.remove();
            }
        }, true, this.element);
    }

    deploy(element) {
        moveElement𝐹𝒶𝒷𝓊𝓁𝑜𝓊𝓈𝓁𝓎(this.element, $(`div#${this.id}.threat-external`), element);
        this.deployed = true;
    }

    activate(activity) {
        return new Promise((resolve) => {
            if(this.activity.includes(activity)) {
                const fun = () => {
                    this.effect();
                    stopAnimation($(`div#${this.id}.threat-external`), "fire");
                    resolve();
                }
                playAnimation($(`div#${this.id}.threat-external`), "fire");
                $(`div#${this.id}.threat-external`).one("animationend", fun);
            }
            else {
                resolve();
            }
        })
        
    }
}

$("document").ready(function() {
    
})