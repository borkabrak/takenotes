function putNote(x,y){
    var note = $(document.createElement("div")).
        addClass("note").
        css("left", x + "px").
        css("top", y + "px");

    $("#board").append(note);
    note[0].setAttribute("contentEditable", "true");
    note[0].focus();
    note.draggable();
};

$(function(){

    // Clicking makes a new note
    $("#board").on("click", function(event){

        // If clicking on a note, don't create a new one
        if (event.target.classList.contains("note")) {

            // Shift-click removes notes
            if (event.shiftKey) {
                $(event.target).remove();
            }
            return false;
        };

        var x = event.clientX,
            y = event.clientY;
        putNote(event.clientX, event.clientY);
    });
});
