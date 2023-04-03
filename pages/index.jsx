import axios from "axios";
import { useEffect, useState, usee } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  // ใช้ useEffect fetch ข้อมูลจาก api
  useEffect(() => {
    axios.get(`https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=EUR`)
    .then((response) => {
      setCrypto(response.data.coins);
    })
  }, [])

  return (
    <div className="App">
      <h1 className="title">Cryptocurrency Finder</h1>
      <input
        type="text"
        placeholder="search with small letters..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {/* สร้างตารางแสดงข้อมูล */}

      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
          </tr>
        </thead>

        <tbody>
          {crypto
            .filter((value) => {
              return value.name.toLowerCase()
              .includes(search)})
              .map((value, id) => {
                return (
                  <>
                    <tr id="id">
                      <td className="rank"> {value.rank} </td>
                      <td className="logo">
                        <a href={value.websiteurl}>
                          <img src={value.icon} alt="logo" width="30px" />
                        </a>
                        <p>{value.name}</p>
                      </td>
                      <td className="symbol"> {value.symbol} </td>
                      <td>${Math.round(value.marketCap)}</td>
                      <td >${Math.round(value.price)}</td>
                      <td>{value.availableSupply}</td>
                    </tr>
                  
                  
                  
                  </>
                )
              })
          }
        </tbody>
      </table>

    </div>
  );
}

export default Home;
