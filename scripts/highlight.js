`<div class = "highlight">
            <svg style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d = "M 10 10 L 10 50 L 50 90 L 90 90" style = "fill: none; stroke: yellow; stroke-width: 10" vector-effect="non-scaling-stroke"></polyline>
            </svg>
        </div>`

function highlight(id, from, to, red, green, blue)
{
    fromX = from[0];
    fromY = from[1];
    toX = to[0];
    toY = to[1];

    hl = `<div id = "${id}" class = "highlight" style = "
        left: ${Math.min(fromX, toX)}px; 
        top: ${Math.min(fromY, toY)}px; 
        width: ${Math.abs(toX - fromX)}px;
        height: ${Math.abs(toY - fromY)}px;
        transform = scale(${toX > fromX? 1 : -1}, ${toY > fromY? 1 : -1});">
            <svg style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d = "M 10 10 L 10 50 L 50 90 L 90 90" style = "fill: none; stroke: rgb(${red}, ${green}, ${blue}); stroke-width: 10" vector-effect="non-scaling-stroke"></polyline>
            </svg>
        </div>`

    return hl;
}