import { Link, useNavigate } from "react-router-dom";
import "./menu.css";

export default function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("teamId");
    localStorage.removeItem("players");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="menu">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/office">Office</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/league">League</Link></li>
        <li><Link to="/training">Training</Link></li>
        <li><Link to="/arena">Arena</Link></li>
        <li><Link to="/stats">Statistics</Link></li>
        <li><Link to="/finance">Finance</Link></li>
        <li><Link to="/transfers">Transfers</Link></li>
        <li><Link to="/wiki">Wiki</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logga ut</button></li>
      </ul>
    </nav>
  );
}
