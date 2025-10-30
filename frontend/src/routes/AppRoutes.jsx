import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import CereateFood from '../pages/create-food/CereateFood';
import Profile from '../pages/create-food/Profile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin/>} />
        <Route path='/food-partner/register' element={<FoodPartnerRegister/>} />
        <Route path='/food-partner/login' element={<FoodPartnerLogin/>} />
        <Route path='/' element={<Home/>}/>
        <Route path='/create-food' element={<CereateFood/>}/>
        <Route path='/food-partner/:id' element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;