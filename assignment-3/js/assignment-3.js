//#region Empty
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//#endregion

//#region Global Variables
//--------------------------------------------------------------------------------------
// API Key
const apiKey = "uj4LcpOrfPpCWGoTGgudx55GFryyS7dOdqGAjfFs"; 

// HTML elements
const studentInfo = document.querySelector("#student-info");
const datePicker = document.querySelector("#date-picker");
const previousDay = document.querySelector("#previous-day");
const nextDay = document.querySelector("#next-day");
//--------------------------------------------------------------------------------------
//#endregion

//#region Dynamic Student Name/ID
//--------------------------------------------------------------------------------------
// Displays my name and student id in the p element with the id of "student-info"
studentInfo.textContent = "©2026 | David Dick - 100099683"; // alt-0169 for copywrite symbol found at https://www.alt-codes.net/copyright_alt_code.php
//--------------------------------------------------------------------------------------
//#endregion

//#region Atronomy Picture Of The Day Function
//--------------------------------------------------------------------------------------

// TEST
let targetDate = "2026-08-11"; // today's date (to revise)
getAPOD(targetDate); // call the function (test)

async function getAPOD(date)
{
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error("Unable to get NASA APOD data!");
        }

        console.log("Data received");
    }    
    catch(error)
    {
        console.error(error);
    }
}
//--------------------------------------------------------------------------------------
//#endregion
