import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Picker from "emoji-picker-react";
import Footer from "./Footer";
import Header from "./Header";
import ReactTooltip from "react-tooltip";

const socket = io.connect("http://localhost:5000");
const Main = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState("");
  const [id, setId] = useState(0);
  const [showOption, setShowOption] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });

    console.log("Message are: ", chat);
  });

  const getTime = (currentTime) => {
    var time = currentTime.split(" ");
    var timeFirst = time[0];
    var timeSec = time[1];
    var newTime = timeFirst.slice(0, 4);
    return newTime + " " + timeSec.toLowerCase();
  };

  const generateId = () => {
    setId((prevId) => prevId + 1);
  };

  const handleSubmit = (e) => {
    generateId();
    socket.emit("chat", { id, message, time });
    setMessage("");
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const setData = (e) => {
    // Set Message
    setMessage(e.target.value);

    // Set Time
    var localTime = new Date().toLocaleTimeString();
    const currentTime = getTime(localTime);
    console.log(currentTime);
    setTime(currentTime);
  };

  const handleDeleteMessage = (id) => {
    console.log("Message delete", id);
    const newChat = chat.filter((chat) => chat.id !== id);
    setChat([...newChat]);
    setShowOption(false);
  };

  return (
    <div className="chat-container">
      {/* Header Component */}
      <Header />

      <div className="message-box-container">
        <div className="message-header">
          <h2>Room: Paras</h2>
        </div>
        <div className="message-body">
          <div className="message">
            {chat.length > 0 &&
              chat.map((chat, index) => {
                return (
                  <p
                    key={index}
                    id={chat.id}
                    // onMouseEnter={() => {
                    //   handleDeleteMessage(chat.id);
                    // }}
                  >
                    {chat.message} {}{" "}
                    <span className="currenttime">{chat.time}</span>
                    <span
                      className="option"
                      onClick={() => {
                        // setShowOption((val) => !val);
                        // setCurrentId(chat.id);
                        handleDeleteMessage(chat.id);
                      }}
                    >
                      ...
                    </span>
                  </p>
                );
              })}
            {/* {showOption && (
              <ul className="msg-options">
                <li onClick={() => handleDeleteMessage(currentId)}>Delete</li>
              </ul>
            )} */}
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={setData}
          onKeyDown={(e) => {
            if (
              e.target.value !== "" &&
              e.key === "Enter" &&
              e.keyCode === 13
            ) {
              handleSubmit();
            }
          }}
        />
        <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker((val) => !val)}
        />

        <button
          type="button"
          className="btn"
          onClick={handleSubmit}
          disabled={message === "" ? true : false}
        >
          SEND
        </button>
      </div>

      {showPicker && (
        <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Main;
