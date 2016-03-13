# 7DRL_2016
Enhancements on my entry for the 2016 7 Day Roguelike

The original code for the roguelike is under the 7DRL-END branch of this repository and is sadly non-functional.  I have continued work on this ?DRL to get it to a playable state.

Many pieces of this were ported over from a roguelike experiment that I did in the Atomic-Playground repo.  The original was written in ES6 and simplisticly ported over to TypeScript with a lot of flaws in the implementation.  This version massively reworks many of those systems to be more TypeScript-ey and cleaner, many of the foundational pieces were brought over and rewritten accordingly.

## Requirements / Dependencies
* Atomic Game Engine (http://www.atomicgameengine.com)
* ROT.js ( http://www.rotjs.com) The version in this repo was customized to work with the Atomic Game Engine
* TypeScript compiler ( npm install typescript )

## Features
* 2D with spectacular programmer art!
* demonstrate using multiple scenes with Atomic Game Engine
* utilize a blueprinting system that is used to batch generate a bunch of prefabs that are used.  The blueprints, being text, make it easier to construct entities and then generate the prefabs used in the levels.
* cardinal directional movement via WASD, HJKL (vi), or Arrow keys
* bump a creature to attack it

## Changes since the 7DRL
* fixed up the moving mechanic so that creatures and player can move correctly in turns
* changed the mechanic that triggers events on entities to be async
* ported over the health component from the atomic playground version
