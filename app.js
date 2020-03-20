'use strict'
require('events').EventEmitter.prototype._maxListeners = 50

const Hangman = require('./lib/hangman')

const newHangman = new Hangman()
newHangman.mainMenu()
