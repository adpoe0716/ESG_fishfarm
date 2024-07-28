import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./who.css"; 

export default function Who({ num }) {
    const [fishfarmData, setFishfarmData] = useState([]);
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchFishfarmData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/search/fishfarm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ num }),
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Fishfarm Data:", responseData);
                    setFishfarmData(responseData);
                } else {
                    console.error("Failed to fetch fishfarm data");
                }
            } catch (error) {
                console.error("Error fetching fishfarm data:", error);
            }
        };

        fetchFishfarmData();

    }, [num]);

    const farm = fishfarmData[0];

    if (farm) {
       return (
            <div className="who-container">
                <div className="personal-info">
                    <p>Fishfarm ID: {farm.fishfarm_ID}</p>
                    <p>Species: {farm.Species}</p>
                    <p>Type: {farm.type}</p>
                    <p>Start Day: {farm.StartDay}</p>
                    <p>Address: {farm.Address}</p>
                    <p>Area: {farm['Area(ha)']}</p>
                    <p>Manager: {farm.Manager}</p>
                </div>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}
