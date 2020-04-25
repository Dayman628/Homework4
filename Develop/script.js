// This is the homework to create a quiz through dynamically updated html using js
    var question = document.querySelector('.card-header'),
        answerOne = document.querySelector('.answer-a'),
        answerTwo = document.querySelector('.answer-b'),
        answerThree = document.querySelector('.answer-c'),
        answerFour = document.querySelector('.answer-d');

// create object to hold question/answer arrays
    questionOne = ["0", "1", "2", "3", "4"],
    questionTwo = ["0", "1", "2", "3", "4"],
    questionThree = ["0", "1", "2", "3", "4"],
    questionFour = ["0", "1", "2", "3", "4"],
    questionFive = ["0", "1", "2", "3", "4"],
    questionSix = ["0", "1", "2", "3", "4"],
    questionSeven = ["0", "1", "2", "3", "4"],
    questionEight = ["0", "1", "2", "3", "4"],
    questionNine = ["0", "1", "2", "3", "4"],
    questionTen = ["0", "1", "2", "3", "4"]

// create function that pulls array from object and applies array index to dynamically created nodes
    function getQuestion(x) {
        question = x[0]
        answerOne = x[1]
        answerTwo = x[2]
        answerThree = x[3]
        answerFour = x[4]
    };
     
    function countDown(i, callback) {
        callback = callback || function(){};
        var int = setInterval(function() {
                document.getElementById("timer").innerHTML = i;
                i-- || (clearInterval(int), callback());
            }, 1000);
        }
    
    document.addEventListener('click', function (event) {

        if (!event.target.matches('.start-quiz')) return;
    
        countDown(300, function(){
            alert("Time's Up!")
        });;
    
        // Log the clicked element in the console
        console.log(event.target);
    
    }, false);
// create start quiz button with onclick function that calls start timer function

// create while loop to run game script while timer counts down to 0

// within while loop create a for loop that goes through all 10 questions

// calling from object add first question/answer array to nodes, followed by event listener that listens for click, and if/else statements that determine whether answer was right or wrong: if correct, score++ and play success sound, if wrong subtract 45 seconds from timer and play wrong sound 

// create for loop that pulls indexes from object key

// create timer for 300 seconds

// create "next question" button that displays after user clicks answer

// after while loop, allow user to input their name to save their score

// if statement for if high score is higher than getLocalStorage.highScore, replace that highscore with new high score

// display high score to user and create button that allows them to restart