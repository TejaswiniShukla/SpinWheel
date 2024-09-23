import React, { useEffect, useState } from "react";
import "./spinWheel.css"; 

function SpinWheel({ length = 60, targetNumber = null }) {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD"];
  const numberColorPairs = Array.from({ length }, (_, i) => ({
    number: i + 1,
    color: colors[i % colors.length],
  }));

  const radius = 200;
  const segmentAngle = 360 / length; 
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    if (targetNumber) {
      const targetAngle = (targetNumber - 1) * segmentAngle;
      const totalSpins = 3; 
      setSpin(totalSpins * 360 + targetAngle);
    }
  }, [targetNumber, segmentAngle]);

  return (
    <div style={{ position: "relative" }}>
      <svg
        width="500" 
        height="500" 
        style={{ transform: `rotate(${spin}deg)`, transition: "transform 4s ease-out" }}
      >
        <g transform={`translate(${250}, ${250})`}>
          {numberColorPairs.map((e, i) => {
            const angleStart = segmentAngle * i;
            const angleEnd = segmentAngle * (i + 1);

            const x1 = radius * Math.cos((Math.PI / 180) * angleStart);
            const y1 = radius * Math.sin((Math.PI / 180) * angleStart);
            const x2 = radius * Math.cos((Math.PI / 180) * angleEnd);
            const y2 = radius * Math.sin((Math.PI / 180) * angleEnd);

            return (
              <g key={i}>
                <path
                  d={`M0,0 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
                  fill={e.color}
                />
                <text
                  x={(x1 + x2) / 2 * 0.6}
                  y={(y1 + y2) / 2 * 0.6}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="14"
                  dy=".3em"
                  transform={`rotate(${segmentAngle * (i + 0.5)} ${(x1 + x2) / 2 * 0.6} ${(y1 + y2) / 2 * 0.6})`}
                >
                  {e.number}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="needle" />

      <button className="spin-button" onClick={() => setSpin(spin + 360)}>
        Spin
      </button>
    </div>
  );
}

export default SpinWheel;
