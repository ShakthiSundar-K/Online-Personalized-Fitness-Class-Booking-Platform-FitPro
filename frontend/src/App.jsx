import React from "react";
import AppRoutes from "./utils/AppRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter(AppRoutes);
  return (
    <div className='bg-app-bg font-oswald bg-black'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
