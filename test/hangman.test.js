const { describe, it } = require('mocha')
const { assert } = require('chai')

const Hangman = require('../lib/hangman')

const sut = new Hangman()

describe('shouldGameStart', function () {
  const enteredInput = 'Play game'

  it('Should return true if enteredInput is "Play game"', function () {
    assert.isTrue(sut.shouldGameStart(enteredInput))
  })
  it('Should return false if enteredInput is not "Play game"', function () {
    const enteredInput = 'Quit'
    assert.isFalse(sut.shouldGameStart(enteredInput))
  })
})

describe('checkLetter', function () {
  let enteredLetter = 'a'
  const givenLetterToCheckWith = 'a'

  it('Should return true if enteredLetter is the same as givenLetterToCheckWith', function () {
    assert.isTrue(sut.checkLetter(enteredLetter, givenLetterToCheckWith))
  })
  it('Should return false if enteredLetter is not the same as givenLetterToCheckWith', function () {
    enteredLetter = 'b'
    assert.isFalse(sut.checkLetter(enteredLetter, givenLetterToCheckWith))
  })
})

describe('checkWrongGuesses', function () {
  let numberOfWrongGuesses = 7
  const maximumNumberOfWrongGuesses = 8

  it('Should return true if numberOfWrongGuesses is a smaller number than maximumNumberOfWrongGuesses', function () {
    assert.isTrue(sut.checkWrongGuesses(numberOfWrongGuesses, maximumNumberOfWrongGuesses))
  })
  it('Should return false if numberOfWrongGuesses is a larger number than maxGuesses', function () {
    numberOfWrongGuesses = 9
    assert.isFalse(sut.checkWrongGuesses(numberOfWrongGuesses, maximumNumberOfWrongGuesses))
  })
})

describe('highscore', function () {
  const enteredName = 'Mats'
  const numberOfTries = 3

  it('Should return true if the player has guessed more than 2 times.', function () {
    assert.isTrue(sut.addToHighscore(enteredName, numberOfTries))
  })
})
