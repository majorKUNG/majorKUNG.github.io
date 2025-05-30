import { useState, useEffect } from "react";
import headerImage from "../assets/header.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={headerImage} alt="Hockey Manager Header" />
    </header>
  )
}