"use strict";
var read = require("prompt-sync")();
var printString = function (str) {
    console.log(str);
};
var debug = function (str) {
    // console.log(str);
};
var takeInput = function (str) {
    var input = read("" + str);
    input.trim().toLowerCase();
    return input;
};
var generateRandom = function (end, start) {
    if (start === void 0) { start = 0; }
    return Math.floor(Math.random() * end) + start;
};
var choice;
(function (choice) {
    choice[choice["rock"] = 0] = "rock";
    choice[choice["paper"] = 1] = "paper";
    choice[choice["scissors"] = 2] = "scissors";
    choice[choice["lizard"] = 3] = "lizard";
    choice[choice["spock"] = 4] = "spock";
})(choice || (choice = {}));
var Player = /** @class */ (function () {
    function Player(move) {
        this.move = move;
        this.score = 0;
    }
    Player.prototype.getChoice = function () {
        return this.move;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.incrementScore = function () {
        this.score += 1;
    };
    return Player;
}());
var RockPaperRules = /** @class */ (function () {
    function RockPaperRules() {
        this.instructionsArray = [
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
        this.solutionSet = new Map();
        this.generateSolutionSet();
        this.printMap();
    }
    RockPaperRules.prototype.printMap = function () {
        debug("this is my map..");
        this.solutionSet.forEach(function (key, value) {
            debug("key: " + key + " and value: " + value);
        });
    };
    RockPaperRules.prototype.generateSolutionSet = function () {
        for (var i in this.instructionsArray) {
            var partial = this.instructionsArray[i]
                .toLowerCase()
                .split(" ");
            var key = partial[0] + "," + partial[2];
            var value = partial[0] + "," + partial[1];
            this.solutionSet.set(key, value);
            // debug("Setting value1: " + key + " " + value);
            key = partial[2] + "," + partial[0];
            this.solutionSet.set(key, value);
            // debug("Setting value2: " + key + " " + value);
        }
    };
    RockPaperRules.prototype.getValueForKey = function (key) {
        debug("key to be processed: " + key);
        debug("check if exist: " + this.solutionSet.has(key));
        if (this.solutionSet.has(key)) {
            var value = this.solutionSet.get(key);
            debug("returning value: " + value);
            return value;
        }
        return "draw";
    };
    RockPaperRules.prototype.printInstructions = function () {
        printString("\nThis is a 2 player game and you are playing against computer...All the best!");
        for (var i in this.instructionsArray) {
            var partialInstruction = this.instructionsArray[i];
            printString(i + ". " + partialInstruction);
        }
        printString("\n** Enter your choice in lower case\n");
    };
    return RockPaperRules;
}());
var RockPaperJudge = /** @class */ (function () {
    function RockPaperJudge() {
        this.gameRules = new RockPaperRules();
    }
    RockPaperJudge.prototype.checkResult = function (input1, input2) {
        var answer = this.gameRules.getValueForKey(input1 + "," + input2);
        var ans = answer.split(",");
        debug("ans received: " + ans);
        var result = "";
        if (ans[0] === input1) {
            result += "\n" + ans[0] + " " + ans[1] + " " + input2 + " \nCongratulations You Won!";
        }
        else if (ans[0] === input2) {
            result += "\n" + ans[0] + " " + ans[1] + " " + input1 + " \nComputer Won...Better luck next time!";
        }
        else {
            result += "\nNobody Wins...Draw!";
        }
        printString(result + "\n");
    };
    RockPaperJudge.prototype.isLegalChoice = function (userChoice) {
        if (userChoice in choice) {
            return true;
        }
        printString("Please Enter Valid Input..");
        return false;
    };
    RockPaperJudge.prototype.printRules = function () {
        this.gameRules.printInstructions();
    };
    return RockPaperJudge;
}());
var RockPaperGame = /** @class */ (function () {
    function RockPaperGame() {
        this.isGameInProgress = false;
        this.gameJudge = new RockPaperJudge();
    }
    RockPaperGame.prototype.startGame = function () {
        this.isGameInProgress = true;
        this.gameJudge.printRules();
        var anotherRound = "y";
        while (anotherRound === "y" || anotherRound === "yes") {
            var userInput = void 0;
            do {
                userInput = takeInput("Enter your choice (rock/paper/scissors/lizard/spock): ");
            } while (!this.gameJudge.isLegalChoice(userInput));
            var choiceSize = Object.keys(choice).length / 2;
            var computerInput = choice[generateRandom(choiceSize - 1)];
            printString("\nYour choice is: " + userInput + " \nComputer choice is: " + computerInput);
            this.gameJudge.checkResult(userInput, computerInput);
            anotherRound = takeInput("Play Another Round? (Y/N): ");
        }
        this.quitGame();
    };
    RockPaperGame.prototype.quitGame = function () {
        this.isGameInProgress = false;
    };
    return RockPaperGame;
}());
var myGame = new RockPaperGame();
myGame.startGame();
