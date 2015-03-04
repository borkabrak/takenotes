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

function load(notelist) {
    // Load a particular note list (if given), or whatever is saved in local
    // storage
    $(".note").remove();
    var notes = JSON.parse(notelist || localStorage["notes"]);
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

    localStorage["notes"] = JSON.stringify(notes);
}

$(function(){

    // Clicking makes a new note
    $(document).on("click", '#board', function(event){

        var x = event.clientX,
            y = event.clientY;
        addNote(event.clientX, event.clientY);

    });

    $(document).on('click', '.note', function(event){

        // Shift-click removes notes
        if (event.shiftKey) {
            $(event.target).remove();
        }
        event.target.focus();
        event.stopPropagation();
    });

    var default_notes = '[{"text":"Click on the board to add new notes.","x":31,"y":133},{"text":"Shift-click a note to remove it.","x":309,"y":134},{"text":"Drag notes around wherever you want them.","x":586,"y":134},{"text":"Notes are automatically loaded and saved for you behind the scenes.","x":860,"y":133}]';

    // Autoload
    var autoload = setTimeout(function(){load((localStorage['notes'].length > 2) ? localStorage['notes'] : default_notes )}, 500);

    // autosave periodically
    var autosave = setInterval(function(){ save() }, 500);
});
