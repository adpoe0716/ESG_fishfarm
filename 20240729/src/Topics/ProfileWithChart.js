import React from "react";
import Who from "./who.js";
import Line_chart from "./Line.js";

export default function ProfileWithChart({ num }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <Who num={num} />
      </div>
      <div style={{ flex: 2 }}>
        <Line_chart num={num} />
      </div>
    </div>
  );
}
