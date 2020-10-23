import React from "react";
import "./Footer-style.scss";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="links-container">
        <a
          className="footer-link github"
          href="https://github.com/pdouu/react-ecommerce/tree/backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          {}
        </a>

        <div className="footer-link linkedin" />
        <div className="footer-link twitter" />
        <div className="footer-link youtube" />
      </div>
      <div className="logo-container">
        <div className="logo" alt="company-logo" />
        WEARSOMTN
      </div>
    </div>
  );
};
