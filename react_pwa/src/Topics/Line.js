import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import React, { useState, useEffect } from "react";

export default function Line_chart({ num }) {
    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                "http://localhost:3000/api/search/sensor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ num }),
            }
            );
            if (response.ok) {
                const responseData = await response.json();
                // console.log(responseData);
                setSensorData(responseData);
            }

        };
        fetchData();
    }, []);
    const [sensorData, setSensorData] = useState([]);
    // console.log("ya", sensorData);
    if (sensorData[0]) {
        // console.log(sensorData);
        const day = [sensorData[4].sensor_date, sensorData[3].sensor_date, sensorData[2].sensor_date, sensorData[1].sensor_date, sensorData[0].sensor_date];
        // console.log('day:', day);

        const formattedDay = day.map(dateTime => {
            let parts = dateTime.split('T');
            let date = parts[0];
            let time = parts[1].split('.')[0];

            return date + "\n" + time;
        });
            // console.log('day2:', formattedDay);


        const data = [
            { 時間: formattedDay[0], 水溫: sensorData[4].sensor_temperature, PH值: sensorData[4].sensor_PH, 溶氧量: (sensorData[4].sensor_oxygen/10), 鹽度: sensorData[4].sensor_salinity},
            { 時間: formattedDay[1], 水溫: sensorData[3].sensor_temperature, PH值: sensorData[3].sensor_PH, 溶氧量: (sensorData[3].sensor_oxygen/10), 鹽度: sensorData[3].sensor_salinity},
            { 時間: formattedDay[2], 水溫: sensorData[2].sensor_temperature, PH值: sensorData[2].sensor_PH, 溶氧量: (sensorData[2].sensor_oxygen/10), 鹽度: sensorData[2].sensor_salinity},
            { 時間: formattedDay[3], 水溫: sensorData[1].sensor_temperature, PH值: sensorData[1].sensor_PH, 溶氧量: (sensorData[1].sensor_oxygen/10), 鹽度: sensorData[1].sensor_salinity},
            { 時間: formattedDay[4], 水溫: sensorData[0].sensor_temperature, PH值: sensorData[0].sensor_PH, 溶氧量: (sensorData[0].sensor_oxygen/10), 鹽度: sensorData[0].sensor_salinity},
        ];
        // console.log(data);
        const renderLineChart = (
            <LineChart
                width={1000}
                height={200}
                data={data}
                margin={{ top: 50, right: 1, bottom: 10, left: 0 }}
            >

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="時間" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="水溫" stroke="red" />
                <Line type="monotone" dataKey="PH值" stroke="Blue" />
                <Line type="monotone" dataKey="溶氧量" stroke="Green" />
                <Line type="monotone" dataKey="鹽度" stroke="Purple" />
            </LineChart>
        );
        return renderLineChart;
    }
}
