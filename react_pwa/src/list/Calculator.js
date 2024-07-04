import React, { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
    const [values, setValues] = useState({
        milkfish: 0,
        shrimp: 0,
        clam: 0,
        electricity: 0,
        water: 0,
        gasoline: 0,
        feed: 0
    });

    const [results, setResults] = useState({
        milkfish: 0,
        shrimp: 0,
        clam: 0
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues({ ...values, [id]: parseFloat(value) });
    };

    const handleClick = async () => {
        const { milkfish, shrimp, clam, electricity, water, gasoline, feed } = values;

        const Co2_milkfish =
            electricity * 0.606 +
            water * 0.233 +
            gasoline * 0.683 +
            milkfish * 0.154 +
            feed * 1.62;

        const Co2_shrimp =
            electricity * 0.606 +
            water * 0.233 +
            gasoline * 0.683 +
            feed * 1.62 +
            shrimp * 3.1;

        const Co2_clam =
            electricity * 0.606 +
            water * 0.233 +
            gasoline * 0.683 +
            feed * 1.62 +
            clam * 0.037;

        const newResults = {};
        if (milkfish) {
            newResults.milkfish = Co2_milkfish;
        }
        if (shrimp) {
            newResults.shrimp = Co2_shrimp;
        }
        if (clam) {
            newResults.clam = Co2_clam;
        }

        setResults(newResults);
        const co2 = [Co2_milkfish, Co2_shrimp, Co2_clam];
        await fetch("http://localhost:3000/api/Cal/input", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Co2: co2
            }),
        });
        console.log(co2);
    };

    return (
        <div className="calculator-container">
            <div className="calculator-inputs-box">
                <div className="calculator-section">
                    <div className="input-group">
                        <label htmlFor="milkfish">公斤數-虱目魚：</label>
                        <input id="milkfish" type="number" className="calculator-input" value={values.milkfish} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="shrimp">公斤數-蝦：</label>
                        <input id="shrimp" type="number" className="calculator-input" value={values.shrimp} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="clam">公斤數-文蛤：</label>
                        <input id="clam" type="number" className="calculator-input" value={values.clam} onChange={handleChange} />
                    </div>
                </div>
                <div className="calculator-section">
                    <div className="input-group">
                        <label htmlFor="electricity">用電(度)：</label>
                        <input id="electricity" type="number" className="calculator-input" value={values.electricity} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="water">用水(m³)：</label>
                        <input id="water" type="number" className="calculator-input" value={values.water} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="gasoline">汽油(tkm)：</label>
                        <input id="gasoline" type="number" className="calculator-input" value={values.gasoline} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="feed">飼料(礦物質+維他命)：</label>
                        <input id="feed" type="number" className="calculator-input" value={values.feed} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button onClick={handleClick} className="calculator-button">
                    算
                </button>
            </div>

            <div className="calculator-results">
                <div className="calculator-result">
                    <strong>虱目魚：</strong> {results.milkfish ? results.milkfish.toFixed(2) : "-"} kg CO2
                </div>
                <div className="calculator-result">
                    <strong>草蝦：</strong> {results.shrimp ? results.shrimp.toFixed(2) : "-"} kg CO2
                </div>
                <div className="calculator-result">
                    <strong>文蛤：</strong> {results.clam ? results.clam.toFixed(2) : "-"} kg CO2
                </div>
            </div>
        </div>
    );
};
