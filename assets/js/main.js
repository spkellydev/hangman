// create an array of words 
const words = ['purple', 'letter', 'snailly', 'purple', 'sock', 'ham', 'goldfish', 'chocolate'];
// choose word randomly
let chosen = words[Math.floor(Math.random() * words.length)];
let count = chosen.length;
// create underscores based on words
let _ = [];
let correct = [];
let wrong = [];
let underscores = document.querySelector('.underscores');
let correctBlock = document.querySelector('.correct');
let wrongBlock = document.querySelector('.wrong');
let scoreBlock = document.querySelector('#score');
let btn = document.querySelector('.btn');

while (count > 0) {
    _.push('_');
    count--;
}

//replace the target with a comma replaced joined array
function commaReplace(t) {
    return (t.join()).replace(/,/g,'');
}

//push underscores to the front end
underscores.innerHTML = commaReplace(_);

function checkDuplicate (letter) {
    count = 0;
    for (var i = 0; i < chosen.length; i++) {
        if (chosen[i] == letter) {
            count++;
        }
    }
    if (count > 1) {
        correct.push(' ');
    }
}

function checkLetter(letter) {
    for (var i = 0; i < chosen.length; i++) {
        if(letter == chosen.charAt(i)) {
            //you guessed right!
            correct.indexOf(letter) === -1 ? correct.push(letter) : checkDuplicate(letter); //add empty space to account for correct index count
            _[i] = letter;
        } 
    }
    return _;
}

// get users guess 
document.addEventListener('keypress', (e) => {
    let letter = e.key.toLowerCase();
    //check if the user's answer is correct 
    //must be at least index of 0
    if (chosen.indexOf(letter) > -1) {
        //push to the correct array
        //need to check if letter exists in word twice
        //correct.indexOf(letter) === -1 ? correct.push(letter) : console.log('already guessed');
        //moved to checkLetter function
        //checkLetter(letter);
        
        //replace underscore with letter with commaReplace

        console.log(`%c Correct: ${correct} `, 'background: #d2232a; color: #bada55');
        //print remaining guess/correct guess
        underscores.innerHTML = commaReplace(checkLetter(letter));
        //print to correct block
        correctBlock.innerHTML = commaReplace(correct);
        //compare the length of correct letters and the count of chosen letters
        if (commaReplace(correct).length == chosen.length) {
            alert('You win!');
        }
    } else {
        //push to the wrong word array
        wrong.indexOf(letter) === -1 ? wrong.push(letter) : console.log('already guessed');
        //print to wrong block
        wrongBlock.innerHTML = commaReplace(wrong);
        //update scoreblock
        scoreBlock.innerHTML = 10 - wrong.length;
        console.log(`%c Wrong: ${wrong}`, 'background: #bada55; color: #d2232a');
        if (wrong.length > 9) {
            alert('You lose, try again!');
        }
    }
});

function startGame() {
    location.reload();
}
