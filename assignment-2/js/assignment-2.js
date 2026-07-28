//=======================================================================================================
// #region About
//-------------------------------------------------------------------------------------------------------
/* 
    This JS is the driving force of this assignment. It is well documented and easy to understand.
    There were a few new concepts that I had learned especially with adding to an emtpy array in JS.
    I have referenced all of the code that I needed to research and there are a few more links in
    terms of some youtube videos but I feel this covers it all in terms of the validation.
*/
//-------------------------------------------------------------------------------------------------------
// #endregion About
//=======================================================================================================

//=======================================================================================================
// #region Global Vars
//-------------------------------------------------------------------------------------------------------
const studentOutput = document.querySelector("#student");
const pizzaOutput = document.querySelector("#pizza-output");
const orderForm = document.querySelector("#pizza-order-form");
//-------------------------------------------------------------------------------------------------------
// #endregion Global Vars
//=======================================================================================================

//=======================================================================================================
// #region Student Name/ID Output
//-------------------------------------------------------------------------------------------------------
// Displays my name and student id in the p element with the id of "student"
studentOutput.textContent = "Pizza By David Dick | 100099683";
//-------------------------------------------------------------------------------------------------------
// #endregion Student Name/ID Output
//=======================================================================================================

//=======================================================================================================
// #region Pizza Class
//-------------------------------------------------------------------------------------------------------
class Pizza
{
    // Properties
    customerName;
    size;
    sauce;
    toppings;

    // Constructor (used when object is instantiated)
    constructor(customerName, size, sauce, toppings)
    {
        // Set the passed in arguments to the new objects properties
        this.customerName = customerName;
        this.size = size;
        this.sauce = sauce;
        this.toppings = toppings;
    }

    // This function will return a string with the objects details
    getDescription() 
    {
        return `${this.customerName} has ordered a ${this.size} pizza with ${this.sauce} sauce and the following toppings: ${this.toppings.join(", ")}.`
    }
}
//-------------------------------------------------------------------------------------------------------
// #endregion Pizza Class
//=======================================================================================================

//=======================================================================================================
// #region Pizza Validation
//-------------------------------------------------------------------------------------------------------
// Add an event listener to the submit button with internal logic
// Reference: https://www.youtube.com/watch?v=zMy8o4kVs-Y
orderForm.addEventListener("submit", function(event)
{
    // Prevent the page from submitting the form to allow validation first
    // Reference: https://www.w3schools.com/Jsref/event_preventdefault.asp
    event.preventDefault();

    // Local variables
    const customerName = document.getElementById("customer-name").value;
    const size = document.getElementById("size").value;
    const sauce = document.getElementById("sauce").value;
    const toppings = []; // empty array to store values later

    // Check that size and sauce (not empty strings) are selected and return if not
    if (size === "")
    {
        alert("A Size Must Be Selected!");
        return;
    }
    if (sauce === "")
    {
        alert("A Sauce Must Be Selected!");
        return;
    }

    // Add each topping item to the empty array 'toppings'
    // Reference: https://stackoverflow.com/questions/62504485/how-do-i-pass-the-values-of-checked-boxes-to-an-array-using-javascript-not-jque
    document.querySelectorAll('input[name="toppings"]:checked').forEach(function(topping)
    {
        toppings.push(topping.value);
    });

    // Add a default of 'None' if no toppings were selectedd
    if (toppings.length == 0)
        toppings.push("None");

    // Create a new pizza object from the values
    pizzaObj = new Pizza(customerName, size, sauce, toppings);

    // Use the objects description function to display the pizza order
    pizzaOutput.textContent = pizzaObj.getDescription();
});
//-------------------------------------------------------------------------------------------------------
// #endregion Pizza Validation
//=======================================================================================================

