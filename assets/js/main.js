// create an array of words 
const words = ['line', 'block', 'tshape', 'wall', 'tetris', 'ham'];
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
//push underscores to the front end
underscores.innerHTML = (_.join()).replace(/,/g,' ');

// get users guess 
document.addEventListener('keypress', (e) => {
    let letter = e.key.toLowerCase();
    //check if the user's answer is correct 
    //must be at least index of 0
    if (chosen.indexOf(letter) > -1) {
        //push to the correct array
        //need to check if letter exists in word twice
        correct.indexOf(letter) === -1 ? correct.push(letter) : console.log('already guessed')
        //replace underscore with letter
        _[chosen.indexOf(letter)] = letter;
        correctBlock.innerHTML = correct;
        
        console.log(`%c Correct: ${correct} `, 'background: #d2232a; color: #bada55');
        console.log(_)
 
        underscores.innerHTML = (_.join()).replace(/,/g,' ');
        //compare the length of correct letters and the count of chosen letters
        if (correct.length == chosen.length) {
            alert('You win!');
        }
    } else {
        //push to the wrong word array
        wrong.indexOf(letter) === -1 ? wrong.push(letter) : console.log('already guessed');
        wrongBlock.innerHTML = wrong;
        if (wrong.length > 10) {
            alert('You lose, motherfucker!')
        }
        scoreBlock.innerHTML = 10 - wrong.length;
        console.log(`%c Wrong: ${wrong}`, 'background: #bada55; color: #d2232a');
    }
})


