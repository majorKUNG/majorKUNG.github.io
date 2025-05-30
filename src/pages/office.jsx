import Layout from "../components/Layout";
import "./office.css";
import "../components/layout.css";
import "./table.css";
import rockstar from "../assets/sponsor.png";



export default function Office() {

  const teamId = localStorage.getItem("teamId");
  const userName = localStorage.getItem("userName");

  return (
    <Layout title="Office">
      <div className="box-left">
        <div className="finance-box">
        <h3 className="column-header">Logo</h3>
        <ul>
          <li><strong>Placeholder</strong></li>
        </ul>
        </div>
      

      <div className="finance-box">
        <h3 className="th2">Head Sponsor</h3>
        <ul>
          <li><img src={rockstar} alt="rockstar" /></li>
        </ul>
        </div>

        <div className="finance-box">
        <h3 className="th2">Media Sponsor</h3>
        <ul>
          <li><strong>Sponsor Placeholder</strong></li>
        </ul>
        </div>
      </div>

      <div className="box-right">
      <div className="finance-box">
        <h3 className="th2">Team Name</h3>
        <div className="box-left-con">
        <table className="finance-table">
          <tbody>
            <tr><td><strong>Manager</strong></td><td>majorKUNG</td></tr>
            <tr><td><strong>Country</strong></td><td>123</td></tr>
            <tr><td><strong>Town</strong></td><td>Västerås</td></tr>
            <tr><td><strong>Start Date</strong></td><td>2025-05-26</td></tr>
          </tbody>
          </table>
          </div>

        <div className="box-right-con">
        <table className="finance-table">
          <thead>
            <tr><td><strong>League</strong></td><td>123</td></tr>
            <tr><td><strong>Team ID</strong></td><td>1337</td></tr>
            <tr><td><strong>Team Ranking</strong></td><td>12 / 4112</td></tr>
            <tr><td><strong>Last Login</strong></td><td>2025-05-26</td></tr>
          </thead>
          </table>
          </div>
      </div>


      <div className="finance-box">
        <h3 className="th2">Achievements</h3>
        <ul>
          <li>🏆 SHL 1x</li>
          <li>🥈 Warehouse Cup: 3x</li>
          <li>🥈 Warehouse Cup: 3x</li>
          <li>🥈 Warehouse Cup: 3x</li>
        </ul>
      </div>

      <div className="finance-box">
        <h3 className="th2">Press News</h3>
        <p><strong>I am the captain!</strong> (2025.05.16 12:58)</p>
        <p>
          Bara bada lite bastu nåja
        </p>
      </div>
       </div>
    </Layout>
  );
}
