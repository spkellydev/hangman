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

console.log(chosen);

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


function checkLetter(letter) {
    for (var i = 0; i < chosen.length; i++) {
        if(letter == chosen.charAt(i)) {
            //you guessed right!
            correct[i] = letter;
            _[chosen.charAt(i)] = correct;
        }
        else {
            //you guessed wrong :(
            
        }
    }
    console.log(correct)
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
        checkLetter(letter);
        // for (var k =0; k < chosen.length; k++) {
        //     if ( == correct.indexOf(letter)) {
        //         console.log('heyyyy')
        //     }
        // }
        
        //replace underscore with letter
        
        _[chosen.charAt(letter)] = letter;
        correctBlock.innerHTML = commaReplace(correct);
        
        console.log(`%c Correct: ${correct} `, 'background: #d2232a; color: #bada55');
        console.log(_)
 
        underscores.innerHTML = commaReplace(correct);
        //compare the length of correct letters and the count of chosen letters
        if (commaReplace(correct).length == chosen.length) {
            alert('You win!');
            location.reload();
        }
    } else {
        //push to the wrong word array
        wrong.indexOf(letter) === -1 ? wrong.push(letter) : console.log('already guessed');
        wrongBlock.innerHTML = commaReplace(wrong);
        scoreBlock.innerHTML = 10 - wrong.length;
        console.log(`%c Wrong: ${wrong}`, 'background: #bada55; color: #d2232a');
        if (wrong.length > 9) {
            alert('You lose, try again!');
            location.reload();
        }
    }
})


