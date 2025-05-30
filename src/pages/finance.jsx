import "./finance.css";
import Layout from "../components/Layout";
import "../components/layout.css";
import "./table.css";
import rockstar from "../assets/sponsor.png";
import coca from "../assets/sponsor1.png";

export default function Finance() {
  
  return (
    <Layout title="Finances">

     
        {/* Left Column */}
        <div className="finance-left">
          <div className="finance-box">
            <h3 className="th2">Account Book (Season 0.1)</h3>

            {/* Revenue Table */}
            <table className="finance-table">
              <thead>
                <tr>
                  <th className="th2" colSpan="2">Income</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Home games</td><td>1 185 286 €</td></tr>
                <tr><td>Sponsor</td><td>822 470 €</td></tr>
                <tr><td>Transfers</td><td>822 470 €</td></tr>
                <tr><td>Fanshop</td><td>12 340 €</td></tr>
                <tr><td>Other</td><td>396 132 €</td></tr>
                <tr className="total-row"><td><strong>Total</strong></td><td><strong>2 088 511 €</strong></td></tr>
              </tbody>
            </table>

            {/* Expense Table */}
            <table className="finance-table">
              <thead>
                <tr>
                  <th className="th2" colSpan="2">Expenses</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Salaries</td><td>387 060 €</td></tr>
                <tr><td>Arena</td><td>500 000 €</td></tr>
                <tr><td>Facilitation</td><td>0 €</td></tr>
                <tr><td>Transfers</td><td>396 132 €</td></tr>
                <tr><td>Other</td><td>396 132 €</td></tr>
                <tr className="total-row"><td><strong>Total</strong></td><td><strong>1 447 772 €</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="finance-right">
          <div className="finance-box">
            <h3 className="th2">Head Sponsor</h3>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 24 }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                <li>
                  <img src={coca} alt="coca" style={{ maxWidth: 80, borderRadius: 8 }} />
                </li>
              </ul>
              <table className="finance-table" style={{ minWidth: 260 }}>
                <thead>
                  <tr>
                    <th className="th2" colSpan={2}>Sponsor Coca Cola</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Contract Worth</td>
                    <td>7 562 880 €</td>
                  </tr>
                  <tr>
                    <td>Contract Time</td>
                    <td>One season</td>
                  </tr>
                  <tr>
                    <td>Per win</td>
                    <td>3 000 €</td>
                  </tr>
                  <tr>
                    <td>Per game</td>
                    <td>17 000 €</td>
                  </tr>
                  <tr>
                    <td>Title bonus</td>
                    <td>17 000 €</td>
                  </tr>
                  <tr>
                    <td>Weekly donation</td>
                    <td>20 000 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="finance-box">
            <h3 className="th2">Media Sponsor</h3>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 24 }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                <li>
                  <img src={rockstar} alt="rockstar" style={{ maxWidth: 80, borderRadius: 8 }} />
                </li>
              </ul>
              <table className="finance-table" style={{ minWidth: 260 }}>
                <thead>
                  <tr>
                    <th className="th2" colSpan={2}>Sponsor Rockstar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Contract Worth</td>
                    <td>4 562 880 €</td>
                  </tr>
                  <tr>
                    <td>Contract Time</td>
                    <td>One season</td>
                  </tr>
                  <tr>
                    <td>Per win</td>
                    <td>3 000 €</td>
                  </tr>
                  <tr>
                    <td>Per home game</td>
                    <td>17 000 €</td>
                  </tr>
                  <tr>
                    <td>Weekly donation</td>
                    <td>100 000 €</td>
                  </tr>
                </tbody>
              </table>
              
          </div>

        </div>
        </div>
    </Layout>
  );
}
