$(document).ready(function()
{
    $("body").mousemove(function(event)
    {
        xDistance = event.pageX - ($("div#ship").offset().left + $("div#ship").width() * 0.5);
        yDistance = event.pageY - ($("div#ship").offset().top + $("div#ship").height() * 0.5);
        $("div#ship").css({"transform": `translate(${-xDistance / $(window).width() * 5 + 50}%, ${-yDistance / $(window).height() * 5 - 50}%`});
    })

    $("div#ship > div#crew").click(function(event)
    {
        console.log("crew");
    })
    $("div#ship > div#crew").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipCrew.png")
    })
    $("div#ship > div#crew").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#fire").click(function(event)
    {
        console.log("fire");
    })
    $("div#ship > div#fire").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipFire.png")
    })
    $("div#ship > div#fire").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#infirmary").click(function(event)
    {
        console.log("infirmary");
    })
    $("div#ship > div#infirmary").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipInfirmary.png")
    })
    $("div#ship > div#infirmary").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#recharge").click(function(event)
    {
        console.log("recharge");
    })
    $("div#ship > div#recharge").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipRecharge.png")
    })
    $("div#ship > div#recharge").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })

    $("div#ship > div#repair").click(function(event)
    {
        console.log("repair");
    })
    $("div#ship > div#repair").mouseenter(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/ShipRepair.png")
    })
    $("div#ship > div#repair").mouseleave(function(event)
    {
        $("div#ship > img#ship").attr("src", "../assets/Ship.png")
    })
})