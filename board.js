function createNote(x,y){
    var note = $(document.createElement("div")).
        addClass("note").
        css("left", x + "px").
        css("top", y + "px");

    note[0].setAttribute("contentEditable", "true");
    note[0].focus();
    return note;
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
            event.target.focus();
            return false;
        };

        var x = event.clientX,
            y = event.clientY;
        var note = createNote(event.clientX, event.clientY);
        $(event.target).append(note);
        note.draggable();
    });
});
