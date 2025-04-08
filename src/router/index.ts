import { createBrowserRouter } from "react-router";
import Gallery from "../pages/Gallery";
import PhotoDetail from "../pages/PhotoDetail";

const router = createBrowserRouter([
  { path: "/", Component: Gallery },
  { path: "/photo/:id", Component: PhotoDetail },
]);

export default router;
