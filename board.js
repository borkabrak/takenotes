'use strict';

function setHeight(){
    $('#board').css("height", (window.innerHeight * 0.8) + "px");
}

$(function(){

    // Clicking makes a new note
    $(document).on("click", '#board', function(event){
        Notes.add({x: event.clientX, y: event.clientY});
    });

    // Resize board when window is resized
    $(window).on('resize', function(event){
    });

    // 'Pick up' a note when starting to drag it.
    $(document).on('dragstart', '.note', function(event){
        $(event.target).addClass("raised");
    });

    // When a note is clicked..
    $(document).on('mousedown', '.note', function(event){
        // Shift-click removes notes
        if (event.shiftKey) {
            Notes.destroy($(event.target));
        }

        // Regular click moves note to top, and puts the cursor in it.
        $(event.target).parent().append(event.target);
        event.target.focus();
        event.stopPropagation();

    });

    // Undo button retrieves deleted notes.
    $(document).on('click', 'button#undo', function(event){
        Notes.recover();
    });

    // Re-initialize notes to the initial default
    $(document).on('click', 'button#reset', function(event){
        Notes.reset();
        location.reload();
    });

    // 'Put down' the note when done dragging it.
    $(document).on('dragstop', '.note', function(event){
        $(event.target).removeClass("raised");
    });

    // Load initial notes (perhaps) saved
    var autoload = setTimeout(function(){ Notes.load() }, 500);
    // Start saving notes
    Notes.autoSave();

    // Set the height initially
    setHeight();

    // Set the undo button status
    Notes.updateUndo();

});
