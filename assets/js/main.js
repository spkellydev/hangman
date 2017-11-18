// create an array of words 
const words = { 
                words: ['purple', 'letter', 'snail', 'shark', 'sock', 'ham', 'chocolate'],
                hints: ['color', 'part of alphabet', 'shelled insect', 'cartiliginous fish', 'on your feet', 'from a pig', 'delicious candy']
              };
// choose word randomly
let rand = Math.floor(Math.random() * words.words.length)
let chosen = words.words[rand];
let chosenHint = words.hints[rand];
let count = chosen.length;
// create underscores based on words
let _ = [],
correct = [],
wrong = [],
underscores = document.querySelector('.underscores'),
correctBlock = document.querySelector('.correct'),
wrongBlock = document.querySelector('.wrong'),
scoreBlock = document.querySelector('#score'),
btn = document.querySelector('.btn'),
hint = document.querySelector('.hint');
hint.innerHTML = chosenHint;

while (count > 0) {
    _.push('_');
    count--;
}

//replace the target with a comma-replaced, joined array
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

        //console.log(`%c Correct: ${correct} `, 'background: #d2232a; color: #bada55');
        //print remaining guess/correct guess
        underscores.innerHTML = commaReplace(checkLetter(letter));
        //print to correct block
        correctBlock.innerHTML = commaReplace(correct);
        //compare the length of correct letters and the count of chosen letters
        if (commaReplace(correct).length == chosen.length) {
            alert('You win!');
            setTimeout(function(){ location.reload(); }, 3000);
        }
    } else {
        //push to the wrong word array
        wrong.indexOf(letter) === -1 ? wrong.push(letter) : console.log('already guessed');
        //print to wrong block
        wrongBlock.innerHTML = commaReplace(wrong);
        //update scoreblock
        scoreBlock.innerHTML = 10 - wrong.length;
        //console.log(`%c Wrong: ${wrong}`, 'background: #bada55; color: #d2232a');
        if (wrong.length > 9) {
            alert('You lose, try again!');
            setTimeout(function(){ location.reload(); }, 3000);           
        }
    }
});

function startGame() {
    location.reload();
}
