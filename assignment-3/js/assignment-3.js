//======================================================================================
//#region About
//--------------------------------------------------------------------------------------
/*
    This is a simple demonstration using NASA's Open API to display the 'Astronomy
    Picture Of The Day'. The documentation is located at https://api.nasa.gov/ in 
    the 'Browse APIs section.

    The functionality is a bit buggy with the async function but I noticed it took
    quite a while to perform the fetch and that's why I decided to use await while
    fetching.

    When using the calendar please wait a few seconds before proceeding to change dates.
    The alert may prompt from the catch block but during testing you may have to reselect
    the date and it will load.

    Example query: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
*/
//--------------------------------------------------------------------------------------
//#endregion About
//======================================================================================

//#region Global Variables
//--------------------------------------------------------------------------------------
// API Key
const apiKey = "uj4LcpOrfPpCWGoTGgudx55GFryyS7dOdqGAjfFs"; 

// Student Info
const studentInfo = document.querySelector("#student-info");

// Date Selection
const datePicker = document.querySelector("#date-picker");
const previousDay = document.querySelector("#previous-day");
const nextDay = document.querySelector("#next-day");

// APOD Data
const title = document.querySelector("#title");
const dateElement = document.querySelector("#date");
const astronomyImage = document.querySelector("#astronomy-image");
const description = document.querySelector("#description");
const credit = document.querySelector("#credit");
//--------------------------------------------------------------------------------------
//#endregion

//#region Dynamic Page Landing
//--------------------------------------------------------------------------------------
// Create a new date object (today's date) and format it to YYYY-MM-DD
let today = new Date();
let todayFormatted = formatDate(today);

// Debug Date Format
//console.log(targetDate);

// Get today's picture when the page is loaded
getAPOD(todayFormatted);

// Displays my name and student id in the p element with the id of "student-info"
studentInfo.textContent = "©2026 | David Dick - 100099683"; // alt-0169 for copywrite symbol found at https://www.alt-codes.net/copyright_alt_code.php
//--------------------------------------------------------------------------------------
//#endregion

//#region Events
//--------------------------------------------------------------------------------------
// This logic will execute when the date from the calendar changes
datePicker.addEventListener("change", function()
{
    // Get the selected value from the calendar
    const selectedDate = datePicker.value;

    // If the date is greater than todays date
    if (selectedDate > todayFormatted)
    {
        // Set an alert and do not continue
        alert("Cannot select a future date.");
        return;
    }

    // Otherwise, attempt to fetch the data from the selected date
    getAPOD(selectedDate);
});
//--------------------------------------------------------------------------------------
//#endregion

//#region Date Formatter Function
//--------------------------------------------------------------------------------------
// This took a while to figure out, a few resources to locate solution but best answer came from here: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
function formatDate(date) 
{
    // Local variables for formatting
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Add a 0 if the month is not double digits
    if (month < 10) 
        month = '0' + month;

    // Add a 0 if the day is not double digits
    if (day < 10) 
        day = '0' + day;

    // Return in the string in YYYY-MM-DD format
    return [year, month, day].join('-');
}
//--------------------------------------------------------------------------------------
//#endregion

//#region Atronomy Picture Of The Day Function
//--------------------------------------------------------------------------------------
async function getAPOD(date)
{
    // URL with interpolated API key and date to fetch the proper resources
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    // Try-Catch block to handle errors if the URL could not be retrieved
    try
    {
        // Waits for the URL as it may take time to fetch
        const response = await fetch(url); 

        // If there is an issue with the response throw a new error and exit block (go to catch)
        if (!response.ok)
        {
            throw new Error("Unable to get NASA APOD data!");
        }

        // Store the JSON data in a variable to parse
        const data = await response.json();

        // Debug data
        //console.log(data);

        // Set all relevent data to their respective HTML elements to display
        title.textContent = data.title;
        dateElement.textContent = data.date;
        description.textContent = data.explanation;
        astronomyImage.src = data.url;

        // If copywrite info was received, display it
        if (data.copyright)
        {
            credit.textContent = `Image Credit and Copywrite: ${data.copyright}`;
        }
    }    
    catch(error)
    {
        // Debug data
        //console.error(error);
        alert("An Error Has Occurred"); // Create an alert if an error occurred while fetching the URL
    }
}
//--------------------------------------------------------------------------------------
//#endregion