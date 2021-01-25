"use strict";
const read = require("prompt-sync")();

const printString = (str: string) => {
  console.log(str);
};

const debug = (str: string) => {
  // console.log(str);
};

const takeInput = (str: string) => {
  let input: string = read(`${str}`);
  input.trim().toLowerCase();
  return input;
};

const generateRandom = (end: number, start: number = 0): number => {
  return Math.floor(Math.random() * end) + start;
};

type x = string;

interface SolutionType {
  key: x;
  value: x;
}

enum choice {
  rock,
  paper,
  scissors,
  lizard,
  spock,
}

interface Rules {
  printInstructions(): void;
}

interface Judge {
  winner: string;
  checkResult(input1: string, input2: string): void;
  printRules(): void;
  isLegalChoice(userChoice: string): boolean;
}

interface Game {
  isGameInProgress: Boolean;
  startGame(): void;
  quitGame(): void;
}

interface Solution {
  solutionSet: Map<x, x>;
  generateSolutionSet(): void;
  getValueForKey(key: x): x;
}

class Player {
  private score: number;
  constructor(private readonly move: string) {
    this.score = 0;
  }
  getChoice(): string {
    return this.move;
  }
  getScore(): number {
    return this.score;
  }
  incrementScore() {
    this.score += 1;
  }
}

class RockPaperRules implements Rules, Solution {
  solutionSet: Map<x, x>;
  private instructionsArray: Array<string> = [
    "Scissors cuts Paper",
    "Paper covers Rock",
    "Rock crushes Lizard",
    "Lizard poisons Spock",
    "Spock smashes Scissors",
    "Scissors decapitates Lizard",
    "Lizard eats Paper",
    "Paper disproves Spock",
    "Spock vaporizes Rock",
    "Rock crushes Scissors",
  ];
  constructor() {
    this.solutionSet = new Map();
    this.generateSolutionSet();
    this.printMap();
  }

  printMap(): void {
    debug("this is my map..");
    this.solutionSet.forEach((key, value) => {
      debug(`key: ${key} and value: ${value}`);
    });
  }

  generateSolutionSet(): void {
    for (let i in this.instructionsArray) {
      let partial: Array<string> = this.instructionsArray[i]
        .toLowerCase()
        .split(" ");
      let key: x = partial[0] + "," + partial[2];
      let value: x = partial[0] + "," + partial[1];
      this.solutionSet.set(key, value);
      // debug("Setting value1: " + key + " " + value);
      key = partial[2] + "," + partial[0];
      this.solutionSet.set(key, value);
      // debug("Setting value2: " + key + " " + value);
    }
  }

  getValueForKey(key: x): x {
    debug("key to be processed: " + key);
    debug("check if exist: " + this.solutionSet.has(key));
    if (this.solutionSet.has(key)) {
      let value: x = this.solutionSet.get(key);
      debug("returning value: " + value);
      return value;
    }
    return "draw";
  }

  printInstructions(): void {
    printString(
      "\nThis is a 2 player game and you are playing against computer...All the best!"
    );
    for (let i in this.instructionsArray) {
      let partialInstruction: string = this.instructionsArray[i];
      printString(`${i}. ${partialInstruction}`);
    }
    printString("\n** Enter your choice in lower case\n");
  }
}

class RockPaperJudge implements Judge {
  private gameRules: RockPaperRules;
  winner: string;
  constructor() {
    this.gameRules = new RockPaperRules();
  }
  checkResult(input1: string, input2: string): void {
    let answer: x = this.gameRules.getValueForKey(input1 + "," + input2);
    let ans: Array<string> = answer.split(",");
    debug("ans received: " + ans);
    let result: string = "";
    if (ans[0] === input1) {
      result += `\n${ans[0]} ${ans[1]} ${input2} \nCongratulations You Won!`;
    } else if (ans[0] === input2) {
      result += `\n${ans[0]} ${ans[1]} ${input1} \nComputer Won...Better luck next time!`;
    } else {
      result += "\nNobody Wins...Draw!";
    }
    printString(`${result}\n`);
  }

  isLegalChoice(userChoice: string): boolean {
    if (userChoice in choice) {
      return true;
    }
    printString("Please Enter Valid Input..");
    return false;
  }
  printRules(): void {
    this.gameRules.printInstructions();
  }
}

class RockPaperGame implements Game {
  isGameInProgress: boolean = false;
  private gameJudge: RockPaperJudge;

  constructor() {
    this.gameJudge = new RockPaperJudge();
  }

  startGame(): void {
    this.isGameInProgress = true;
    this.gameJudge.printRules();

    let anotherRound = "y";
    while (anotherRound === "y" || anotherRound === "yes") {
      let userInput: string;

      do {
        userInput = takeInput(
          "Enter your choice (rock/paper/scissors/lizard/spock): "
        );
      } while (!this.gameJudge.isLegalChoice(userInput));

      let choiceSize = Object.keys(choice).length / 2;
      let computerInput = choice[generateRandom(choiceSize - 1)];
      printString(
        `\nYour choice is: ${userInput} \nComputer choice is: ${computerInput}`
      );
      this.gameJudge.checkResult(userInput, computerInput);
      anotherRound = takeInput("Play Another Round? (Y/N): ");
    }
    this.quitGame();
  }

  quitGame(): void {
    this.isGameInProgress = false;
  }
}

let myGame: RockPaperGame = new RockPaperGame();
myGame.startGame();
