const { axiosInstance } = require("./axios");

function sendMessage(messageObj, messageText){
    return axiosInstance.get("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
    })
}

function handleMessage(messageObj){
    const messageText = messageObj.text || "";
    // "hello", "/start", "/help"

    if (messageText.charAt[0] === "/"){
        switch (messageText) {
            case "/start":
                return sendMessage(messageObj, "Welcome to our bot!");
            case "/help":
                return sendMessage(messageObj, "Try running /start command");
            case "/suprise": 
                const emojis = ["😃", "🎉", "🚀", "🌟", "💡"];
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

                return sendMessage(messageObj, `Here's a surprise for you: ${randomEmoji}`);
            default:
                return sendMessage(messageObj, "Command not found.")
        }
    } else {
        return sendMessage(messageObj, messageText)
    }
}

 module.exports = { handleMessage };