const GameState = Object.freeze({
    NONE: Symbol("none"),
    ASSIGN_CREW: Symbol("crew"),
    CHOOSE_OPTION: Symbol("choose"),
    CHANGE_CREW: Symbol("change"),
    ATTACK_THREAT: Symbol("attack"),
    ACTIVATE_THREATS: Symbol("threats")
})
let gameState = GameState.NONE;

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