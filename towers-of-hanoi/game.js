// three stacks
// first stack starts with 1, 2, 3

// Game.prototype.run
// until there is a full stack on stacks 2 or 3
// get a move from the player (get from, then get to)
// check if the move is valid
// if it is valid, then move the disc, otherwise ask them for a new move


const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game(){
  this.towers = [[1,2,3], [], []];
}

Game.prototype.promptMove = function(callback) {
  console.log(this.towers);

  reader.question("From Tower: ", (res) => {
    const fromTowerIdx = parseInt(res);

    reader.question("To Tower: ", (res) => {
      const toTowerIdx = parseInt(res);

      callback(fromTowerIdx, toTowerIdx);
    });
  });
};

Game.prototype.isValidMove = function (fromTowerIdx, toTowerIdx) {
  if (fromTowerIdx > 2 || toTowerIdx > 2 || fromTowerIdx < 0 || toTowerIdx < 0) return false;

  if (this.towers[fromTowerIdx].length === 0) return false;
  if (this.towers[toTowerIdx].length === 0) return true;

  if (this.towers[toTowerIdx][0] > this.towers[fromTowerIdx][0]) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.move = function (fromTowerIdx, toTowerIdx) {
  let disc = this.towers[fromTowerIdx].shift();
  this.towers[toTowerIdx].unshift(disc);
};

Game.prototype.isWon = function () {
  if (this.towers[1].length === 3 || this.towers[2].length === 3) {
    return true;
  }

  return false;
};

Game.prototype.run = function (completionCallback) {
  const move = this.promptMove((fromTowerIdx, toTowerIdx) => {
    if (this.isValidMove(fromTowerIdx, toTowerIdx)) {
      this.move(fromTowerIdx, toTowerIdx);
    } else {
      console.log("Incorrect move");
    }

    if (this.isWon()) {
      console.log("You win!");
      completionCallback(this.towers);
    } else {
      this.run(completionCallback);
    }
  });
};

game = new Game();
// console.log(game.towers);
// console.log(game.isValidMove(0, 2));
// console.log(game.isValidMove(0, 1));
// console.log(game.isValidMove(1, 0));
game.run((towers) => {
  console.log(`Exiting game. Board state: ${towers}`);
  reader.close();
});


// console.log(game.towers);
