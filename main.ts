"use strict";
var require: any;
const read = require("prompt-sync")();

interface Rules {
  winConditions(inputOne: string, inputTwo: string): string;
  printInstructions(): void;
}

interface Judge {
  winner: string;
  checkResult(inputOne: string, inputTwo: string): string;
}

interface Game {
  isGameInProgress: Boolean;
  startGame(): void;
  restartGame(): void;
  quitGame(): void;
}

class Player {
  constructor(private move: string) {}
  getChoice(): string {
    return this.move;
  }
}

class Input {
  private userInput: string;
  constructor() {}

  getUserInput(): string {
    return this.userInput;
  }

  takeUserInput(): void {
    // takes input from user;
  }
}

class RockPaperRules implements Rules {
  constructor() {}
  winConditions(inputOne: string, inputTwo: string): string {
    return "abc";
  }
  printInstructions(): void {
    //print instuctions;
  }
}

class RockPaperJudge implements Judge {
  winner: string;
  constructor() {}
  checkResult(inputOne: string, inputTwo: string): string {
    return "abc";
  }
}

class RockPaperGame implements Game {
  isGameInProgress: Boolean = false;
  constructor() {}
  startGame(): void {
    this.isGameInProgress = true;
    console.log(`hasGameStarted: ${this.isGameInProgress}`);
    // start Game
  }

  restartGame(): void {
    // restart Game
  }

  quitGame(): void {
    this.isGameInProgress = false;
    // quits game and exit
  }
}

let myGame: RockPaperGame = new RockPaperGame();
myGame.startGame();
