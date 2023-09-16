import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contact, Blog, FullArticle } from "./containers";
import ErrorElement from "./ErrorElement";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
    },
    {
        path: "/blog",
        element: <Blog />,
        errorElement: <ErrorElement />,
    },
    {
        path: "/blog/:slug",
        element: <FullArticle />,
        errorElement: <ErrorElement />,
    },
    {
        path: "/contact",
        element: <Contact />,
        errorElement: <ErrorElement />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
