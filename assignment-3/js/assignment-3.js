//#region Empty
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//#endregion

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
let targetDate = "2026-08-11"; // today's date (to revise)
getAPOD(targetDate); // call the function (test)

// Displays my name and student id in the p element with the id of "student-info"
studentInfo.textContent = "©2026 | David Dick - 100099683"; // alt-0169 for copywrite symbol found at https://www.alt-codes.net/copyright_alt_code.php
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
