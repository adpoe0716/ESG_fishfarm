import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const RADIAN = Math.PI / 180;
const cx = 150;
const cy = 100;
const iR = 50;
const oR = 100;

const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle key="cc" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path
            key="path"
            d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
            stroke="#none"
            fill={color}
        />,
    ];
};

export default function Example({ num, num2 }) {
    const [data, setData] = useState([
        { name: 'A', value: 11, color: '#C9F4AA' },//0-11
        { name: 'B', value: 8, color: '#FFFBBE' }, //12-20
        { name: 'C', value: 14, color: '#C6DEE0' },//20-34
        { name: 'D', value: 8, color: '#F7D3BA' },//34-42
        { name: 'D', value: 10, color: '#F1E2DB' },//42-50
    ]);
    const [value, setValue] = useState(0);
    const [NeedleData, setNeedle] = useState([]);
    const [text, setText] = useState('');
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
                setNeedle(responseData);
            }

        };
        fetchData();
    }, []);
    // console.log(NeedleData);
    useEffect(() => {
        if (NeedleData && NeedleData[0]) {
            if (num2 == 0) {
                setValue(NeedleData[0].sensor_temperature);
                setText('當前溫度:');
                setData([
                    { name: 'A', value: 11, color: '#33ffff' }, //0-11
                    { name: 'B', value: 8, color: '#3366cc' },  //12-20
                    { name: 'C', value: 14, color: '#3399cc' }, //20-34
                    { name: 'D', value: 8, color: '#ccff66' },  //34-42
                    { name: 'D', value: 10, color: '#993300' }, //42-50
                ]);
                
            } else if (num2 == 1) {
                setValue(NeedleData[0].sensor_PH);
                setText('當前PH值:');
                setData([
                    { name: 'A', value: 11, color: '#33ffff' }, //0-11
                    { name: 'B', value: 8, color: '#3366cc' },  //12-20
                    { name: 'C', value: 14, color: '#3399cc' }, //20-34
                    { name: 'D', value: 8, color: '#ccff66' },  //34-42
                    { name: 'D', value: 10, color: '#993300' }, //42-50
                ]);
            }else if (num2 == 2) {
                setValue(NeedleData[0].sensor_salinity);
                setText('當前鹽度:');
                setData([
                    { name: 'A', value: 11, color: '#33ffff' }, //0-11
                    { name: 'B', value: 8, color: '#3366cc' },  //12-20
                    { name: 'C', value: 14, color: '#3399cc' }, //20-34
                    { name: 'D', value: 8, color: '#ccff66' },  //34-42
                    { name: 'D', value: 10, color: '#993300' }, //42-50
                ]);
            }else if (num2 == 3) {
                setValue(NeedleData[0].sensor_oxygen);
                // console.log(NeedleData[0]);
                // console.log(NeedleData[0].sensor_oxygen);
                setText('當前溶氧量:');
                setData([
                    { name: 'A', value: 11, color: '#33ffff' }, //0-11
                    { name: 'B', value: 8, color: '#3366cc' },  //12-20
                    { name: 'C', value: 14, color: '#3399cc' }, //20-34
                    { name: 'D', value: 8, color: '#ccff66' },  //34-42
                    { name: 'D', value: 10, color: '#993300' }, //42-50
                ]);
            }
        }
    }, [NeedleData]);
    
    if (NeedleData) {
        
        return (
            <>
                <p>{text}{value}</p>
                <PieChart width={500} height={100}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR}
                        fill="#8884d8"
                        stroke="#000"
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.color} />
                        ))}
                        {
                            <Label value="20-34" color="#000000"></Label>
                        }
                    </Pie>
                    {needle(value, data, cx, cy, iR, oR, "#d0d000")}
                </PieChart>
            </>
        );
    }
}