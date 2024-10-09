var audio = new Audio("assets/whatsappNotificationTone.mp3");
var contactString =
  "<div class='social'> <a href='mailto:samyakmishra61@gmail.com'> <div class='socialItem'><img class='socialItemI' src='images/gmail.svg' alt=''></div> </a> <a target='_blank' href='https://github.com/DhanushNehru'> <div class='socialItem'><img class='socialItemI' src='images/github.svg' alt=''></div> </a> <a target='_blank' href='https://wa.me/918072157649'> <div class='socialItem'></div> </a> <a target='_blank' href='https://t.me/DhanushNehru'>  </a> <a target='_blank' href='https://instagram.com/dhanush_nehru'> <div class='socialItem'><img class='socialItemI' src='images/instagram.svg' alt=''></div> </a> " +
  "<div> <a href='https://www.twitter.com/' target='_blank' rel='noopener noreferrer'> <div class='socialItem'><img class='socialItemI' src='images/twitter.svg' alt=''></div> </a> </div>";

var resumeString =
  "Resume to be updated fully!!! </br> </br> <img src='images/resumeThumbnail.png' class='resumeThumbnail'><div class='downloadSpace'><div class='pdfname'><img src='images/pdf.png'><label>Samyak Resume.pdf</label></div><a href='assets/Profile.pdf' download='Profile.pdf'><img class='download' src='images/downloadIcon.svg'></a></div>";

var addressString = "Currently WFH, Remote Work Only";

function startFunction() {
  setLastSeen();
  waitAndResponce("intro");
}

function setLastSeen() {
  var date = new Date();
  var lastSeen = document.getElementById("lastseen");
  lastSeen.innerText =
    "last seen today at " + date.getHours() + ":" + date.getMinutes();
}

function closeFullDP() {
  var x = document.getElementById("fullScreenDP");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}

function openFullScreenDP() {
  var x = document.getElementById("fullScreenDP");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}

function isEnter(event) {
  if (event.keyCode == 13) {
    sendMsg();
  }
}

function sendMsg() {
  var input = document.getElementById("inputMSG");
  var ti = input.value.trim();
  if (ti === "") {
    return;
  }

  var date = new Date();
  var myLI = document.createElement("li");
  var myDiv = document.createElement("div");
  var greendiv = document.createElement("div");
  var dateLabel = document.createElement("label");

  dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
  myDiv.setAttribute("class", "sent");
  greendiv.setAttribute("class", "green");
  dateLabel.setAttribute("class", "dateLabel");

  greendiv.innerText = ti;
  myDiv.appendChild(greendiv);
  myLI.appendChild(myDiv);
  greendiv.appendChild(dateLabel);
  
  document.getElementById("listUL").appendChild(myLI);
  document.getElementById("chatting").scrollTop = document.getElementById("chatting").scrollHeight;

  setTimeout(function () {
    waitAndResponce(ti);
  }, 1500);
  
  input.value = "";
  playSound();
}

function waitAndResponce(inputText) {
  var lastSeen = document.getElementById("lastseen");
  lastSeen.innerText = "typing...";
  
  switch (inputText.toLowerCase().trim()) {
    case "intro":
      setTimeout(() => {
        sendTextMessage(
          `Hello there 👋🏻 <br><br>
          My name is <span class="bold"><a href="#" class="alink">Samyak Mishra</a> 👨🏻‍💻📚</span><br><br>
          I have experience in building and scaling applications with security over various emerging technologies.<br><br>
          Send <span class="bold">'more'</span> to know more about me.<br>`
        );
      }, 2000);
      break;
    case "more":
      sendTextMessage(
        "<span class='sk'>Send Keyword to get what you want to know about me...<br>e.g<br><span class='bold'>'skills'</span> - to know my skills<br><span class='bold'>'resume'</span> - to get my resume<br><span class='bold'>'education'</span> - to get my education details<br><span class='bold'>'address'</span> - to get my address<br><span class='bold'>'contact'</span> - to get ways to connect with me<br><span class='bold'>'projects'</span> - to get details of my projects<br><span class='bold'>'clear'</span> - to clear conversation<br>"
      );
      break;
    case "resume":
      sendTextMessage(resumeString);
      break;
    case "skills":
      sendTextMessage(
        "<span class='sk'>I am currently a Software Engineer.<br><br>I can comfortably write code in the following languages:<br><span class='bold'>Javascript<br>Python<br>Java<br>CSS<br>... etc.</span><br><br>I've experience with the following technologies:<br><span class='bold'>NodeJs<br>CubeJs<br>ReactJs<br>Docker<br>ELK<br>AWS<br>... etc.</span><br>"
      );
      break;
    case "education":
      sendTextMessage(
        "I completed B.E degree in Computer Science Engineering.<br><br>Skills matter more, so hope you don't need to know my percentage 😉"
      );
      break;
    case "address":
      sendTextMessage(addressString);
      break;
    case "clear":
      clearChat();
      break;
    case "contact":
      sendTextMessage(contactString);
      break;
    case "projects":
      sendTextMessage(
        "Many finished & unfinished 😅 </br></br> As of now, you can just jump into my Github Account.<br><br><div class='social'><a target='_blank' href='https://github.com/DhanushNehru'> <div class='socialItem'><img class='socialItemI' src='images/github.svg' alt=''></div> </a></div>"
      );
      break;
    default:
      setTimeout(() => {
        sendTextMessage(
          "Hey, I couldn't catch you ...😢<br>Send 'more' to know more about me."
        );
      }, 2000);
      break;
  }
}

function clearChat() {
  document.getElementById("listUL").innerHTML = "";
  waitAndResponce("intro");
}

function sendTextMessage(textToSend) {
  var date = new Date();
  var myLI = document.createElement("li");
  var myDiv = document.createElement("div");
  var greendiv = document.createElement("div");
  var dateLabel = document.createElement("label");

  dateLabel.setAttribute("class", "dateLabel");
  dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
  myDiv.setAttribute("class", "received");
  greendiv.setAttribute("class", "grey");
  greendiv.innerHTML = textToSend;

  myDiv.appendChild(greendiv);
  greendiv.appendChild(dateLabel);
  myLI.appendChild(myDiv);
  document.getElementById("listUL").appendChild(myLI);
  
  document.getElementById("chatting").scrollTop = document.getElementById("chatting").scrollHeight;
  playSound();
}

function playSound() {
  audio.play();
}
