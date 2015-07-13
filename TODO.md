TODO:
=====


BUGS!!
------

1.) On my Windows box at AHA, loading the page fails to apply styles at all.

No background color, no border, no anything.  If the CSS is changed in DevTools
on Chrome, all the styles suddenly get applied and the page looks as expected.

Javascript is still being applied, as notes can be dragged and dropped.
However, clicking a note makes them all jump to different locations on the
page.  It looks like the Y position (vertical) is the only dimension that
changes.  This persists, and indeed gets worse after the styles are somehow
triggered by DevTools (the vertical jump becomes greater in magnitude.)


FEATURES
--------

* STACKS!  This is a very natural way to group these things that look like
    note cards.  Each note in a stack:
      -- shares an identical/similar color
      -- can be grouped into a visual stack when collapsed.
      -- When expanded, the color can indicate the relationship.  (Or visual
      lines connecting them, for colorblind accessibility)
      -- The undo stack can be a regular stack, sized down and in a corner or
      something.

* Allow changing fonts

* When re-focusing a note, place cursor at end of text[1]

* Preserve newlines within notes over save/load

* Revamp undo button look-and-feel


A DIFFERENT WAY TO GROUP NOTES
==============================
Maybe have all the notes on a page at once comprise a single group.  A
drop-down or something can bear the name, which is editable.  This would allow
working with just the notes in a group, and easily switching between groups.


TO MAYBE DO:
============

* Style notes to look more like scraps of notebook paper or post-its?

* [1]Change notes from div to textarea?

* See how much jQuery I can factor out?
