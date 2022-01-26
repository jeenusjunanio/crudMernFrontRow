import React from "react";
import { BrowserRouter,Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from './components/footer/Footer'
import Influencers from "./components/pages/admin/influencers/Influencers";
import Register from "./components/utils/Register";
import Login from "./components/utils/Login";

// Routing

import AdminRoutes from "./components/routing/AdminRoutes";

import AddInfluencer from "./components/pages/admin/influencers/AddInfluencer";
import EditInfluencer from "./components/pages/admin/influencers/EditInfluencer";

const App= () => {
  return (
    <BrowserRouter>
          <div className="App">
            <Header />
            <div className="container">
            <Routes>
              {/* <AdminRoutes exact path="/addInfluencer" component={AddInfluencer} /> */}
              
              <Route exact path='/addInfluencer' element={<AdminRoutes><AddInfluencer /></AdminRoutes>}/>
              <Route exact path='/edit-influencer/:id' element={<AdminRoutes><EditInfluencer /></AdminRoutes>}/>
              
              <Route exact path="/" element={<Influencers />} />
              <Route exact path="/influencers" element={<Influencers />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
            <Footer />
          
          </div>
          </div>
    </BrowserRouter>
  );
}

export default App;
