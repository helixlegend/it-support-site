const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// 👇 ВСТАВЬ СЮДА URL СВОЕГО WEBHOOK
const N8N_WEBHOOK_URL = "https://ersultancore06.app.n8n.cloud/webhook-test/it-support-chat";

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = role;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  addMessage("bot", "⏳ Думаю...");

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await res.json();

    chatBox.lastChild.innerText = data.answer || "Ошибка ответа от ИИ";
  } catch (err) {
    chatBox.lastChild.innerText = "❌ Ошибка соединения с сервером";
  }
});
