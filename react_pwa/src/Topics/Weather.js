import React, { useState, useEffect, PureComponent } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/weather");
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (weatherData) {
            const temperatureArray = [];
            weatherData.records.location.forEach((location) => {
                location.weatherElement.forEach((element) => {
                    if (element.elementName === "MaxT") {
                        element.time.forEach((time) => {
                            const startTime = time.startTime;
                            const maxTemp = time.parameter.parameterName;
                            const minTemp = getMinTemperature(weatherData, startTime);
                            const pop = getpop(weatherData, startTime);
                            const wx = getWx(weatherData, startTime);
                            const CI = getCI(weatherData, startTime);
                            temperatureArray.push({
                                startTime,
                                maxTemp,
                                minTemp,
                                pop,
                                wx,
                                CI,
                            });
                        });
                    }
                });
            });
            setTemperatureData(temperatureArray);
        }
    }, [weatherData]);

    const getMinTemperature = (data, startTime) => {
        const location = data.records.location[0];
        const minTempElement = location.weatherElement.find(
            (element) => element.elementName === "MinT"
        );
        const timeData = minTempElement.time.find(
            (time) => time.startTime === startTime
        );
        return timeData.parameter.parameterName;
    };

    const getpop = (data, startTime) => {
        const location = data.records.location[0];
        const popElement = location.weatherElement.find(
            (element) => element.elementName === "PoP"
        );
        const timeData = popElement.time.find(
            (time) => time.startTime === startTime
        );
        return timeData.parameter.parameterName;
    };
    const getWx = (data, startTime) => {
        const location = data.records.location[0];
        const WxElement = location.weatherElement.find(
            (element) => element.elementName === "Wx"
        );
        const timeData = WxElement.time.find(
            (time) => time.startTime === startTime
        );
        return timeData.parameter.parameterName;
    };
    const getCI = (data, startTime) => {
        const location = data.records.location[0];
        const CIElement = location.weatherElement.find(
            (element) => element.elementName === "CI"
        );
        const timeData = CIElement.time.find(
            (time) => time.startTime === startTime
        );
        return timeData.parameter.parameterName;
    };

    // console.log(temperatureData);

    if (temperatureData && temperatureData[0]) {
        const data2 = [
            {
                time: temperatureData[0].startTime,
                Temp: temperatureData[0].maxTemp,
            },
            {
                time: temperatureData[0].startTime,
                Temp: temperatureData[0].minTemp,
            },
            {
                time: temperatureData[1].startTime,
                Temp2: temperatureData[1].maxTemp,
            },
            {
                time: temperatureData[1].startTime,
                Temp2: temperatureData[1].minTemp,
            },

            {
                time: temperatureData[2].startTime,
                Temp3: temperatureData[2].maxTemp,
            },
            {
                time: temperatureData[2].time,
                Temp3: temperatureData[2].minTemp,
            },
        ];

        return (
            <>
                <div>
                    <p>今天降雨量:{temperatureData[0].pop}</p>
                    <p>天氣狀況:{temperatureData[0].wx}</p>
                    <p>體感:{temperatureData[0].CI}</p>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data2}
                        margin={{
                            top: 10,
                            right: 1,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="Temp"
                            stroke="#0066ff"
                            fill="#0066ff"
                        />
                        <Area
                            type="monotone"
                            dataKey="Temp2"
                            stroke="#9900ff"
                            fill="#9900ff"
                        />
                        <Area
                            type="monotone"
                            dataKey="Temp3"
                            stroke="cc66ff"
                            fill="cc66ff"
                        />
                    </AreaChart>
                </div>
            </>
        );

    }
}
