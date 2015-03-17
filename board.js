'use strict';

function setHeight(){
    $('#board').css("height", (window.innerHeight * 0.8) + "px");
};

$(function(){

    var notes = new Notes($("#board"));

    // Clicking makes a new note
    $(document).on("click", '#board', function(event){
        notes.create({x: event.clientX, y: event.clientY});
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
            notes.destroy($(event.target));
        }

        // Move element to front
        $(event.target).parent().append(event.target);

        event.target.focus();
        event.stopPropagation();

    });

    $(document).on('click', '#undo', function(event){
        notes.recover();
    });

    $(document).on('dragstop', '.note', function(event){
        $(event.target).removeClass("raised");
    });

    // Autoload
    var autoload = setTimeout(function(){ notes.load() }, 500);

    // autosave periodically
    var autosave = setInterval(function(){ notes.save() }, 500);

    setHeight();

});
