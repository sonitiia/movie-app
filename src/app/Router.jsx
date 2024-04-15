import { Navigate, Route, Routes } from "react-router-dom";
import {
  HOME_ROUTE,
  LIKED_ROUTE,
  MAIN_ROUTE,
  MOVIE_DETAILES_ROUTE,
  NOT_FOUND_ROUTE,
} from "./Routes";

import FullWidthLayout from "../layouts/FullWidthLayout";
import PageNotFoundRoute from "../routes/PageNotFoundRoute";
import HomeRoute from "../routes/HomeRoute";
import LikedRoute from "../routes/LikedRoute";
import MovieDetailsRoute from "../routes/MovieDetailsRoute";

const Router = () => {
  return (
    <Routes>
      <Route>
        <Route path={MAIN_ROUTE} element={<FullWidthLayout />}>
          <Route index element={<Navigate to={HOME_ROUTE} replace />} />
          <Route path={HOME_ROUTE} element={<HomeRoute />} />
          <Route path={MOVIE_DETAILES_ROUTE} element={<MovieDetailsRoute />} />
          <Route path={LIKED_ROUTE} element={<LikedRoute />} />

          <Route path={NOT_FOUND_ROUTE} element={<PageNotFoundRoute />} />
          <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} replace />} />

          <Route path="*" element={<PageNotFoundRoute />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
