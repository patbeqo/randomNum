import { lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const RangeSelector = lazy(() =>
  import(
    /* webpackChunkName: "RangeSelector" */ "./components/RangeSelector"
  ).then((module) => ({
    default: module.RangeSelector,
  }))
);

const MagicBall = lazy(() =>
  import(/* webpackChunkName: "MagicBall" */ "./components/MagicBall").then(
    (module) => ({
      default: module.MagicBall,
    })
  )
);

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", color: "purple" }}>
        Patrik's magic number ball
      </h1>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <RangeSelector goNext={() => navigate("/spin")} />
            </Suspense>
          }
        />
        <Route
          path="spin"
          element={
            <Suspense fallback={null}>
              <MagicBall goBack={() => navigate("/")} />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
