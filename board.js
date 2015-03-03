'use strict';

function addNote(x,y, contents){
    // optionally give contents to reload a specific note
    var note = $(document.createElement("div")).
        addClass("note").
        css("left", x + "px").
        css("top", y + "px").
        attr("contentEditable", "true").
        text(contents);

        $("#board").append(note);
        note.draggable();
        note.focus();
};

function load() {
    $(".note").remove();
    var notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach(function(note){
        addNote(note.x, note.y, note.text);
    });
}

function save() {
    var notes = [];
    $(".note").each(function(i, note){
        notes.push({
            text: $(note).text(),
            x: parseInt($(note).css("left")),
            y: parseInt($(note).css("top"))
        });
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

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
        addNote(event.clientX, event.clientY);

    });

    $("button#save").on('click', function(event){ save() });
    $("button#load").on('click', function(event){ load() });

});
