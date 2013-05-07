AngularJS-MemoryGame
====================

Directive to build a memory game based on AngularJS

Instructions
------------
### Input ###
- **columms** *integer*
- **lines** *integer*
- **tiles-src** *list of comma-separated filenames, files are located in `img/memory-game/`*
- **tile-width** *integer*
- **tile-height** *integer*

###Example###
  	<memory-game columns="3" lines="2" tiles-src="[sci_fi-48.png, sheep-48.png, fork-48.png]" tile-width="48" tile-height="48"></memory-game>

###Output###
- `memoryGameCompleteEvent` is emitted to parent scope when game is complete.