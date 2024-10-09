(function() {
    // Initialize Audio
    const audio = new Audio("assets/whatsappNotificationTone.mp3");
    audio.preload = "auto";

    // Predefined Content Strings
    const contactString = `
        <div class='social'>
            <a href='mailto:samyak@example.com'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/gmail.svg' alt='Gmail'>
                </div>
            </a>
            <a target='_blank' href='https://github.com/YourGitHubUsername'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/github.svg' alt='GitHub'>
                </div>
            </a>
            <a target='_blank' href='https://wa.me/919876543210'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/whatsapp.svg' alt='WhatsApp'>
                </div>
            </a>
            <a target='_blank' href='https://t.me/YourTelegramUsername'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/telegram.svg' alt='Telegram'>
                </div>
            </a>
            <a target='_blank' href='https://instagram.com/YourInstagramUsername'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/instagram.svg' alt='Instagram'>
                </div>
            </a>
            <a href='https://www.twitter.com/YourTwitterUsername/' target='_blank' rel='noopener noreferrer'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/twitter.svg' alt='Twitter'>
                </div>
            </a>
        </div>
    `;

    const resumeString = `
        Resume will be updated soon!!! <br><br>
        <img src='images/resumeThumbnail.png' class='resumeThumbnail' alt='Resume Thumbnail'>
        <div class='downloadSpace'>
            <div class='pdfname'>
                <img src='images/pdf.png' alt='PDF Icon'>
                <label>Your Resume.pdf</label>
            </div>
            <a href='assets/YourResume.pdf' download='Your_Name_Resume.pdf'>
                <img class='download' src='images/downloadIcon.svg' alt='Download Resume'>
            </a>
        </div>
    `;

    const addressString = "Currently available for remote work only.";

    // Initialize Chat
    function init() {
        document.addEventListener('DOMContentLoaded', startFunction);
        addEventListeners();
    }

    // Add Event Listeners
    function addEventListeners() {
        const inputField = document.getElementById('inputMSG');
        const sendButton = document.querySelector('.sendBar svg');
        const dpImage = document.querySelector('.dpimg');
        const closeButton = document.querySelector('.closeBTN');

        if (inputField) {
            inputField.addEventListener('keypress', handleKeyPress);
        }

        if (sendButton) {
            sendButton.addEventListener('click', sendMsg);
        }

        if (dpImage) {
            dpImage.addEventListener('click', toggleFullScreenDP);
        }

        if (closeButton) {
            closeButton.addEventListener('click', toggleFullScreenDP);
        }
    }

    // Start Function
    function startFunction() {
        setLastSeen();
        waitAndResponse("intro");
    }

    // Format Time with Leading Zeros and AM/PM
    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; // Convert to 12-hour format
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes} ${ampm}`;
    }

    // Set Last Seen Status
    function setLastSeen(status = "") {
        const lastSeen = document.getElementById("lastseen");
        if (status === "typing...") {
            lastSeen.innerText = "typing...";
        } else {
            const date = new Date();
            lastSeen.innerText = `Last seen today at ${formatTime(date)}`;
        }
    }

    // Toggle Full-Screen Profile Picture
    function toggleFullScreenDP() {
        const fullScreenDP = document.getElementById("fullScreenDP");
        if (fullScreenDP) {
            fullScreenDP.style.display = (fullScreenDP.style.display === "flex") ? "none" : "flex";
        }
    }

    // Handle Enter Key Press
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            sendMsg();
        }
    }

    // Send Message from User
    function sendMsg() {
        const input = document.getElementById("inputMSG");
        const message = input.value.trim();
        if (!message) return;

        createMessageElement(message, "sent");
        input.value = "";

        // Scroll to Bottom
        scrollToBottom();

        // Play Sound
        playSound();

        // Wait and Respond
        setTimeout(() => waitAndResponse(message), 1500);
    }

    // Create and Append Message Element
    function createMessageElement(message, type) {
        const date = new Date();
        const listUL = document.getElementById("listUL");

        if (!listUL) return;

        const myLI = document.createElement("li");
        const myDiv = document.createElement("div");
        const messageDiv = document.createElement("div");
        const dateLabel = document.createElement("label");

        dateLabel.className = "dateLabel";
        dateLabel.innerText = formatTime(date);

        if (type === "sent") {
            myDiv.className = "sent";
            messageDiv.className = "green";
            messageDiv.textContent = message;
        } else if (type === "received") {
            myDiv.className = "received";
            messageDiv.className = "grey";
            messageDiv.innerHTML = message; // Ensure message is sanitized
        }

        messageDiv.appendChild(dateLabel);
        myDiv.appendChild(messageDiv);
        myLI.appendChild(myDiv);
        listUL.appendChild(myLI);
    }

    // Scroll Chat to Bottom
    function scrollToBottom() {
        const chatting = document.getElementById("chatting");
        if (chatting) {
            chatting.scrollTop = chatting.scrollHeight;
        }
    }

    // Play Notification Sound
    function playSound() {
        audio.currentTime = 0; // Reset to start
        audio.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
    }

    // Wait and Respond Based on Input
    async function waitAndResponse(inputText) {
        setLastSeen("typing...");
        await delay(1000); // Simulate typing delay

        switch (inputText.toLowerCase().trim()) {
            case "intro":
                await delay(2000);
                sendTextMessage(`
                    Hello there 👋🏻 <br><br>
                    My name is <span class='bold'><a class='alink'>Samyak</a>.</span><br><br>
                    I am a Lead R&D Engineer currently experimenting mostly on Cybersecurity <span class='bold'>👨🏻‍💻📚</span><br><br>
                    I have experience around building and scaling applications with security over various emerging technologies.<br><br>
                    Send <span class='bold'>'more'</span> to know more about me.<br>
                `);
                break;
            case "more":
                sendTextMessage(`
                    <span class='sk'>
                        Send a keyword to get what you want to know about me...<br>
                        e.g.<br>
                        <span class='bold'>'skills'</span> - to know my skills<br>
                        <span class='bold'>'resume'</span> - to get my resume<br>
                        <span class='bold'>'education'</span> - to get my education details<br>
                        <span class='bold'>'address'</span> - to get my address<br>
                        <span class='bold'>'contact'</span> - to get ways to connect with me<br>
                        <span class='bold'>'projects'</span> - to get details of my projects<br>
                        <span class='bold'>'clear'</span> - to clear conversation<br>
                    </span>
                `);
                break;
            case "resume":
                sendTextMessage(resumeString);
                break;
            case "skills":
                sendTextMessage(`
                    <span class='sk'>
                        I am currently a Software Engineer.<br><br>
                        I can comfortably write code in the following languages:<br>
                        <span class='bold'>
                            JavaScript<br>Python<br>Java<br>CSS<br>... etc.
                        </span><br><br>
                        I have experience with the following technologies:<br>
                        <span class='bold'>
                            NodeJs<br>CubeJs<br>ReactJs<br>Docker<br>ELK<br>AWS<br>... etc.
                        </span><br><br>
                    </span>
                `);
                break;
            case "education":
                sendTextMessage(`
                    I completed a B.E. degree in Computer Science Engineering.<br><br>
                    Skills matter, so I hope you don't need to know my percentage 😉
                `);
                break;
            case "address":
                sendTextMessage(addressString);
                break;
            case "contact":
                sendTextMessage(contactString);
                break;
            case "projects":
                sendTextMessage(`
                    Many finished & unfinished 😅 <br><br>
                    As of now, you can just jump into my <a class='alink' href='https://github.com/YourGitHubUsername' target='_blank'>GitHub Account</a>.<br><br>
                `);
                break;
            case "clear":
                clearChat();
                break;
            default:
                await delay(2000);
                sendTextMessage("Hey, I couldn't catch you ...😢<br>Send 'more' to know more about me.");
                break;
        }

        setLastSeen();
    }

    // Send Received Message
    function sendTextMessage(message) {
        createMessageElement(message, "received");
        scrollToBottom();
        playSound();
    }

    // Clear Chat History
    function clearChat() {
        const listUL = document.getElementById("listUL");
        if (listUL) {
            listUL.innerHTML = "";
        }
        waitAndResponse("intro");
    }

    // Utility Function to Delay Execution
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Initialize the Chat Functionality
    init();
})();

