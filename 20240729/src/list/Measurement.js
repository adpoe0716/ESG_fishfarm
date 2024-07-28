import React, { useState } from "react";
// import "./Measurement.css";

const Measurement = () => {
  const [data, setData] = useState({
    pond: "",
    time: "",
    temperature: "",
    salinity: "",
    phValue: "",
    oxygenLevel: "",
    feedingStatus: "",
    sulfide: "",
    fishPondStatus: "",
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("提交的資料:", {
      data,
    });

    try {
      const response = await fetch(
        "http://localhost:3000/api/Measurement/input",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.success == true) {
          var show = new Notification(responseData.message);
        }
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } catch (error) {
      console.error(error);
    }

    setData({
      pond: "",
      time: "",
      temperature: "",
      salinity: "",
      phValue: "",
      oxygenLevel: "",
      feedingStatus: "",
      sulfide: "",
      fishPondStatus: "",
      reason: "",
    });
  };

  return (
    <div className="input-container">
      <h2>輸入魚塭感測資料</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>魚塭選擇：</label>
          <select
            value={data.pond}
            onChange={(e) => setData({ ...data, pond: e.target.value })}
            required
          >
            <option value="">選擇魚塭</option>
            <option value="pond1">魚塭-虱目魚</option>
            <option value="pond2">魚塭-文蛤</option>
            <option value="pond3">魚塭-蝦</option>
          </select>
        </div>

        <div className="form-group">
          <label>時間：</label>
          <input
            type="datetime-local"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>鹽度：</label>
          <input
            type="number"
            step="0.01"
            value={data.salinity}
            onChange={(e) => setData({ ...data, salinity: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>溫度：</label>
          <input
            type="number"
            step="0.01"
            value={data.temperature}
            onChange={(e) => setData({ ...data, temperature: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>pH值：</label>
          <input
            type="number"
            step="0.01"
            value={data.phValue}
            onChange={(e) => setData({ ...data, phValue: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>含氧量：</label>
          <input
            type="number"
            step="0.01"
            value={data.oxygenLevel}
            onChange={(e) => setData({ ...data, oxygenLevel: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>備註：</label>
          <input
            type="text"
            value={data.reason}
            onChange={(e) => setData({ ...data, reason: e.target.value })}
            
          />
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

export default Measurement;
