import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function App({ num }) {
  const [carbonData, setCarbonData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/search/carbon");
        const result = await response.json();
        setCarbonData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (carbonData.length > 0) {
      const co2_value = [0, 0, 0];

      for (let i = 0; i < carbonData.length; i++) {
        if (carbonData[i].fishfarm_num === 1) {
          co2_value[0] += carbonData[i].co2;
        }
        if (carbonData[i].fishfarm_num === 2) {
          co2_value[1] += carbonData[i].co2;
        }
        if (carbonData[i].fishfarm_num === 3) {
          co2_value[2] += carbonData[i].co2;
        }
      }

      let chartData;
      if (num === 1) {
        chartData = [
          {
            name: "Co2",
            uv: co2_value[0],
          },
        ];
      } else if (num === 2) {
        chartData = [
          {
            name: "Co2",
            uv: co2_value[1],
          },
        ];
      } else if (num === 3) {
        chartData = [
          {
            name: "Co2",
            uv: co2_value[2],
          },
        ];
      }
      setData(chartData);
    }
  }, [carbonData, num]);

  return (
    <BarChart
      width={250}
      height={250}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar
        dataKey="uv"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
}

App.demoUrl = "https://codesandbox.io/s/bar-chart-with-customized-shape-dusth";
