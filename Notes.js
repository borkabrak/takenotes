'use strict';

var Notes = {

    "load": function(){

        var notes;

        if (localStorage['notes'] && localStorage['notes'].length > 2) {

            notes = localStorage['notes'];

        } else {

            notes = JSON.stringify([
                {"text":"This is a note.  You can edit it, you can drag it around and you can shift-click to delete it.","x":23,"y":113},
                {"text":"Click any empty spot to create a new note.","x":137,"y":234},
                {"text":"Notes are automatically preserved for you between page visits.","x":320,"y":284},
            ]);

            localStorage['deleted'] = "";
            Notes.updateUndo();

        };

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
    },

    "destroy": function(element){
        localStorage['deleted'] = JSON.stringify({
            x: parseInt($(element).css("left")),
            y: parseInt($(element).css("top")),
            text: $(element).text()
        });

        $(element).remove();

        Notes.updateUndo();
    },

    "recover": function(){
        if (typeof localStorage['deleted'] !== 'undefined') {
            Notes.add(JSON.parse(localStorage['deleted']));
        }

        localStorage['deleted'] = "";
        Notes.updateUndo();
    },

    "updateUndo": function(){
        document.querySelector("button#undo").disabled = 
            (localStorage['deleted'] && localStorage['deleted'].length > 2) ? 
            false :
            true;
    }
}
