const GameState = Object.freeze({
    NONE: Symbol("none"),
    ASSIGN_CREW: Symbol("crew"),
    CHOOSE_OPTION: Symbol("choose"),
    CHANGE_CREW: Symbol("change"),
    ATTACK_THREAT: Symbol("attack"),
    STASIS_BEAM: Symbol("stasis"),
    ACTIVATE_THREATS: Symbol("threats"),

    next: function(currentState) {
        switch(currentState) {
            case(GameState.NONE):
                return GameState.ASSIGN_CREW;
                break;
            case(GameState.ASSIGN_CREW):
                return this.ACTIVATE_THREATS;
                break;
            case(GameState.CHOOSE_OPTION):
                return GameState.ACTIVATE_THREATS;
                break;
        }
    }
})
let gameState = GameState.NONE;

let threatsActivated = false;

async function update() {
    switch(gameState) {
        case GameState.NONE:
            pullThreat();
            gameState = GameState.ASSIGN_CREW;
            update();
        break;
        case GameState.ASSIGN_CREW:
            if(!threats.length && !activeThreats.length) {
                alert("You win! Now go play something that's actually good, like Deltarune. Or Undertale. Or Fallout. Or Devil May Cry. Or Borderlands. Or Metal Gear Solid. Or Project Zomboid. Or TF2 (both). Or Stardew Valley. Or Hades. Or Half-Life. Or even CS2 for crying out loud.");
            }
            if(crew.every(function(unit) {return unit.locked})) {
                alert("You lost all your crew so you lose. Gettttttttttttt dunked oooonnnnnnnnnnn");
            }
            pullThreat();
            rollCrew();
            openDiceMenu();
        break;
        case GameState.ACTIVATE_THREATS:
            openThreatMenu();
            threatsActivated = false;
            await activateThreats();
            closeThreatMenu();
            gameState = GameState.ASSIGN_CREW;
            update();
        break;
    }
}

$("document").ready(function(){
    update();
})