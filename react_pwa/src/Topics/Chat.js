import React, { useState } from "react";
import "./Chat.css";

function ChatGPT() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");


  const handleMessageSend = async () => {
    if (inputText.trim() !== "") {
      try {
        setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'me' }]);
        const response = await fetch('http://localhost:3000/api/search/GPT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Q: inputText })
        });
        const responseData = await response.json();
  
        console.log(responseData);
   
        if (responseData && responseData.ans && responseData.ans.length > 0) {
          // const gptResponse = responseData.ans[0].message.content;
          const gptResponse = responseData.ans;
          setMessages(prevMessages => [...prevMessages, { text: gptResponse, sender: 'GPT' }]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setInputText("");
  };
  

  return (
    <div className="Chat">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="問吧"
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;
