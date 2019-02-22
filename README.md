# Know Your Friends
Claim to be a Friends fanatic?!
Did you not only <em>watch</em> each episode back in the day - when you had to wait <strong><em>one, whole, entire, long, 7-day week</em></strong> - for <em>each</em> new episode (are Rachel and Ross getting back together? :weary:) but currently binge the seasons over and over on Netflix?
Let's test your Friends knowledge just to see how well you "know your Friends." 

### Phase 1
My first attempt at this project was all about how to access the questions, answers and correct answer information in my `options` array to properly utlize them when needed. No special formatting or styling was applied other than color, font and buttons! Once this concept "clicked" for me, everything else fell into place.

### Phase 2
Unsatisfied with my MVP, I studied other people's code and eventually landed on `LindsFish TriviaGame` (link below) - I loved her use of `setInterval`, `setTimeout`, and functions to create a very interactive `TriviaGame.` The overall aesthetic was very cool too. I had a lot to learn! However, I quickly ran into what I've since learned is a pretty common error when just learning jQuery - JavaScript only reads selectors once unless otherwise directed (like by a funciton) - this is so obvious in hindsight! More specifically, `$(".answer-choice").on("click", function() {...}` was only being ran once by JavaScript because it was outside all functions. Players therefore could not select the displayed answers! It wasn't until I moved it inside `displayQuestion()` that players were able to click their selected answer. 
`LindsFish`: https://github.com/LindsFisch/TriviaGame

### Phase 3 <em>...in progress</em>
1. Create new design for game to something of my own
2. Add Friends theme song, "I'll be there for you," for user's to play or mute.

## The Tech Stuff
- HTML5
- CSS3
- JavaScript
- jQuery
