import React, { useState } from "react";
import ChatGPT from "./Chat";
function Window() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleClick}>{isOpen ? "88" : "魚塭助手"}</button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>魚塭助手</h2>
            <ChatGPT />
            <button onClick={handleClick}>
              {isOpen ? "88" : "魚塭助手"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Window;
