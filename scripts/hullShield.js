var hull = 8;
var shield = 4;

var hullPt = "<tr id = 'point'><td><img src = '../assets/HullPoint.png' id = 'hull'></td></tr>";
var shieldPt = "<tr id = 'point'><td class = 'fading'><img src = '../assets/ShieldPoint.png' id = 'shield'></td></tr>";

function resetAnimation(animName)
{
    let shaking = document.getElementsByClassName(animName);
    for(let i = 0; i < shaking.length; i++)
    {
        shaking[i].style.animation = 'none';
        shaking[i].offsetHeight; /* trigger reflow */
        shaking[i].style.animation = null; 
    }
}

function playAnimation(element, animName, randomizeDirection = false)
{
    element.addClass(animName);
    if(randomizeDirection)
    {
        element.css("animation-direction", (Math.random() <= 0.5)? "normal" : "reverse");
    }
    else
    {
        element.css("animation-direction", "normal");
    }
    resetAnimation(animName, randomizeDirection);
}

function stopAnimation(element, animName)
{
    element.removeClass(animName);
}

function updateShieldAndHull()
{
    $("table#hull > tbody > tr#point").remove();
    for(let i = 0; i < hull; i++)
    {
        $("table#hull").append(hullPt);
    }

    $("table#shield > tbody > tr#point").remove();
    for(let i = 0; i < shield; i++)
    {
        $("table#shield").append(shieldPt);
    }
}

function dealDamage(damage)
{
    let shieldHurt = $("div#ship > img#shieldHurt");
    let ship = $("div#ship > img#ship");

    if(damage <= shield)
    {
        shieldHurt.css("filter", `hue-rotate(${(4 - shield) / 4 * -120}deg)`)
        playAnimation(shieldHurt, "shake", true);
        playAnimation($("table#shield"), "shake", true);
        shield -= damage;
        updateShieldAndHull();
        if(shield <= 1)
        {
            playAnimation($("table#shield"), "shaking");
        }
        if(shield <= 0)
        {
            stopAnimation($("table#shield"), "shaking");
            stopAnimation($("table#shield"), "shake", true);
            $("table#shield").css("opacity", "50%");
        }
        shieldHurt.fadeIn(50);
        shieldHurt.fadeOut(100);
    }
    else
    {
        damage -= shield;
        hull -= damage;
        playAnimation($("table#hull"), "shake", true);

        playAnimation(ship, "shake");
        updateShieldAndHull();
        if(hull <= 3)
        {
            playAnimation($("table#hull"), "shaking");
        }
        if(hull <= 0)
        {
            stopAnimation($("table#hull"), "shaking");
            stopAnimation($("table#hull"), "shake", true);
            $("table#hull").css("opacity", "50%");
            // Yew fokin ded m8
        }
    }
}

$(document).ready(function()
{
    updateShieldAndHull();
    $("div#ship > img#shieldHurt").hide();

    $("body").click(function(){dealDamage(1)})
})