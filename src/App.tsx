import React, { useState } from "react";
import { RangeSelector } from "./components/RangeSelector";
import { MagicBall } from "./components/MagicBall";
import { MagicBallProvider } from "./components/magicBallContext";

enum Steps {
  SELECT_RANGE,
  RANDOM_NUM_GENERATOR,
}

function App() {
  const hasSession = localStorage.getItem("numbers");
  const [state, setState] = useState(
    hasSession ? Steps.RANDOM_NUM_GENERATOR : Steps.SELECT_RANGE
  );

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", color: "purple" }}>
        Patrik's magic number ball
      </h1>
      <MagicBallProvider>
        {state === Steps.SELECT_RANGE ? (
          <RangeSelector goNext={() => setState((prev) => prev + 1)} />
        ) : (
          <MagicBall goBack={() => setState((prev) => prev - 1)} />
        )}
      </MagicBallProvider>
    </div>
  );
}

export default App;
