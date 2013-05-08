AngularJS-MemoryGame
====================

Directive to build a memory game based on AngularJS

Instructions
------------
### Input ###
- **columms** *integer*
- **lines** *integer*
- **tiles-dir** *directory where tiles images are located (example: `img/`)*
- **tiles-src** *list of comma-separated images filenames*
- **tile-width** *integer*
- **tile-height** *integer*

###Example###
  	<memory-game
      columns="3"
      lines="2"
      tiles-dir="./img/"
      tiles-src="[sci_fi-48.png, sheep-48.png, fork-48.png]"
      tile-width="48"
      tile-height="48">
    </memory-game>

###Output###
- `memoryGameUnmatchedPairEvent` when player picks **unmatched** pair.
- `memoryGameMatchedPairEvent` when player picks **matched** pair.
- `memoryGameCompletedEvent` when game is **completed**.