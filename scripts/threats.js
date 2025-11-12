$("document").ready(function(){
    $("div#threats").mouseleave(function(){
        $(this).animate({width: '0vw'}, 200);
        $("div#threats-tab").animate({right: '0'}, 200);
    })

    $("div#threats-tab").mouseenter(function(){
        if(!$(this).is(":animated"))
        {
            $(this).animate({right: '15vw'}, 200);
            $("div#threats").animate({width: '15vw'}, 200);
        }
    })
})