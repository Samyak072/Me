(function() {
    // Initialize Audio
    const audio = new Audio("assets/whatsappNotificationTone.mp3");
    audio.preload = "auto";

    // Predefined Content Strings
    const contactString = `
        <div class='social'>
            <a href='mailto:sm2.cse.tmsl@ticollege.org'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/gmail.svg' alt='Gmail'>
                </div>
            </a>
            <a target='_blank' href='https://github.com/Samyak072'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/github.svg' alt='GitHub'>
                </div>
            </a>
            <a target='_blank' href='https://wa.me/'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/whatsapp.svg' alt='WhatsApp'>
                </div>
            </a>
            <a target='_blank' href='https://t.me/'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/telegram.svg' alt='Telegram'>
                </div>
            </a>
            <a target='_blank' href='https://instagram.com/samyak072'>
                <div class='socialItem'>
                    <img class='socialItemI' src='images/instagram.svg' alt='Instagram'>
                </div>
            </a>
            <a href='https://www.twitter.com/' target='_blank' rel='noopener noreferrer'>
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
                <label>Samyak_Mishra.pdf</label>
            </div>
            <a href='assets/YourResume.pdf' download='Samyak_Mishra_Resume.pdf'>
                <img class='download' src='images/downloadIcon.svg' alt='Download Resume'>
            </a>
        </div>
    `;

    const addressString = "I am originally from Durgapur, but now I am in Kolkata.";

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
            fullScreenDP.classList.toggle('active');
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
            messageDiv.textContent = message; // Use textContent for sent messages
        } else if (type === "received") {
            myDiv.className = "received";
            messageDiv.className = "grey";
            messageDiv.innerHTML = message; // Use innerHTML for received messages
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
        showTypingIndicator();
        setLastSeen("typing...");
        await delay(1000); // Simulate typing delay

        switch (inputText.toLowerCase().trim()) {
            case "intro":
                await delay(2000);
                sendTextMessage(`
                    Hello there 👋🏻 <br><br>
                    My name is <span class='bold'><a class='alink'>Samyak Mishra</a>.</span><br><br>
                    Aspiring SDE | C++ | Java | Golang | ML | DSA | OS Contributor | Content Writer | Public Speaker | <span class='bold'>👨🏻‍💻📚</span><br><br>
                    I am interested in solving DSA problems and unravelling different CS concepts.<br><br>
                    Send <span class='bold'>'more'</span> to know more about me.<br>
                `);
                break;
            case "more":
                sendTextMessage(`
                    <span class='sk'>
                        Send a keyword to get what you want to know about me...<br>
                        e.g.<br>
                        <span class='bold'>'skills'</span> to know my skills<br>
                        <span class='bold'>'resume'</span> to get my resume<br>
                        <span class='bold'>'education'</span> to get my education details<br>
                        <span class='bold'>'address'</span> to get my address<br>
                        <span class='bold'>'contact'</span> to get ways to connect with me<br>
                        <span class='bold'>'projects'</span> to get details of my projects<br>
                        <span class='bold'>'clear'</span> to clear conversation<br>
                    </span>
                `);
                break;
            case "resume":
                sendTextMessage(resumeString);
                break;
            case "skills":
                sendTextMessage(`
                    <span class='sk'>
                        I am an Aspiring Software Development Engineer.<br><br>
                        I can comfortably write code in the following languages:<br>
                        <span class='bold'>
                            C++<br>Python<br>Java<br>Golang<br>C<br>... etc.
                        </span><br><br>
                        I have experience with the following technologies:<br>
                        <span class='bold'>
                            TensorFlow<br>Pytorch<br>Keras<br>OpenCV<br>... etc.
                        </span><br><br>
                    </span>
                `);
                break;
            case "education":
                sendTextMessage(`
                    I shall be graduating in 2026 from Techno Main Salt Lake.I am Currently enrolled in B.Tech. program in Computer Science & Engineering.<br><br>
                    Skills matter, so I hope you don't need to know my percentage 😉
                    You can surely checkout my different Tech Profiles. 
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
                    Some finished & unfinished 😅 <br><br>
                    As of now, you can just jump into my <a class='alink' href='https://github.com/Samyak072' target='_blank'>GitHub Handle</a>.<br><br>
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

        hideTypingIndicator();
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

    // Show Typing Indicator
    function showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            typingIndicator.classList.add('active');
        }
    }

    // Hide Typing Indicator
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
            typingIndicator.classList.remove('active');
        }
    }

    // Utility Function to Delay Execution
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Sanitize HTML to Prevent XSS
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Initialize the Chat Functionality
    init();
})();
