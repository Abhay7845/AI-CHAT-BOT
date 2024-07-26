import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIHome from "./components/common/AIHome";
import UserLogin from "./components/users/UserLogin";
import UserSignUp from "./components/users/UserSignUp";
import AIMainScreen from "./components/AIComponents/AIMainScreen";
import NpimDemo from "./components/AIComponents/NpimDemo";
import PdtCharts from "./components/AIComponents/PdtCharts";
import PrivateComponet from "./components/common/PrivateComponent";
import AddStudentsMarksDetails from "./components/AIComponents/AddStudentsMarksDetails";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route>
          <Route index element={<AIHome />} />
          <Route path="/" element={<AIHome />} />
          <Route path="/auth/log-in" element={<UserLogin />} />
          <Route path="/auth/sign-up" element={<UserSignUp />} />
          <Route element={<PrivateComponet />}>
            <Route path="/ai/query/result" element={<AIMainScreen />} />
            <Route path="/add/students/marks/details" element={<AddStudentsMarksDetails />} />
            <Route path="/npim/demo" element={<NpimDemo />} />
            <Route path="/ai/demo/chart" element={<PdtCharts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
