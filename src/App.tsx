import React, { useState, useEffect } from "react";
import { RangeSelector } from "./components/RangeSelector";
import { MagicBall } from "./components/MagicBall";

function App() {
  const [range, setRange] = useState<{
    start: number | undefined;
    end: number | undefined;
  }>({ start: undefined, end: undefined });

  useEffect(() => {
    const data = localStorage.getItem("range");
    console.log(data);
    if (data != null) {
      setRange(JSON.parse(data));
    }
  }, []);

  const onRangeSelected = (start: number, end: number) => {
    localStorage.setItem("range", JSON.stringify({ start, end }));
    setRange({ start, end });
  };

  const onBackSelected = () => {
    localStorage.removeItem("range");
    setRange({ start: undefined, end: undefined });
  };

  useEffect(() => console.log(range))

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", color: "purple" }}>
        Patrik's magic number ball
      </h1>
      {range.start && range.end ? (
        <MagicBall range={range} onBack={onBackSelected} />
      ) : (
        <RangeSelector onContinue={onRangeSelected} />
      )}
    </div>
  );
}

export default App;
