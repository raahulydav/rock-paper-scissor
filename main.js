"use strict";
var require;
var read = require("prompt-sync")();
var Player = /** @class */ (function () {
    function Player(move) {
        this.move = move;
    }
    Player.prototype.getChoice = function () {
        return this.move;
    };
    return Player;
}());
var Input = /** @class */ (function () {
    function Input() {
    }
    Input.prototype.getUserInput = function () {
        return this.userInput;
    };
    Input.prototype.takeUserInput = function () {
        // takes input from user;
    };
    return Input;
}());
var RockPaperRules = /** @class */ (function () {
    function RockPaperRules() {
    }
    RockPaperRules.prototype.winConditions = function (inputOne, inputTwo) {
        return "abc";
    };
    RockPaperRules.prototype.printInstructions = function () {
        //print instuctions;
    };
    return RockPaperRules;
}());
var RockPaperJudge = /** @class */ (function () {
    function RockPaperJudge() {
    }
    RockPaperJudge.prototype.checkResult = function (inputOne, inputTwo) {
        return "abc";
    };
    return RockPaperJudge;
}());
var RockPaperGame = /** @class */ (function () {
    function RockPaperGame() {
        this.isGameInProgress = false;
    }
    RockPaperGame.prototype.startGame = function () {
        this.isGameInProgress = true;
        console.log("hasGameStarted: " + this.isGameInProgress);
        // start Game
    };
    RockPaperGame.prototype.restartGame = function () {
        // restart Game
    };
    RockPaperGame.prototype.quitGame = function () {
        this.isGameInProgress = false;
        // quits game and exit
    };
    return RockPaperGame;
}());
var myGame = new RockPaperGame();
myGame.startGame();
