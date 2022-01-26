import React from 'react';
import {Link} from 'react-router-dom'
import "./header.css"

const Header = () => {
  return <header>
      <div className="menu">
            <img src="https://frontrow.ae/assets/web/img/logo.png" alt="" width="30" />
        </div>

        <div className="logo">
            <h1>
                <Link to="/">FRONTROW</Link>
            </h1>
        </div>

        <ul >
            <li><Link to="/influencers">Influencer</Link></li>

            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            

        </ul>
  </header>;
};

export default Header
