import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="chat-footer">
        <p>Copyright @2022</p>
        <p>
          <Link to="/">Say.Hello</Link>
        </p>
        <p>Created by Paras Puru</p>
        <a href="https://github.com/ParasPuku" target="_blank">
          <p className="github">Github</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
