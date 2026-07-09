const faq = [
  { 
    label: "Hours", 
    keywords: ["hours", "open", "close"], 
    response: "We're open Monday-Friday, 9am-5pm." 
  },

  { 
    label: "Volunteering", 
    keywords: ["volunteer", "sign up"], 
    response: "You can sign up to volunteer at our website or call us." 
  },

  { label: "Donations", 
    keywords: ["donate", "donation"], 
    response: "You can donate online or mail a check to our office." 
  }
];


//Bot premade response
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  for (const item of faq) {
    if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
      return item.response;
    }
  }
  return "I'm not sure about that — try asking about our hours, volunteering, or donations.";
}

function botSpeaks() {
  const input = document.getElementById("user-input").value;
  if (!input) return;
  handleUserMessage(input);
  document.getElementById("user-input").value = "";
}


//Depends on the user's preference to send an input
document.getElementById("send-btn").addEventListener("click", botSpeaks);

document.getElementById("user-input").addEventListener("keydown", function(event) {
  if (event.key === 'Enter'){
    botSpeaks();
  }
});


function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.textContent = text;
  document.getElementById("messages").appendChild(msg);
  return msg;
}

function handleUserMessage(text) {
  addMessage(text, "user-msg"); // Original text
  const response = getBotResponse(text); // Generated message
  const placeholderMsg = addMessage("Thinking...", "bot-msg thinking");

  setTimeout(() => {
    placeholderMsg.textContent = response;
  }, 2000);
}



// Quick-Reply feature
function renderQuickReplies() {
  const container = document.getElementById("quick-reply-menu");

  faq.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      handleUserMessage(item.label);
      document.getElementById("quick-reply-menu").classList.add("hidden");
    });
    container.appendChild(btn);
  });
}

// Dropdown toggle
document.getElementById("quick-reply-dropdown").addEventListener("click", () => {
  document.getElementById("quick-reply-menu").classList.toggle("hidden");
});

// Build the quick-reply buttons once on load
renderQuickReplies();