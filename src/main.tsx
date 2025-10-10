import { StrictMode } from "react"

import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"

import "./index.css"

import App from "./App.tsx"
import About from "./pages/About.tsx"
import Home from "./pages/Home.tsx"
import NotFound from "./pages/NotFound.tsx"

import "@fontsource-variable/manrope"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
