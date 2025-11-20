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
            for(let i = 0; i < crew.length; i++) {
                if(crew[i].type == CrewType.THREAT_D) {
                    selectedId = crew[i].id;
                    rooms[5].assign(selectedId);
                }
            }
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