import React from "react";
import ReactDOM from "react-dom/client";
import MessageRoom from "./Components/MessageRoom.jsx";
import ProductsRoom from "./Components/ProductsRoom.jsx";
import Homes from "./Components/Homes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homes />,
  },
  {
    path: "/product",
    element: <ProductsRoom />,
  },
  {
    path: "/chat",
    element: <MessageRoom />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
