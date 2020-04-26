// This is the homework to create a quiz through dynamically updated html using js   


(function(){
    
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    
    function buildQuiz(){
          // variable to store the HTML output
          var output = [];
      
          // for each question...
          myQuestions.forEach((currentQuestion, questionNumber) => {
      
              // variable to store the list of possible answers
              var answers = [];
      
              // and for each available answer...
              for(letter in currentQuestion.answers){
      
                // ...add an HTML radio button
                answers.push(
                  `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                  </label>`
                );
              }
      
              // add this question and its answers to the output
              output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
              );
            }
          );
      
          // finally combine our output list into one string of HTML and put it on the page
          quizContainer.innerHTML = output.join('');
        }
      
        function showResults(){
      
          // gather answer containers from our quiz
          var answerContainers = quizContainer.querySelectorAll('.answers');
      
          // keep track of user's answers
          var numCorrect = 0;
      
          // for each question...
          myQuestions.forEach( (currentQuestion, questionNumber) => {
      
            // find selected answer
            var answerContainer = answerContainers[questionNumber];
            var selector = `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
            // if answer is correct
            if(userAnswer === currentQuestion.correctAnswer){
              
              // add to the number of correct answers
              numCorrect++;
      
              // color the answers green
              answerContainers[questionNumber].style.color = 'lightgreen';
            }
              // if answer is wrong or blank
              else{
              // color the answers red
              answerContainers[questionNumber].style.color = 'red';
            }
          });
      
          // show number of correct answers out of total
          resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        }
        var myQuestions = [
          {
            question: "Who invented JavaScript?",
            answers: {
              a: "Douglas Crockford",
              b: "Sheryl Sandberg",
              c: "Brendan Eich"
            },
            correctAnswer: "c"
          },
          {
            question: "Which one of these is a JavaScript package manager?",
            answers: {
              a: "Node.js",
              b: "TypeScript",
              c: "npm"
            },
            correctAnswer: "c"
          },
          {
            question: "Which tool can you use to ensure code quality?",
            answers: {
              a: "Angular",
              b: "jQuery",
              c: "RequireJS",
              d: "ESLint"
            },
            correctAnswer: "d"
          }
        ];
      
        // Kick things off
        buildQuiz();
      
        // Event listeners
        submitButton.addEventListener('click', showResults);

        document.addEventListener('click', function (event) {

            if (!event.target.matches('.start-quiz')) return;
            
            var fiveMinutes = 2 * 5,
            display = document.querySelector('#timer');
            startTimer(fiveMinutes, display);
    
        
            // Log the clicked element in the console
            console.log(event.target);
        
        }, false);
        
        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;
            var callback = callback || function(){
                console.log('timer done')
            };
            var timerCountdown = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
        
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
        
                display.textContent = minutes + ":" + seconds;
                if (--timer < 0) {
                    timer = duration;
                }
                duration-- || (clearInterval(timerCountdown), callback());
            }, 1000);
        }
    
    })();