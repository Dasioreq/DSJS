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
        }
    }
})
let gameState = GameState.NONE;

let threatsActivated = false;

async function update() {
    switch(gameState) {
        case GameState.NONE:
            gameState = GameState.ASSIGN_CREW;
            update();
        break;
        case GameState.ASSIGN_CREW:
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