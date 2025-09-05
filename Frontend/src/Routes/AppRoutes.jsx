import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<div>Home</div>}/>
            <Route path='/login' element={<div>Login</div>}/>
            <Route path='/logout' element={<div>Logout</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
