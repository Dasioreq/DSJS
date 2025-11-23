$("document").ready(function() {
    // Main ship
    $("body").mousemove(function(event)
    {
        xDistance = event.pageX - ($("div#ship").offset().left + $("div#ship").width() * 0.5);
        yDistance = event.pageY - ($("div#ship").offset().top + $("div#ship").height() * 0.5);
        $("div#ship").css({"transform": `translate(${-xDistance / $(window).width() * 5 + 50}%, ${-yDistance / $(window).height() * 5 - 50}%`});
    })

    $("div#ship > div#crew").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipCrew.png")
    })
    $("div#ship > div#crew").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#fire").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipFire.png")
    })
    $("div#ship > div#fire").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#infirmary").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipInfirmary.png")
    })
    $("div#ship > div#infirmary").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#recharge").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipRecharge.png")
    })
    $("div#ship > div#recharge").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#repair").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipRepair.png")
    })
    $("div#ship > div#repair").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    // Hull and Shield meters
    $("div#ship > img#shieldHurt").hide();

    $("table#shield").hover(function()
    {
        $("div#ship > img#shieldHurt").fadeIn(100);
        $("div#ship > img#shieldHurt").css("filter", `hue-rotate(${(4 - shield) / 4 * -120}deg)`);
        stopAnimation($("div#ship > img#shieldHurt"), "shake");
        playAnimation($("div#ship > img#shieldHurt"), "fading");
    })

    $("table#shield").mouseleave(function()
    {
        $("div#ship > img#shieldHurt").fadeOut(100);
        stopAnimation($("div#ship > img#shieldHurt"), "fading");
    })

    // Threat menu
    $("div#threats").mouseleave(function(){
        if(gameState != GameState.ACTIVATE_THREATS && gameState != GameState.ATTACK_THREAT)
            closeThreatMenu();
    })

    $("div#threats-tab").mouseenter(function(){
        if(gameState != GameState.ACTIVATE_THREATS && gameState != GameState.ATTACK_THREAT)
            openThreatMenu();
    })
})