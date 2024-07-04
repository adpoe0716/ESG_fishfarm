// import React, { useState, useEffect } from "react";
// // import "./index.css";
// import Meter from "./../Topics/Meter";
// import BarChart from "./../Topics/Bar";
// import LineChart from "./../Topics/LineChart";
// import PieChart from "./../Topics/PieChart";
// // import ChatGPT from "./Chat";

// const Topics = () => {
//   const [carbonData, setCarbonData] = useState([]);
//   const [fishfarmData, setFishfarmData] = useState([]);
//   const [sensorData, setSensorData] = useState([]);
  



//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/search/carbon")
//           .then((response) => response.json())
//           .catch((error) => {
//             console.error("Error:", error);
//           });

//         setCarbonData(response|| []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     const fetchData2 = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/api/search/fishfarm"
//         )
//           .then((response) => response.json())
//           .catch((error) => {
//             console.error("Error:", error);
//           });
//         setFishfarmData(response|| []);
//       } catch (error) {
//         console.error("Error fetching other data:", error);
//       }
//     };

//     const fetchData3 = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/search/sensor")
//           .then((response) => response.json())
//           .catch((error) => {
//             console.error("Error:", error);
//           });
//         console.log(response);
//         setSensorData(response || []);
//       } catch (error) {
//         console.error("Error fetching third data:", error);
//       }
//     };

//     fetchData1();
//     fetchData2();
//     fetchData3();
//   }, []);

//   const c = sensorData.map((item) => item["Temperature(°C)"]);
//   const ph = sensorData.map((item) => item["PH"]);

//   return (
//     <React.StrictMode>
//       <div className="row" style={{ display: "flex" }}>
//         <div style={{ flex: 1, fontSize: "35px" }}>
//           <h1>魚塭基本資料</h1>
//           <span>
//             魚塭編號:
//             {fishfarmData.length > 0 ? fishfarmData[0]["fishfarm_ID"] : ""}
//             <br />
//           </span>
//           <span>
//             魚苗種類:
//             {fishfarmData.length > 0 ? fishfarmData[0]["Species"] : ""}
//             <br />
//           </span>
//           <span>
//             開始養殖日期:
//             {fishfarmData.length > 0
//               ? fishfarmData[0]["StartDay"].substring(0, 10)
//               : ""}
//             <br />
//           </span>
//           <span>
//             養殖位置:
//             {fishfarmData.length > 0 ? fishfarmData[0]["Address"] : ""}
//             <br />
//           </span>
//           <span>
//             魚塭面積(公頃) :
//             {fishfarmData.length > 0 ? fishfarmData[0]["Area(ha)"] : ""}
//             <br />
//           </span>
//           <span>
//             養殖者:
//             {fishfarmData.length > 0 ? fishfarmData[0]["Manager"] : ""}
//             <br />
//           </span>
//         </div>

//         <div className="meter-chart" style={{ flex: 1 }}>
//           {/* <Meter val={c[c.length - 1]} unit={"°C"} header={""} nrOfLevels={5} />
//           <Meter
//             val={ph[ph.length - 1]}
//             unit={""}
//             header={"PH值:"}
//             nrOfLevels={15}
//             scope={14}
//           /> */}
//           {/* <Meter></Meter> */}
//         </div>
//       </div>

//       <div className="col-lg-6">
//         <h3>目前碳排總量</h3>
//         <div className="line-chart">
//           {/* <LineChart
//             datas={carbonData.map((item) => item["co2(tonne)"])}
//             labels={carbonData.map((item) => item.carbon_day)}
//             label={"co2"}
//           />
//           <LineChart
//             datas={carbonData.map((item) => item["ch4(tonne)"])}
//             labels={carbonData.map((item) => item.carbon_day)}
//             label={"ch4"}
//           />
//           <LineChart
//             datas={carbonData.map((item) => item["co(tonne)"])}
//             labels={carbonData.map((item) => item.carbon_day)}
//             label={"co"}
//           />
//           <LineChart
//             datas={carbonData.map((item) => item["N2O(tonne)"])}
//             labels={carbonData.map((item) => item.carbon_day)}
//             label={"N20"}
//           /> */}
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-lg-6">
//           <div className="bar-chart">
//             <h3>飼料剩餘數量</h3>
//             {/* <BarChart
//               datas={sensorData.map((item) => item["feed(g)"])}
//               labels={sensorData.map((item) => item.sensor_time)}
//               label={"feed"}
//             /> */}
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-lg-12">
//             <div className="pie-chart">
//               {/* <PieChart /> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         {/* <ChatGPT /> */}
//       </div>
//     </React.StrictMode>
//   );
// };

// export default Topics;
