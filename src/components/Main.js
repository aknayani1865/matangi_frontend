// src/components/Main.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SpareParts from "./SpareParts";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import Products from "./Products";
import AddProduct from "./AddProducts";
import SparePartsAdmin from "./SparePartsAdmin";
import AddSparePart from "./AddSparePart";
import UpdateProduct from "./UpdateProduct";
import UpdateSparePart from "./UpdateSparePart";
import ProtectedRoute from "./ProtectedRoute";
import useAuthRedirect from "../hooks/useAuthRedirect"; // Import the custom hook

const Main = () => {
//   useAuthRedirect(); // Use the hook to check for token and redirect

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/spare-parts/:productId" element={<SpareParts />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      >
        <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="products/update/:id" element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>} />
        <Route path="spare-parts" element={<ProtectedRoute><SparePartsAdmin /></ProtectedRoute>} />
        <Route path="spare-parts/add" element={<ProtectedRoute><AddSparePart /></ProtectedRoute>} />
        <Route path="spare-parts/update/:id" element={<ProtectedRoute><UpdateSparePart /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default Main;