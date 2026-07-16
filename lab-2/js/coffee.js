//========================================================================================
// #region About
//----------------------------------------------------------------------------------------
/*  
    Please make use of the provided regions. I have simply stripped away the code from
    lesson 10 and added a region under 'original content' called 'Lab2' (line 82).
    That is where you will find my own code for this lab.

    Thanks - Dave Dick.
*/
//----------------------------------------------------------------------------------------
// #endregion
//========================================================================================

//========================================================================================
// #region original content
//----------------------------------------------------------------------------------------
const output = document.querySelector("#output");

// Coffee class from lesson 10
class Coffee {
    // variables/fields
    size;
    isDecaf;

    // constructor
    constructor(size, isDecaf) {
        this.size = size;
        this.isDecaf = isDecaf;
    }

    // functions/methods
    // add a serveIt method
    serveIt() {
        // Generate an IMG of the coffee ordered
        let cup = document.createElement("img"); // <img>

        // Set the src path for the IMG element
        cup.setAttribute("src", "images/coffee-cup.svg"); // <img src="images/coffee-cup.svg">

        // Determine caffeine status of the coffee
        if (this.isDecaf) {
            cup.setAttribute("src", "images/coffee-cup-green.svg"); // <img src="images/coffee-cup-green.svg">
        } else {
            cup.setAttribute("src", "images/coffee-cup-purple.svg"); // <img src="images/coffe-cup-purple.svg">
        }

        // Set the size of the cup SVG image based on this.size
        switch (this.size) {
            // Size the IMG in terms of its height based on above number from the switch
            case "small":
                cup.setAttribute("height", 100); // <img src="images/coffee-cup.svg" height=100>
                break;
            case "medium":
                cup.setAttribute("height", 150);
                break;
            case "large":
                cup.setAttribute("height", 200);
                break;
            default:
                cup.setAttribute("height", 150);
        }

        // Generate a description of the coffee and put it into the IMG title attribute
        // A small caffinated coffee
        cup.setAttribute(
            "title",
            `A ${this.size} ${this.isDecaf ? "decaffinated" : "caffinated"} Coffee`,
        );

        // Insert the new IMG element into the paragraph
        output.appendChild(cup);
    }
}
// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript
// Special thanks to https://openclipart.org/detail/293550/coffee-to-go for the very cool coffee cup SVG
//----------------------------------------------------------------------------------------
// #endregion
//========================================================================================

//========================================================================================
// #region Lab2
//----------------------------------------------------------------------------------------
// new class of Mocha from the base class Coffee (inherits)
class Mocha extends Coffee
{
    // properties related to this class only
    shotsAmount;
    extras;

    // contructor from class
    constructor(size, isDecaf, shotsAmount, extras)
    {
        // inherit Coffee constructor
        super(size, isDecaf);
        // set custom Mocha properties
        this.shotsAmount = shotsAmount;
        this.extras = extras;
    }

    // custom desciption of this object (method with string return type)
    mochaDesc() {
        return `A ${this.size} Mocha with ${this.shotsAmount} shots and ${this.extras}.`;
    }
}

// create two new instances of the Mocha class object
let davesMocha = new Mocha("large", false, 2, "whipped cream");
let elliesMocha = new Mocha("medium", false, 1, "caramel syrup"); 

// diplay the mochaDesc on the output elements from the HTML
output.innerHTML = `Dave's Mocha: ${davesMocha.mochaDesc()}<br><br>Ellie's Mocha: ${elliesMocha.mochaDesc()}<br><br>`;

// call the servIt method from parent class on these object
davesMocha.serveIt();
elliesMocha.serveIt();
//----------------------------------------------------------------------------------------
// #endregion
//========================================================================================