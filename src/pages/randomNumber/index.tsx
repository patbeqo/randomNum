import { lazy } from "react";

export const LazyRangeSelector = lazy(() =>
  import(
    /* webpackChunkName: "RangeSelector" */ "./components/RangeSelector"
  ).then((module) => ({
    default: module.RangeSelector,
  }))
);

export const LazyMagicBall = lazy(() =>
  import(/* webpackChunkName: "MagicBall" */ "./components/MagicBall").then(
    (module) => ({
      default: module.MagicBall,
    })
  )
);
