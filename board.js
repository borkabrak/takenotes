'use strict';

function getNotes(){
    // return notes to show.  If none saved, use a default set
    return (localStorage['notes'] && localStorage['notes'].length > 2) ? localStorage['notes'] : JSON.stringify([
            {"text":"This is a note.  You can edit it, you can drag it around and you can shift-click to delete it.","x":23,"y":113},
            {"text":"Click any empty spot to create a new note.","x":137,"y":234},
            {"text":"Notes are automatically preserved for you between page visits.","x":320,"y":284},
    ]);
}

function addNote(note){
    //Handle input as object or JSON
    if (typeof note === 'string') note = JSON.parse(note);

    var note = $(document.createElement("div")).
        addClass("note").
        css("left", note.x + "px").
        css("top", note.y + "px").
        attr("contentEditable", "true").
        text(note.text);

        $("#board").append(note);
        note.draggable();
        note.focus();
        return note;
};

function removeNote(note){
    localStorage['deleted'] = JSON.stringify({
        x: parseInt($(note).css("left")),
        y: parseInt($(note).css("top")),
        text: $(note).text()
    });

    $(note).remove();

}

function undoRemoveNote(){
    // Re-add the last deleted note
    if (localStorage['deleted']) {
        addNote(localStorage['deleted']);
        delete localStorage['deleted'];
    }
}

function load(notes) {
    // Load a particular note list.  Handle input as json or object
    $(".note").remove();

    if (typeof notes === "string") {
        notes = JSON.parse(notes)
    } else {
        notes;
    }

    notes.forEach(function(note){
        addNote(note);
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

function setHeight(){
    $('#board').css("height", (window.innerHeight * 0.8) + "px");
};

$(function(){

    // Clicking makes a new note
    $(document).on("click", '#board', function(event){
        addNote({x: event.clientX, y: event.clientY});
    });

    $(window).on('resize', function(event){
        setHeight();
    });

    $(document).on('dragstart', '.note', function(event){
        $(event.target).addClass("raised");
    });

    $(document).on('mousedown', '.note', function(event){
        // Shift-click removes notes
        if (event.shiftKey) {
            removeNote($(event.target));
        }

        // Move element to front
        $(event.target).parent().append(event.target);

        event.target.focus();
        event.stopPropagation();

    });

    $(document).on('click', '#undo', function(event){
        undoRemoveNote();
    });

    $(document).on('dragstop', '.note', function(event){
        $(event.target).removeClass("raised");
    });

    // Autoload
    var autoload = setTimeout(function(){ load(getNotes()) }, 500);

    // autosave periodically
    var autosave = setInterval(function(){ save() }, 500);

    setHeight();
});
