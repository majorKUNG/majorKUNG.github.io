import { Outlet, Link } from 'react-router-dom';
import headerImg from './assets/header.png';
import './index.css'  //
import Menu from './components/menu.jsx';
import Office from "./pages/office";
import { useLocation } from "react-router-dom";
import Header from './components/Header.jsx';

export default function App() {
  const location = useLocation();

  // Visa inte menyn på login-sidan
  const hideMenu = location.pathname === "/login";

 return (
    <><Header /><div className="app-container">
     {!hideMenu && <Menu />}
     <main>
       <Outlet />
     </main>
   </div></>
  );
}

      {/* Innehåll */}
      <main className="w-full max-w-4xl p-6">
        <Outlet />
      </main>
