'use strict'
const hangmanArr = require('./hangmanRender')

class Hangman {
  constructor () {
    this.inquirer = require('inquirer')
    this.userName = ''
    this.wordToGuessArr = ['sweden', 'norway', 'denmark', 'finland']
    this.wordToGuess = ''
    this.counter = undefined
    this.timesGuessedWrong = 0
    this.maxGuesses = 8
    this.totalGuesses = 0
    this.gamestarted = undefined
    this.wordArr = []
    this.highscoreArr = []
  }

  mainMenu () {
    this.gamestarted = false
    this.counter = 0
    this.timesGuessedWrong = 0
    this.totalGuesses = 0
    console.log('Hi, welcome to a game of Hangman!')
    this.inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'Do you want to play?',
      choices: [
        'Play game',
        'Quit game'
      ]
    })
      .then(answers => {
        if (this.shouldGameStart(answers.menu)) {
          this.gamestarted = true
          this.startGame()
        } else {
          this.quitGame()
        }
      })
  }

  shouldGameStart (menuItem) {
    if (menuItem === 'Play game') {
      return true
    } else {
      return false
    }
  }

  startGame () {
    this.wordArr = []
    this.wordToGuess = this.wordToGuessArr[Math.floor(Math.random() * this.wordToGuessArr.length)]
    this.createLinesForWord(this.wordToGuess, this.wordArr)
    this.inquirer.prompt({
      type: 'name',
      name: 'username',
      message: 'Enter your name',
      validate: function (value, key) {
        if (value) {
          return true
        } else {
          return 'Enter a name'
        }
      }
    }
    )
      .then((value) => {
        this.userName = value.username
        console.log(`Welcome ${this.userName}`)
        console.log('The word is a northen Europe country')
        console.log(this.wordArr.join(' '))
        this.guessALetter()
      })
  }

  createLinesForWord (wordToGuess) {
    for (let i = 0; i < wordToGuess.length; i++) {
      this.wordArr.push('_')
    }
  }

  guessALetter () {
    this.inquirer.prompt({
      type: 'input',
      name: 'letter',
      message: 'Guess a letter. To quit, write "quit" and press enter',
      validate: function (value) {
        if (value) {
          return true
        } else {
          return 'Enter a letter'
        }
      }
    })
      .then(answers => {
        if (answers.letter === 'quit') {
          this.reallyQuit()
        } else {
          if (this.wordArr.includes('_') && this.timesGuessedWrong < 7) {
            if (this.checkLetter(answers.letter, this.wordToGuess)) {
              this.counter++
              this.printOutWord(answers.letter, this.wordToGuess)
              if (!this.wordArr.includes('_')) {
                this.gamestarted = false
                console.log('You won!')
                this.addToHighscore(this.userName, this.totalGuesses)
                this.playAgain()
              } else {
                this.guessALetter()
              }
            } else {
              if (this.checkWrongGuesses(this.timesGuessedWrong, this.maxGuesses)) {
                this.printOutWord(answers.letter, this.wordToGuess)
                this.guessALetter()
              }
            }
          } else {
            if (!this.wordArr.includes('_')) {
              this.gamestarted = false
              console.log('You won!')
              this.addToHighscore(this.userName, this.totalGuesses)
              this.playAgain()
            } else {
              this.gamestarted = false
              console.log(hangmanArr[this.timesGuessedWrong])
              console.log('You lost...')
              this.playAgain()
            }
          }
        }
      })
  }

  checkLetter (letter, wordToGuess) {
    this.totalGuesses++
    if (wordToGuess.includes(letter)) {
      if (this.wordArr.includes(letter)) {
        return false
      }
      return true
    } else {
      return false
    }
  }

  printOutWord (letter, wordToGuess) {
    for (let i = 0; i < wordToGuess.length; i++) {
      if (letter === wordToGuess[i]) {
        this.wordArr[i] = wordToGuess[i]
      }
    }
    console.log(this.wordArr.join(' '))
  }

  checkWrongGuesses (numberOfWrongGuesses, maxGuesses) {
    if (numberOfWrongGuesses === (maxGuesses)) {
      console.log(hangmanArr[this.timesGuessedWrong])
      this.timesGuessedWrong++
      console.log(`${maxGuesses - this.timesGuessedWrong} time remaining to guess`)
      return true
    } else if (numberOfWrongGuesses < (maxGuesses)) {
      console.log(hangmanArr[this.timesGuessedWrong])
      this.timesGuessedWrong++
      console.log(`${maxGuesses - this.timesGuessedWrong} times remaining to guess`)
      return true
    } else {
      return false
    }
  }

  addToHighscore (username, tries) {
    if (tries > 2) {
      this.highscoreArr.push([tries, username])
      this.sortAndPrintHighscore()
      return true
    } else { return false }
  }

  sortAndPrintHighscore () {
    if (this.highscoreArr.length > 1) {
      this.highscoreArr.sort(function (a, b) {
        return a[0] - b[0]
      })
    }
    console.log('####### Scoreboard #######')
    for (let i = 0; i < this.highscoreArr.length; i++) {
      console.log('#' + (i + 1) + ' Player: ' + this.highscoreArr[i][1] + ' Score: ' + this.highscoreArr[i][0])
    }
    console.log('##########################')
  }

  playAgain () {
    this.inquirer.prompt({
      type: 'confirm',
      name: 'restart',
      message: 'Do you want to play again?',
      default: 'true'
    })
      .then(answers => {
        if (this.shouldPlayAgain(answers.restart)) {
          if (this.gamestarted === true) {
            this.guessALetter()
          } else {
            this.mainMenu()
          }
        } else { this.quitGame() }
      })
  }

  reallyQuit () {
    this.inquirer.prompt({
      type: 'confirm',
      name: 'restart',
      message: 'Do you want to exit and go to main menu?',
      default: 'false'
    })
      .then(answers => {
        if (!this.shouldPlayAgain(answers.restart)) {
          this.guessALetter()
        } else { this.quitGame() }
      })
  }

  shouldPlayAgain (boolean) {
    if (boolean) {
      return true
    } else {
      return false
    }
  }

  quitGame () {
    this.inquirer.prompt({
      type: 'confirm',
      name: 'quitgame',
      message: 'Do you want to quit the game?',
      default: 'false'
    })
      .then(answers => {
        if (answers.quitgame === false) {
          this.mainMenu()
        } else { console.log('Quitting game...') }
      })
  }
}

module.exports = Hangman