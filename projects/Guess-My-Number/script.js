'use strict';


// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct number you nailed it !' ;
// console.log(document.querySelector('.message').textContent);

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 0 ;
// console.log(document.querySelector('.guess').value);

// const secretNumber = function() {
//     const number = Math.trunc(Math.random()* 20) +1;
//     console.log(number);
//     return secretNumber
// }

let secretNumber = Math.trunc(Math.random()* 20) +1;
document.querySelector('.number').textContent = secretNumber;
document.querySelector('.number').textContent = '?';

let score = 20;
let highscore = 0;


document.querySelector('.check').addEventListener('click', function() {
    
    const guess =Number( document.querySelector('.guess').value);
    console.log(guess, typeof guess);

     //  when no input  

    if (!guess) {
        document.querySelector('.message').textContent = 'No input , please input something';



       

    //  when people win the game 

    }else if(guess === secretNumber) {
            document.querySelector('.message').textContent = 'congratulation you did it!';
            console.log('yes');
            document.querySelector('body').style.backgroundColor = 'green';
            document.querySelector('.number').style.width = '30rem';
            document.querySelector('.number').textContent = secretNumber;

            if (score>highscore){
                document.querySelector('.highscore').textContent = score;
            }



    //  when guess is High   
            
    }else if (guess>secretNumber){

        if (score>1){
            document.querySelector('.message'). textContent = " too high ";
            score--;
            document.querySelector('.score').textContent = score;
            }else {
                    document.querySelector('.message'). textContent = " you loooose ";
                    document.querySelector('.score').textContent = 0;
    
                }
    //  when guess is low  
    } else if (guess<secretNumber){

        if (score>1){
            document.querySelector('.message'). textContent = " too low ";
            score--;
            document.querySelector('.score').textContent = score;
        }else {
                document.querySelector('.message'). textContent = " you loooose ";
                document.querySelector('.score').textContent = 0;
    
                }
    }   

});

document.querySelector('.again ').addEventListener('click', function() {
    // pre defined score

    score = 20;
    const lightColors = ["lightblue","lightpink","lightyellow","lightcoral","lavender","beige","mintcream"];
    const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];



    // again new secret number 
    secretNumber = Math.trunc((Math.random()*20) + 1);

    //start guessing
    document.querySelector('.message').textContent = 'Start Guessing';
    // initial score
    document.querySelector('.score').textContent = score;

    // input blank

    document.querySelector('.number').textContent = '?';

    document.querySelector('.guess').value = '';

    document.querySelector('body').style.backgroundColor = randomColor;
    document.querySelector('body').style.color = 'black';


    document.querySelector('.number').style.width = '30rem';
    
    document.querySelector('.number').style.color = 'black';
    document.querySelector('main').style.color = 'black';
    document.querySelector('header').style.color = 'black';
    document.querySelector('header').style.borderBottom = '7px solid #000000ff;';
    document.querySelector('.number').style.width = '15rem';
    

    

    


    } );
