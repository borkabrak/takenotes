function putNote(x,y){
    console.log("%s,%s", x, y);
    var note = $(document.createElement("div")).
        addClass("note").
        css("left", x + "px").
        css("top", y + "px");

    $("#board").append(note);
    note[0].setAttribute("contentEditable", "true");
    note[0].focus();
};

$(function(){
    $("#board").on("click", function(event){
        if (event.target.classList.contains("note")) return false;
        var x = event.clientX,
            y = event.clientY;
        putNote(event.clientX, event.clientY);
    });
});
