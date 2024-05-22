// Sample data structure for doubts
let doubts = [];

// Sample data structure for users
let users = [];

// Function to register a new user
function registerUser(email, password) {
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        console.log("User already exists.");
        return;
    }

    // Add the new user to the users array
    const newUser = { email, password, points: 0 };
    users.push(newUser);
    console.log("User registered successfully:", newUser);
}

// Function to login a user
function loginUser(email, password) {
    // Check if user exists
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        console.log("Invalid email or password.");
        return;
    }

    console.log("User logged in successfully:", user);
}

// Function to post a doubt
function postDoubt(userEmail, doubtText) {
    // Check if user is logged in
    const user = users.find(user => user.email === userEmail);
    if (!user) {
        console.log("User not logged in.");
        return;
    }

    // Add the doubt to the doubts array
    const newDoubt = { id: doubts.length + 1, userEmail, doubtText, answers: [] };
    doubts.push(newDoubt);
    console.log("Doubt posted successfully:", newDoubt);

    // Render the doubt feed
    renderDoubtFeed();
}

// Function to answer a doubt
function answerDoubt(doubtId, userEmail, answerText) {
    // Find the doubt by ID
    const doubt = doubts.find(doubt => doubt.id === doubtId);
    if (!doubt) {
        console.log("Doubt not found.");
        return;
    }

    // Add the answer to the doubt
    const newAnswer = { userEmail, answerText };
    doubt.answers.push(newAnswer);
    console.log("Answer added successfully:", newAnswer);

    // Update user points
    const user = users.find(user => user.email === userEmail);
    if (user) {
        user.points += 10; // Assign 10 points for each answer
        console.log("User points updated:", user.points);
    }

    // Render the doubt feed
    renderDoubtFeed();
}

// Function to render the doubt feed
function renderDoubtFeed() {
    const doubtFeedElement = document.getElementById("doubt-feed");
    doubtFeedElement.innerHTML = ""; // Clear existing doubts

    // Loop through doubts and create HTML elements for each doubt
    doubts.forEach(doubt => {
        const doubtCard = document.createElement("div");
        doubtCard.classList.add("doubt-card");
        doubtCard.innerHTML = `
            <div class="user-email">${doubt.userEmail}</div>
            <div class="doubt-text">${doubt.doubtText}</div>
            <div class="answers">
                ${doubt.answers.map(answer => `<div class="answer">${answer.userEmail}: ${answer.answerText}</div>`).join('')}
            </div>
            <form class="answer-form">
                <textarea class="answer-text" rows="2" placeholder="Type your answer"></textarea>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Post Answer</button>
            </form>
        `;

        // Handle answer submission
        const answerForm = doubtCard.querySelector(".answer-form");
        answerForm.addEventListener("submit", event => {
            event.preventDefault();
            const answerText = answerForm.querySelector(".answer-text").value;
            if (answerText.trim() !== "") {
                answerDoubt(doubt.id, "user@example.com", answerText); // For demo, hardcoding user email
                answerForm.reset();
            }
        });

        doubtFeedElement.appendChild(doubtCard);
    });
}

// Function to render user rankings
function renderUserRankings() {
    const userRankingsElement = document.getElementById("user-rankings");
    userRankingsElement.innerHTML = ""; // Clear existing rankings

    // Sort users by points
    const sortedUsers = users.slice().sort((a, b) => b.points - a.points);

    // Loop through sorted users and create HTML elements for each user
    sortedUsers.forEach((user, index) => {
        const userRanking = document.createElement("div");
        userRanking.classList.add("user-ranking");
        userRanking.textContent = `${index + 1}. ${user.email} (${user.points} points)`;
        userRankingsElement.appendChild(userRanking);
    });
}

// Handle doubt form submission
const postDoubtForm = document.getElementById("post-doubt-form");
postDoubtForm.addEventListener("submit", event => {
    event.preventDefault();
    const doubtText = document.getElementById("doubt-text").value;
    if (doubtText.trim() !== "") {
        postDoubt("user@example.com", doubtText); // For demo, hardcoding user email
        postDoubtForm.reset();
    }
});

// Example usage
registerUser("user@example.com", "password123");
loginUser("user@example.com", "password123");
postDoubt("user@example.com", "How to solve quadratic equations?");
