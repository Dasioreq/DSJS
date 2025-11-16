const GameState = Object.freeze({
    ASSIGN_CREW: Symbol("crew"),
    ACTIVATE_THREATS: Symbol("threats")
})
let gameState = GameState.ACTIVATE_THREATS;

function update() {
    switch(gameState) {
        case GameState.ACTIVATE_THREATS:
            openThreatMenu();
            activateThreats();
        break;
    }
}

$("document").ready(function(){
    update();

    $("body").click(function() {
        activateThreats();
    })
})