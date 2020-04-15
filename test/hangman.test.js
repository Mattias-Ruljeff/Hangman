const { describe, it } = require('mocha')
const { assert } = require('chai')

const Hangman = require('../lib/hangman')

const sut = new Hangman()

describe('shouldGameStart', function () {
  let enteredInput = 'Play game'

  it('Should return true if enteredInput is "Play game"', function () {
    assert.isTrue(sut.shouldGameStart(enteredInput))
  })
  it('Should return false if enteredInput is not "Play game"', function () {
    enteredInput = 'Quit'
    assert.isFalse(sut.shouldGameStart(enteredInput))
  })
})

describe('checkLetter', function () {
  let enteredLetter = 'a'
  const givenWordToCheckWith = 'a'

  it('Should return true if enteredLetter is the same as givenLetterToCheckWith', function () {
    assert.isTrue(sut.checkLetter(enteredLetter, givenWordToCheckWith))
  })
  it('Should return false if enteredLetter is not the same as givenLetterToCheckWith', function () {
    enteredLetter = 'b'
    assert.isFalse(sut.checkLetter(enteredLetter, givenWordToCheckWith))
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
  const highscoreArr = []

  it('Should return true if the user has guessed more than 2 times and is added to the highscoreArr.', function () {
    assert.isTrue(sut.addToHighscore(enteredName, numberOfTries, highscoreArr))
    assert.isNotEmpty(highscoreArr)
  })
})
