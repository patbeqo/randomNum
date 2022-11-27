import { Suspense } from "react";
import { getCache } from "./services/cacheService";
import { Routes, Route, redirect } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LazyRangeSelector, LazyMagicBall } from "./pages/randomNumber/";
import { SpinRandomNumber } from "./routes";
import { Template } from "./pages/home/Template";

function App() {
  if (getCache()) {
    redirect(SpinRandomNumber);
  }

  return (
    <div className="App">
      <Template />
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="number"
          element={
            <Suspense fallback={null}>
              <LazyRangeSelector />
            </Suspense>
          }
        />
        <Route
          path="number/spin"
          element={
            <Suspense fallback={null}>
              <LazyMagicBall />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
