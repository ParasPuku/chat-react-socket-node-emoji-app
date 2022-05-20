import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <header className="chat-header">
      <span className="chat-icon">
        <FontAwesomeIcon icon={faMessage} />
      </span>
      <h2 className="chat-desc">Say.Hello</h2>
    </header>
  );
};

export default Header;
