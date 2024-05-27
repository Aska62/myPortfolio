import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import Home from "./pages/Home";
import Works from "./pages/Works";
import Contact from "./pages/Contact";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} >
      <Route path="/" element={<Home />} />
      <Route path="/works" element={<Works />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
  ])
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
