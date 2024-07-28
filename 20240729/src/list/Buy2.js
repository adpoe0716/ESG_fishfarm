import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Buy2() {
  const navigate = useNavigate();
  
  const location = useLocation();       //街上一頁傳來的東東
  const { year, month, day, market1, market2, variety } = location.state;

  //這邊或許是用資料庫的方式拿資料 所以用key value
  let commodity = [{ 海產: "XX海產", 養殖地: "雲林縣麥寮鄉", 價錢: "80" }, { 海產: "YY海產", 養殖地: "雲林縣台西鄉", 價錢: "110" }]

  const [quantities, setQuantities] = useState(commodity.map(() => 1)); //加減號處理

  const handleDecrease = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
  };

  const handleIncrease = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const tableStyle = {   //簡單css設定
    borderCollapse: 'collapse', // 设置相邻单元格的边框合并在一起
    width: '100%', // 设置表格宽度为100%
  };
  const cellStyle = {
    border: '1px solid black', // 设置每个单元格的边框为黑色，1像素宽
    padding: '8px', // 设置单元格内边距
  };

  const rightAlignedCellStyle = {
    ...cellStyle,
    textAlign: 'right', // 设置文本靠右对齐
  };

  const tableRows = commodity.map((item, index) => (
    <tr key={index}>
      <td style={cellStyle}>{item.海產}</td>
      <td style={cellStyle}>{item.養殖地}</td>
      <td style={cellStyle}>
        <button onClick={() => handleDecrease(index)}>-</button>
        {quantities[index]}
        <button onClick={() => handleIncrease(index)}>+</button>
      </td>
      <td style={cellStyle}>{item.價錢}/斤</td>
    </tr>
  ));

  return (
    <>
      <div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={cellStyle} colSpan={1}>日期</td>
              <td style={cellStyle} colSpan={3} >{year}年{month}月{day}日</td>
            </tr>
            <tr>
              <td style={cellStyle}>市場</td>
              <td style={cellStyle} colSpan={3}>{market1 + market2+"場"}</td>
            </tr>
            <tr>
              <td style={cellStyle}>品種</td>
              <td style={cellStyle} colSpan={3}>{variety}</td>
            </tr>
            <tr>
              <td style={cellStyle}>商販</td>
              <td style={cellStyle}>養殖地</td>
              <td style={cellStyle}>購買數量</td>
              <td style={cellStyle}>價錢</td>
            </tr>
            {tableRows}
            <tr>
              <td style={cellStyle}></td>
              <td style={rightAlignedCellStyle}>
                <button onClick={handleNextPage}>返回選單</button>
              </td>
              <td style={rightAlignedCellStyle} colSpan={2}>
                <button onClick={handleNextPage2}>加入購物車</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </>
  );

  function handleNextPage() {
    navigate(-1);
  }
  function handleNextPage2() {
    navigate('/Buy3');
  }
}
