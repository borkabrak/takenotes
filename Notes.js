'use strict';

var Notes = {

    "load": function(){

        var notes = (localStorage['notes'] && localStorage['notes'].length > 2) ? 
            localStorage['notes'] : 
            JSON.stringify([
                {"text":"This is a note.  You can edit it, you can drag it around and you can shift-click to delete it.","x":23,"y":113},
                {"text":"Click any empty spot to create a new note.","x":137,"y":234},
                {"text":"Notes are automatically preserved for you between page visits.","x":320,"y":284},
            ]);

        // Load a particular note list.  Handle input as json or object
        $(".note").remove();

        if (typeof notes === "string") {
            notes = JSON.parse(notes)
        }

        notes.forEach(function(note){
            Notes.add(note);
        });
    },
    
    "add": function(options){
        if (typeof options === 'string') { options = JSON.parse(options) };

        var note = $(document.createElement("div")).
            addClass("note").
            css("left", options.x + "px").
            css("top", options.y + "px").
            attr("contentEditable", "true").
            text(options.text);

            $("#board").append(note);
            note.draggable();
            note.focus();

        return note;
    },

    "save": function(){
        var notes = [];
        $(".note").each(function(i, note){
            notes.push({
                text: $(note).text(),
                x: parseInt($(note).css("left")),
                y: parseInt($(note).css("top"))
            });
        });

        localStorage["notes"] = JSON.stringify(notes);
        localStorage["deleted"] = JSON.stringify(this.deleted);
    }

}

/*
Notes.prototype.all = function(){
    // Load any saved notes, or a default if none
    return (localStorage['notes'] && localStorage['notes'].length > 2) ? localStorage['notes'] : JSON.stringify([
            {"text":"This is a note.  You can edit it, you can drag it around and you can shift-click to delete it.","x":23,"y":113},
            {"text":"Click any empty spot to create a new note.","x":137,"y":234},
            {"text":"Notes are automatically preserved for you between page visits.","x":320,"y":284},
    ]);
}

Notes.prototype.add = function(options){
    if (typeof options === 'string') { options = JSON.parse(options) };

    var note = $(document.createElement("div")).
        addClass("note").
        css("left", options.x + "px").
        css("top", options.y + "px").
        attr("contentEditable", "true").
        text(options.text);

        $("#board").append(note);
        note.draggable();
        note.focus();

    return note;
}

Notes.prototype.recover = function(){
    var deletedNotes = localStorage['deleted'] ? JSON.parse(localStorage['deleted']) : {};

    document.querySelector("button#undo").disabled =
        (typeof deletedNotes.text === 'undefined') ?  true : false;
}

Notes.prototype.destroy = function(note){
    localStorage['deleted'] = JSON.stringify({
        x: parseInt($(note).css("left")),
        y: parseInt($(note).css("top")),
        text: $(note).text()
    });

    $(note).remove();
    updateUndoStatus();
}

Notes.prototype.undoRemove = function(){
    // Re-add the last deleted note
    if (localStorage['deleted']) {
        addNote(localStorage['deleted']);
        delete localStorage['deleted'];
    }

    updateUndoStatus();
}

Notes.prototype.load = function(notes){
    var my = this;
    // Load a particular note list.  Handle input as json or object
    $(".note").remove();

    if (typeof notes === "string") {
        notes = JSON.parse(notes)
    }

    JSON.parse(this.all()).forEach(function(note){
        my.add(note);
    });
}

Notes.prototype.save = function(){
    var notes = [];
    $(".note").each(function(i, note){
        notes.push({
            text: $(note).text(),
            x: parseInt($(note).css("left")),
            y: parseInt($(note).css("top"))
        });
    });

    localStorage["notes"] = JSON.stringify(notes);
    localStorage["deleted"] = JSON.stringify(this.deleted);
}

*/
