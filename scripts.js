var audio = new Audio("assets/whatsappNotificationTone.mp3");
var contactString =
  "<div class='social'> <a href='mailto:dhanushnehrustudio@gmail.com'> <div class='socialItem'><img class='socialItemI' src='images/gmail.svg' alt=''></div> </a> <a target='_blank' href='https://github.com/DhanushNehru'> <div class='socialItem'><img class='socialItemI' src='images/github.svg' alt=''></div> </a> <a target='_blank' href='https://wa.me/918072157649'> <div class='socialItem'></div> </a> <a target='_blank' href='https://t.me/DhanushNehru'>  </a> <a target='_blank' href='https://instagram.com/dhanush_nehru'> <div class='socialItem'><img class='socialItemI' src='images/instagram.svg' alt=''> </div> </a> " +
  //"<div> <a href='https://www.linkedin.com/in/dhanushnehru/' target='_blank' rel='noopener noreferrer'> <div class='socialItem'><img class='socialItemI' src='images/linkedin.svg' alt=''></div> </a> </div>" +
  "<div> <a href='https://www.twitter.com/Dhanush_Nehru/' target='_blank' rel='noopener noreferrer'> <div class='socialItem'><img class='socialItemI' src='images/twitter.svg' alt=''></div> </a> </div>";
var resumeString =
  "Resume to be updated fully !!! </br> </br> <img src='images/resumeThumbnail.png' class='resumeThumbnail'><div class='downloadSpace'><div class='pdfname'><img src='images/pdf.png'><label>Dhanush Resume.pdf</label></div><a href='assets/DhanushResume.pdf' download='Dhanush_Nehru_Resume.pdf'><img class='download' src='images/downloadIcon.svg'></a></div>";
// var addressString =
//   "<div class='mapview'><iframe src='' class='map'></iframe></div><label class='add'><address><br>Coonoor, Tamilnadu, INDIA </address>";
var addressString = "Currently Wfh, Remote Work Only";
document.addEventListener("DOMContentLoaded", function () {
  startFunction();
});


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

function isEnter(event) {
  if (event.keyCode == 13) {
    sendMsg();
  }
}

function sendMsg() {
  var input = document.getElementById("inputMSG");
  var ti = input.value;
  if (input.value == "") {
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
  greendiv.innerText = input.value;
  myDiv.appendChild(greendiv);
  myLI.appendChild(myDiv);
  greendiv.appendChild(dateLabel);
  document.getElementById("listUL").appendChild(myLI);
  var s = document.getElementById("chatting");
  s.scrollTop = s.scrollHeight;
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
          "Hello there 👋🏻 <br><br>My name is <span class='bold'><a class='alink'>Dhanush N</a>.</span><br><br>I am a Lead R&D Engineer currently experimenting mostly on Cybersecurity <span class='bold'>👨🏻‍💻📚</span><br><br>I have experience around building and scaling applications with security over various emerging technologies.<br><br>Send <span class='bold'>'more'</span> to know more about me.<br>"
        );
      }, 2000);
      break;
    // Other cases
  }
}

function clearChat() {
  document.getElementById("listUL").innerHTML = "";
  waitAndResponce("intro");
}

function sendTextMessage(textToSend) {
  setTimeout(setLastSeen, 1000);
  var date = new Date();
  var myLI = document.createElement("li");
  var myDiv = document.createElement("div");
  var greendiv = document.createElement("div");
  var dateLabel = document.createElement("label");
  dateLabel.setAttribute("id", "sentlabel");
  dateLabel.id = "sentlabel";
  dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
  myDiv.setAttribute("class", "received");
  greendiv.setAttribute("class", "grey");
  greendiv.innerHTML = textToSend;
  myDiv.appendChild(greendiv);
  myLI.appendChild(myDiv);
  greendiv.appendChild(dateLabel);
  document.getElementById("listUL").appendChild(myLI);
  var s = document.getElementById("chatting");
  s.scrollTop = s.scrollHeight;
  playSound();
}

function sendResponse() {
  setTimeout(setLastSeen, 1000);
  var date = new Date();
  var myLI = document.createElement("li");
  var myDiv = document.createElement("div");
  var greendiv = document.createElement("div");
  var dateLabel = document.createElement("label");
  dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
  myDiv.setAttribute("class", "received");
  greendiv.setAttribute("class", "grey");
  dateLabel.setAttribute("class", "dateLabel");
  greendiv.innerText = "Dummy text";
  myDiv.appendChild(greendiv);
  myLI.appendChild(myDiv);
  greendiv.appendChild(dateLabel);
  document.getElementById("listUL").appendChild(myLI);
  var s = document.getElementById("chatting");
  s.scrollTop = s.scrollHeight;
  playSound();
}

function playSound() {
  audio.play();
}
