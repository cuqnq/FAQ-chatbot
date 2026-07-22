let faq = [];

async function loadFaq() {
  const response = await fetch("faq.json");
  faq = await response.json();
  renderQuickReplies(); // only call this after faq is actually loaded
}

loadFaq();


// Rule-based response (used only for quick-reply buttons — instant, no API call)
function getRuleBasedResponse(input) {
  const lowerInput = input.toLowerCase();
  for (const item of faq) {
    if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
      return item.response;
    }
  }
  return "I'm not sure about that — try asking about our hours, volunteering, or donations.";
}

// AI-powered response (used for typed input — calls your backend, which calls Claude)
async function getAIResponse(input) {
  const response = await fetch("https://faq-chatbot-production-a59f.up.railway.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();
  return data.reply;
}


function botSpeaks() {
  const input = document.getElementById("user-input").value;
  if (!input) return;
  handleUserMessage(input, true); // true = use AI path
  document.getElementById("user-input").value = "";
}


//User wants to click the Send button.
document.getElementById("send-btn").addEventListener("click", botSpeaks);
//User wants to press "Enter" on keyboard.
document.getElementById("user-input").addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
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

// `useAI` decides which response path to take
async function handleUserMessage(text, useAI) {
  addMessage(text, "user-msg");
  const placeholderMsg = addMessage("Thinking...", "bot-msg thinking");

  const response = useAI ? await getAIResponse(text) : getRuleBasedResponse(text);
  streamText(placeholderMsg, response);
  //placeholderMsg.textContent = response;
}

// Quick-Reply feature — instant, rule-based, no API call
function renderQuickReplies() {
  const container = document.getElementById("quick-reply-menu");

  faq.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      handleUserMessage(item.label, false); // false = use rule-based path
      document.getElementById("quick-reply-menu").classList.add("hidden");
    });
    container.appendChild(btn);
  });
}

// Dropdown toggle
document.getElementById("quick-reply-dropdown").addEventListener("click", () => {
  document.getElementById("quick-reply-menu").classList.toggle("hidden");
});