class Clock {
  constructor() {
    // 1. Create a Date object.
    const date = new Date();
    // 2. Store the hours, minutes, and seconds.
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    // 3. Call printTime.
    this.printTime();
    // 4. Schedule the tick at 1 second intervals.
    setInterval(() => this._tick(), 1000);
  }

  printTime() {
    let hoursStr = ("0" + this.hours.toString()).slice(-2);
    let minutesStr = ("0" + this.minutes.toString()).slice(-2);
    let secondsStr = ("0" + this.seconds.toString()).slice(-2);
    console.log(`${hoursStr}:${minutesStr}:${secondsStr}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    this.seconds += 1;

    if (this.seconds === 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
    if (this.minutes === 60) {
      this.hours += 1;
      this.minutes = 0;
    }
    if (this.hours === 24) {
      this.hours = 0;
    }
    // 2. Call printTime.
    this.printTime();
  }
}

// const clock = new Clock();

// const readline = require('readline');
//
// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("What number would you like to add?", (res) => {
      sum += parseInt(res);
      numsLeft--;
      addNumbers(sum, numsLeft, completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

// absurdBubbleSort

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2} ?`, (res) => {
    if (res === "yes") {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  }

  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
      if (isGreaterThan) {
        const temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        madeAnySwaps = true;
      }

      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  outerBubbleSortLoop(true);
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

// myBind

Function.prototype.myBind = function(context) {
  return (() => {
    this.apply(context);
  });
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
