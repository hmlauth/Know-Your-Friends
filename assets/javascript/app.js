// JavaScript - everything asynchronous happens AFTER synchronously

// Put questions, answer choices, and radio buttons on browser when start button is clicked. 
// Hide start button and add timer to browser.
$(document).ready(function () {

    // SETUP VARIABLES
    // ============================================================
    // Define Global ARRAY containing questions, answer choices, and correct answer index number, to be accessed and added to HTML dynamically using jQuery
    var options = [
        {
            question: "What caused the fire in Phoebe and Rachel's apartment?",
            answers: ["Rachel's hair straightener", "Phoebe's candles", "Rachel's hair curler", "Phoebe's incense"],
            correctAnswer: 0,
            photo: "assets/images/rachelstartsfire.gif"
        },
        {
            question: "What was the original name of the show?",
            answers: ["Insomnia Cafe", "Central Perk", "Friends", "The Coffee Shop"],
            correctAnswer: 0,
            photo: "assets/images/insomniacafe.gif"
        },
        {
            question: "What is the name of Joey's stuffed penguin?",
            answers: ["Alisha May", "Hugsy", "Baby", "Patty May"],
            correctAnswer: 1,
            photo: "assets/images/hugsy.gif"
        },
        {
            question: "What did Joey name is barcalounger?",
            answers: ["Vida", "Vita", "Rosa", "Rosita"],
            correctAnswer: 3,
            photo: "assets/images/rosita.gif"
        },
        {
            question: "What band sings the opening credits song?",
            answers: ["The Rembrandts", "Fool's Garden", "Revolver", "Sunrise Avenue"],
            correctAnswer: 0,
            photo: "assets/images/theRembrandts-lyric.gif"
        },
        {
            question: "What is Phoebe's twin sister's name?",
            answers: ["Pheobo Buffay", "Ursula Buffay", "Ulga Buffay", "Reginal Phalange"],
            correctAnswer: 0,
            photo: "assets/images/ursula.gif"
        },
        {
            question: "How many categories for towels does Monica have?",
            answers: ["5", "20", "13", "11"],
            correctAnswer: 3,
            photo: "assets/images/monicaTowelsCorrectAnswer.gif"
        },
        {
            question: "Which highschool did Monica, Ross and Rachel attend?",
            answers: ["Lincoln High School", "Roosevelt High School", "Washington High School", "Einstein High School"],
            correctAnswer: 0,
            photo: "assets/images/lincolnHighschool.gif"
        },
        {
            question: "What is Monica's biggest pet peeve?",
            answers: ["Leaving shoes on the floor", "Friends losing borrowed items", "People who don't clean", "Animals dressed as humans"],
            correctAnswer: 3,
            photo: "assets/images/animalashuman.jpg"
        },
        {
            question: "What is Chandler's job?",
            answers: ["Data Analyst", "Data Management Specialist", "IT Procurement Manager", "Copywriter"],
            correctAnswer: 2,
            photo: "assets/images/chandlersJob.gif"
        }
    ];

    // Define Global Variables
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 60;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    // FUNCTIONS
    // ============================================================
    // Randomly pick question in array if not already shown
    // Display question and loop through and display possible answers
    function displayQuestion() {
        // generate random index in array and store as "index"
        index = Math.floor(Math.random() * options.length);
        // assign the randomized question to variable "pick" 
        pick = options[index];

        // display the randomly chosen index's question (from options array) in the question-block
        console.log(pick.question);
        $("#question-block").html("<h2>" + pick.question + "</h2>");
        // iterate over the length of the randomly chosen idex's questions' answers and display them on the page.
        console.log(pick.answers);
        for (var i = 0; i < pick.answers.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answer-choice");
            userChoice.html(pick.answers[i]);
            console.log(pick.answers[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answer-block").append(userChoice);
        };

        // Click function to select answer and outcomes
        $(".answer-choice").on("click", function () {

            // grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));
            // Correct or wrong guess outcomes
            if (userGuess === pick.correctAnswer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answer-block").html("<p>Correct!</p>");
                hidePicture();
            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answer-block").html("<p>Wrong! The correct answer is. . .<br><span>" + pick.answers[pick.correctAnswer] + "</span></p>");
                hidePicture();
            };

        });
    };

    // timer functions
    // ================
    // timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        };
    };

    // timer countdown
    function decrement() {
        $("#trivia-timer").html("<h3>Time remaining: " + timer + "<h3>");
        timer--;
        console.log(pick.answers[pick.correctAnswer]);

        // stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answer-block").html("<p>Time is up! The correct answer is. . .<br><span>" + pick.answers[pick.correctAnswer] + "</span></p>");
            hidePicture();
        };

    };

    //timer stop
    function stop() {
        clearInterval(intervalId);
        running = false;
    };

    function hidePicture() {
        $img = $("<img>");
        $img.attr("src", pick.photo);
        $("#answer-block").append($img);
        // push the pick (options[index]) to the new array.
        newArray.push(pick);
        // splice/remove the "options array" of the (1) randmly chosen index so that that question cannot be chosen again.
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answer-block").empty();
            timer = 60;
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#question-block").empty();
                $("#question-block").html("<h3>Game Over!<br>Here's how you did:</h3>");
                $("#answer-block").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answer-block").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answer-block").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#trivia-timer").hide();
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
            } else {
                runTimer();
                displayQuestion();
            };

        }, 3000);

    };

    // METHODS
    // ============================================================

    $("#reset").hide();

    // On click of Start button, create container to hold all trivia questions and answers. 
    $("#start-button").on("click", function () {
        $(".container").show();
        $("#start-button").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        };
    });

    $answerChoice = $(".answer-choice");
    console.log("answer-choice: ", $answerChoice);

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#trivia-timer").show();
        $("#answer-block").empty();
        $("#question-block").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        };
        runTimer();
        displayQuestion();
    });

});

// =========================================================================================
//     // Hide start button
//     $("button").hide();
//     // Create container and then display "Good Luck!"
//     var triviaContainer = $("<div>");
//     triviaContainer.addClass("trivia-game-container");
//     triviaContainer.html("<h3>Good Luck!</h3>");
//     $("#content-container").append(triviaContainer);

//     // Put questions and possible answers on the page
//     // BUILD QUESTIONS
//     for (var i = 0; i < triviaGame.length; i++) {
//         // Assign html element to variable which we will later append to respective html
//         var buildQuestions = $("<div>");
//         // Add id to buildQuestions div
//         buildQuestions.addClass("trivia-questions");
//         // Add class for styling
//         buildQuestions.addClass("trivia-questions-styling");
//         // Loop through triviaQuiz object to display questions
//         buildQuestions.text(triviaGame[i].question);
//         // Append content-container with buildQuestions div containing questions from trivia21Quiz array.
//         triviaContainer.append(buildQuestions);

//         // BUILD ANSWERS
//         // Create div for answers to be contained within
//         var buildAnswers = $("<div>");
//         // Add id to buildAnswers div
//         buildAnswers.addClass("trivia-answers");
//         // Add class for styling
//         buildAnswers.addClass("trivia-answer-styling");
//         // Loop through triviaQUIZ array to display questions
//         // buildAnswers.text(triviaGame[i].answers);
//         // Append content-container with buildAnswers div containing answers from triviaQuiz array
//         triviaContainer.append(buildAnswers);

//         // ADD RADIO BUTTONS
//         // Create for loop that places radio buttons next to each of the possible answers
//         for (var j = 0; j < triviaGame[i].answers.length; j++) {
//             var radioButton = $("<input type='radio'>" + "  " + triviaGame[i].answers[j] + "<br>");
//             radioButton.attr("name", "group-" + i);
//             radioButton.attr("value", j);
//             radioButton.text(triviaGame[i].answers[j]);
//             $(triviaContainer).append(radioButton);
//         }
//     };

// });

// // TIMER FUNCTIONS
// // *** BUG FIX *** Create function run() to clear intervalId so that prior to setting the new intervalId, it will not allow multiple instances. Note that decrement is the decrement function now being called as an argument by the setInterval. 

// function run() {
//     clearInterval(intervalId);
//     intervalId = setInterval(decrement, 1000);
// };

// // function decrement() to start timer for game.
// function decrement() {
//     number--;
//     // Pull trivia-timer div from HTML and assign it to a variable for future reference
//     var $triviaTimer = $("#trivia-timer");
//     // Insert HTML into $triviaTimer div to be displayed on page once the start button is clicked and decrement function called
//     $triviaTimer.html("<h2> Time Remaing: " + number + "</h2>");
//     //  Once number hits zero...
//     if (number === 0) {

//         // THEN CHECK RESULTS
//         // Create for loop that will iterate through each question of the triviaGame array
//         for (i = 0; i < triviaGame.length; i++) {
//             // Store the input value of the user's input into a variable. Previous addition of input attributes now show up as <input name="group-0" based on the index number of the triviaGame array
//             var buttonValue = $("input[name=group-" + i + "]:checked").val();
//             console.log("Index of buttonValue: " + buttonValue);
//             // store the index of the triviaGame we're iterating over into the currentTrivia variable
//             var currentTrivia = triviaGame[i];
//             console.log("Button Boolean: " + !buttonValue);

//             // IF there is no buttonValue then increment unansweredQuestions by 1
//             if (!buttonValue == true) {
//                 unansweredQuestions++;
//                 // Else if the index of the buttonValue is the same as the index of the correct 
//             } else if (buttonValue == currentTrivia.correctAnswer) {
//                 correctAnswers++;
//             } else {
//                 incorrectAnswers++;
//             };
//         }

//         //  ...run the stop function.
//         stop();

//     };
// };

// //  The stop function
// function stop() {
//     //  Clears our intervalId
//     //  We just pass the name of the intervalId
//     //  to the clearInterval function.
//     clearInterval(intervalId);
//     console.log("Unanswered Questions: " + unansweredQuestions);
//     console.log("Incorrect Answers: " + incorrectAnswers);
//     console.log("Correct Answers: " + correctAnswers);

//     showResults();

// };

// // showResults function
// function showResults() {
//     // Hide triviaContainer
//     $("#content-container").hide();
//     // Clear trivia-timer text
//     $("#trivia-timer").text("");
//     // Show results text in an unordered list. 
//     var $showResults = $("#trivia-timer").html(
//         "Correct Answers: " + correctAnswers + "<br>" +
//         "Incorrect Answers: " + incorrectAnswers + "<br>" +
//         "Unanswered Questions: " + unansweredQuestions + "<br>");
//     $("#trivia-timer").addClass("show-results-text");
//     $("#trivia-timer").append($showResults);

//     var $restartButton = $("<button>");
//     $restartButton.addClass("restart-button");
//     $restartButton.html("Try Again?");
//     $("#trivia-timer").append($restartButton);

//     // var $friendsPhoto = $("<img>");
//     // $friendsPhoto.attr("src", "https://images-na.ssl-images-amazon.com/images/I/61isRml1qcL._SX425_.jpg");
//     // $(".container").append($friendsPhoto);
// };

//     // restartGame function
//     //                 function restartGame() {
//     //                     // Define Global Variables
//     //                     correctAnswers = 0;
//     //                     incorrectAnswers = 0;
//     //                     unansweredQuestions = 0;
//     //                     number = 5;
//     //                     intervalId;
//     //                 }
// });
