const GameState = Object.freeze({
    NONE: Symbol("none"),
    ASSIGN_CREW: Symbol("crew"),
    CHOOSE_OPTION: Symbol("choose"),
    CHANGE_CREW: Symbol("change"),
    ATTACK_THREAT: Symbol("attack"),
    ACTIVATE_THREATS: Symbol("threats")
})
let gameState = GameState.NONE;

function update() {
    switch(gameState) {
        case GameState.NONE:
            rollCrew();
            gameState = GameState.ASSIGN_CREW;
            update();
        break;
        case GameState.ASSIGN_CREW:
            if(crew.length <= 0) {
                gameState = GameState.ACTIVATE_THREATS;
                break;
            }
            openDiceMenu();
        break;
        case GameState.ACTIVATE_THREATS:
            openThreatMenu();
            activateThreats();
        break;
    }
}

$("document").ready(function(){
    update();
})