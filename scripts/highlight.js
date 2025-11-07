function highlight(element, id, color) {
    hl = `<div class = "highlight bouncing" id = "${id}" style = "
        top: ${element.offset().top}px;
        left: ${element.offset().left}px;
        width: ${element.width()}px;
        height: ${element.height()}px;
        outline: 10px solid ${color};
        border-radius: 50px;
    "></div>`

    $("body").append(hl);
}