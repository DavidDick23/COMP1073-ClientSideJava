//=======================================================================================================
// #region About
//-------------------------------------------------------------------------------------------------------
/* 
    The functionality of the orginal toy has been altered as I didn't comply with the iteration of 
    each word in the column upon button presses. I sort of winged it in terms of the way I thought
    the selections should be handled by having the sentence use only one choice per column (not
    sure if that is the original design or not). Anywho... added some cool speaking feauture! Enjoy :)
*/
//-------------------------------------------------------------------------------------------------------
// #endregion About
//=======================================================================================================

//=======================================================================================================
// #region Global Vars
//-------------------------------------------------------------------------------------------------------
//Arrays containing selection values
const choices1 = ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"];
const choices2 = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
const choices3 = ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"];
const choices4 = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
const choices5 = ["on the moon", "on a chair", "in my backpack", "in soup", "on the grass", "in my shoes"];

// Variables for storing selections and completed sentence
let selection1 = "";
let selection2 = "";
let selection3 = "";
let selection4 = "";
let selection5 = "";
let fullSentence = "";

// Buttons to make selections from arrays
const btn1 = document.querySelector(".selection1-btn");
const btn2 = document.querySelector(".selection2-btn");
const btn3 = document.querySelector(".selection3-btn");
const btn4 = document.querySelector(".selection4-btn");
const btn5 = document.querySelector(".selection5-btn");

// Reset Button (resets the entire sentence)
const resetBtn = document.querySelector(".reset-btn");

// Surprise Button (creates a random sentence with one button)
const surpriseBtn = document.querySelector(".surprises-btn")

// Used to "Speak" the full sentence
const speakBtn = document.querySelector(".speak-btn");

// Output text for displaying full sentence
const output = document.querySelector(".output h2");
//-------------------------------------------------------------------------------------------------------
// #endregion Global Vars
//=======================================================================================================

//=======================================================================================================
// #region Functions
//-------------------------------------------------------------------------------------------------------
// Uses an array parameter to make a random selection based upon the array length and returns it
function getRandomWord(array)
{
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// When called checks if all selections have been made then updates the fullSentence and displays it in the output
function updateSentence()
{
    if (selection1 && selection2 && selection3 && selection4 && selection5)
    {
        fullSentence = `${selection1} ${selection2} ${selection3} ${selection4} ${selection5}.`;
        output.textContent = fullSentence;
    }
}

// Makes a random sentence from one button click and displays it
function surpriseSentence()
{
    selection1 = getRandomWord(choices1);
    selection2 = getRandomWord(choices2);
    selection3 = getRandomWord(choices3);
    selection4 = getRandomWord(choices4);
    selection5 = getRandomWord(choices5);

    updateSentence();
}

// Function For Reset (called by Reset button on 'click' event)
function resetSentence()
{
    // Reset all selections and sentence
    selection1 = "";
    selection2 = "";
    selection3 = "";
    selection4 = "";
    selection5 = "";
    fullSentence = "";

    // Display original text
    output.textContent = "Output Text Shows Here";
}

// Will speak the sentence if all selections are made
function speak()
{
    if (selection1 && selection2 && selection3 && selection4 && selection5)
    {
        // used Google to track down this:
        // Reference: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
        const speech = new SpeechSynthesisUtterance(fullSentence);
        speechSynthesis.speak(speech);
    }  
}
//-------------------------------------------------------------------------------------------------------
// #endregion Functions
//=======================================================================================================

//=======================================================================================================
// #region Event Listeners
//-------------------------------------------------------------------------------------------------------
// All selection buttons follow the same structure:
// Uses a void function and executes the functions in it's body
btn1.addEventListener("click", function() 
{
    selection1 = getRandomWord(choices1); // get a random word from the associated array
    updateSentence(); // calls the function to update the fullSentence and display it
});

btn2.addEventListener("click", function() 
{
    selection2 = getRandomWord(choices2);
    updateSentence();
});

btn3.addEventListener("click", function() 
{
    selection3 = getRandomWord(choices3);
    updateSentence();
});

btn4.addEventListener("click", function() 
{
    selection4 = getRandomWord(choices4);
    updateSentence();
});

btn5.addEventListener("click", function() 
{
    selection5 = getRandomWord(choices5);
    updateSentence();
});

// These event listeners are the "cleaner" option over the above selection listeners
resetBtn.addEventListener("click", resetSentence);
surpriseBtn.addEventListener("click", surpriseSentence);
speakBtn.addEventListener("click", speak);
//-------------------------------------------------------------------------------------------------------
// #endregion Event Listeners
//=======================================================================================================