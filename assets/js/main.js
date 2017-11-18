q = (selector) => {
    return document.querySelector(selector);
}
// create an array of words 
const words = { 
                words: ['The Color Purple', 'letter', 'snail', 'great white shark', 'sock', 'ham', 'chocolate'],
                hints: ['a book by Alice Walker -- adapted for the screen by Stephen Speilberg', 'there are 26 of these in the alphabet', 'shelled insect', 'the biggest, baddest cartiliginous fish around', 'goes on your feet', 'comes from a pig', 'delicious candy'],
                images: ['colorPurple.jpg', 'letter.jpg', 'snail.jpg','shark.jpg','sock.jpg','ham.jpg','chocolate.jpg']
              };
// choose word randomly
let rand = Math.floor(Math.random() * words.words.length)
let chosen = words.words[rand].toLowerCase();
let chosenHint = words.hints[rand];
let count = chosen.length;
// create underscores based on words
let _ = [];

let score = {
  _: [],
  correct: [],
  wrong: []
}

let blocks = {
  underscores: q('.underscores'),
  correct: q('.correct'),
  wrong: q('.wrong'),
  score: q('#score'),
  subtitle: q('.subtitle'),
  img: q('.img')
}

let btn = q('.btn');
let hint = q('.hint');

//push to front end
hint.innerHTML = chosenHint;


var node = document.createElement("IMG");
node.src = '../assets/images/'+ words.images[rand];
node.classList.add('img-responsive');


while (count > 0) {
    score._.push('_');
    count--;
}

//replace the target with a comma-replaced, joined array
commaReplace = (t) => {
    return (t.join()).replace(/,/g,'');
}

//push underscores to the front end
blocks.underscores.innerHTML = commaReplace(score._);

checkDuplicate = (letter) => {
    count = 0;
    for (var i = 0; i < chosen.length; i++) {
        if (chosen[i] == letter) {
            count++;
        }
    }
    if (count > 1) {
        score.correct.push(' ');
    }
}

checkLetter = (letter) => {
    for (var i = 0; i < chosen.length; i++) {
        if(letter == chosen.charAt(i)) {
            //you guessed right!
            score.correct.indexOf(letter) === -1 ? score.correct.push(letter) : checkDuplicate(letter); //add empty space to account for correct index count
            score._[i] = letter;
        } 
    }
    return score._;
}

// get users guess 
document.addEventListener('keypress', (e) => {
    let letter = e.key.toLowerCase();
    //check if the user's answer is correct 
    //must be at least index of 0
    if (chosen.indexOf(letter) > -1) {
        //push to the correct array
        //need to check if letter exists in word twice
        //console.log(`%c Correct: ${correct} `, 'background: #d2232a; color: #bada55');
        blocks.underscores.innerHTML = commaReplace(checkLetter(letter));
        //print to correct block
        blocks.correct.innerHTML = commaReplace(score.correct);
        //compare the length of correct letters and the count of chosen letters
        if (commaReplace(score.correct).length == chosen.length) {
           return gameStatus('win');
        }
    } else {
        //push to the wrong word array
        if (score.wrong.length < 10) {
            score.wrong.indexOf(letter) === -1 ? score.wrong.push(letter) : console.log('already guessed');
        }
        //print to wrong block
        blocks.wrong.innerHTML = commaReplace(score.wrong);
        //update scoreblock
        blocks.score.innerHTML = 10 - score.wrong.length;
        //console.log(`%c Wrong: ${wrong}`, 'background: #bada55; color: #d2232a');
        if (score.wrong.length > 9) {
            return gameStatus('lose');          
        }
    }
});

startGame = () => {
    location.reload();
}
scoreBlock = (state) => {
    if (state === 'win') {
        return blocks.score.innerHTML = '😊';
    } else {
        return blocks.score.innerHTML = '🙁';
    }
}

gameStatus = (state) => {
    blocks.img.appendChild(node);
    if (state === 'win') {
        scoreBlock(state);
        blocks.subtitle.innerHTML = 'You Win!!! New Game starting soon!!';
        setTimeout(function(){ startGame(); }, 1500);
    } else {
        scoreBlock(state);
        blocks.subtitle.innerHTML = `You Lose!!! The Word was <span style="color: red;">${chosen.toUpperCase()}</span> New Game starting soon!!`;
        setTimeout(function(){ startGame(); }, 2500);
    }
}