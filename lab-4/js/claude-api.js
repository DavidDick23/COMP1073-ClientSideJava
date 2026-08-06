// =========================================================================
// #region Lesson-13
// -------------------------------------------------------------------------
// HELPER: Available API Endpoints
// Base URL: https://georgian.polaristechservices.com

/* CLAUDE API ENDPOINTS */
// 1. POST /api/claude/messages - Send message to Claude
//    Headers: X-Student-API-Key: your_student_id, Content-Type: application/json
//    Body: { model: "claude-3-5-sonnet-20241022", max_tokens: 100, messages: [{ role: "user", content: "your message" }] }
//    Response: { content: [{ text: "Claude's response" }], usage: { input_tokens: 10, output_tokens: 20 } }

// 2. GET /api/claude/status - Check token usage
//    Headers: X-Student-API-Key: your_student_id
//    Response: { student_id: "12345", student_name: "John Doe", tokens_used: 500, tokens_allocated: 10000, tokens_remaining: 9500, is_enabled: true }

// STEP 1: Store the API configuration
// STEP 2: Set the base URL for the Claude API
const baseURL = "https://georgian.polaristechservices.com";
// STEP 3: Set your student API key (student ID)
const studentApiKey = "100099683";
// STEP 4: Set the maximum tokens for API requests
const maxTokens = 1000;

/* STEP 5: Reference the DOM elements you'll need to access */
const userMessage = document.querySelector("#user-message");
const sendMessageBtn = document.querySelector("#send-message");
const checkUsageBtn = document.querySelector("#check-usage");
const results = document.querySelector("#results");

/* STEP 6: Add event listeners for all interactive elements */
// STEP 6a: Send message button
sendMessageBtn.addEventListener("click", sendChatMessage);

// STEP 6b: Check usage button
checkUsageBtn.addEventListener("click", checkTokenUsage);

/* STEP 7: Create the checkTokenUsage function */
function checkTokenUsage()
{
    // STEP 7a: Create complete url
    let url = `${baseURL}/api/claude/status`;
    // STEP 7b: Request status from the API
    fetch(url, {
        headers: {
            "X-Student-API-Key": studentApiKey
        }
    })
    // STEP 7c: Handle the response
    .then(response => {
        return response.json();
    })
    // STEP 7d: Display to user
    .then(json => {
        displayStatus(json);
    })
}

// Displays the json in the console
function displayStatus(json)
{
    // Log the json text
    console.log(json);

    // Create a <pre></pre> element
    let pre = document.createElement("pre");
    pre.textContent = `Is Enabled: ${json.is_enabled}
    Last Used At: ${json.last_used_at}
    Student ID: ${json.student_id}
    Student Name: ${json.student_name}
    Tokens Allocated: ${json.tokens_allocated}
    Tokens Remaining: ${json.tokens_remaining}
    Tokens Used: ${json.tokens_used}`

    // Display the results in the element
    return results.appendChild(pre);
}
// -------------------------------------------------------------------------
// #endregion Lession-13
// =========================================================================


// =========================================================================
// #region LAB EXTENSION: Multi-Message Chat Feature
// After completing the basic implementation, extend the functionality to support conversation history:
// -------------------------------------------------------------------------
// New variable for chat history (empty array)
const conversationHistory = [];

/* LAB STEP 1: Modify sendChatMessage to use conversation history */
// - Add the user's message to conversationHistory
// - Send the entire conversation to the API instead of just the current message
// - Add Claude's response to conversationHistory
function sendChatMessage()
{
    // Get form values
    let userInput = userMessage.value;

    // Don't send empty messages
    if(userInput.trim() === "")
    {
        return; 
    }

    // Add user's message to conversation history
    conversationHistory.push({
        role: "user",
        content: userInput
    });

    // Create complete url
    let url = `${baseURL}/api/claude/messages`;

    // Prepare the request body according to Claude API format
    let body = {
        "model": "claude-sonnet-5",
        "max_tokens": maxTokens,
        "messages": conversationHistory //<- changed to include entire chat
    };

    // Make the API request using fetch()
    fetch(url, {
        method: "POST",
        headers: {
            "X-Student-API-Key": studentApiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    // Handle the response
    .then(response => {
        return response.json();
    })
    // Extract the message content from Claude's response
    .then(json => {
        // Parse reply from Claude
        let reply = json.content[0].text;

        // Add reply to chat history
        conversationHistory.push({
            role: "assistant",
            content: reply
        });

        // Call display message function
        displayMessage(userInput, reply); //<- changed to display user input and reply
    })
}

/* LAB STEP 2: Update the displayResult function for chat-like appearance */
// - Show messages in a conversation format
// - Display user and Claude messages differently
// - Show conversation flow clearly
function displayMessage(userText, claudeText)
{
    // User message
    let userPara = document.createElement("p"); 
    userPara.innerHTML = `<strong>User:</strong> ${userText}`; //interpolate User: with userText and make User: bold
    userPara.style.color = "blue"; //make user's text colour blue

    // Claude message
    let claudePara = document.createElement("p");
    claudePara.innerHTML = `<strong>Claude:</strong> ${claudeText}`; //interpolate Claude: with claudeText and make Claude: bold
    claudePara.style.color = "green"; //make Claude's text green

    // Append the text to the element for chat display
    results.appendChild(userPara);
    results.appendChild(claudePara);
}
// -------------------------------------------------------------------------
// #endregion LAB EXTENSION: Multi-Message Chat Feature
// =========================================================================