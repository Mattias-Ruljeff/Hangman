const { describe, it } = require('mocha')
const { assert } = require('chai')

const Hangman = require('../lib/hangman')

const sut = new Hangman()

describe('shouldGameStart', function () {
  it('Should return true if "Play game" is the input', function () {
    assert.isTrue(sut.shouldGameStart('Play game'))
  })
  it('Should return false if any other input than "Play game"', function () {
    assert.isFalse(sut.shouldGameStart('Quit'))
  })
})

describe('checkLetter', function () {
  it('Should return true if the input is the same as the letter in the wordToGuess', function () {
    assert.isTrue(sut.checkLetter('a', 'a'))
  })
  it('Should return false if the input is not the same as the letter in the wordToGuess', function () {
    assert.isFalse(sut.checkLetter('a', 'b'))
  })
})

describe('checkWrongGuesses', function () {
  it('Should return a unicode-hangman and true if if numberOfWrongGuesses is a smaller number than maxGuesses', function () {
    assert.isTrue(sut.checkWrongGuesses(1, 8))
  })
  it('Should return false if numberOfWrongGuesses is a larger number than maxGuesses', function () {
    assert.isFalse(sut.checkWrongGuesses(9, 8))
  })
})

describe('highscore', function () {
  it('Should return with the player in the highscorelist if the player has more then 2 tries.', function () {
    assert.isTrue(sut.addToHighscore('Mats', 3))
  })
})
