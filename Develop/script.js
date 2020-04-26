// This is the homework to create a quiz through dynamically updated html using js   
// Function that fires when page is loaded
(function() {

    // hold questions and answers inside object
        var questions = [{
          question: "What is 2*5?",
          choices: [2, 5, 10, 15, 20],
          correctAnswer: 2
        }, {
          question: "What is 3*6?",
          choices: [3, 6, 9, 12, 18],
          correctAnswer: 4
        }, {
          question: "What is 8*9?",
          choices: [72, 99, 108, 134, 156],
          correctAnswer: 0
        }, {
          question: "What is 1*7?",
          choices: [4, 5, 6, 7, 8],
          correctAnswer: 3
        }, {
          question: "What is 8*8?",
          choices: [20, 30, 40, 50, 64],
          correctAnswer: 4
        }];
        // declare variables
        var questionCounter = 0;
        var selections = []; 
        var quiz = $('#quiz');
        
        // start timer function
        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;
           
            //hide start button
            $('#starter').hide();


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

        document.addEventListener('click', function (event) {
             

            if (!event.target.matches('.start-quiz')) return;
            
            var fiveMinutes = 2 * 30,
            display = document.querySelector('#timer');
             // Display initial question
            displayNext();
            startTimer(fiveMinutes, display);
    
        
            // Log the clicked element in the console
            console.log(event.target);
        
        }, false);

       
        
        // Click handler for the 'next' button
        $('#next').on('click', function (e) {
          e.preventDefault();
          
          // Suspend click listener during fade animation
          if(quiz.is(':animated')) {        
            return false;
          }
          choose();
          
          // If no user selection, progress is stopped
          if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
          } else {
            questionCounter++;
            displayNext();
          }
        });
        
        // Click handler for the 'prev' button
        $('#prev').on('click', function (e) {
          e.preventDefault();
          
          if(quiz.is(':animated')) {
            return false;
          }
          choose();
          questionCounter--;
          displayNext();
        });
        
        // Click handler for the 'Start Over' button
        $('#start').on('click', function (e) {
          e.preventDefault();
          
          if(quiz.is(':animated')) {
            return false;
          }
          questionCounter = 0;
          selections = [];
          displayNext();
          $('#start').hide();
        });
        
        // Animates buttons on hover
        $('.button').on('mouseenter', function () {
          $(this).addClass('active');
        });
        $('.button').on('mouseleave', function () {
          $(this).removeClass('active');
        });
        
        // Creates and returns the div that contains the questions and 
        // the answer selections
        function createQuestionElement(index) {
          var qElement = $('<div>', {
            id: 'question'
          });
          
          var header = $('<h2>Question ' + (index + 1) + ':</h2>');
          qElement.append(header);
          
          var question = $('<p>').append(questions[index].question);
          qElement.append(question);
          
          var radioButtons = createRadios(index);
          qElement.append(radioButtons);
          
          return qElement;
        }
        
        // Creates a list of the answer choices as radio inputs
        function createRadios(index) {
          var radioList = $('<ul>');
          var item;
          var input = '';
          for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
          }
          return radioList;
        }
        
        // Reads the user selection and pushes the value to an array
        function choose() {
          selections[questionCounter] = +$('input[name="answer"]:checked').val();
        }
        
        // Displays next requested element
        function displayNext() {
          quiz.fadeOut(function() {
            $('#question').remove();
            
            if(questionCounter < questions.length){
              var nextQuestion = createQuestionElement(questionCounter);
              quiz.append(nextQuestion).fadeIn();
              if (!(isNaN(selections[questionCounter]))) {
                $('input[value='+selections[questionCounter]+']').prop('checked', true);
              }
              
              // Controls display of 'prev' button
              if(questionCounter === 1){
                $('#prev').show();
              } else if(questionCounter === 0){
                
                $('#prev').hide();
                $('#next').show();
              }
            }else {
              var scoreElem = displayScore();
              quiz.append(scoreElem).fadeIn();
              $('#next').hide();
              $('#prev').hide();
              $('#start').show();
            }
          });
        }
        
        // Computes score and returns a paragraph element to be displayed
        function displayScore() {
            
          var score = $('<p>',{id: 'question'});
          var numCorrect = 0;
          
          

          for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
              numCorrect++;
            }
          }
          if (localStorage.getItem('highScore') == null) {
            localStorage.setItem('highScore', numCorrect);
          }
          
          else if (numCorrect > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', numCorrect);
          }

          score.append('You got ' + numCorrect + ' questions out of ' +
                       questions.length + ' right!!!')
            
          return score;
        }
    })();