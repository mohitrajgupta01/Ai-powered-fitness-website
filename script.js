let select=document.querySelector(".select-heading")
let options=document.querySelector(".options")
let arrow=document.querySelector(".select-heading img")
let option=document.querySelectorAll(".option")
let selecttext=document.querySelector(".select-heading span")
let chatbox = document.querySelector(".chat-box");  


select.addEventListener("click",()=>{
    options.classList.toggle("active-options")
    arrow.classList.toggle("rotate")
})

option.forEach((item)=>{
  item.addEventListener("click",()=>{
    selecttext.innerText=item.innerText
  })
})

// chat bot

let prompt=document.querySelector(".prompt")
let chatbtn=document.querySelector(".input-area button")
let chatContainer=document.querySelector(".chat-container")
let h1=document.querySelector(".h1")
let chatimg=document.querySelector("#chatbotimg")
let chatbot=document.querySelector(".chat-bot")


let userMessage="";


let Api_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBhSkubigr58jeULbtCSE3lPsgqfejvBv8"





// api handiling {
async function generateApiResponse(aiChatBox){

  const textElement=aiChatBox.querySelector(".text")
  
  try{
  const response=await fetch(Api_url, {
  method: "POST",
  headers:{"Content-Type": "application/json"},
  body:JSON.stringify({
  contents:[{
  "role": "user",
  "parts":[{text:` ${userMessage} in 10 words`}]
  }]
  })
  })
  
  const data=await response.json()
  const apiResponse=data?.candidates[0].content.parts[0].text.trim(); 
  textElement.innerText=apiResponse

}

catch(error){
console.log(error)
}
finally{
aiChatBox.querySelector(".loading").style.display="none"
}
}

/// }



function createChatBox(html,className){
  const div = document.createElement("div")
  div.classList.add(className)
  div.innerHTML=html;
  return div;
}





chatbtn.addEventListener("click",()=>{
  h1.style.display="none"
  userMessage=prompt.value;
  const html= `<p class="text">${userMessage}</p>`

  let userChatBox=createChatBox(html,"user-chat-box")
  userChatBox.querySelector(".text").innertext=userMessage
  chatContainer.appendChild(userChatBox)
  prompt.value=""
  setTimeout(showLoading,500)
})



function showLoading(){

   const html= `<p class="text">${userMessage}</p>
   <img src="load.gif" class="loading" width="50px">`

  let aiChatBox=createChatBox(html,"Ai-chat-box")
  
  chatContainer.appendChild(aiChatBox)
  
  generateApiResponse(aiChatBox)
  
  }





  chatimg.addEventListener("click",()=>{
    chatbox.classList.toggle("active-chat-box")
    if(chatbox.classList.contains("active-chat-box")){
      chatimg.src="cross.svg"
    }else{
      chatimg.src="chatbot.svg"
    }
  
  })



  //virtual assistant

let ai =document.querySelector(".virtual-assistant img")
let speakpage =document.querySelector(".speak-page")
let content =document.querySelector(".speak-page h1")






function speak(text){
  let text_speak=new SpeechSynthesisUtterance(text)
  text_speak.rate=1
  text_speak.pitch=1
  text_speak.volume=1
  text_speak.lang="hi-GB"
  window.speechSynthesis.speak(text_speak)

}

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition()

recognition.onresult=(event)=>{
  speakpage.style.display="none"
  let currentIndex=event.resultIndex
  let transcript=event.results[currentIndex][0].transcript
  content.innerText=transcript
  takeCommand(transcript.toLowerCase())
}



function takeCommand(message){
  if(message.includes("open") && message.includes("chat")){
    speak("okay sir")
    chatbox.classList.add("active-chat-box")
  }else if(message.includes("close") && message.includes("chat")){
    speak("okay sir")
    chatbox.classList.remove("active-chat-box")
  }else if(message.includes("back") && message.includes("workout")){
    speak("okay sir")
    window.open("back.html","_self")
  }
  else if(message.includes("leg") && message.includes("workout")){
    speak("okay sir")
    window.open("leg.html","_self")
  }
  else if(message.includes("chest") && message.includes("workout")){
    speak("okay sir")
    window.open("chest.html","_self")
  }
  else if(message.includes("Biceps & tricepe") && message.includes("workout")){
    speak("okay sir")
    window.open("Biceps-tricepe.html","_self")
  }
  else if(message.includes("shoulder") && message.includes("workout")){
    speak("okay sir","self")
    window.open("shoulder.html","_self")
  }
  else if(message.includes("all ") && message.includes("workout")){
    speak("okay sir")
    window.open("workout.html","_self")
  }
  else if(message.includes("home") || message.includes("main")){
    speak("okay sir")
    window.open("index.html","_self")
  }
  else if(message.includes("hellow") || message.includes("hi")){
    speak("i am fine sir how are you")
    
  }
  if (message.includes("hello") || message.includes("hi")) {
    speak("I am fine sir, how are you?");
} else if (message.includes("good morning")) {
    speak("Good morning! How can I assist you today?");
} else if (message.includes("how are you")) {
    speak("I am doing great, thank you! How about you?");
} else if (message.includes("what's your name")) {
    speak("I am your virtual assistant. How may I help you?");
} else if (message.includes("bye") || message.includes("goodbye")) {
    speak("Goodbye! Have a great day ahead!");
} else if (message.includes("thank you") || message.includes("thanks")) {
    speak("You're welcome! Happy to help.");
} else if (message.includes("what can you do")) {
    speak("I can assist you with various tasks such as answering questions, providing information, and much more!");
} else if (message.includes("help")) {
    speak("How can I assist you? Feel free to ask me anything.");
} else if (message.includes("good night")) {
    speak("Good night! Sleep well.");
} else if (message.includes("tell me a joke")) {
    speak("Why don't scientists trust atoms? Because they make up everything!");
}
else if (message.includes("who is vinod")) {
  speak("vinod is also known as ansh raj currently he doing b tech in electrical engineers from iem");
}

  
}

ai.addEventListener("click",()=>{
  recognition.start()
  speakpage.style.display="flex"
})
