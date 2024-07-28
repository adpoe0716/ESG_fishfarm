import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Buy() {
  const navigate = useNavigate(); // 跳轉業面的東東

  let market1 = ["雲林縣", "嘉義市", "台南市"]; // 下拉式選單調整區
  let market2 = ["斗南市", "台南鄉", "麥寮鄉"];
  let variety = ["虱目魚", "白蝦", "沙蝦", "文蛤"];

  const [selectedMarket1, setSelectedMarket1] = useState(""); // 用來判斷下拉式選單選誰的處理
  const [selectedMarket2, setSelectedMarket2] = useState("");
  const [selectedVariety, setSelectedVariety] = useState("");

  const handleMarket1Change = (event) => {
    setSelectedMarket1(event.target.value);
  };

  const handleMarket2Change = (event) => {
    setSelectedMarket2(event.target.value);
  };

  const handleVarietyChange = (event) => {
    setSelectedVariety(event.target.value);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  };

  const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing: '0',
    width: '100%',
    maxWidth: '1000px',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#e9e9e9',
    fontWeight: 'bold',
  };

  const rightAlignedCellStyle = {
    ...cellStyle,
    textAlign: 'center', // 修改文本居中
  };

  // 获取当前日期的年、月、日
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 月份是从 0 到 11，所以要加 1
  const day = currentDate.getDate();

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={headerCellStyle} colSpan={4}>購物平台</td>
          </tr>
          <tr>
            <td style={headerCellStyle}>日期</td>
            <td style={rightAlignedCellStyle}>{year}年</td>
            <td style={rightAlignedCellStyle}>{month}月</td>
            <td style={rightAlignedCellStyle}>{day}日</td>
          </tr>
          <tr>
            <td style={headerCellStyle}>市場</td>
            <td style={cellStyle}>
              <select name="c1" value={selectedMarket1} onChange={handleMarket1Change}>
                {market1.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </td>
            <td style={cellStyle} colSpan={2}>
              <select name="c2" value={selectedMarket2} onChange={handleMarket2Change}>
                {market2.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td style={headerCellStyle}>品種</td>
            <td style={cellStyle} colSpan={3}>
              <select name="v1" value={selectedVariety} onChange={handleVarietyChange}>
                {variety.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              <button onClick={handleNextPage2}>查看購物車</button>
            </td>
            <td style={rightAlignedCellStyle} colSpan={1}>
              <button onClick={handleNextPage}>查詢</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  function handleNextPage() {
    navigate('/Buy2', {
      state: {
        year: year,
        month: month,
        day: day,
        market1: selectedMarket1 || "雲林縣", // 這裡在做如果使用者沒有選擇就查詢的話就用第一個傳過去
        market2: selectedMarket2 || "斗南市",
        variety: selectedVariety || "虱目魚"
      }
    });
  }

  function handleNextPage2() {
    navigate('/Buy3');
  }
}
