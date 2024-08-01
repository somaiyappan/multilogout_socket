
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Welome from './Welome';
import { useEffect, useState } from 'react';

import LogoutPopup from './LogoutPopup';
import ProtectedRoute from './components/ProtectedRoutes';
import PrivateRoutes from './components/PrivateRoutes';

function App() {




 



  return (<>

    <BrowserRouter >
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<Welome />} />
        </Route>
      </Routes>
      <LogoutPopup />

    </BrowserRouter>
  </>
  );
}

export default App;



