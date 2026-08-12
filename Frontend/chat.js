
const input = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.querySelector(".chat-box");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const prompt = input.value.trim();
    const userEmail = localStorage.getItem("userEmail");
    if (!prompt) return;

    // Remove Hero Section
    const hero = document.querySelector(".hero");

    if (hero) {
        hero.remove();
    }

    // User Message
    addMessage(prompt, "user");

    input.value = "";

    // Disable Input
    input.disabled = true;
    sendBtn.disabled = true;

    // Loading Message
    const loading = addMessage("🤖 Orbit AI is thinking...", "bot");

    try {

        const response = await fetch(
           "/chat",
            {
                method: "POST",

               headers:{
                        "Content-Type":"application/json"
                        },

                body: JSON.stringify({

                prompt: prompt,
                userEmail: userEmail

            })

            }
        );

        loading.remove();

        if (!response.ok) {

            addMessage(
                `❌ API Error (${response.status})`,
                "bot"
            );

            input.disabled = false;
            sendBtn.disabled = false;

            input.focus();

            return;
        }

        const data = await response.json();

        if (
            data.choices &&
            data.choices.length > 0
        ) {

            addMessage(
                data.choices[0].message.content,
                "bot"
            );

        }
        else {

            addMessage(
                "❌ No response received.",
                "bot"
            );

        }

    }

    catch (error) {

        console.error(error);

        loading.remove();

        addMessage(
            "❌ Failed to connect with Orbit AI.",
            "bot"
        );

    }

    input.disabled = false;
    sendBtn.disabled = false;

    input.focus();

}

function addMessage(text, type) {

    const msg = document.createElement("div");

    msg.classList.add("message", type);

    if (type === "bot") {

        msg.innerHTML = marked.parse(text);

    }
    else {

        msg.textContent = text;

    }

    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;

    return msg;

}

async function loadChatHistory() {

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) return;

    try {

        const response = await fetch(`/chat-history/${userEmail}`);

        const chats = await response.json();

        // Hero remove
        const hero = document.querySelector(".hero");

        if (hero) {
            hero.remove();
        }

        chats.forEach(chat => {

            addMessage(chat.user_message, "user");

            addMessage(chat.bot_message, "bot");

        });

    }

    catch (err) {

        console.log(err);

    }

    loadChatHistory();

}