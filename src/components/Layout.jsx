import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout({ title, children }) {
  return (
    <div className="page-container">

      <h3 className="page-title">{title}</h3>

      <main className="page-content">
        {children}
      </main>
    </div>
  );
}
