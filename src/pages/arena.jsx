import React, { useState } from "react";
import Layout from "../components/Layout";
import "./office.css";
import "../components/layout.css";
import "./table.css";
import rockstar from "../assets/sponsor.png";
import stadiumPlaceholder from "../assets/stadium_placeholder.png";
import star1 from "../assets/star1.png";
import star2 from "../assets/star2.png";

export default function Arena() {
  const [prices, setPrices] = useState({
    standing: 15,
    seating: 21,
    vip: 30,
  });

  const handlePriceChange = (type, value) => {
    setPrices(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const teamId = localStorage.getItem("teamId");
  const userName = localStorage.getItem("userName");

  return (
    <Layout title="Arena">
      <div className="box-left">
        <div className="finance-box">
          <h3 className="column-header">Ticket Prices</h3>
          <table className="finance-table">
            <tbody>
              <tr>
                <td><strong>Standing</strong></td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={prices.standing}
                    onChange={e => handlePriceChange("standing", Number(e.target.value))}
                    style={{ width: 40, textAlign: "right" }}
                  />{" "}
                  €
                </td>
              </tr>
              <tr>
                <td><strong>Seating</strong></td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={prices.seating}
                    onChange={e => handlePriceChange("seating", Number(e.target.value))}
                    style={{ width: 40, textAlign: "right" }}
                  />{" "}
                  €
                </td>
              </tr>
              <tr>
                <td><strong>VIP</strong></td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={prices.vip}
                    onChange={e => handlePriceChange("vip", Number(e.target.value))}
                    style={{ width: 40, textAlign: "right" }}
                  />{" "}
                  €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      

      <div className="finance-box">
        <h3 className="th2">Facilitation</h3>
        <table className="finance-table">
          <tbody>
            <tr><td><strong>Fanshop</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
            <tr><td><strong>Restaurant</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
            <tr><td><strong>Cafeteria</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
            <tr><td><strong>Press Center</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
          </tbody>
          </table>
        </div>

        <div className="finance-box">
        <h3 className="th2">Ground</h3>
         <table className="finance-table">
          <tbody>
            <tr><td><strong>Parking</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
            <tr><td><strong>Scoreboard</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
            <tr><td><strong>Zamboni</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
            <tr><td><strong>Light</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
            <tr><td><strong>Sound</strong></td><td>
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star2} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} />
                <img src={star1} alt="Stadium" style={{ width: 14, height: 14 }} /></td></tr>
          </tbody>
          </table>
        </div>
      </div>

      <div className="box-right">
      <div className="finance-box">
        <h3 className="th2">Stadium Info</h3>
        <table className="finance-table stadium-table">
          <thead>
          </thead>
          <tbody>
            <tr>
              <td><strong>Team</strong><br />Irsta Vikings</td>
              <td><strong>Stadium Name</strong><br />Idavallen</td>
              <td><strong>Capacity</strong><br />21000</td>
            </tr>
          </tbody>
        </table>
         <img src={stadiumPlaceholder} alt="Stadium" style={{ width: "100%", maxWidth: 806, borderRadius: 8, marginTop: 12 }} />
      </div>


      <div className="finance-box">
        <h3 className="th2">Attendance</h3>
       <table className="finance-table">
          <thead>
          </thead>
          <tbody>
            <tr>
              <td><strong>Opponent</strong></td>
              <td><strong>Standing</strong></td>
              <td><strong>Seating</strong></td>
              <td><strong>VIP</strong></td>
              <td><strong>Total</strong></td>
              <td><strong>%</strong></td>
            </tr>
               <tr>
              <td>Irsta Vikings</td>
              <td>4501</td>
              <td>14682</td>
              <td>354</td>
              <td>20964</td>
              <td>99%</td>
            </tr>
               <tr>
              <td>Västerås IK</td>
              <td>4501</td>
              <td>14682</td>
              <td>354</td>
              <td>20964</td>
              <td>99%</td>
            </tr>
               <tr>
              <td>Linköping HC</td>
              <td>4501</td>
              <td>14682</td>
              <td>354</td>
              <td>20964</td>
              <td>99%</td>
            </tr>
               <tr>
              <td>Kundportalen HC</td>
              <td>4501</td>
              <td>14682</td>
              <td>354</td>
              <td>20964</td>
              <td>99%</td>
            </tr>
               <tr>
              <td>Skultuna Brazzers</td>
              <td>4501</td>
              <td>14682</td>
              <td>354</td>
              <td>20964</td>
              <td>99%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="finance-box">
        <h3 className="th2">Placeholder</h3>
        <ul>
          <li>🏆 Placeholer</li>
        </ul>
      </div>
       </div>
    </Layout>
  );
}
