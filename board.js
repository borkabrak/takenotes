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

function load(notes) {
    // Load a particular note list.  Handle input as json or object

    $(".note").remove();
    notes = (typeof notes === "string") ? JSON.parse(notes) : notes;
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

    // Get notes to show.  If none saved, use a default set
    var notes = (localStorage['notes'] && localStorage['notes'].length > 2) ? localStorage['notes'] : JSON.stringify([
        {
            "text":"Click on the board to add new notes.",
            "x":31,
            "y":133
        },

        {
            "text":"Shift-click a note to remove it.",
            "x":309,
            "y":133
        },
        {
            "text":"Drag notes around wherever you want them.",
            "x":586,
            "y":133
        },
        {
            "text":"Notes are automatically loaded and saved for you behind the scenes.",
            "x":860,
            "y":133
        }
    ]);

    // Autoload
    var autoload = setTimeout(function(){load(notes)}, 500);

    // autosave periodically
    var autosave = setInterval(function(){ save() }, 500);
});
